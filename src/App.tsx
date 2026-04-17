import { useEffect, useState } from "react";
import { AppShell } from "./components/AppShell";

type PageView = "home" | "portfolio";

function getCurrentPage(): PageView {
  if (typeof window === "undefined") {
    return "home";
  }

  return new URLSearchParams(window.location.search).get("page") === "portfolio"
    ? "portfolio"
    : "home";
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageView>(getCurrentPage);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleLocationChange = () => {
      setCurrentPage(getCurrentPage());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  const navigateToPage = (page: PageView) => {
    const url = new URL(window.location.href);

    if (page === "portfolio") {
      url.searchParams.set("page", "portfolio");
    } else {
      url.searchParams.delete("page");
      url.hash = "";
    }

    window.history.pushState({}, "", url);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return AppShell({
    currentPage,
    isScrolled,
    isContactModalOpen,
    onOpenContactModal: openContactModal,
    onCloseContactModal: closeContactModal,
    onNavigateHome: () => navigateToPage("home"),
    onNavigatePortfolio: () => navigateToPage("portfolio"),
  });
}