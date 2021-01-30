const Loader = (props) => (
  <div
    className="houses-container flex-row flex-wrap"
    style={{ position: "relative", marginTop: 30 }}
  >
    <div
      className="each-house d-flex justify-content-between"
      style={{ width: 550 }}
    >
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
      <div
        style={{ width: 100, height: 50, borderRadius: 10, marginTop: 10 }}
        className="skeleton-box"
      />
    </div>
    <div
      className="each-house d-flex justify-content-between"
      style={{ width: 550 }}
    >
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
      <div
        style={{ width: 100, height: 50, borderRadius: 10, marginTop: 10 }}
        className="skeleton-box"
      />
    </div>
    <div
      className="each-house d-flex justify-content-between"
      style={{ width: 550 }}
    >
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
      <div
        style={{ width: 100, height: 50, borderRadius: 10, marginTop: 10 }}
        className="skeleton-box"
      />
    </div>
  </div>
);

export default Loader;
