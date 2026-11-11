import {describe, expect, it} from "vitest";
import {validateTitle} from "./validation.ts";
import {createNewTitle} from "./createTitle.ts";

const DURATION = 30;

describe("validateTitle", () => {
  it("ne trouve aucune erreur sur le titre par défaut", () => {
    expect(validateTitle(createNewTitle(), DURATION)).toEqual({});
  });

  it("signale un début après la fin, et une fin après la durée", () => {
    const errors = validateTitle({...createNewTitle(), startTime: 10, endTime: 40}, DURATION);
    expect(errors.endTime).toBeDefined();

    const reversed = validateTitle({...createNewTitle(), startTime: 6, endTime: 4}, DURATION);
    expect(reversed.startTime).toBeDefined();
  });

  it("signale un titre qui sort du cadre", () => {
    const errors = validateTitle({...createNewTitle(), x: 50, width: 60}, DURATION);
    expect(errors.x).toBeDefined();
  });
});
