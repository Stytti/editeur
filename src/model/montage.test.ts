import {describe, expect, it} from "vitest";
import {parseMontage} from "./montage.ts";
import sample from "./sample.json";

describe("parseMontage", () => {
  it("accepte le JSON de l'énoncé, sans rien changer", () => {
    expect(parseMontage(JSON.stringify(sample))).toEqual(sample);
  });

  it("refuse un texte qui n'est pas du JSON", () => {
    expect(() => parseMontage("{ pas du json")).toThrow("syntaxe");
  });

  it("refuse un objet vide", () => {
    expect(() => parseMontage("{}")).toThrow("Montage invalide");
  });

  it("refuse titles qui n'est pas un tableau", () => {
    expect(() => parseMontage('{ "duration": 2, "titles": "test" }')).toThrow("titles");
  });
});
