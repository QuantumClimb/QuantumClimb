import { useEffect, useState } from "react";
import { AppShell } from "./components/AppShell";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  return AppShell({
    isScrolled,
    isContactModalOpen,
    onOpenContactModal: openContactModal,
    onCloseContactModal: closeContactModal,
  });
}