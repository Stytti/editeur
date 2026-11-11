import {describe, expect, it} from "vitest";
import {sampleTitle} from "./sampleTitle.ts";
import {compose, IDENTITY} from "./transform.ts";
import {easeOutBack} from "./animations.ts";
import {createNewTitle} from "../model/createTitle.ts";
import type {TitleItem} from "../model/montageSchema.ts";

// Titre visible de 2 s à 6 s
function titleWith(partial: Partial<TitleItem>): TitleItem {
  return {...createNewTitle(), text: "Bonjour", startTime: 2, endTime: 6, ...partial};
}

describe("compose", () => {
  it("multiplie scales et opacités, additionne les translations", () => {
    const a = {scale: 2, translateX: 1, translateY: 2, opacity: 0.5};
    const b = {scale: 1.5, translateX: 3, translateY: -1, opacity: 0.5};
    expect(compose(a, b)).toEqual({scale: 3, translateX: 4, translateY: 1, opacity: 0.25});
  });

  it("IDENTITY ne change rien", () => {
    const a = {scale: 2, translateX: 1, translateY: 2, opacity: 0.5};
    expect(compose(a, IDENTITY)).toEqual(a);
  });
});

describe("sampleTitle", () => {
  it("sans effet ni animation → identité, texte entier", () => {
    expect(sampleTitle(titleWith({}), 3)).toEqual({...IDENTITY, visibleChars: 7});
  });

  it("fade in : opacité à mi-parcours de l'entrée", () => {
    const title = titleWith({animation: {in: {type: "fade", durationMs: 1000}, out: null, ghost: false}});
    expect(sampleTitle(title, 2).opacity).toBe(0);
    expect(sampleTitle(title, 2.5).opacity).toBeCloseTo(0.5);
    expect(sampleTitle(title, 4).opacity).toBe(1);
  });

  it("fade out : opacité qui tombe à 0 à endTime", () => {
    const title = titleWith({animation: {in: null, out: {type: "fade", durationMs: 1000}, ghost: false}});
    expect(sampleTitle(title, 4).opacity).toBe(1);
    expect(sampleTitle(title, 5.5).opacity).toBeCloseTo(0.5);
    expect(sampleTitle(title, 6).opacity).toBe(0);
  });

  it("bounce : dépasse 1 puis revient à 1", () => {
    expect(easeOutBack(0)).toBeCloseTo(0);
    expect(easeOutBack(0.7)).toBeGreaterThan(1);
    expect(easeOutBack(1)).toBeCloseTo(1);
  });

  it("typewriter : nombre de lettres proportionnel au temps", () => {
    const title = titleWith({animation: {in: {type: "typewriter", durationMs: 1400}, out: null, ghost: false}});
    expect(sampleTitle(title, 2).visibleChars).toBe(0);
    expect(sampleTitle(title, 2.6).visibleChars).toBe(3); // 0,6 / 1,4 × 7 = 3
    expect(sampleTitle(title, 5).visibleChars).toBe(7);
  });

  it("zoomPunch : gros zoom au début qui retombe vers 1", () => {
    const title = titleWith({effect: {type: "zoomPunch", strength: 1}});
    expect(sampleTitle(title, 2).scale).toBeCloseTo(1.5);
    expect(sampleTitle(title, 4).scale).toBeCloseTo(1, 3);
  });

  it("strength = 0 → l'effet ne fait rien", () => {
    const title = titleWith({effect: {type: "shake", strength: 0}});
    expect(sampleTitle(title, 3.3)).toMatchObject(IDENTITY);
  });

  it("est déterministe : même t → même résultat (shake + ghost compris)", () => {
    const title = titleWith({
      effect: {type: "shakeZoom", strength: 0.8},
      animation: {in: {type: "bounce", durationMs: 500}, out: {type: "slideDown", durationMs: 500}, ghost: true},
    });
    expect(sampleTitle(title, 3.37)).toEqual(sampleTitle(title, 3.37));
    expect(sampleTitle(title, 5.81)).toEqual(sampleTitle(title, 5.81));
  });

  it("compose entrée + effet : fade in et pulse ensemble", () => {
    const title = titleWith({
      effect: {type: "pulse", strength: 1},
      animation: {in: {type: "fade", durationMs: 1000}, out: null, ghost: false},
    });
    const sample = sampleTitle(title, 2.125); // pulse à son max : sin(2π · 0,125 · 2) = 1
    expect(sample.opacity).toBeCloseTo(0.125);
    expect(sample.scale).toBeCloseTo(1.1);
  });
});
