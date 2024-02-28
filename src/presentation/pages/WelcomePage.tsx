import { Link } from "react-router-dom";
import { CardGapsi } from "../components/CardGapsi";
import { useCallback, useEffect, useState } from "react";
import { getCustomersUseCase, updateCustomersUseCase } from "../../core";

export const WelcomePage = () => {
  // Variable que almacena imagen
  const [image, setImage] = useState<string>("");
  // Variable que guarda el número de candidato
  const [candidateNumber, setCandidateNumber] = useState<string>("00");
  // Función que trae la información consecutiva del número de cliente
  const getDatas = useCallback(async () => {
    // Ejecutamos la petición a la base de datos para traer el consecutivo
    let resp = await getCustomersUseCase();
    // Mandamos a guardar el consecutivo de cliente
    await updateCustomersUseCase({
      customerNumber: `${parseInt(resp.customers) + 1}`,
    });
    // Actualizamos el consecutivo del cliente para tener el último
    resp = await getCustomersUseCase();
    sessionStorage.setItem(
      "candidateNumber",
      `0${parseInt(resp.customers) + 1}`
    );
    // Seteamos el consecutivo del cliente en nuestro estado
    setCandidateNumber(`0${parseInt(resp.customers) + 1}`);
  }, [setCandidateNumber]);

  /**
   * Cuando el componente se está montando
   */
  useEffect(() => {
    // Preguntamos si se stiene una imagen la guardamos en el estado
    if (sessionStorage.getItem("image"))
      setImage(sessionStorage.getItem("image") || "");
    // Si no se tiene una imagen se setea en el almacenamiento
    else
      sessionStorage.setItem("image", "https://picsum.photos/700/400?people");
    // Si tenemos el número consecutivo del candidato seteamos los números
    if (sessionStorage.getItem("candidateNumber"))
      setCandidateNumber(sessionStorage.getItem("candidateNumber") || "01");
    // Si no hay número de empleado se consulta el número de empleado a la db
    else getDatas();

    return () => {
      // Cuando el componente se desmonte se limpia la imagen
      setImage("https://picsum.photos/700/400?random");
    };
  }, [getDatas]);
  return (
    <div className="mt-5">
      {/* Componente de contenedor de gapsi */}
      <CardGapsi
        titlePage="e-Commerce Gapsi"
        title={`Bienvenido Candidato ${candidateNumber}`}
      >
        <div className="col-12 text-center mb-5">
          <img
            src={image}
            alt=""
            className="img img-fluid text-center"
            style={{ width: 100, height: 100, borderRadius: 100 }}
          />
        </div>
        <div className="col-12 text-center">
          <Link to={"/register"}>
            <button className="btn btn-primary mb-4 px-4 py-2">
              Continuar
            </button>
          </Link>
        </div>
      </CardGapsi>
    </div>
  );
};
