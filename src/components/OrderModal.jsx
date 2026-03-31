import { currency } from "../utils/filter";

const OrderModal = ({ tempOrder, closeModal }) => {
  return (
    <div
      className="modal fade"
      id="orderModal"
      tabIndex="-1"
      aria-labelledby="orderModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title" id="orderModalLabel">
              訂單細節{" "}
              <span className="fs-6 text-white-50 ms-2">{tempOrder?.id}</span>
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={closeModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {tempOrder ? (
              <div className="row g-4">
                {/* 左側：用戶資訊 */}
                <div className="col-md-6">
                  <h5 className="fw-bold border-bottom pb-2">用戶資訊</h5>
                  <table className="table table-borderless mt-3">
                    <tbody>
                      <tr>
                        <th width="100">姓名</th>
                        <td>{tempOrder.user?.name}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{tempOrder.user?.email}</td>
                      </tr>
                      <tr>
                        <th>電話</th>
                        <td>{tempOrder.user?.tel}</td>
                      </tr>
                      <tr>
                        <th>地址</th>
                        <td>{tempOrder.user?.address}</td>
                      </tr>
                      <tr>
                        <th>留言/備註</th>
                        <td
                          className="text-danger fw-bold"
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {tempOrder.message || "無"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 右側：訂單品項 */}
                <div className="col-md-6">
                  <h5 className="fw-bold border-bottom pb-2">預約品項</h5>
                  <table className="table mt-3">
                    <thead>
                      <tr>
                        <th>品項</th>
                        <th>數量</th>
                        <th className="text-end">小計</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.values(tempOrder.products || {}).map((item) => (
                        <tr key={item.id}>
                          <td>{item.product.title}</td>
                          <td>
                            {item.qty} {item.product.unit}
                          </td>
                          <td className="text-end">
                            {currency(item.final_total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="2" className="text-end fw-bold">
                          總計金額
                        </td>
                        <td className="text-end fw-bold text-danger fs-5">
                          {currency(tempOrder.total)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>

                  <div className="mt-4 p-3 bg-light rounded text-center">
                    <span className="fw-bold me-2">付款狀態：</span>
                    {tempOrder.is_paid ? (
                      <span className="text-success fw-bold">
                        <i className="bi bi-check-circle-fill me-1"></i> 已付款
                      </span>
                    ) : (
                      <span className="text-danger fw-bold">
                        <i className="bi bi-x-circle-fill me-1"></i> 未付款
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p>讀取中...</p>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
