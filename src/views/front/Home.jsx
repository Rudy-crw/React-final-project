import { Link } from "react-router";
const Home = () => {
  return (
    <div className="home-page">
      {/* =========================================
          1. 全螢幕背景圖 (Hero Background)
          使用 fixed + z-index:-1 讓它成為「背景」，
          這樣就不會影響到 FrontendLayout 的 Header，
          且 Header 會自然地浮在圖片上方。
          ========================================= */}
      <div
        className="hero-background"
        style={{
          position: "fixed", // 關鍵：固定在視窗，不佔用排版空間
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh", // 佔滿全螢幕
          zIndex: -1, // 關鍵：放在最底層，才不會擋住 Header
          overflow: "hidden",
        }}
      >
        {/* 圖片本體 */}
        <img
          src="https://github.com/Rudy-crw/React-live-week5/blob/main/src/public/HomeHero.png?raw=true"
          alt="R-Garage Hero"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // 保持比例填滿
            filter: "brightness(0.6)", // 降低亮度，讓白色文字更清楚
          }}
        />
      </div>

      {/* =========================================
          2. 首頁主要內容 (Hero Content)
          因為背景圖已經獨立出去了，這裡只需要處理文字。
          利用 min-vh-100 讓文字垂直置中於畫面。
          ========================================= */}
      <div
        className="container d-flex flex-column justify-content-center align-items-center text-white"
        style={{
          minHeight: "100vh", // 讓內容區塊高度至少為視窗高度
          paddingTop: "80px", // 避開 Header 的空間 (依視需求調整)
        }}
      >
        <div className="text-center animate__animated animate__fadeInUp">
          <h1
            className="display-1 fw-bold text-uppercase mb-3"
            style={{ letterSpacing: "5px" }}
          >
            R-Garage
          </h1>
          <p className="fs-3 fw-light mb-4 text-white-50">
            釋放你的騎士靈魂 | 頂級重機租賃
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link
              to="/products"
              className="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-bold shadow"
            >
              立即預約
            </Link>
            <a
              href="#intro"
              className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill"
            >
              了解更多
            </a>
          </div>
        </div>
      </div>

      {/* =========================================
          3. 其他區塊 (介紹/特色) - 美化版
          ========================================= */}
      <section
        id="intro"
        className="py-5 bg-light text-dark position-relative"
        style={{ zIndex: 1 }} // 確保蓋在 fixed 背景圖之上
      >
        {/* 在這裡加入一點點 CSS 來做 hover 動畫效果 */}
        <style>
          {`
            .feature-card {
              transition: all 0.3s ease;
              border: none;
            }
            .feature-card:hover {
              transform: translateY(-10px); /* 往上浮動 */
              box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important; /* 加深陰影 */
            }
            .icon-box {
              width: 80px;
              height: 80px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              transition: all 0.3s ease;
            }
            .feature-card:hover .icon-box {
              background-color: var(--bs-primary) !important;
              color: white !important;
            }
          `}
        </style>

        <div className="container py-5">
          <div className="row text-center">
            <div className="col-12 mb-5">
              <h2 className="fw-bold display-6">為什麼選擇 R-Garage？</h2>
              <div
                className="bg-primary mx-auto mt-3 rounded"
                style={{ width: "60px", height: "4px" }}
              ></div>
              <p className="text-muted mt-3 fs-5">
                我們不只租車，更提供一種生活態度
              </p>
            </div>

            {/* 特色卡片 1 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100 feature-card shadow-sm rounded-4 p-4 bg-white">
                <div className="card-body">
                  <div className="icon-box mb-4 bg-primary bg-opacity-10 text-primary rounded-circle fs-2">
                    <i className="bi bi-speedometer2"></i>
                  </div>
                  <h4 className="card-title fw-bold mb-3">極致性能</h4>
                  <p className="card-text text-muted">
                    提供 Ducati V4 S、BMW S1000RR
                    等頂級仿賽，保證原廠輸出，拒絕閹割馬力，體驗最純粹的速度感。
                  </p>
                </div>
              </div>
            </div>

            {/* 特色卡片 2 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100 feature-card shadow-sm rounded-4 p-4 bg-white">
                <div className="card-body">
                  <div className="icon-box mb-4 bg-primary bg-opacity-10 text-primary rounded-circle fs-2">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <h4 className="card-title fw-bold mb-3">安全保障</h4>
                  <p className="card-text text-muted">
                    每台車輛皆定期由原廠技師檢修，並含強制險與道路救援服務，輪胎與煞車絕對是最佳狀態。
                  </p>
                </div>
              </div>
            </div>

            {/* 特色卡片 3 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100 feature-card shadow-sm rounded-4 p-4 bg-white">
                <div className="card-body">
                  <div className="icon-box mb-4 bg-primary bg-opacity-10 text-primary rounded-circle fs-2">
                    <i className="bi bi-geo-alt-fill"></i>
                  </div>
                  <h4 className="card-title fw-bold mb-3">取車便利</h4>
                  <p className="card-text text-muted">
                    位於市中心交通樞紐，提供進口安全帽、手套與藍芽耳機租借。只需帶上您的駕照，隨時出發。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <Link
              to="/products"
              className="btn btn-outline-dark px-5 py-2 rounded-pill border-2 fw-bold"
            >
              查看全車系 (12款) <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>
      {/* =========================================
          4. 熱門精選車款 (Featured Models) - 深色區塊
          ========================================= */}
      <section className="py-5 bg-dark text-white">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-6">夢幻車庫 精選推薦</h2>
            <div
              className="bg-danger mx-auto mt-3 rounded"
              style={{ width: "60px", height: "4px" }}
            ></div>
            <p className="text-white-50 mt-3 fs-5">
              本月最受歡迎的熱門租賃車款
            </p>
          </div>

          <div className="row g-4">
            {/* 熱門車款 1 */}
            <div className="col-md-4">
              <div className="card h-100 bg-transparent border-light border-opacity-25 text-white feature-card">
                {/* 這裡先放假圖，之後可換成真實圖片 */}
                <div
                  style={{ height: "250px", overflow: "hidden" }}
                  className="rounded-top"
                >
                  <img
                    src="https://github.com/Rudy-crw/images/blob/main/tiny/12/12.jpg?raw=true"
                    className="w-100 h-100 object-fit-cover"
                    alt="Ducati"
                  />
                </div>
                <div className="card-body p-4">
                  <span className="badge bg-danger mb-2">義大利浪漫</span>
                  <h4 className="fw-bold">Ducati Panigale V4 S</h4>
                  <p className="text-white-50">
                    體驗 MotoGP 級別的空氣力學與狂暴 V4
                    引擎，征服賽道的終極武器。
                  </p>
                </div>
              </div>
            </div>
            {/* 熱門車款 2 */}
            <div className="col-md-4">
              <div className="card h-100 bg-transparent border-light border-opacity-25 text-white feature-card">
                <div
                  style={{ height: "250px", overflow: "hidden" }}
                  className="rounded-top"
                >
                  <img
                    src="https://github.com/Rudy-crw/images/blob/main/tiny/11/11.png?raw=true"
                    className="w-100 h-100 object-fit-cover"
                    alt="BMW"
                  />
                </div>
                <div className="card-body p-4">
                  <span className="badge bg-primary mb-2">德系工藝</span>
                  <h4 className="fw-bold">BMW S1000RR</h4>
                  <p className="text-white-50">
                    最聰明的電控系統搭配極致的直四引擎，完美平衡日常與賽道需求。
                  </p>
                </div>
              </div>
            </div>
            {/* 熱門車款 3 */}
            <div className="col-md-4">
              <div className="card h-100 bg-transparent border-light border-opacity-25 text-white feature-card">
                <div
                  style={{ height: "250px", overflow: "hidden" }}
                  className="rounded-top"
                >
                  <img
                    src="https://github.com/Rudy-crw/images/blob/main/tiny/01/1.jpg?raw=true"
                    className="w-100 h-100 object-fit-cover"
                    alt="Yamaha"
                  />
                </div>
                <div className="card-body p-4">
                  <span className="badge bg-info text-dark mb-2">日系熱血</span>
                  <h4 className="fw-bold">Yamaha YZF-R7</h4>
                  <p className="text-white-50">
                    純粹的彎道樂趣，CP2
                    引擎帶來充沛的低轉扭力，新手與老手都能享受。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <Link
              to="/products"
              className="btn btn-danger px-5 py-2 rounded-pill fw-bold"
            >
              前往車庫
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================
          5. 租車流程 (How it Works) - 純白區塊
          ========================================= */}
      <section className="py-5 bg-white text-dark">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-6">簡單 4 步驟，即刻啟程</h2>
            <div
              className="bg-primary mx-auto mt-3 rounded"
              style={{ width: "60px", height: "4px" }}
            ></div>
          </div>

          <div className="row text-center g-4 relative">
            <div className="col-6 col-md-3">
              <div className="display-4 text-primary mb-3">
                <i className="bi bi-phone"></i>
              </div>
              <h5 className="fw-bold">1. 線上預約</h5>
              <p className="text-muted small">選擇心儀車款與租借時段</p>
            </div>
            <div className="col-6 col-md-3">
              <div className="display-4 text-primary mb-3">
                <i className="bi bi-file-earmark-check"></i>
              </div>
              <h5 className="fw-bold">2. 審核確認</h5>
              <p className="text-muted small">客服將與您確認保險與細節</p>
            </div>
            <div className="col-6 col-md-3">
              <div className="display-4 text-primary mb-3">
                <i className="bi bi-key"></i>
              </div>
              <h5 className="fw-bold">3. 門市取車</h5>
              <p className="text-muted small">檢查車況、領取裝備與鑰匙</p>
            </div>
            <div className="col-6 col-md-3">
              <div className="display-4 text-primary mb-3">
                <i className="bi bi-wind"></i>
              </div>
              <h5 className="fw-bold">4. 盡情騎乘</h5>
              <p className="text-muted small">釋放靈魂，享受風的自由</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          6. 車友評價 (Testimonials) - 淺灰區塊
          ========================================= */}
      <section className="py-5 bg-light text-dark">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              {/* <i className="bi bi-quote display-1 text-primary opacity-50"></i> */}
              <h3 className="fw-bold mb-4">"這是我體驗過最棒的租車服務！"</h3>
              <p className="fs-5 text-muted fst-italic mb-4">
                「原本擔心租高階仿賽會有很多壓力，但 R-Garage
                的技師非常細心講解，車況好到像新車一樣。
                路線推薦也很棒，下次一定會再來租 S1000RR！」
              </p>
              <div>
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="User"
                  className="rounded-circle mb-2 shadow-sm"
                  style={{ width: "60px", height: "60px" }}
                />
                <h6 className="fw-bold mb-0">Rider_Chen</h6>
                <small className="text-muted">
                  租借車款：Ducati Panigale V4 S
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
