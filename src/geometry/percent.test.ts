import {describe, expect, it} from "vitest";
import {pctToPixel, pixelToPct} from "./percent.ts";
import {EXPORT_FRAME} from "../types/Constant.ts";

// Référence : la hauteur de la vidéo exportée (EXPORT_FRAME.height = 1920 px).
describe("pctToPixel", () => {
  it("convertit un % de la hauteur en px", () => {
    expect(pctToPixel(50, EXPORT_FRAME.height)).toBe(960);
    expect(pctToPixel(100, EXPORT_FRAME.height)).toBe(1920);
  });

  it("donne ~84 px pour le fontSize 4.4 du JSON fourni", () => {
    expect(pctToPixel(4.4, EXPORT_FRAME.height)).toBeCloseTo(84.48);
  });

  it("renvoie 0 pour 0 %", () => {
    expect(pctToPixel(0, EXPORT_FRAME.height)).toBe(0);
  });
});

describe("pixelToPct", () => {
  it("convertit des px en % de la hauteur", () => {
    expect(pixelToPct(960, EXPORT_FRAME.height)).toBe(50);
    expect(pixelToPct(1920, EXPORT_FRAME.height)).toBe(100);
  });

  it("renvoie 0 pour 0 px", () => {
    expect(pixelToPct(0, EXPORT_FRAME.height)).toBe(0);
  });
});

describe("conversion sur la largeur (x, width)", () => {
  it("utilise 1080 px comme référence", () => {
    expect(pctToPixel(50, EXPORT_FRAME.width)).toBe(540);
    expect(pixelToPct(108, EXPORT_FRAME.width)).toBe(10);
  });

  it("donne 864 px pour la largeur 80 % du JSON fourni", () => {
    expect(pctToPixel(80, EXPORT_FRAME.width)).toBe(864);
  });
});

describe("aller-retour % → px → %", () => {
  // C'est la garantie la plus importante : afficher en px puis reconvertir
  // ne doit pas modifier la valeur stockée dans le modèle.
  it.each([0, 4.4, 12.5, 33.333, 100])("redonne %s", (pct) => {
    expect(pixelToPct(pctToPixel(pct, EXPORT_FRAME.height), EXPORT_FRAME.height)).toBeCloseTo(pct, 10);
  });
});
