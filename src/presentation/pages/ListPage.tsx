import { useCallback, useEffect, useState } from "react";
import { CardGapsi } from "../components/CardGapsi";
import { iProvider } from "../../interfaces/Providers";
import { deleteProvidersUseCase, getProvidersUseCase } from "../../core";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export const ListPage = () => {
  const [providers, setProviders] = useState<iProvider[]>([]);
  const getData = useCallback(async () => {
    const response = await getProvidersUseCase();
    console.log("response", response);
    setProviders(response.providers);
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);

  const deleteProvider = async (id: string) => {
    Swal.fire({
      title: `¿Quieres eliminar el registro con el id ${id} ?`,
      text: "Si continuas no hay marcha atrás",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, dale!",
      cancelButtonText: "NO!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { ok, message } = await deleteProvidersUseCase(id);
        Swal.fire({
          title: ok ? "¡Eliminado!" : "Ocurrió un problema",
          text: message,
          icon: ok ? "success" : "error",
        });
        await getData();
      }
    });
  };
  return (
    <>
      <CardGapsi titlePage="e-Commerce Gapsi" title="Lista de proveedores">
        <ul>
          {!providers.length && (
            <h5 className="text-center">
              No hay proveedores registrados por el momento
            </h5>
          )}
          {providers.map(({ id, name, address, bussinessName }: iProvider) => (
            <>
              <li key={id} className="mb-2">
                <Link
                  to="#"
                  className="text-danger me-3"
                  onClick={() => deleteProvider(`${id}`)}
                >
                  <i className="fa-solid fa-trash"></i>
                </Link>
                {name} - {bussinessName || "Sin razón social"} -{" "}
                {address || "Sin dirección"}
              </li>
            </>
          ))}
        </ul>
      </CardGapsi>
    </>
  );
};
