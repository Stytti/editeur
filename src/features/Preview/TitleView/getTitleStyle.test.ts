import {describe, expect, it} from "vitest";
import {getFontFamily, getTextStyle, getTitleStyle} from "./getTitleStyle.ts";
import {createNewTitle} from "../../../model/createTitle.ts";

describe("getTitleStyle", () => {
  it("met la position et la taille en % de la frame, la police en cqh", () => {
    const style = getTitleStyle({...createNewTitle(), x: 10, y: 40, width: 80, height: 16, fontSize: 4.4});
    expect(style).toMatchObject({left: "10%", top: "40%", width: "80%", height: "16%", fontSize: "4.4cqh"});
  });

  it("n'ajoute ni contour, ni glow, ni fond quand ils valent 0 / null", () => {
    const style = getTitleStyle({...createNewTitle(), strokeWidth: 0, shinyWidth: 0, backgroundColor: null});
    expect(style.WebkitTextStroke).toBeUndefined();
    expect(style.textShadow).toBe("none");
    expect(style.backgroundColor).toBe("transparent");
  });

  it("combine contour, glow (couleur du contour) et fond arrondi", () => {
    const style = getTitleStyle({
      ...createNewTitle(), strokeWidth: 0.5, shinyWidth: 2, strokeColor: "#ff0000", backgroundColor: "#000000"
    });
    expect(style.WebkitTextStroke).toBe("0.5cqh #ff0000"); // strokeWidth = épaisseur du trait CSS, sans conversion
    expect(style.textShadow).toContain("0 0 2cqh #ff0000");
    expect(style.backgroundColor).toBe("#000000");
    expect(style.borderRadius).toBeDefined();
  });
});

describe("getTextStyle", () => {
  it("réserve en haut et en bas la moitié du contour qui dépasse des lettres", () => {
    expect(getTextStyle({...createNewTitle(), strokeWidth: 2}).paddingBlock).toBe("1cqh");
    expect(getTextStyle({...createNewTitle(), strokeWidth: 0}).paddingBlock).toBe("0cqh");
  });
});

describe("getFontFamily", () => {
  it("utilise le nom Google Fonts avec un repli", () => {
    expect(getFontFamily("bebas-neue")).toBe('"Bebas Neue", sans-serif');
  });

  it("garde un fontId inconnu tel quel, avec le repli", () => {
    expect(getFontFamily("ma-police")).toBe('"ma-police", sans-serif');
  });
});
