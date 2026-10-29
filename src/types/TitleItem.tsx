export interface TitleItem {
  id: string;
  align: "left" | "center" | "right";
  animation: string | null;
  backgroundColor: string | null;
  color: string;
  effect: string | null;
  endTime: number;
  fontSize: number;
  fontId: string;
  height: number;
  startTime: number;
  shinyWidth: number;
  strokeColor: string;
  strokeWidth: number;
  text: string;
  width: number;
  x: number;
  y: number;
  zOrder: number;
}