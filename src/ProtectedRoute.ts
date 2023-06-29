import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ProtectedRoute = ({ element: Component }: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    //@ts-ignore
    const data = JSON.parse(window.localStorage.getItem("userData"));
    if (!data || !data.token) {
      navigate("/login");
    }
  }, [navigate]);

  return Component;
};
