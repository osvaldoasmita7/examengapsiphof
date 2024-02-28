import { Link } from "react-router-dom";
interface Props {
  id: string;
  deleteProvider: (param: string) => void;
}
export const ButtonDeleteTable = ({ id, deleteProvider }: Props) => {
  return (
    <div>
      <Link
        to="#"
        className="text-danger me-3"
        onClick={() => deleteProvider(`${id}`)}
      >
        <i className="fa-solid fa-trash"></i>
      </Link>
    </div>
  );
};
