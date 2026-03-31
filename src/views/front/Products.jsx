import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useMessage from "../../hooks/useMessage";
import { currency } from "../../utils/filter";
import { RotatingLines } from "react-loader-spinner";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showError } = useMessage();
  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`);
        setProducts(res.data.products);
      } catch (e) {
        showError("取得產品資料失敗", e.message);
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleView = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <div className="container">
        {isLoading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.7)", // 漂亮的半透明白紗
              zIndex: 9999, // 確保蓋在 Navbar 和所有東西之上
            }}
          >
            <RotatingLines
              strokeColor="#212529" // 前台可以用深灰色 (Bootstrap 的 dark 色) 比較有質感
              strokeWidth="5"
              animationDuration="0.75"
              width="80"
              visible={true}
            />
          </div>
        )}
        <div className="row justify-content-center">
          {products.map((product) => (
            <div className="col-md-4  col-6 mb-3 " key={product.id}>
              <div className="card ">
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.category} {product.title}{" "}
                    <span className="badge rounded-pill text-bg-danger ms-2">
                      {product.style}
                    </span>
                  </h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">
                    <del>原價：{currency(product.origin_price)}</del> 售價：
                    {currency(product.price)}
                    <small className="text-body-secondary">
                      /{product.unit}
                    </small>
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleView(product.id)}
                  >
                    查看更多
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
