import { ChangeEvent, FormEvent, useState } from "react";
import { iProvider } from "../../interfaces";
// Estado inicial
const INITIAL_STATE = {
  name: "",
  bussinessName: "",
  address: "",
};

export const useForm = (sendData: (form: iProvider) => Promise<void>) => {
  // Manejo de loader
  const [loading, setLoading] = useState<boolean>(false);
  // Estado de formulario
  const [form, setForm] = useState<iProvider>(INITIAL_STATE);
  /**
   * Función que maneja los cambios en el formulario
   */
  const handleChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
    // Seteamos los valores cambiados del formulario
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  /**
   * Función onSubmit del formulario
   */
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Previene del reload
    event.preventDefault();
    // Enviamos a guardar los datos del form
    await sendData(form);
  };
  const clearState = () => {
    setForm(INITIAL_STATE);
  };
  return {
    handleChangeForm,
    onSubmit,
    loading,
    setLoading,
    form,
    setForm,
    clearState,
  };
};
