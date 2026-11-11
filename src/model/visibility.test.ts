import {describe, expect, it} from "vitest";
import {shouldDisplayTitle} from "./visibility.ts";
import {createNewTitle} from "./createTitle.ts";

// Titre visible de 2 s à 5 s
const title = {...createNewTitle(), startTime: 2, endTime: 5};

describe("shouldDisplayTitle", () => {
  it("affiche le titre entre startTime et endTime", () => {
    expect(shouldDisplayTitle(title, 3.5)).toBe(true);
  });

  it("inclut les deux bornes", () => {
    expect(shouldDisplayTitle(title, 2)).toBe(true);
    expect(shouldDisplayTitle(title, 5)).toBe(true);
  });

  it("cache le titre avant et après", () => {
    expect(shouldDisplayTitle(title, 1.99)).toBe(false);
    expect(shouldDisplayTitle(title, 5.01)).toBe(false);
  });
});
