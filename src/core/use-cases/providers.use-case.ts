import {
  ProviderResponse,
  ProviderVersionResponse,
  StatusProviderResponse,
  iProvider,
} from "../../interfaces";

// Caso de uso para traer proveedores
export const getProvidersUseCase = async () => {
  try {
    // Se ejecuta la petición a backend
    const resp = await fetch(`${import.meta.env.VITE_API}/providers`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    // Se maneja la respuesta
    if (!resp.ok) throw new Error("No se pudo traer los proveedores");
    // Se tipea la respuesta
    const data = (await resp.json()) as ProviderResponse[];
    // Se retorna respuesta
    return { ok: true, providers: data, message: "" };
  } catch (error) {
    return {
      ok: false,
      providers: [],
      message: "No se pudo realizar la petición",
    };
  }
};
// Caso de uso para obtener la versión
export const getVersionUseCase = async () => {
  try {
    // Se ejecuta la petición a backend
    const resp = await fetch(`${import.meta.env.VITE_API}/providers/version`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) throw new Error("No se pudo traer la versión");
    // Se tipea la respuesta
    const data = (await resp.json()) as ProviderVersionResponse;
    // Se retorna respuesta
    return { ok: true, ...data };
  } catch (error) {
    return {
      ok: false,
      version: "0.0.0",
      message: "No se pudo realizar la petición",
    };
  }
};
// Caso de uso para crear proveedor
export const createProvidersUseCase = async (body: iProvider) => {
  try {
    // Se ejecuta la petición a backend
    const resp = await fetch(`${import.meta.env.VITE_API}/providers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    // Se tipea la respuesta
    const { ok, message } = (await resp.json()) as StatusProviderResponse;
    // So hay un error se maneja
    if (!resp.ok) throw new Error(message);
    // Se retorna respuesta
    return { ok, message };
  } catch (error) {
    return {
      ok: false,
      providers: [],
      message: error.message,
    };
  }
};
// Caso de uso para eliminar el proveedor
export const deleteProvidersUseCase = async (id: string) => {
  try {
    // Se ejecuta la petición a backend
    const resp = await fetch(`${import.meta.env.VITE_API}/providers/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    // So hay un error se maneja
    if (!resp.ok) throw new Error("No se pudo eliminar el proveedor");
    // Se tipea la respuesta
    const data = (await resp.json()) as ProviderResponse[];
    // Se retorna respuesta
    return { ok: true, providers: data, message: "" };
  } catch (error) {
    return {
      ok: false,
      providers: [],
      message: "No se pudo realizar la petición",
    };
  }
};
