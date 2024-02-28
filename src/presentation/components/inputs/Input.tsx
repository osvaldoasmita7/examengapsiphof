import { ChangeEventHandler } from "react";
import "./index.css";
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
    <div className="my-3">
      <div className="omrs-input-group w-100">
        <label className="omrs-input-underlined col-12">
          <input
            required={required}
            onChange={onChange}
            id={id}
            name={name}
            value={value}
          />
          <span className="omrs-input-label">{label}</span>
          <span className="omrs-input-helper">{placeholder}</span>
        </label>
      </div>
    </div>
  );
};
