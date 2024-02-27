import {
  ProviderResponse,
  ProviderVersionResponse,
  StatusProviderResponse,
  iProvider,
} from "../../interfaces";

export const getProvidersUseCase = async () => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_API}/providers`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) throw new Error("No se pudo traer los proveedores");
    const data = (await resp.json()) as ProviderResponse[];
    return { ok: true, providers: data, message: "" };
  } catch (error) {
    return {
      ok: false,
      providers: [],
      message: "No se pudo realizar la petición",
    };
  }
};

export const getVersionUseCase = async () => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_API}/providers/version`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) throw new Error("No se pudo traer la versión");
    const data = (await resp.json()) as ProviderVersionResponse;
    return { ok: true, ...data };
  } catch (error) {
    return {
      ok: false,
      version: "0.0.0",
      message: "No se pudo realizar la petición",
    };
  }
};

export const createProvidersUseCase = async (body: iProvider) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_API}/providers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const { ok, message } = (await resp.json()) as StatusProviderResponse;
    if (!resp.ok) throw new Error(message);
    return { ok, message };
  } catch (error) {
    return {
      ok: false,
      providers: [],
      message: error.message,
    };
  }
};

export const deleteProvidersUseCase = async (id: string) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_API}/providers/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) throw new Error("No se pudo eliminar el proveedor");
    const data = (await resp.json()) as ProviderResponse[];
    return { ok: true, providers: data, message: "" };
  } catch (error) {
    return {
      ok: false,
      providers: [],
      message: "No se pudo realizar la petición",
    };
  }
};
