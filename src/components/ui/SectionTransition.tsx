interface SectionTransitionProps {
  from: 'dark' | 'cream';
  to: 'dark' | 'cream';
}

export default function SectionTransition({ from, to }: SectionTransitionProps) {
  const gradientClass =
    from === 'dark' && to === 'cream'
      ? 'bg-gradient-to-b from-dark to-cream'
      : 'bg-gradient-to-b from-cream to-dark';

  return (
    <div
      aria-hidden="true"
      className={`h-32 ${gradientClass}`}
    />
  );
}
