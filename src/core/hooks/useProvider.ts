import { getProvidersUseCase } from "..";
import { useCallback } from "react";

export const useProvider = () => {
  const getProviders = useCallback(async () => {
    const response = await getProvidersUseCase();
    return response.providers;
  }, []);

  return { getProviders };
};
