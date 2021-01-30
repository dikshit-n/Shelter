const Loader = (props) => (
  <div
    className="houses-container flex-row flex-wrap"
    style={{ position: "relative", marginTop: 30 }}
  >
    <div className="each-house flex-row" style={{ width: 550 }}>
      <div
        className="house-image skeleton-box"
        style={{ borderRadius: "50%", width: 100, height: 100 }}
      ></div>
      <div className="flex-column">
        <br />
        <div
          style={{
            width: "100px",
            height: 20,
            marginLeft: 10,
            marginBottom: 10,
          }}
          className="skeleton-box"
        />
        <div
          style={{
            width: "100%",
            height: 20,
            marginLeft: 10,
            marginBottom: 10,
          }}
          className="skeleton-box"
        />
      </div>
    </div>
    <div className="each-house flex-row" style={{ width: 550 }}>
      <div
        className="house-image skeleton-box"
        style={{ borderRadius: "50%", width: 100, height: 100 }}
      ></div>
      <div className="flex-column">
        <br />
        <div
          style={{
            width: "100px",
            height: 20,
            marginLeft: 10,
            marginBottom: 10,
          }}
          className="skeleton-box"
        />
        <div
          style={{
            width: "100%",
            height: 20,
            marginLeft: 10,
            marginBottom: 10,
          }}
          className="skeleton-box"
        />
      </div>
    </div>
    <div className="each-house flex-row" style={{ width: 550 }}>
      <div
        className="house-image skeleton-box"
        style={{ borderRadius: "50%", width: 100, height: 100 }}
      ></div>
      <div className="flex-column">
        <br />
        <div
          style={{
            width: "100px",
            height: 20,
            marginLeft: 10,
            marginBottom: 10,
          }}
          className="skeleton-box"
        />
        <div
          style={{
            width: "100%",
            height: 20,
            marginLeft: 10,
            marginBottom: 10,
          }}
          className="skeleton-box"
        />
      </div>
    </div>
  </div>
);

export default Loader;
