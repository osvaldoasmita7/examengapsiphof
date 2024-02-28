import { useCallback, useEffect, useState } from "react";
import { CardGapsi } from "../components/CardGapsi";
import { deleteProvidersUseCase } from "../../core";
import Swal from "sweetalert2";
import { DataTableProvider } from "../components/DataTable";
import { SpinerReact } from "../components/spinners/spinerReact";
import { columns } from "../constants";
import { useProvider } from "../../core/hooks/useProvider";

export const ListPage = () => {
  // Traemos la función de traer proveedores de nuestro hook
  const { getProviders, providers } = useProvider();

  // Cargando
  const [loading, setLoading] = useState(false);

  //Función que trae los proveedores
  const getDataProviders = useCallback(async () => {
    setLoading(true);
    await getProviders();
    setLoading(false);
  }, [getProviders]);

  // Función que confirma la eliminación del proveedor
  const confirmDeleteProvider = async (id: string) => {
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
      // si se confirma
      if (result.isConfirmed) {
        setLoading(true);
        // Eliminamos el proveedor
        const { ok, message } = await deleteProvidersUseCase(id);
        // Mandamos mensaje de lo que ocurrió al usuario
        Swal.fire({
          title: ok ? "¡Eliminado!" : "Ocurrió un problema",
          text: message,
          icon: ok ? "success" : "error",
        });
        setLoading(false);
        // Traemos nuevamente los proveedores
        await getDataProviders();
      }
    });
  };

  // Cuando el componente se monta se trae los proveedores
  useEffect(() => {
    getDataProviders();
  }, [getDataProviders]);

  return (
    <>
      <CardGapsi titlePage="e-Commerce Gapsi" title="Lista de proveedores">
        {/* Si está cargando muestra spinner si no, la tabla */}
        {loading ? (
          <SpinerReact></SpinerReact>
        ) : (
          <DataTableProvider
            providers={providers}
            columns={columns}
            deleteProvider={confirmDeleteProvider}
          />
        )}
      </CardGapsi>
    </>
  );
};
