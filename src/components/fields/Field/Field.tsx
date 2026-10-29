import './Field.css';
import type {FieldProps} from "./Field.type.tsx";

export function Field(props: FieldProps) {
    function renderControl() {
        switch (props.fieldType) {
            case 'textarea':
                return <textarea className="textarea" rows={props.rows} value={props.value}
                                 onChange={(e) => props.onChange?.(e.target.value)} />;
            case 'select':
                return <select className="select" value={props.value}
                               onChange={(e) => props.onChange?.(e.target.value)}>
                    {props.options?.map((option) =>
                        <option key={option.key} value={option.key}>
                            {option.value}
                        </option>)
                    }
                </select>
            case 'number':
                return <input type="number" className="input" value={props.value} step={props.step} min={props.min} max={props.max}
                              onChange={(e) => {
                                  const v = e.target.valueAsNumber;
                                  if (!Number.isNaN(v)) props.onChange?.(v);
                              }} />;
        }
    }

    return (
        <label className="field">
            <span className="field__label">{props.label}</span>
            {renderControl()}
        </label>
    )
}