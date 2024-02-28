import { iCustomers } from "../../interfaces";

export const getCustomersUseCase = async () => {
  try {
    // Se ejecuta la petición a backend
    const resp = await fetch(`${import.meta.env.VITE_API}/customers`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    // Se tipea la respuesta
    const data = (await resp.text()) as string;
    // Se retorna respuesta
    return { ok: true, customers: data, message: "" };
  } catch (error) {
    return {
      ok: false,
      customers: "00",
      message: "No se pudo realizar la petición",
    };
  }
};

export const updateCustomersUseCase = async (body: iCustomers) => {
  try {
    // Se ejecuta la petición a backend
    await fetch(`${import.meta.env.VITE_API}/customers`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    // Se retorna respuesta
    return { ok: true, message: "Se actualizó el cliente" };
  } catch (error) {
    return {
      ok: false,
      customers: [],
      message: "No se pudo realizar la petición",
    };
  }
};
