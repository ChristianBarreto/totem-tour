import React from "react";
import { Outlet } from "react-router-dom";

export default function HeroTemplate() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}