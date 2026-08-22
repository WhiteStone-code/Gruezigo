/**
 * Logo de GrüeziGo: una montaña de tres picos (los Alpes) enmarcada en una
 * insignia con degradado rojo-suizo → madera, y un edelweiss (flor alpina)
 * como acento en la cima — sin bandera, para que funcione como marca propia
 * en cualquier tamaño (incluido el favicon).
 */
export function GrueziGoLogo({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="GrüeziGo"
    >
      <defs>
        <linearGradient id="gg-badge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EF4136" />
          <stop offset="100%" stopColor="#A82016" />
        </linearGradient>
        <linearGradient id="gg-peaks" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F4F8FB" />
        </linearGradient>
      </defs>

      <rect x="2" y="2" width="60" height="60" rx="18" fill="url(#gg-badge)" />

      {/* Tres picos alpinos */}
      <path d="M10 42 L23 20 L31 32 L38 18 L54 42 Z" fill="url(#gg-peaks)" />
      {/* Nieve en la cima del pico central */}
      <path d="M38 18 L42 25 L38 24 L34 25 Z" fill="#FFBE24" />
      {/* Sombra suave en el pico izquierdo para dar volumen */}
      <path d="M23 20 L31 32 L26 32 L19 33 Z" fill="#C3D9E8" opacity="0.7" />

      {/* Edelweiss estilizado sobre la montaña */}
      <g transform="translate(32, 12)">
        <circle r="2.4" fill="#FFBE24" />
        {Array.from({ length: 6 }).map((_, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-5"
            rx="1.6"
            ry="3.4"
            fill="#FFFFFF"
            transform={`rotate(${i * 60})`}
          />
        ))}
      </g>
    </svg>
  )
}
