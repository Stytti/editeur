import {describe, expect, it} from "vitest";
import {MIN_WIDTH_PCT, resizeBox} from "./resize.ts";

const box = {x: 10, width: 80}; // bord droit à 90 %

describe("resizeBox", () => {
  it("coin droit : élargit vers la droite, le bord gauche ne bouge pas", () => {
    expect(resizeBox(box, "se", 5)).toEqual({x: 10, width: 85});
    expect(resizeBox(box, "ne", -20)).toEqual({x: 10, width: 60});
  });

  it("coin gauche : le bord droit ne bouge pas", () => {
    expect(resizeBox(box, "nw", 10)).toEqual({x: 20, width: 70});
    expect(resizeBox(box, "sw", -5)).toEqual({x: 5, width: 85});
  });

  it("ne sort jamais du cadre", () => {
    expect(resizeBox(box, "se", 50)).toEqual({x: 10, width: 90});   // x + width = 100
    expect(resizeBox(box, "nw", -50)).toEqual({x: 0, width: 90});   // x = 0
  });

  it("ne descend pas sous la largeur minimale", () => {
    expect(resizeBox(box, "se", -100).width).toBe(MIN_WIDTH_PCT);
    expect(resizeBox(box, "nw", 100)).toEqual({x: 90 - MIN_WIDTH_PCT, width: MIN_WIDTH_PCT});
  });
});
