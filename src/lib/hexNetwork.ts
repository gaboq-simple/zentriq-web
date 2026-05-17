interface HexNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
  phaseSpeed: number;
}

interface HexNetworkState {
  nodes: HexNode[];
  mouseX: number;
  mouseY: number;
  width: number;
  height: number;
  animId: number | null;
  isActive: boolean;
}

const CONNECTION_DISTANCE = 160;
const MOUSE_RADIUS = 180;
const MOUSE_FORCE = 0.8;
const RETURN_SPEED = 0.02;
const DRIFT_SPEED = 0.15;

export function createHexNetwork(
  canvas: HTMLCanvasElement,
  nodeCount: number = 40,
): HexNetworkState {
  const ctx = canvas.getContext('2d')!;
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const nodes: HexNode[] = Array.from({ length: nodeCount }, () => {
    const x = Math.random() * width;
    const y = Math.random() * height;
    return {
      x,
      y,
      baseX: x,
      baseY: y,
      vx: (Math.random() - 0.5) * DRIFT_SPEED,
      vy: (Math.random() - 0.5) * DRIFT_SPEED,
      size: 6 + Math.random() * 10,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.005 + Math.random() * 0.01,
    };
  });

  return {
    nodes,
    mouseX: -1000,
    mouseY: -1000,
    width,
    height,
    animId: null,
    isActive: true,
  };
}

function drawHexagon(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const px = x + size * Math.cos(angle);
    const py = y + size * Math.sin(angle);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.strokeStyle = `rgba(216, 90, 48, ${opacity})`;
  ctx.lineWidth = 0.6;
  ctx.stroke();
}

function drawNode(ctx: CanvasRenderingContext2D, x: number, y: number, opacity: number) {
  ctx.beginPath();
  ctx.arc(x, y, 1.5, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(216, 90, 48, ${opacity})`;
  ctx.fill();
}

export function animate(
  canvas: HTMLCanvasElement,
  state: HexNetworkState,
) {
  const ctx = canvas.getContext('2d')!;
  const { nodes, width, height } = state;

  ctx.clearRect(0, 0, width, height);

  // Update nodes
  for (const node of nodes) {
    // Mouse repulsion
    const dx = node.x - state.mouseX;
    const dy = node.y - state.mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < MOUSE_RADIUS && dist > 0) {
      const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
      node.vx += (dx / dist) * force;
      node.vy += (dy / dist) * force;
    }

    // Return to base position
    node.vx += (node.baseX - node.x) * RETURN_SPEED;
    node.vy += (node.baseY - node.y) * RETURN_SPEED;

    // Damping
    node.vx *= 0.95;
    node.vy *= 0.95;

    // Apply velocity
    node.x += node.vx;
    node.y += node.vy;

    // Update breathing phase
    node.phase += node.phaseSpeed;

    // Draw hexagon with breathing
    const breathe = 0.18 + Math.sin(node.phase) * 0.06;
    drawHexagon(ctx, node.x, node.y, node.size, breathe);
    drawNode(ctx, node.x, node.y, breathe + 0.24);
  }

  // Draw connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONNECTION_DISTANCE) {
        const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.24;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(216, 90, 48, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  if (state.isActive) {
    state.animId = requestAnimationFrame(() => animate(canvas, state));
  }
}

export function resizeCanvas(
  canvas: HTMLCanvasElement,
  state: HexNetworkState,
) {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  const ctx = canvas.getContext('2d')!;
  ctx.scale(dpr, dpr);

  state.width = width;
  state.height = height;

  // Redistribute nodes
  for (const node of state.nodes) {
    node.baseX = Math.random() * width;
    node.baseY = Math.random() * height;
  }
}

export function destroyHexNetwork(state: HexNetworkState) {
  state.isActive = false;
  if (state.animId !== null) {
    cancelAnimationFrame(state.animId);
  }
}
