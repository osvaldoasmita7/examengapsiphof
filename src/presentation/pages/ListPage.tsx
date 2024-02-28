import { useCallback, useEffect, useState } from "react";
import { CardGapsi } from "../components/CardGapsi";
import { iProvider } from "../../interfaces/Providers";
import { deleteProvidersUseCase } from "../../core";
import Swal from "sweetalert2";
import { DataTableProvider } from "../components/DataTable";
import { SpinerReact } from "../components/spinners/spinerReact";
import { columns } from "../constants";
import { useProvider } from "../../core/hooks/useProvider";

export const ListPage = () => {
  const { getProviders } = useProvider();
  const [providers, setProviders] = useState<iProvider[]>([]);
  const [loading, setLoading] = useState(false);

  const getDataProviders = useCallback(async () => {
    setLoading(true);
    setProviders(await getProviders());
    setLoading(false);
  }, [getProviders]);

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
      if (result.isConfirmed) {
        setLoading(true);
        const { ok, message } = await deleteProvidersUseCase(id);
        Swal.fire({
          title: ok ? "¡Eliminado!" : "Ocurrió un problema",
          text: message,
          icon: ok ? "success" : "error",
        });
        setLoading(false);

        await getDataProviders();
      }
    });
  };

  useEffect(() => {
    getDataProviders();
  }, [getDataProviders]);

  return (
    <>
      <CardGapsi titlePage="e-Commerce Gapsi" title="Lista de proveedores">
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
