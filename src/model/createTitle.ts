import type {TitleItem} from "./montageSchema.ts";

export function createNewTitle(): TitleItem {
  return {
    id: `title-${Date.now()}`,
    text: "Nouveau titre",
    startTime: 0,
    endTime: 5,
    x: 10,
    y: 40,
    width: 80,
    height: 16,
    fontId: "snowball",
    fontSize: 4.4,
    color: "#ffffff",
    strokeColor: "#000000",
    strokeWidth: 2,
    shinyWidth: 0,
    backgroundColor: null,
    align: "center",
    effect: null,
    animation: null
  };
}