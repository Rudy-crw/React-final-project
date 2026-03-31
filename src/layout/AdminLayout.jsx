import { Outlet, Link, useNavigate } from "react-router";
import axios from "axios";
import useMessage from "../hooks/useMessage";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { showSuccess } = useMessage();

  const handleLogout = (e) => {
    e.preventDefault();
    document.cookie =
      "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    delete axios.defaults.headers.common["Authorization"];
    showSuccess("已成功登出系統！");
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <header className="bg-dark sticky-top shadow-sm">
        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between align-items-center py-3">
            <ul className="nav align-items-center">
              <li className="nav-item me-3">
                <span className="text-white fw-bold fs-5">
                  <i className="bi bi-gear-fill me-2"></i> 後台管理
                </span>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white-50 px-3"
                  to="/admin/products"
                >
                  產品列表
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white-50 px-3"
                  to="/admin/orders"
                >
                  訂單列表
                </Link>
              </li>
            </ul>
            <div>
              <button
                type="button"
                className="btn btn-outline-light btn-sm px-4 rounded-pill"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-2"></i>登出
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow-1 p-4">
        <div className="container-fluid bg-white p-4 rounded-4 shadow-sm h-100">
          <Outlet />
        </div>
      </main>

      <footer className="text-center py-3 text-muted small">
        <p className="mb-0">&copy; 2026~∞ Rudy-六角學院- React 直播班.</p>
      </footer>
    </div>
  );
};

export default AdminLayout;
