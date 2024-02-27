import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <main className="row col-12">
      <section className="h-100">
        <Outlet />
      </section>
    </main>
  );
};
