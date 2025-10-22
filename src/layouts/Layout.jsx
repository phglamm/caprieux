import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ChatBubble from "../components/ChatBubble/ChatBubble";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ChatBubble />
    </>
  );
}
