import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { currency } from "../../utils/filter";
import { useForm } from "react-hook-form";
import useMessage from "../../hooks/useMessage";
import { emailValidation } from "../../utils/validation";
import { RotatingLines } from "react-loader-spinner";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const Checkout = () => {
  const { showError, showSuccess } = useMessage();
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [rentalDate, setRentalDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    const getCart = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
        setCart(res.data.data);
      } catch (e) {
        showError("取得購物車資料失敗", e.message);
      } finally {
        setIsLoading(false);
      }
    };

    const initFetch = async () => {
      await getCart();
    };
    initFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (formData) => {
    if (!rentalDate) {
      showError("請選擇預計取車日期！");
      return;
    }
    setIsLoading(true);
    try {
      const finalMessage = `【預計取車日期：${rentalDate}】\n${formData.message || "無其他備註"}`;
      const data = {
        user: formData,
        message: finalMessage,
      };

      const res = await axios.post(`${API_BASE}/api/${API_PATH}/order`, {
        data,
      });

      showSuccess("預約單已送出！");
      navigate(`/success/${res.data.orderId}`);
    } catch (error) {
      showError(error.response?.data?.message || "訂單建立失敗");
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.carts && cart.carts.length === 0) {
    navigate("/cart");
    return null;
  }
  return (
    <div className="container mt-4 mb-5 position-relative">
      {isLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 9999,
          }}
        >
          <RotatingLines
            strokeColor="#dc3545"
            strokeWidth="5"
            animationDuration="0.75"
            width="80"
            visible={true}
          />
        </div>
      )}
      <h2 className="fw-bold mb-4">填寫預約資料</h2>
      <div className="row g-4">
        {/* 左側表單 */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 rounded-4 p-4 p-md-5">
            <h4 className="fw-bold mb-4">預約人資訊</h4>
            <form id="checkoutForm" onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label
                    htmlFor="name"
                    className="form-label text-muted small fw-bold"
                  >
                    姓名 <span className="text-danger">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    placeholder="請輸入姓名"
                    {...register("name", {
                      required: "請輸入姓名",
                      minLength: { value: 2, message: "最少 2 個字" },
                    })}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name.message}
                    </div>
                  )}
                </div>

                <div className="col-md-6">
                  <label
                    htmlFor="tel"
                    className="form-label text-muted small fw-bold"
                  >
                    聯絡電話 <span className="text-danger">*</span>
                  </label>
                  <input
                    id="tel"
                    type="tel"
                    className={`form-control ${errors.tel ? "is-invalid" : ""}`}
                    placeholder="請輸入電話"
                    {...register("tel", {
                      required: "請輸入電話",
                      pattern: { value: /^\d+$/, message: "格式不正確" },
                      minLength: { value: 8, message: "至少 8 碼" },
                    })}
                  />
                  {errors.tel && (
                    <div className="invalid-feedback">{errors.tel.message}</div>
                  )}
                </div>

                <div className="col-12">
                  <label
                    htmlFor="email"
                    className="form-label text-muted small fw-bold"
                  >
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="請輸入 Email"
                    {...register("email", emailValidation)}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div className="col-12">
                  <label
                    htmlFor="address"
                    className="form-label text-muted small fw-bold"
                  >
                    聯絡地址 <span className="text-danger">*</span>
                  </label>
                  <input
                    id="address"
                    type="text"
                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                    placeholder="請輸入地址"
                    {...register("address", { required: "請輸入地址" })}
                  />
                  {errors.address && (
                    <div className="invalid-feedback">
                      {errors.address.message}
                    </div>
                  )}
                </div>

                {/* 取車日期與備註 */}
                <div className="col-12 border-top pt-3 mt-4">
                  <label className="form-label text-muted small fw-bold">
                    預計取車日期 <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control border-warning w-50"
                    value={rentalDate}
                    onChange={(e) => setRentalDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                <div className="col-12">
                  <label
                    htmlFor="message"
                    className="form-label text-muted small fw-bold"
                  >
                    備註留言
                  </label>
                  <textarea
                    id="message"
                    className="form-control"
                    rows="3"
                    placeholder="如有特殊需求（如租借安全帽尺寸）請在此留言"
                    {...register("message")}
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* 右側摘要唯讀 */}
        <div className="col-lg-4">
          <div
            className="card shadow-sm border-0 rounded-4 p-4 sticky-top"
            style={{ top: "100px" }}
          >
            <h4 className="fw-bold mb-4">預約摘要</h4>

            {cart.carts?.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2"
              >
                <div>
                  <div className="fw-bold">{item.product.title}</div>
                  <small className="text-muted">{item.qty} 天</small>
                </div>
                <span>{currency(item.final_total)}</span>
              </div>
            ))}

            <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
              <span className="fw-bold fs-5">總金額</span>
              <span className="text-danger fw-bold fs-3">
                {currency(cart.final_total)}
              </span>
            </div>

            <button
              type="submit"
              form="checkoutForm"
              className="btn btn-danger btn-lg w-100 fw-bold rounded-pill shadow-sm"
              disabled={isLoading}
            >
              {isLoading ? "送出中..." : "確認送出預約"}{" "}
              <i className="bi bi-check-circle ms-1"></i>
            </button>

            <button
              type="button"
              className="btn btn-light w-100 mt-2 rounded-pill"
              onClick={() => navigate("/cart")}
              disabled={isLoading}
            >
              返回修改車庫
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
