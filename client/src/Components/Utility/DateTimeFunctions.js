export const getTimeCollapsed = (timestamp) => {
  if (
    timestamp !== null &&
    timestamp !== undefined &&
    timestamp?.toString().length !== 0
  ) {
    const date = new Date(timestamp);
    return (
      date.getHours() +
      " : " +
      (date.getMinutes().toString().length === 1
        ? "0" + date.getMinutes()
        : date.getMinutes())
    );
  }
  return "--";
};
