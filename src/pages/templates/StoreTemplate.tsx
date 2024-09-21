import { Outlet } from "react-router-dom";
import Header from "../../components/organisms/Header";
import { Footer } from "../../components/organisms/Footer";

export default function HeroTemplate() {
  return (
    <div style={{ height: '100vh'}}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}