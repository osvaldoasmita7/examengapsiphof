import { Link } from "react-router-dom";
import { CardGapsi } from "../components/CardGapsi";
import { useCallback, useEffect, useState } from "react";
import { getCustomersUseCase, updateCustomersUseCase } from "../../core";
export const WelcomePage = () => {
  const [image, setImage] = useState<string>("");
  const [candidateNumber, setCandidateNumber] = useState<string>("00");
  const getDatas = useCallback(async () => {
    let resp = await getCustomersUseCase();
    let customers = resp.customers;
    await updateCustomersUseCase({
      customerNumber: `${parseInt(customers) + 1}`,
    });

    resp = await getCustomersUseCase();
    customers = resp.customers;
    sessionStorage.setItem("candidateNumber", `0${parseInt(customers) + 1}`);
    setCandidateNumber(`0${parseInt(customers) + 1}`);
  }, [setCandidateNumber]);
  useEffect(() => {
    if (sessionStorage.getItem("image"))
      setImage(sessionStorage.getItem("image") || "");
    else
      sessionStorage.setItem("image", "https://picsum.photos/700/400?people");
    if (sessionStorage.getItem("candidateNumber")) {
      setCandidateNumber(sessionStorage.getItem("candidateNumber") || "01");
    } else getDatas();

    return () => {
      setImage("https://picsum.photos/700/400?random");
    };
  }, [getDatas]);
  console.log(candidateNumber);
  return (
    <div className="mt-5">
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
