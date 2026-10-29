import type {TitleItem} from "../../types/TitleItem.tsx";
import {Field} from "../../components/fields/Field/Field.tsx";
import {Button} from "../../components/Button/Button.tsx";

const FONTS = [
    { key: "snowball", value: "Snowball" },
    { key: "archivo-black", value: "Archivo Black" },
    { key: "montserrat", value: "Montserrat" },
    { key: "poppins", value: "Poppins" },
    { key: "inter", value: "Inter" },
    { key: "bebas-neue", value: "Bebas Neue" },
    { key: "anton", value: "Anton" },
    { key: "oswald", value: "Oswald" },
    { key: "space-grotesk", value: "Space Grotesk" },
    { key: "barlow-condensed", value: "Barlow Condensed" },
];

interface PropertiesPanelProps {
    titleItem: TitleItem;
    onFieldChange: (updatedTitleItem: TitleItem) => void;
}

export function PropertiesPanel({titleItem, onFieldChange}: PropertiesPanelProps) {
    function updateField<K extends keyof TitleItem>(key: K, value: TitleItem[K]) {
        onFieldChange({...titleItem, [key]: value});
    }

    return (
        <aside className="panel">
            <h2 className="panel-heading">Propriétés {titleItem ? `· ${titleItem.id}` : ''}</h2>

            {/* Texte */}
            <section className="panel-section">
                <Field label='Texte' fieldType='textarea' rows={2} value={titleItem.text}
                       onChange={(value: string) => updateField('text', value)} />

                <div className="field-row field-row--with-size">
                    <Field label="Police" fieldType='select' value={titleItem.fontId} options={FONTS}
                           onChange={(value: string) => updateField('fontId', value)} />
                    <Field label="Taille %" fieldType="number" value={titleItem.fontSize} min={0.5}
                            onChange={(value: number) => updateField('fontSize', value)} />
                </div>

                <div className="field">
                    <span className="field__label">Alignement</span>
                    <div className="segmented" role="group" aria-label="Alignement">
                        {(["left", "center", "right"] as const).map((a) => (
                            <Button key={a} className="segmented__item" aria-pressed={titleItem.align === a}
                                    text={a === "left" ? "Gauche" : a === "center" ? "Centre" : "Droite"}
                                    onButtonClick={() => updateField('align', a)} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Couleurs */}
            <section className="panel-section">
                <h3 className="panel-section__title">Couleurs</h3>
                <div className="field-row">
                    {/*<ColorField label="Texte" value={title.color} onChange={(v) => onChange({ color: v })} />*/}
                    {/*<ColorField label="Contour" value={title.strokeColor} onChange={(v) => onChange({ strokeColor: v })} />*/}
                </div>
                <div className="field-row">
                    {/*<NumberField label="Épaisseur contour %" value={title.strokeWidth} min={0} onChange={(v) => onChange({ strokeWidth: v })} />*/}
                    {/*<NumberField label="Glow %" value={title.shinyWidth} min={0} onChange={(v) => onChange({ shinyWidth: v })} />*/}
                </div>

                <div className="field">
                    <label className="checkbox">
                        {/*<input*/}
                        {/*    type="checkbox"*/}
                        {/*    checked={title.backgroundColor !== null}*/}
                        {/*    onChange={(e) => onChange({ backgroundColor: e.target.checked ? "#000000" : null })}*/}
                        {/*/>*/}
                        <span>Fond derrière le texte</span>
                    </label>
            {/*        {title.backgroundColor !== null && (*/}
            {/*            <span className="color-input">*/}
            {/*  <input type="color" value={title.backgroundColor} onChange={(e) => onChange({ backgroundColor: e.target.value.toUpperCase() })} />*/}
            {/*  <input className="input mono" type="text" value={title.backgroundColor} onChange={(e) => onChange({ backgroundColor: e.target.value })} />*/}
            {/*</span>*/}
            {/*        )}*/}
                </div>
            </section>

            {/* Timing */}
            <section className="panel-section">
                <h3 className="panel-section__title">Timing</h3>
                <div className="field-row">
                    {/*<NumberField label="Début (s)" value={title.startTime} min={0} onChange={(v) => onChange({ startTime: v })} />*/}
                    {/*<NumberField label="Fin (s)" value={title.endTime} min={0} onChange={(v) => onChange({ endTime: v })} />*/}
                </div>
            </section>

            {/* Effet et animation */}
            <section className="panel-section">
                <h3 className="panel-section__title">Effet et animation</h3>

                <div className="field-row">
                    {/*<Field label="Effet">*/}
                    {/*    <select*/}
                    {/*        className="select"*/}
                    {/*        value={title.effect?.type ?? ""}*/}
                    {/*        onChange={(e) => {*/}
                    {/*            const type = e.target.value as EffectType | "";*/}
                    {/*            onChange({ effect: type ? { type, strength: title.effect?.strength ?? 0.5 } : null });*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        <option value="">Aucun</option>*/}
                    {/*        <option value="zoomPunch">zoomPunch</option>*/}
                    {/*        <option value="shake">shake</option>*/}
                    {/*        <option value="pulse">pulse</option>*/}
                    {/*    </select>*/}
                    {/*</Field>*/}
                    {/*<Field label={`Force · ${(title.effect?.strength ?? 0).toFixed(2)}`}>*/}
                    {/*    <input*/}
                    {/*        type="range" min={0} max={1} step={0.05}*/}
                    {/*        disabled={!title.effect}*/}
                    {/*        value={title.effect?.strength ?? 0}*/}
                    {/*        onChange={(e) => title.effect && onChange({ effect: { ...title.effect, strength: e.target.valueAsNumber } })}*/}
                    {/*    />*/}
                    {/*</Field>*/}
                </div>

                <div className="field-row field-row--with-unit">
                    {/*<Field label="Entrée">*/}
                    {/*    <select*/}
                    {/*        className="select"*/}
                    {/*        value={anim.entrance?.type ?? ""}*/}
                    {/*        onChange={(e) => {*/}
                    {/*            const type = e.target.value as EntranceType | "";*/}
                    {/*            setAnim({ entrance: type ? { type, durationMs: anim.entrance?.durationMs ?? 500 } : null });*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        <option value="">Aucune</option>*/}
                    {/*        <option value="fade">fade</option>*/}
                    {/*        <option value="typewriter">typewriter</option>*/}
                    {/*        <option value="bounce">bounce</option>*/}
                    {/*        <option value="slide">slide</option>*/}
                    {/*    </select>*/}
                    {/*</Field>*/}
                    {/*<NumberField*/}
                    {/*    label="ms" step={50} min={0}*/}
                    {/*    value={anim.entrance?.durationMs ?? 0}*/}
                    {/*    onChange={(v) => anim.entrance && setAnim({ entrance: { ...anim.entrance, durationMs: v } })}*/}
                    {/*/>*/}
                </div>

                <div className="field-row field-row--with-unit">
                    {/*<Field label="Sortie">*/}
                    {/*    <select*/}
                    {/*        className="select"*/}
                    {/*        value={anim.exit?.type ?? ""}*/}
                    {/*        onChange={(e) => {*/}
                    {/*            const type = e.target.value as ExitType | "";*/}
                    {/*            setAnim({ exit: type ? { type, durationMs: anim.exit?.durationMs ?? 400 } : null });*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        <option value="">Aucune</option>*/}
                    {/*        <option value="fade">fade</option>*/}
                    {/*        <option value="slideRight">slideRight</option>*/}
                    {/*        <option value="slideDown">slideDown</option>*/}
                    {/*    </select>*/}
                    {/*</Field>*/}
                    {/*<NumberField*/}
                    {/*    label="ms" step={50} min={0}*/}
                    {/*    value={anim.exit?.durationMs ?? 0}*/}
                    {/*    onChange={(v) => anim.exit && setAnim({ exit: { ...anim.exit, durationMs: v } })}*/}
                    {/*/>*/}
                </div>

                <label className="checkbox">
                    {/*<input type="checkbox" checked={anim.ghost} onChange={(e) => setAnim({ ghost: e.target.checked })} />*/}
                    <span>Ghost (flottement continu)</span>
                </label>
            </section>
        </aside>
    );
}