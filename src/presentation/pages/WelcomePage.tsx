import { Link } from "react-router-dom";
import { CardGapsi } from "../components/CardGapsi";
import { useCallback, useEffect, useState } from "react";
import { getCustomersUseCase, updateCustomersUseCase } from "../../core";
export const WelcomePage = () => {
  const [candidateNumber, setCandidateNumber] = useState<string>("00");
  const getDatas = useCallback(async () => {
    let resp = await getCustomersUseCase();
    let customers = resp.customers;
    await updateCustomersUseCase({
      customerNumber: `${parseInt(customers) + 1}`,
    });

    resp = await getCustomersUseCase();
    customers = resp.customers;

    setCandidateNumber(`0${parseInt(customers) + 1}`);
  }, [setCandidateNumber]);
  useEffect(() => {
    getDatas();

    return () => {};
  }, [getDatas]);

  return (
    <div className="mt-5">
      <CardGapsi
        titlePage="e-Commerce Gapsi"
        title={`Bienvenido Candidato ${candidateNumber}`}
      >
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
