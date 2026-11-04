import './Field.css';
import type {FieldProps} from "./Field.type.ts";

export function Field(props: FieldProps) {
    // La case à cocher a sa propre mise en page (case + libellé sur une ligne)
    if (props.fieldType === 'checkbox') {
        return (
            <label className="checkbox">
                <input type="checkbox" checked={props.checked}
                       onChange={(e) => props.onChange(e.target.checked)} />
                <span>{props.label}</span>
            </label>
        );
    }

    function renderControl() {
        switch (props.fieldType) {
            case 'textarea':
                return <textarea className="textarea" rows={props.rows} value={props.value}
                                 onChange={(e) => props.onChange?.(e.target.value)} />;
            case 'select':
                return <select className="select" value={props.value}
                               onChange={(e) => props.onChange?.(e.target.value)}>
                    {props.options?.map((option) =>
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>)
                    }
                </select>
            case 'number':
                return <input type="number" className="input" value={props.value} step={props.step} min={props.min} max={props.max}
                              disabled={props.disabled}
                              onChange={(e) => {
                                  const v = e.target.valueAsNumber;
                                  if (!Number.isNaN(v)) props.onChange?.(v);
                              }} />;
            case 'range':
                return <input type="range" value={props.value} step={props.step} min={props.min} max={props.max}
                              disabled={props.disabled}
                              onChange={(e) => props.onChange(e.target.valueAsNumber)} />;
            case 'color':
                return <span className="color-input">
                    <input type="color" value={props.value} onChange={(e) => props.onChange(e.target.value)} />
                    <input className="input mono" type="text" value={props.value} onChange={(e) => props.onChange(e.target.value)} />
                </span>
        }
    }

    return (
        <label className="field">
            <span className="field__label">{props.label}</span>
            {renderControl()}
        </label>
    )
}
