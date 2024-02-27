import { iCustomers } from "../../interfaces";

export const getCustomersUseCase = async () => {
  try {
    const url = `${import.meta.env.VITE_API}/customers`;
    const resp = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = (await resp.text()) as string;
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
    await fetch(`${import.meta.env.VITE_API}/customers`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return { ok: true, message: "Se actualizó el cliente" };
  } catch (error) {
    return {
      ok: false,
      customers: [],
      message: "No se pudo realizar la petición",
    };
  }
};
