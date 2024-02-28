import { ReactNode, useCallback, useEffect, useState } from "react";
import { LogoImage } from "./LogoImage";
import { ButtonDropDown } from "./ButtonDropDown/ButtonDropDown";
import { getVersionUseCase } from "../../core";

interface Props {
  children?: ReactNode;
  title: string;
  titlePage: string;
}
export const CardGapsi = ({ children, title, titlePage }: Props) => {
  const [version, setVersion] = useState("0.0.0");
  const getVersion = useCallback(async () => {
    const respVersion = await getVersionUseCase();
    setVersion(respVersion.version);
  }, []);
  useEffect(() => {
    getVersion();
  }, [getVersion]);
  return (
    <div className="row mt-5 	fade-in">
      <div className="col-11 col-md-8 col-md-10 col-lg-5 mx-auto">
        <div className="gapsi">
          <div className="card gapsi">
            <div className="header ps-4 py-3 col-12">
              <div className="row">
                <div className="col-11">
                  <h3 className="color-gray motion-safe:animate-spin">
                    {titlePage}
                  </h3>
                </div>
                <div className="col-1">
                  <ButtonDropDown></ButtonDropDown>
                </div>
              </div>
            </div>
            <div className="px-2">
              <div className="body py-4">
                <div className="col-12 text-center animate-pulse">
                  <LogoImage />
                  <h3 className="pt-4 pb-4">{title}</h3>
                </div>
                {children}
              </div>
              <div className="pb-3 px-2 py-2">
                <div className="footer version-card">
                  <div className="text-right px-2 py-1">
                    <small>
                      Desarrollado por: Ing. Osvaldo F. Ponce Hernández. Versión{" "}
                      {version}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
