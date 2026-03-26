import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { currency } from "../../utils/filter";
import { useForm } from "react-hook-form";
import useMessage from "../../hooks/useMessage";
import { emailValidation } from "../../utils/validation";
// import { RotatingLines } from "react-loader-spinner";
// import * as bootstrap from "bootstrap";
// import SingleProductModal from "../../components/SingleProductModal";

// import { useDispatch } from "react-redux";
// import { createAsyncMessage } from "../../slice/messageSlice";
// import useMessage from "../../hooks/useMessage";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

// SweetAlert
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// SweetAlert
// const MySwal = withReactContent(Swal);
// 2. 自定義一個 Toast (右上角小提示)
// 這樣之後呼叫只要寫 Toast.fire(...) 即可，不用重複寫設定
// const Toast = MySwal.mixin({
//   toast: true,
//   position: "top-end",
//   showConfirmButton: false,
//   timer: 1500,
//   timerProgressBar: true,
// didOpen: (toast) => {
//   toast.onmouseenter = Swal.stopTimer;
//   toast.onmouseleave = Swal.resumeTimer;
// },
// });

const Checkout = () => {
  // const [products, setProducts] = useState([]);
  // const [cart, setCart] = useState({});
  // const [product, setProduct] = useState({});
  // //可改為老師上課時使用的 list 的方式
  // const [loadingCardId, setLoadingCardId] = useState(null);
  // const [loadingProductId, setLoadingProductId] = useState(null);
  // const productModalRef = useRef(null);

  // const dispatch = useDispatch();
  const { showError, showSuccess } = useMessage();
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [rentalDate, setRentalDate] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  // const getCart = async () => {
  //   try {
  //     const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
  //     setCart(res.data.data);
  //     // console.log("res.data.data:", res.data);
  //   } catch (error) {
  //     console.log(error.response.data.message);
  //   }
  // };
  // useEffect(() => {

  //   const getProducts = async () => {
  //     try {
  //       const res = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`);
  //       setProducts(res.data.products);
  //       console.log(res.data.products);
  //     } catch (error) {
  //       console.log(error.response.data.message);
  //     }
  //   };
  //   getProducts();
  //   getCart();
  //   productModalRef.current = new bootstrap.Modal("#productModal", {
  //     keyboard: false,
  //   });
  //   // Modal 關閉時移除焦點
  //   document
  //     .querySelector("#productModal")
  //     .addEventListener("hide.bs.modal", () => {
  //       if (document.activeElement instanceof HTMLElement) {
  //         document.activeElement.blur();
  //       }
  //     });
  // }, []);
  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
        setCart(res.data.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    const initFetch = async () => {
      await getCart();
    };
    initFetch();
  }, []);

  // const updateCart = async (cartId, productId, qty = 1) => {
  //   try {
  //     const data = {
  //       product_id: productId,
  //       qty,
  //     };
  //     await axios.put(`${API_BASE}/api/${API_PATH}/cart/${cartId}`, { data });
  //     // Toast.fire({ icon: "success", title: "數量已更新" });
  //     // console.log(res);
  //     showSuccess("數量已更新！");
  //     getCart();
  //     // const res2 = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
  //     // setCart(res2.data.data);
  //     // Toast.fire({
  //     //   icon: "success",
  //     //   title: "商品數量已成功更新",
  //     // });
  //   } catch (error) {
  //     // console.log(error.response);
  //     showError(error.response.data.message);
  //   }
  // };
  // const addCart = async (id, qty) => {
  //   setLoadingCardId(id);
  //   try {
  //     const data = {
  //       product_id: id,
  //       qty,
  //     };
  //     await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
  //       data,
  //     });
  //     // console.log(res.data);
  //     showSuccess("商品已加入購物車");
  //     // Toast.fire({
  //     //   icon: "success",
  //     //   title: "商品已加入購物車",
  //     // });
  //     // const res2 = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
  //     // setCart(res2.data.data);
  //     getCart();
  //   } catch (error) {
  //     // console.log(error.response);
  //     showError(error.response.data.message);
  //   } finally {
  //     setLoadingCardId(null);
  //   }
  // };

  // const delCart = async (cartId) => {
  //   try {
  //     await axios.delete(`${API_BASE}/api/${API_PATH}/cart/${cartId}`);
  //     // console.log(res);
  //     // const res2 = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
  //     // setCart(res2.data.data);
  //     // Toast.fire({
  //     //   icon: "success",
  //     //   title: "商品刪除成功！",
  //     // });
  //     showSuccess("商品刪除成功！");
  //     getCart();
  //   } catch (error) {
  //     // console.log(error.response);
  //     showError(error.response.data.message);
  //   }
  // };

  // const delAllCart = async () => {
  //   try {
  //     await axios.delete(`${API_BASE}/api/${API_PATH}/cart1`);
  //     // console.log(res);
  //     // const res2 = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
  //     // setCart(res2.data.data);
  //     getCart();
  //     showSuccess("已清空購物車！");
  //   } catch (error) {
  //     // console.log(error.response.data.message);
  //     showError(error.response.data.message);
  //   }
  // };

  // const onSubmit = async (formData) => {
  //   // console.log(formData);
  //   try {
  //     const data = {
  //       user: formData,
  //       message: formData.message,
  //     };
  //     const res = await axios.post(`${API_BASE}/api/${API_PATH}/order`, {
  //       data,
  //     });
  //     reset();
  //     // console.log(res.data);
  //     //送出成功後，購物車會刷新
  //     // const res2 = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
  //     // setCart(res2.data.data);
  //     getCart();
  //     showSuccess(`訂單建立成功，您的訂單標號為： ${res.data.orderId}`); // MySwal.fire({
  //     //   icon: "success",
  //     //   title: "訂單建立成功",
  //     //   html: `您的訂單編號為：<br><b>${res.data.orderId}</b>`,
  //     //   confirmButtonText: "確定",
  //     // });
  //   } catch (error) {
  //     // console.log(error.response);
  //     showError(error.response.data.message);

  //     // Toast.fire({
  //     //   icon: "error",
  //     //   title: "訂單建立失敗",
  //     //   text: error.response?.data?.message || "發生未知錯誤",
  //     // });
  //   }
  // };
  // const handleView = async (id) => {
  //   setLoadingProductId(id);
  //   try {
  //     const res = await axios.get(`${API_BASE}/api/${API_PATH}/product/${id}`);
  //     setProduct(res.data.product);
  //   } catch (error) {
  //     console.log(error.response.data.message);
  //   } finally {
  //     setLoadingProductId(null);
  //   }
  //   productModalRef.current.show();
  // };

  // const closeModal = () => {
  //   productModalRef.current.hide();
  // };
  const onSubmit = async (formData) => {
    if (!rentalDate) {
      showError("請選擇預計取車日期！");
      return;
    }

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
      // ✅ 成功後跳轉到 Success 頁面，並把訂單 ID 帶入 URL
      navigate(`/success/${res.data.orderId}`);
    } catch (error) {
      showError(error.response?.data?.message || "訂單建立失敗");
    }
  };

  // 防呆：如果重整頁面時購物車是空的，就踢回購物車頁
  if (cart.carts && cart.carts.length === 0) {
    navigate("/cart");
    return null;
  }
  return (
    <div className="container mt-4 mb-5">
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
            >
              確認送出預約 <i className="bi bi-check-circle ms-1"></i>
            </button>

            <button
              type="button"
              className="btn btn-light w-100 mt-2 rounded-pill"
              onClick={() => navigate("/cart")}
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
