import {
    ALIGN, EFFECT_TYPES, ENTRANCE_TYPES, EXIT_TYPES,
    type Animation, type TitleItem
} from "../../types/TitleItem.ts";
import {Field} from "../../components/Field/Field.tsx";
import {Button} from "../../components/Button/Button.tsx";
import './PropertiesPanel.css';
import {FONTS} from "../../types/Constant.ts";
import {pctToPixel, pixelToPct} from "../../geometry/percent.ts";

const ALIGN_LABELS = { left: "Gauche", center: "Centre", right: "Droite" };

// "" = aucune valeur (le modèle stocke alors null)
const EFFECT_OPTIONS = [{ value: "", label: "Aucun" }, ...EFFECT_TYPES.map((type) => ({ value: type, label: type }))];
const ENTRANCE_OPTIONS = [{ value: "", label: "Aucune" }, ...ENTRANCE_TYPES.map((type) => ({ value: type, label: type }))];
const EXIT_OPTIONS = [{ value: "", label: "Aucune" }, ...EXIT_TYPES.map((type) => ({ value: type, label: type }))];

const DEFAULT_STRENGTH = 0.5;
const DEFAULT_ENTRANCE_MS = 500;
const DEFAULT_EXIT_MS = 400;
const EMPTY_ANIMATION: Animation = { in: null, out: null, ghost: false };

interface PropertiesPanelProps {
    titleItem: TitleItem;
    onFieldChange: (updatedTitleItem: TitleItem) => void;
}

