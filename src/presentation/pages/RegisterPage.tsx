import { useNavigate } from "react-router-dom";
import { createProvidersUseCase } from "../../core";
import { iProvider } from "../../interfaces/Providers";
import { CardGapsi } from "../components/CardGapsi";
import { Input } from "../components/Input";
import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";
const INITIAL_STATE = {
  name: "",
  bussinessName: "",
  address: "",
};
export const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<iProvider>(INITIAL_STATE);
  const { name, bussinessName, address } = form;
  const handleChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendData(form);
  };
  const sendData = async (form: iProvider) => {
    const response = await createProvidersUseCase(form);
    Swal.fire({
      text: "",
      title: response.message,
      icon: response.ok ? "success" : "error",
    });
    if (response.ok) {
      setForm(INITIAL_STATE);
      navigate("/providers");
    }
  };

  return (
    <div className="mt-5">
      <CardGapsi titlePage="e-Commerce Gapsi" title="Registro de proveedores">
        <form className="col-12 px-4" onSubmit={onSubmit}>
          <Input
            onChange={handleChangeForm}
            id="name"
            name="name"
            value={name}
            placeholder=""
            required={true}
            label="Nombre del proveedor*"
          ></Input>
          <Input
            onChange={handleChangeForm}
            id="bussinessName"
            name="bussinessName"
            value={bussinessName}
            placeholder=""
            required={true}
            label="Razón social*"
          ></Input>
          <Input
            onChange={handleChangeForm}
            id="address"
            name="address"
            value={address}
            placeholder=""
            required={true}
            label="Dirección*"
          ></Input>
          <div className="row">
            <button className="btn btn-primary col-12 col-md-4 mx-auto text-center mt-4 py-2">
              Guardar
            </button>
          </div>
        </form>
      </CardGapsi>
    </div>
  );
};
