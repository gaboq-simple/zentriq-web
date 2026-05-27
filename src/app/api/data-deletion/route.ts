import { NextRequest, NextResponse } from 'next/server';

/**
 * Data Deletion Callback for Meta.
 *
 * Meta sends a POST with a `signed_request` when a user requests data
 * deletion from a Facebook/WhatsApp-connected app.
 *
 * TODO (production): Verify the signed_request signature using the
 * App Secret before processing. See:
 * https://developers.facebook.com/docs/development/create-an-app/app-dashboard/data-deletion-callback
 */
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 },
    );
  }

  const signedRequest = body.signed_request;

  if (!signedRequest || typeof signedRequest !== 'string') {
    return NextResponse.json(
      { error: 'Missing signed_request parameter' },
      { status: 400 },
    );
  }

  // Parse the signed_request to extract user_id.
  // Format: <signature>.<base64url-encoded JSON payload>
  const parts = signedRequest.split('.');
  if (parts.length !== 2) {
    return NextResponse.json(
      { error: 'Malformed signed_request' },
      { status: 400 },
    );
  }

  let userId = 'unknown';
  try {
    const payload = JSON.parse(
      Buffer.from(parts[1], 'base64').toString('utf-8'),
    );
    userId = payload.user_id ?? 'unknown';
  } catch {
    // If we can't parse the payload, proceed with a generic confirmation
  }

  // Generate a unique confirmation code
  const confirmationCode = `DEL-${userId}-${Date.now()}`;

  console.log(
    `[data-deletion] Received deletion request for user_id=${userId}, confirmation_code=${confirmationCode}`,
  );

  return NextResponse.json({
    url: 'https://zentriq.mx/eliminacion-de-datos',
    confirmation_code: confirmationCode,
  });
}
