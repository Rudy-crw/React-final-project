import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import Pagination from "../../components/Pagination";
import { currency, formatDate } from "../../utils/filter";
import useMessage from "../../hooks/useMessage";
import OrderModal from "../../components/OrderModal";
import * as bootstrap from "bootstrap";
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [tempOrder, setTempOrder] = useState(null);
  const orderModalRef = useRef(null);
  const { showError, showSuccess } = useMessage();

  const getOrders = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${API_BASE}/api/${API_PATH}/admin/orders?page=${page}`,
      );
      setOrders(res.data.orders);
      setPagination(res.data.pagination);
    } catch (error) {
      showError("取得訂單列表失敗", error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("確定要刪除這筆訂單嗎？刪除後無法恢復喔！")) return;

    setIsLoading(true);
    try {
      await axios.delete(`${API_BASE}/api/${API_PATH}/admin/order/${id}`);
      showSuccess("刪除訂單成功");
      getOrders();
    } catch (error) {
      showError("刪除失敗", error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (order) => {
    setTempOrder(order);
    orderModalRef.current.show();
  };
  const closeModal = () => {
    orderModalRef.current.hide();
  };
  useEffect(() => {
    orderModalRef.current = new bootstrap.Modal("#orderModal", {
      keyboard: false,
    });
    const initFetch = async () => {
      await getOrders();
    };
    initFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mt-4">
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

      <h2>後台訂單管理</h2>
      <div className="mt-4">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>訂單時間</th>
              <th>預約人 Email</th>
              <th>訂單品項</th>
              <th>應付金額</th>
              <th>是否付款</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{formatDate(order.create_at)}</td>
                  <td>{order.user?.email}</td>
                  <td>
                    <ul className="list-unstyled mb-0">
                      {Object.values(order.products || {}).map((item) => (
                        <li key={item.id}>
                          {item.product.title} x {item.qty}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{currency(order.total)}</td>
                  <td>
                    {order.is_paid ? (
                      <span className="text-success fw-bold">已付款</span>
                    ) : (
                      <span className="text-danger fw-bold">未付款</span>
                    )}
                  </td>
                  <td>
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => openModal(order)}
                      >
                        檢視
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deleteOrder(order.id)}
                      >
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  目前尚無訂單資料
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination pagination={pagination} onChangePage={getOrders} />
      </div>
      <OrderModal tempOrder={tempOrder} closeModal={closeModal} />
    </div>
  );
};

export default AdminOrders;
