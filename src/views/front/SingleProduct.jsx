import axios from "axios";
import { useEffect, useState } from "react";
import { currency } from "../../utils/filter";
import useMessage from "../../hooks/useMessage";
import { useParams } from "react-router";
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SingleProduct = () => {
  const { showError, showSuccess } = useMessage();
  const { id } = useParams();
  const [product, setProduct] = useState();
  useEffect(() => {
    const handleView = async (id) => {
      try {
        const res = await axios.get(
          `${API_BASE}/api/${API_PATH}/product/${id}`,
        );
        setProduct(res.data.product);
      } catch (e) {
        showError("取得產品資料失敗", e.message);
      }
    };
    handleView(id);
  }, [id, showError]);
  // -----
  const addCart = async (id, qty = 1) => {
    try {
      const data = {
        product_id: id,
        qty,
      };
      await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
        data,
      });

      showSuccess("商品已加入購物車");
    } catch (error) {
      showError(error.response.message);
    }
  };
  return !product ? (
    <h2>查無產品</h2>
  ) : (
    <>
      <div className="container mt-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">首頁</li>
            <li className="breadcrumb-item">產品列表</li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.title}
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {/* ✅ 修改：麵包屑也加上品牌 */}
              {product.category} {product.title}
            </li>
          </ol>
        </nav>
        <div className="row">
          {/* =======================
            左側：圖片輪播區 (佔 7 份)
            ======================= */}
          <div className="col-md-7">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={10}
              slidesPerView={1}
              loop={true}
              className="rounded-3 shadow-sm"
              style={{
                height: "500px",
                backgroundColor: "#f8f9fa",
              }}
            >
              {/* 1. 主圖 */}
              <SwiperSlide>
                <img
                  src={product.imageUrl}
                  className="w-100 h-100 object-fit-contain"
                  alt={`${product.category} ${product.title}`}
                />
              </SwiperSlide>

              {/* 2. 附圖 */}
              {product.imagesUrl?.map((url, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={url}
                    className="w-100 h-100 object-fit-contain"
                    alt={`附圖-${index}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* =======================
            右側：產品資訊區 (佔 5 份)
            ======================= */}
          <div className="col-md-5 mt-4 mt-md-0">
            <div className="d-flex flex-column h-100 justify-content-center">
              {/* 1. 標籤與標題 */}
              <div className="mb-3">
                <span className="badge bg-dark">{product.style}</span>
              </div>

              <h1 className="fw-bold mb-3">
                {product.category} {product.title}
              </h1>

              {/* 2. 描述內容 */}
              <p className="fs-5 text-muted mb-4">{product.description}</p>

              {/* 3. 詳細規格 (如果內容很多，可以考慮用 accordion，這裡先直接顯示) */}
              <div className="mb-3 p-3 bg-light rounded">
                <p className="mb-0 text-secondary">{product.content}</p>
              </div>

              {/* 4. 價格區塊 */}
              <div className=" mb-4">
                <p className="card-text fs-5">
                  <del className="text-muted me-2">
                    原價：{currency(product.origin_price)}
                  </del>
                  售價：
                  <span className="fw-bold text-danger display-6">
                    {currency(product.price)}
                  </span>
                  <small className="text-body-secondary ms-1">
                    /{product.unit}
                  </small>
                </p>
              </div>

              {/* 5. 購買按鈕區塊 (置底或顯眼處) */}
              <div className="d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-primary btn-lg py-3 fw-bold shadow-sm"
                  onClick={() => addCart(product.id)}
                >
                  <i className="bi bi-cart-plus-fill me-2"></i> 加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
