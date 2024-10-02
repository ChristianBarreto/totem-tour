import { Outlet } from "react-router-dom";
import Header from "../../components/organisms/Header";
import AdminDrawer from "../../components/organisms/AdminDrawer";

export default function AdminTemplate() {

  return (
    <div>
      <AdminDrawer>
        <Outlet />
      </AdminDrawer>
    </div>
  );
}