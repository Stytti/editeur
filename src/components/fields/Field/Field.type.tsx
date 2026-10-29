export type BaseProps = {
    label: string;
};

export type TextFieldProps = BaseProps & {
    fieldType: 'input';
    value: string;
    onChange?: (value: string) => void;
};

export type SelectFieldProps = BaseProps & {
    fieldType: 'select';
    value: string;
    options: { key: string; value: string }[];
    onChange?: (value: string) => void;
};

export type TextAreaFieldProps = BaseProps & {
    fieldType: 'textarea';
    value: string;
    rows?: number;
    onChange?: (value: string) => void;
};

export type NumberFieldProps = BaseProps & {
    fieldType: 'number';
    value: number;
    step?: number;
    min?: number;
    max?: number;
    onChange?: (value: number) => void;
};

export type FieldProps = TextFieldProps | TextAreaFieldProps | NumberFieldProps | SelectFieldProps;