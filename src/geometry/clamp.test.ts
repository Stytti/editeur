import {describe, expect, it} from "vitest";
import {clamp} from "./clamp.ts";

describe("clamp", () => {
  it("laisse passer une valeur dans l'intervalle", () => {
    expect(clamp(50, 0, 100)).toBe(50);
  });

  it("ramène une valeur trop petite au minimum, trop grande au maximum", () => {
    expect(clamp(-10, 0, 100)).toBe(0);
    expect(clamp(130, 0, 100)).toBe(100);
  });
});
