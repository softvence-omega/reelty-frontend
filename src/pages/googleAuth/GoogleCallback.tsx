import { useEffect } from "react";
import { useNavigate } from "react-router";

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("ab_cd");
    const user = params.get("user");

    if (token) {
      localStorage.setItem("accessToken", token);
      if (user) localStorage.setItem("user", user);
      navigate("/dashboard");
    } else {
      console.error("No token found in URL");
    }
  }, [navigate]);

  return <div>Logging in with Google...</div>;
};

export default GoogleCallback;
