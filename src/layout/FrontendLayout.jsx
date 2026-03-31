import { Outlet, Link } from "react-router";
const FrontendLayout = () => {
  return (
    <>
      <style>
        {`
          .custom-nav-link {
            color: #adb5bd ;
            transition: color 0.3s ease; 
          }
          .custom-nav-link:hover {
            color: #42474d ; 
            background-color: transparent ; 
          }
        `}
      </style>
      <header
        className="fixed-top bg-dark bg-opacity-75 shadow-sm"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <div className="container">
          <div className="d-flex justify-content-between">
            <ul className="nav">
              <li className="nav-item ">
                <Link className="nav-link custom-nav-link px-3 fw-bold" to="/">
                  首頁
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link custom-nav-link px-3 fw-bold"
                  to="/products"
                >
                  產品列表
                </Link>
              </li>
            </ul>
            <ul className="nav">
              <li className="nav-item">
                <Link
                  className="nav-link custom-nav-link px-3 fw-bold"
                  to="/cart"
                >
                  購物車
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link custom-nav-link px-3 fw-bold"
                  to="/checkout"
                >
                  結帳
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link custom-nav-link px-3 fw-bold"
                  to="/login"
                >
                  後台登入
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <main className="flex-grow-1 pt-5 mt-4">
        <Outlet />
      </main>
      <footer className="mt-5">
        <p className="fw-bold text-white">
          &copy; 2026~∞ Rudy-六角學院- React 直播班
        </p>
      </footer>
    </>
  );
};

export default FrontendLayout;
