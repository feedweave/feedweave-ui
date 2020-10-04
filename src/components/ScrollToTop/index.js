import { useEffect } from "react";

export default function ScrollToTop({ children, location }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return children;
}
