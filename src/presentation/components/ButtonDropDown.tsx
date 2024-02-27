import { Link } from "react-router-dom";

export const ButtonDropDown = () => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-rounded"
        type="button"
        data-bs-toggle="dropdown"
      >
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </button>
      <ul className="dropdown-menu">
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
