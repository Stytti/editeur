import type {TitleItem} from "../types/TitleItem.ts";
import {FIRST_TITLE} from "../types/Constant.ts";

export class TitleService {

  getInitialTitles(): TitleItem[] {
    return [FIRST_TITLE];
  }

  createNewTitle(): TitleItem {
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
      color: "#FFE600",
      strokeColor: "#000000",
      strokeWidth: 2,
      shinyWidth: 0,
      backgroundColor: null,
      align: "center",
      effect: null,
      animation: null
    };
  }
}

export const titleService = new TitleService();