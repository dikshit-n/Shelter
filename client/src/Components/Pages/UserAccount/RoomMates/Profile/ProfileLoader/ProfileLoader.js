import MyCard from "../../../../../UI/MyCard/MyCard";

const ProfileLoader = (props) => {
  return (
    <MyCard style={{ width: "80%", margin: "auto", marginTop: 50 }}>
      <div
        className="skeleton-box"
        style={{ width: 100, height: 30, borderRadius: 20 }}
      ></div>
      <br />
      <div className="profile-logo-container">
        <div className="profile-logo skeleton-box"></div>
      </div>
      <div>
        <br />
        <div
          className="skeleton-box"
          style={{ width: "100%", height: 40, borderRadius: 10 }}
        ></div>

        <br />
        <div
          className="skeleton-box"
          style={{ width: "100%", height: 40, borderRadius: 10 }}
        ></div>

        <br />
        <div
          className="skeleton-box"
          style={{ width: "100%", height: 40, borderRadius: 10 }}
        ></div>

        <br />
        <div
          className="skeleton-box"
          style={{ width: "100%", height: 40, borderRadius: 10 }}
        ></div>

        <br />
        <div
          className="skeleton-box"
          style={{ width: "100%", height: 40, borderRadius: 10 }}
        ></div>

        <br />
        <div
          className="skeleton-box"
          style={{ width: "100%", height: 40, borderRadius: 10 }}
        ></div>

        <br />
        <div
          className="skeleton-box"
          style={{ width: "100%", height: 40, borderRadius: 10 }}
        ></div>

        <br />
        <br />
        <div
          className="skeleton-box"
          style={{ width: 100, height: 50, borderRadius: 40 }}
        ></div>
      </div>
    </MyCard>
  );
};

export default ProfileLoader;
