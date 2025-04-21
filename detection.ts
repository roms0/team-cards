export const detect = (
  e: MouseEvent,
  cx: CanvasRenderingContext2D,
  rect: DOMRect,
  SPACING: number,
  RADIUS: number
) => {
  const width = e.x - rect.x;
  const height = e.y - rect.y - SPACING;
  const MIN_ROW = Math.floor(height / SPACING) + 1;
  const MAX_ROW = Math.ceil(height / SPACING) + 1;
  const ROW = height % SPACING > SPACING / 2 ? MAX_ROW : MIN_ROW;

  const OFFSET = ROW % 2 === 0 ? SPACING / 2 : 0;

  const MIN_COL = Math.floor(width / SPACING);
  const MAX_COL = Math.ceil(width / SPACING);
  const COL = (width % SPACING) - OFFSET > SPACING / 2 ? MAX_COL : MIN_COL;

  const id = COL * SPACING + "" + OFFSET + "" + ROW * SPACING;

  cx.clearRect(
    COL * SPACING + OFFSET - RADIUS,
    ROW * SPACING - RADIUS,
    RADIUS * 2,
    RADIUS * 2
  );
  cx.beginPath();
  cx.fillStyle = `rgb(
      ${Math.floor(255 * Math.random())}
      ${Math.floor(255 * Math.random())}
      ${Math.floor(255 * Math.random())})`;
  cx.arc(COL * SPACING + OFFSET, ROW * SPACING, RADIUS * 4, 0, Math.PI * 2);
  cx.fill();
};
