import { getProvidersUseCase } from "..";
import { useCallback, useState } from "react";
import { iProvider } from "../../interfaces";

export const useProvider = () => {
  // Variable para guardar los proveedores
  const [providers, setProviders] = useState<iProvider[]>([]);

  //   Obtiene los proveedores
  const getProviders = useCallback(async () => {
    // Se obtienen los proveedores del caso de uso
    const response = await getProvidersUseCase();
    // Se setean los proveedores
    setProviders(response.providers);
    // Retornamos los proveedores
    return response.providers;
  }, []);

  return { getProviders, providers };
};
