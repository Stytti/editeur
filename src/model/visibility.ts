import type {TitleItem} from "./montageSchema.ts";

export function shouldDisplayTitle(title: TitleItem, currentTime: number): boolean {
  return title.startTime <= currentTime && title.endTime >= currentTime;
}