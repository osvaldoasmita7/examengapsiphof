import { ChangeEventHandler } from "react";

interface Props {
  value: string;
  name: string;
  placeholder: string;
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  required?: boolean;
}
export const Input = ({
  id,
  value,
  name,
  placeholder,
  onChange,
  label,
  required,
}: Props) => {
  return (
    <div className="mt-3">
      <label>{label}</label>

      <input
        onChange={onChange}
        className="form-control"
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};
