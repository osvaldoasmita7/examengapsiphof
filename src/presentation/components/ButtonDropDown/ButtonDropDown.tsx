import { Link } from "react-router-dom";
import "./index.css";
export const ButtonDropDown = () => {
  return (
    <div className="dropdown">
      <button
        className="text-center pt-1 button-dopdown"
        data-bs-toggle="dropdown"
        type="button"
      >
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </button>

      <ul className="dropdown-menu fade-in-fast shadows-without-border ">
        <li>
          <Link className="dropdown-item" to="/providers">
            Ver proveedores
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/register">
            Registrar un proveedor
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/">
            Volver al inicio
          </Link>
        </li>
      </ul>
    </div>
  );
};
