import { NavLink } from "react-router-dom";
import { iOptionNavLink } from "../../interfaces";
import { SpanElement } from "./SpanElement";
const classesNav = [
  "flex justify-center items-center bg-gray-800 rounded-md p-2 transition-colors",
  "flex justify-center items-center hover:bg-gray-800 rounded-md p-2 transition-colors",
];

export const SidebarMenuItem = ({ to, title, description }: iOptionNavLink) => {
  return (
    <NavLink to={to} className={({ isActive }) => classesNav[isActive ? 0 : 1]}>
      <div className="flex flex-col flexgrow">
        <SpanElement
          className="text-white text-lg font-semibold"
          text={title}
        ></SpanElement>
        <SpanElement
          className="text-gray-400 text-sm"
          text={description}
        ></SpanElement>
      </div>
    </NavLink>
  );
};
