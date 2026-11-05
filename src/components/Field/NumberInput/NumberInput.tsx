import {type ChangeEvent, useState} from "react";

export function NumberInput({...props}) {
  const [draft, setDraft] = useState<string | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setDraft(text);
    if (typeof text === "number") {
      props.onChange?.(text);
    }
  };

  return (
    <input type="number" className="input" value={draft ?? props.value}
           step={props.step} min={props.min} max={props.max}
           disabled={props.disabled}
           onChange={onChange} onBlur={() => setDraft(null)}/>
  )
}