export function PropertiesPanel({titleItem, onFieldChange}: PropertiesPanelProps) {
    const animation = titleItem.animation ?? EMPTY_ANIMATION;

    function updateField<K extends keyof TitleItem>(key: K, value: TitleItem[K]) {
        onFieldChange({...titleItem, [key]: value});
    }

    // Modifie une partie de l'animation. Si plus rien n'est actif, on remet null
    // pour que le JSON exporté reste identique à celui importé ("animation": null).
    function updateAnimation(patch: Partial<Animation>) {
        const next = {...animation, ...patch};
        const isEmpty = next.in === null && next.out === null && !next.ghost;
        updateField('animation', isEmpty ? null : next);
    }

    function handleEffectTypeChange(value: string) {
        // find() renvoie l'élément typé EffectType
        const type = EFFECT_TYPES.find((effectType) => effectType === value);
        updateField('effect', type ? { type, strength: titleItem.effect?.strength ?? DEFAULT_STRENGTH } : null);
    }

    function handleEntranceTypeChange(value: string) {
        const type = ENTRANCE_TYPES.find((entranceType) => entranceType === value);
        updateAnimation({ in: type ? { type, durationMs: animation.in?.durationMs ?? DEFAULT_ENTRANCE_MS } : null });
    }

    function handleExitTypeChange(value: string) {
        const type = EXIT_TYPES.find((exitType) => exitType === value);
        updateAnimation({ out: type ? { type, durationMs: animation.out?.durationMs ?? DEFAULT_EXIT_MS } : null });
    }

    return (
        <div>
            <h2 className="panel-heading">Propriétés · {titleItem.id}</h2>

            {/* Texte */}
            <section className="mt-3 panel-section">
                <Field label='Texte' fieldType='textarea' rows={2} value={titleItem.text}
                       onChange={(value: string) => updateField('text', value)} />

                <div className="field-row field-row--with-size">
                    <Field label="Police" fieldType='select' value={titleItem.fontId} options={FONTS}
                           onChange={(value: string) => updateField('fontId', value)} />
                    <Field label="Taille en px" fieldType="number" value={Math.round(pctToPixel(titleItem.fontSize))} min={1} step={1}
                            onChange={(value: number) => updateField('fontSize', pixelToPct(value))} />
                </div>

                <div className="field">
                    <span className="field__label">Alignement</span>
                    <div className="segmented" role="group" aria-label="Alignement">
                        {ALIGN.map((a) => (
                            <Button key={a} className="segmented__item" aria-pressed={titleItem.align === a}
                                    text={ALIGN_LABELS[a]}
                                    onButtonClick={() => updateField('align', a)} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Couleurs */}
            <section className="panel-section">
                <h3 className="panel-section__title">Couleurs</h3>
                <div className="field-row">
                    <Field label="Texte" fieldType="color" value={titleItem.color} onChange={(value) => updateField('color', value)} />
                    <Field label="Contour" fieldType="color" value={titleItem.strokeColor} onChange={(value) => updateField('strokeColor', value)} />
                </div>
                <div className="field-row">
                    <Field label="Épaisseur contour %" fieldType="number" value={titleItem.strokeWidth} min={0} step={0.1}
                           onChange={(value) => updateField('strokeWidth', value)} />
                    <Field label="Glow %" fieldType="number" value={titleItem.shinyWidth} min={0} step={0.1}
                           onChange={(value) => updateField('shinyWidth', value)} />
                </div>

                <Field fieldType="checkbox" label="Fond derrière le texte" checked={titleItem.backgroundColor !== null}
                       onChange={(checked) => updateField('backgroundColor', checked ? "#000000" : null)} />
                {titleItem.backgroundColor !== null && (
                    <Field label="Couleur du fond" fieldType="color" value={titleItem.backgroundColor}
                           onChange={(value) => updateField('backgroundColor', value)} />
                )}
            </section>

            {/* Timing : on garde toujours startTime ≤ endTime */}
            <section className="panel-section">
                <h3 className="panel-section__title">Timing</h3>
                <div className="field-row">
                    <Field label="Début (s)" fieldType="number" value={titleItem.startTime} min={0} max={titleItem.endTime} step={0.1}
                           onChange={(value) => updateField('startTime', Math.min(Math.max(0, value), titleItem.endTime))} />
                    <Field label="Fin (s)" fieldType="number" value={titleItem.endTime} min={titleItem.startTime} step={0.1}
                           onChange={(value) => updateField('endTime', Math.max(value, titleItem.startTime))} />
                </div>
            </section>

            {/* Effet et animation */}
            <section className="panel-section">
                <h3 className="panel-section__title">Effet et animation</h3>

                <div className="field-row">
                    <Field label="Effet" fieldType="select" value={titleItem.effect?.type ?? ""} options={EFFECT_OPTIONS}
                           onChange={handleEffectTypeChange} />
                    <Field label={`Force · ${(titleItem.effect?.strength ?? 0).toFixed(2)}`} fieldType="range"
                           min={0} max={1} step={0.05} value={titleItem.effect?.strength ?? 0}
                           disabled={titleItem.effect === null}
                           onChange={(value) => titleItem.effect && updateField('effect', {...titleItem.effect, strength: value})} />
                </div>

                <div className="field-row field-row--with-unit">
                    <Field label="Entrée" fieldType="select" value={animation.in?.type ?? ""} options={ENTRANCE_OPTIONS}
                           onChange={handleEntranceTypeChange} />
                    <Field label="ms" fieldType="number" min={0} step={50} value={animation.in?.durationMs ?? 0}
                           disabled={animation.in === null}
                           onChange={(value) => animation.in && updateAnimation({ in: {...animation.in, durationMs: value} })} />
                </div>

                <div className="field-row field-row--with-unit">
                    <Field label="Sortie" fieldType="select" value={animation.out?.type ?? ""} options={EXIT_OPTIONS}
                           onChange={handleExitTypeChange} />
                    <Field label="ms" fieldType="number" min={0} step={50} value={animation.out?.durationMs ?? 0}
                           disabled={animation.out === null}
                           onChange={(value) => animation.out && updateAnimation({ out: {...animation.out, durationMs: value} })} />
                </div>

                <Field fieldType="checkbox" label="Ghost (flottement continu)" checked={animation.ghost}
                       onChange={(checked) => updateAnimation({ ghost: checked })} />
            </section>
        </div>
    );
}
