import axios from "axios";
import { useEffect, useState } from "react";
import { currency } from "../../utils/filter";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";
import useMessage from "../../hooks/useMessage";
// 引入 react-hook-form 與 email 驗證規則
import { useForm } from "react-hook-form";
import { emailValidation } from "../../utils/validation";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const Cart = () => {
  const { showError, showSuccess } = useMessage();
  const dispatch = useDispatch();
  const [cart, setCart] = useState({});
  const [rentalDate, setRentalDate] = useState("");

  // 設定 react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const getCart = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      setCart(res.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    const initFetch = async () => {
      await getCart();
    };

    // 執行它
    initFetch();
  }, []);

  const updateCart = async (cartId, productId, qty = 1) => {
    try {
      const data = {
        product_id: productId,
        qty: Number(qty),
      };
      await axios.put(`${API_BASE}/api/${API_PATH}/cart/${cartId}`, { data });
      getCart();
      showSuccess("租借天數已更新！");
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
    }
  };

  const delCart = async (cartId) => {
    try {
      await axios.delete(`${API_BASE}/api/${API_PATH}/cart/${cartId}`);
      getCart();
      showSuccess("已取消預約此車輛！");
    } catch (error) {
      showError(error.response.data.message);
    }
  };

  const delAllCart = async () => {
    try {
      await axios.delete(`${API_BASE}/api/${API_PATH}/carts`);
      getCart();
      showSuccess("購物車已清空！");
    } catch (error) {
      showError(error.response.data.message);
    }
  };

  // ✅ 整合送出訂單邏輯
  const onSubmit = async (formData) => {
    // 防呆：如果有購物車內容，但沒選日期，可以阻擋送出
    if (cart.carts?.length > 0 && !rentalDate) {
      showError("請選擇預計取車日期！");
      return;
    }

    try {
      // 將取車日期合併到留言中，傳給後端
      const finalMessage = `【預計取車日期：${rentalDate}】\n${formData.message || "無其他備註"}`;

      const data = {
        user: formData,
        message: finalMessage,
      };

      const res = await axios.post(`${API_BASE}/api/${API_PATH}/order`, {
        data,
      });

      // 送出成功後的動作
      reset(); // 清空表單
      setRentalDate(""); // 清空日期
      getCart(); // 刷新購物車(變空)
      showSuccess(`預約成功！您的訂單編號為：${res.data.orderId}`);
    } catch (error) {
      showError(error.response?.data?.message || "訂單建立失敗");
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-end mb-4">
        <h2 className="fw-bold mb-0">預約確認單</h2>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={delAllCart}
          disabled={!cart.carts?.length}
        >
          <i className="bi bi-trash3 me-1"></i> 清空車庫
        </button>
      </div>

      {!cart.carts?.length ? (
        <div className="alert alert-secondary text-center py-5 rounded-4">
          <h4 className="fw-bold mb-3">車庫目前空空如也</h4>
          <p className="text-muted mb-0">趕快去車庫挑選你的夢幻座駕吧！</p>
        </div>
      ) : (
        <div className="row g-4">
          {/* 左側：車輛明細 + 預約表單 */}
          <div className="col-lg-8">
            {/* 1. 車輛明細卡片 */}
            {cart.carts?.map((cartItem) => (
              <div
                key={cartItem.id}
                className="card shadow-sm border-0 rounded-4 overflow-hidden mb-4"
              >
                <div className="row g-0">
                  <div className="col-md-5 bg-light">
                    <img
                      src={cartItem.product.imageUrl}
                      alt={cartItem.product.title}
                      className="w-100 h-100 object-fit-cover"
                      style={{ minHeight: "250px" }}
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body p-4 p-md-5 d-flex flex-column h-100">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <span className="badge bg-dark mb-2">
                            {cartItem.product.category}
                          </span>
                          <h4 className="card-title fw-bold mb-0">
                            {cartItem.product.title}
                          </h4>
                        </div>
                        <button
                          type="button"
                          className="btn btn-light btn-sm text-danger"
                          onClick={() => delCart(cartItem.id)}
                          title="取消此車輛"
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </div>

                      <div className="bg-light p-3 rounded-3 mb-4 mt-auto">
                        <div className="row g-3">
                          <div className="col-12 col-sm-6">
                            <label className="form-label text-muted small fw-bold mb-1">
                              預計取車日期{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="date"
                              className="form-control form-control-sm border-warning"
                              value={rentalDate}
                              onChange={(e) => setRentalDate(e.target.value)}
                              min={new Date().toISOString().split("T")[0]}
                              required
                            />
                          </div>
                          <div className="col-12 col-sm-6">
                            <label className="form-label text-muted small fw-bold mb-1">
                              租賃天數
                            </label>
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                className="form-control"
                                value={cartItem.qty}
                                min={1}
                                onChange={(e) =>
                                  updateCart(
                                    cartItem.id,
                                    cartItem.product_id,
                                    e.target.value,
                                  )
                                }
                              />
                              <span className="input-group-text">天</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-end mt-auto">
                        <span className="text-muted">車輛小計</span>
                        <h4 className="text-danger fw-bold mb-0">
                          {currency(cartItem.final_total)}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* 2. 預約人資訊表單 */}
            <div className="card shadow-sm border-0 rounded-4 p-4 p-md-5">
              <h4 className="fw-bold mb-4">預約人資訊</h4>
              {/* 給 form 一個 id，讓外面的按鈕可以觸發它 */}
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
                        minLength: { value: 2, message: "姓名最少 2 個字" },
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
                        pattern: { value: /^\d+$/, message: "電話格式不正確" },
                        minLength: { value: 8, message: "電話至少 8 碼" },
                      })}
                    />
                    {errors.tel && (
                      <div className="invalid-feedback">
                        {errors.tel.message}
                      </div>
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

          {/* 右側：總計與結帳按鈕 */}
          <div className="col-lg-4">
            <div
              className="card shadow-sm border-0 rounded-4 p-4 sticky-top"
              style={{ top: "100px" }}
            >
              <h4 className="fw-bold mb-4">預約總計</h4>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">總天數</span>
                <span className="fw-bold">
                  {cart.carts?.reduce((acc, curr) => acc + curr.qty, 0)} 天
                </span>
              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="fw-bold fs-5">總金額</span>
                <span className="text-danger fw-bold fs-3">
                  {currency(cart.final_total)}
                </span>
              </div>

              {/* 利用 form 屬性綁定左側表單的 ID，實現跨區塊送出 */}
              <button
                type="submit"
                form="checkoutForm"
                className="btn btn-danger btn-lg w-100 fw-bold rounded-pill shadow-sm"
              >
                確認預約 <i className="bi bi-check-circle ms-1"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
