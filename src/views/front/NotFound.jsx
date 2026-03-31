import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevTime) => prevTime - 1);
    }, 1000);
    if (countdown === 0) {
      navigate("/");
    }
    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div className="container">
        <div className="display-1 text-danger mb-3">
          <i className="bi bi-cone-striped"></i>
        </div>

        <h1 className="display-3 fw-bold text-dark mb-2">404</h1>
        <h2 className="fw-bold mb-4">哎呀！這條路不通喔</h2>

        <p className="fs-5 text-muted mb-4">
          您尋找的頁面似乎已經移除了，或是網址輸入有誤。
          <br />
          系統將在 <span className="text-danger fw-bold fs-4">
            {countdown}
          </span>{" "}
          秒後自動為您重新導航至首頁...
        </p>
        <Link
          to="/"
          className="btn btn-dark btn-lg px-5 py-3 rounded-pill fw-bold shadow-sm"
        >
          <i className="bi bi-house-door-fill me-2"></i> 立即返回車庫
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
