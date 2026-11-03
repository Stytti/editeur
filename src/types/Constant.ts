import type {TitleItem} from "./TitleItem.ts";

export const PREMIERE_VIDEO_ID = "152174-802335605";
export const DEUXIEME_VIDEO_ID = "360429_medium";
export const TROISIEME_VIDEO_ID = "384550";

export const EXPORT_FRAME = { width: 1080, height: 1920 };

export const FONTS = [
  { value: "snowball", label: "Snowball" },
  { value: "archivo-black", label: "Archivo Black" },
  { value: "montserrat", label: "Montserrat" },
  { value: "poppins", label: "Poppins" },
  { value: "inter", label: "Inter" },
  { value: "bebas-neue", label: "Bebas Neue" },
  { value: "anton", label: "Anton" },
  { value: "oswald", label: "Oswald" },
  { value: "space-grotesk", label: "Space Grotesk" },
  { value: "barlow-condensed", label: "Barlow Condensed" },
];

export const FIRST_TITLE: TitleItem = {
  id: "title-1",
  text: "mon ame",
  startTime: 0,
  endTime: 8,
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
}