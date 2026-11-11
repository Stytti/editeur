import {describe, expect, it} from "vitest";
import {describeInvalidTitles, parseMontage, serializeMontage} from "./montage.ts";
import sample from "./sample.json";
import type {Montage} from "./montageSchema.ts";
import {createNewTitle} from "./createTitle.ts";

describe("round-trip import → export", () => {
  it("l'exemple de l'énoncé ressort identique", () => {
    const exported = serializeMontage(parseMontage(JSON.stringify(sample)));
    expect(JSON.parse(exported)).toEqual(sample);
  });

  it("garde les null, fontId inconnu, effet et animation complets", () => {
    const montage: Montage = {
      duration: 12.5,
      titles: [
        {...createNewTitle(), id: "a", fontId: "snowball", backgroundColor: null, effect: null, animation: null},
        {
          ...createNewTitle(), id: "b", text: "Deux\nlignes", backgroundColor: "#112233",
          effect: {type: "shakeZoom", strength: 0.35},
          animation: {in: {type: "typewriter", durationMs: 800}, out: null, ghost: true},
        },
      ],
    };
    const back = parseMontage(serializeMontage(montage));
    expect(back).toEqual(montage);
    expect(back.titles[0].effect).toBeNull(); // null, pas undefined
    expect(back.titles[1].animation?.out).toBeNull();
  });

  it("export → import → export : même texte", () => {
    const once = serializeMontage(parseMontage(JSON.stringify(sample)));
    expect(serializeMontage(parseMontage(once))).toBe(once);
  });
});

describe("describeInvalidTitles", () => {
  it("null quand tout est valide", () => {
    expect(describeInvalidTitles(parseMontage(JSON.stringify(sample)))).toBeNull();
  });

  it("nomme le titre fautif", () => {
    const montage: Montage = {duration: 3, titles: [{...createNewTitle(), text: "Trop long", endTime: 10}]};
    expect(describeInvalidTitles(montage)).toContain("Trop long");
  });
});

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
