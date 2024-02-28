import { useNavigate } from "react-router-dom";
import { createProvidersUseCase } from "../../core";
import { iProvider } from "../../interfaces/Providers";
import { CardGapsi } from "../components/CardGapsi";
import { Input } from "../components/inputs/Input";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { SpinerReact } from "../components/spinners/spinerReact";
import { SendButton } from "../components/SendButton";
import { useForm } from "../../core/hooks/useForm";

export const RegisterPage = () => {
  // Manejo de navegación
  const navigate = useNavigate();
  /**
   * Función para enviar a guardar el proveedor
   */
  const sendData = async (form: iProvider) => {
    // Activamos el loader
    setLoading(true);
    // Mandamos a llamar al caso de uso que crea el proveedor mandando el proveedor
    const response = await createProvidersUseCase(form);
    // Mandamos mensaje al usuario de lo que ocurrió
    Swal.fire({
      text: "",
      title: response.message,
      icon: response.ok ? "success" : "error",
    });
    // Apagamos el loader
    setLoading(false);
    // Si la respuesta es correcta
    if (response.ok) {
      // Vaciamos el estado
      clearState();
      // Vamos a la pantalla de proveedores
      navigate("/providers");
    }
  };
  // Traemos nuestras variables y funciones del hook form
  const { handleChangeForm, onSubmit, clearState, form, setLoading, loading } =
    useForm(sendData);

  // Desestructuramos el form
  const { name, bussinessName, address } = form;

  // Cuando el componente se monta
  useEffect(() => {
    () => {
      // Cuando el componente se desmonta
      // Vaciamos el estado del formulario
      clearState();
    };
  }, [clearState]);

  return (
    <div className="mt-5">
      {/* Contenedor de gapsi */}
      <CardGapsi titlePage="e-Commerce Gapsi" title="Registro de proveedores">
        {/* Si está cargando muestra el spinner */}
        {loading ? (
          <SpinerReact />
        ) : (
          // Si no está cargando mostramos el form
          <form className="col-12 col-lg-8 mx-auto px-4" onSubmit={onSubmit}>
            {/* Input component */}
            <Input
              onChange={handleChangeForm}
              id="name"
              name="name"
              value={name}
              placeholder=""
              required={true}
              label="Nombre del proveedor*"
            ></Input>
            {/* Input component */}
            <Input
              onChange={handleChangeForm}
              id="bussinessName"
              name="bussinessName"
              value={bussinessName}
              placeholder=""
              required={true}
              label="Razón social*"
            ></Input>
            {/* Input component */}
            <Input
              onChange={handleChangeForm}
              id="address"
              name="address"
              value={address}
              placeholder=""
              required={true}
              label="Dirección*"
            ></Input>
            {/* Botón para enviar */}
            <SendButton />
          </form>
        )}
      </CardGapsi>
    </div>
  );
};
