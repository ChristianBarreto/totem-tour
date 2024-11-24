import React from "react";
import { Outlet } from "react-router-dom";
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