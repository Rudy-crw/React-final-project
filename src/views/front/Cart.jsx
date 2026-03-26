import axios from "axios";
import { useEffect, useState } from "react";
import { currency } from "../../utils/filter";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";
import useMessage from "../../hooks/useMessage";
import { Link } from "react-router";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const Cart = () => {
  const { showError, showSuccess } = useMessage();
  const dispatch = useDispatch();
  const [cart, setCart] = useState({});

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

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-end mb-4">
        <h2 className="fw-bold mb-0">預約車庫</h2>
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
          <Link to="/products" className="btn btn-dark mt-3 px-4 rounded-pill">
            前往挑選車輛
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
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
                      style={{ minHeight: "200px" }}
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body p-4 d-flex flex-column h-100">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <span className="badge bg-dark mb-2">
                            {cartItem.product.category}
                          </span>
                          <h5 className="card-title fw-bold mb-0">
                            {cartItem.product.title}
                          </h5>
                        </div>
                        <button
                          type="button"
                          className="btn btn-light btn-sm text-danger"
                          onClick={() => delCart(cartItem.id)}
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </div>

                      <div className="bg-light p-3 rounded-3 mb-3 mt-auto">
                        <label className="form-label text-muted small fw-bold mb-1">
                          租賃天數
                        </label>
                        <div className="input-group input-group-sm w-50">
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

                      <div className="d-flex justify-content-between align-items-end mt-auto">
                        <span className="text-muted small">車輛小計</span>
                        <h5 className="text-danger fw-bold mb-0">
                          {currency(cartItem.final_total)}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

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

              {/* ✅ 導向結帳頁面 */}
              <Link
                to="/checkout"
                className="btn btn-danger btn-lg w-100 fw-bold rounded-pill shadow-sm"
              >
                下一步：填寫預約資料 <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
