import { Link, useParams } from "react-router";

const Success = () => {
  const { orderId } = useParams();
  return (
    <div className="container mt-5 mb-5 text-center">
      <div
        className="card border-0 shadow-sm rounded-4 p-5 mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <div className="display-1 text-success mb-3">
          <i className="bi bi-check-circle-fill"></i>
        </div>
        <h2 className="fw-bold mb-3">預約單已成功送出！</h2>
        <p className="text-muted fs-5 mb-4">
          感謝您的預約，客服人員將會盡快與您聯繫確認租賃細節。
        </p>

        <div className="bg-light rounded-3 p-4 mb-4 text-start">
          <h5 className="fw-bold mb-2">您的預約編號</h5>
          <div className="d-flex align-items-center justify-content-between bg-white border rounded p-3">
            <span
              className="fs-5 text-primary fw-bold"
              style={{ letterSpacing: "2px" }}
            >
              {orderId}
            </span>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => {
                navigator.clipboard.writeText(orderId);
                alert("已複製訂單編號！");
              }}
            >
              <i className="bi bi-clipboard"></i> 複製
            </button>
          </div>
          <small className="text-muted mt-2 d-block">
            * 請妥善保存此編號，以便未來查詢進度使用。
          </small>
        </div>

        <div className="d-flex justify-content-center gap-3">
          <Link
            to="/"
            className="btn btn-outline-dark px-4 py-2 rounded-pill fw-bold"
          >
            返回首頁
          </Link>
          <Link
            to="/products"
            className="btn btn-danger px-4 py-2 rounded-pill fw-bold"
          >
            繼續逛逛
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
