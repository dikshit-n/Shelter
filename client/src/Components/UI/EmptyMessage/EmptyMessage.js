import "./EmptyMessage.css";

const EmptyMessage = ({ message }) => {
  return (
    <div className="margin-auto fit-content">
      <div className="flex-center margin-auto empty-data"></div>
      <div className="empty-message-detail bold">
        <h6>{message || "No Details"}</h6>
      </div>
    </div>
  );
};

export default EmptyMessage;
