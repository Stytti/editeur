export type BaseProps = {
    label: string;
    error?: string | null;   // optionnel : la plupart des champs n'ont pas d'erreur possible
};

export type TextFieldProps = BaseProps & {
    fieldType: 'input';
    value: string;
    onChange: (value: string) => void;
};

export type SelectFieldProps = BaseProps & {
    fieldType: 'select';
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
};

export type TextAreaFieldProps = BaseProps & {
    fieldType: 'textarea';
    value: string;
    onChange: (value: string) => void;
    rows?: number;
};

export type NumberFieldProps = BaseProps & {
    fieldType: 'number';
    value: number;
    onChange: (value: number) => void;
    step?: number;
    min?: number;
    max?: number;
    disabled?: boolean;
};

export type RangeFieldProps = BaseProps & {
    fieldType: 'range';
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step?: number;
    disabled?: boolean;
};

export type ColorFieldProps = BaseProps & {
    fieldType: 'color';
    value: string;
    onChange: (value: string) => void;
};

export type CheckboxFieldProps = BaseProps & {
    fieldType: 'checkbox';
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export type FieldProps = TextFieldProps | TextAreaFieldProps | NumberFieldProps | RangeFieldProps | SelectFieldProps | ColorFieldProps | CheckboxFieldProps;