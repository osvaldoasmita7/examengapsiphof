import { useNavigate } from "react-router-dom";
import { createProvidersUseCase } from "../../core";
import { iProvider } from "../../interfaces/Providers";
import { CardGapsi } from "../components/CardGapsi";
import { Input } from "../components/inputs/Input";
import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";
import { SpinerReact } from "../components/spinners/spinerReact";
const INITIAL_STATE = {
  name: "",
  bussinessName: "",
  address: "",
};
export const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<iProvider>(INITIAL_STATE);
  const { name, bussinessName, address } = form;
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendData(form);
  };

  const sendData = async (form: iProvider) => {
    setLoading(true);
    const response = await createProvidersUseCase(form);
    Swal.fire({
      text: "",
      title: response.message,
      icon: response.ok ? "success" : "error",
    });
    setLoading(false);
    if (response.ok) {
      setForm(INITIAL_STATE);
      navigate("/providers");
    }
  };

  return (
    <div className="mt-5">
      <CardGapsi titlePage="e-Commerce Gapsi" title="Registro de proveedores">
        {loading ? (
          <SpinerReact />
        ) : (
          <form className="col-12 col-lg-8 mx-auto px-4" onSubmit={onSubmit}>
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
              <button className="custom-btn btn-3 mx-auto text-center mt-4 ">
                <span>Guardar</span>
              </button>
            </div>
          </form>
        )}
      </CardGapsi>
    </div>
  );
};
