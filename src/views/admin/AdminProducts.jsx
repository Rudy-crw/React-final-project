import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import * as bootstrap from "bootstrap";
import ProductModal from "../../components/ProductModal";
import Pagination from "../../components/Pagination";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";
import { currency } from "../../utils/filter";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const INITIAL_TEMPLATE_DATA = {
  id: "",
  title: "",
  category: "",
  origin_price: "",
  price: "",
  unit: "",
  description: "",
  content: "",
  is_enabled: false,
  imageUrl: "",
  imagesUrl: [],
  style: "",
};

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [templateProduct, setTemplateProduct] = useState(INITIAL_TEMPLATE_DATA);
  const [modalType, setModalType] = useState();
  const [pagination, setPagination] = useState({});
  const productModalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const getProducts = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE}/api/${API_PATH}/admin/products?page=${page}`,
        );
        setProducts(Object.values(res.data.products));
        setPagination(res.data.pagination);
      } catch (e) {
        dispatch(createAsyncMessage(e.response?.data?.message || "取得失敗"));
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch],
  );
  useEffect(() => {
    productModalRef.current = new bootstrap.Modal("#productModal", {
      keyboard: false,
    });
    const initFetch = async () => {
      await getProducts();
    };
    initFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = (type, product) => {
    setModalType(type);
    setTemplateProduct({ ...INITIAL_TEMPLATE_DATA, ...product });
    productModalRef.current.show();
  };
  const closeModal = () => {
    productModalRef.current.hide();
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
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              zIndex: 9999,
            }}
          >
            <RotatingLines
              strokeColor="#0d6efd"
              strokeWidth="5"
              animationDuration="0.75"
              width="80"
              visible={true}
            />
          </div>
        )}
        <h2>產品列表</h2>
        <div className="text-end mt-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => openModal("create", INITIAL_TEMPLATE_DATA)}
          >
            建立新的產品
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>品牌</th>
              <th>車型風格</th>
              <th>產品名稱</th>
              <th>原價</th>
              <th>售價</th>
              <th>是否啟用</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((item) => (
                <tr key={item.id}>
                  <td>{item.category}</td>
                  <td>{item.style}</td>
                  <th scope="row">{item.title}</th>
                  <td>{currency(item.origin_price)}</td>
                  <td>{currency(item.price)}</td>
                  <td className={`${item.is_enabled && "text-success"}`}>
                    {item.is_enabled ? "啟用" : "未啟用"}
                  </td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic product"
                    >
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => openModal("edit", item)}
                      >
                        編輯
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => openModal("delete", item)}
                      >
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  尚無產品資料
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination pagination={pagination} onChangePage={getProducts} />
      </div>
      <ProductModal
        modalType={modalType}
        templateProduct={templateProduct}
        closeModal={closeModal}
        getProducts={getProducts}
      />
    </>
  );
}

export default AdminProducts;
