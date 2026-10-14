type CrosshairProps = {
  className?: string;
};

export default function Crosshair({ className = '' }: CrosshairProps) {
  return (
    <div aria-hidden="true" className={['crosshair', className].filter(Boolean).join(' ')} />
  );
}
