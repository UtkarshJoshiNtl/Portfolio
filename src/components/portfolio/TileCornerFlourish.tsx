const cornerPath = "M0 0 L12 0 Q12 12 0 12 Z";

export function TileCornerFlourish() {
  return (
    <>
      <svg className="ornament-corner ornament-corner-tl" viewBox="0 0 12 12" aria-hidden="true">
        <path d={cornerPath} fill="none" stroke="currentColor" strokeWidth="0.8" />
      </svg>
      <svg className="ornament-corner ornament-corner-tr" viewBox="0 0 12 12" aria-hidden="true">
        <path d={cornerPath} fill="none" stroke="currentColor" strokeWidth="0.8" />
      </svg>
      <svg className="ornament-corner ornament-corner-bl" viewBox="0 0 12 12" aria-hidden="true">
        <path d={cornerPath} fill="none" stroke="currentColor" strokeWidth="0.8" />
      </svg>
      <svg className="ornament-corner ornament-corner-br" viewBox="0 0 12 12" aria-hidden="true">
        <path d={cornerPath} fill="none" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    </>
  );
}
