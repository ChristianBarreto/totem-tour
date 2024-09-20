import { Outlet } from "react-router-dom";

export default function HeroTemplate() {
  return (
    <div>
      <header>Store template</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}