import { axiosInstance } from "../../../Utility/axiosInstance";
import * as actionTypes from "../../constants";

// View Buses

const fetchBusesStartAdmin = () => {
  return {
    type: actionTypes.FETCH_BUSES_START_ADMIN,
  };
};

const fetchBusesSuccessAdmin = (data) => {
  return {
    type: actionTypes.FETCH_BUSES_SUCCESS_ADMIN,
    data,
  };
};
const fetchBusesFailureAdmin = (error) => {
  return {
    type: actionTypes.FETCH_BUSES_FAILURE_ADMIN,
    error,
  };
};

export const fetchBusesAdmin = () => {
  return (dispatch) => {
    dispatch(fetchBusesStartAdmin());
    axiosInstance
      .get("admin/view/bus")
      .then((res) => {
        console.log(res.data);
        dispatch(fetchBusesSuccessAdmin([...res.data]));
      })
      .catch((err) => {
        console.log(err);
        let error = "Something went wrong!";
        if (err.response) {
          error = err.response.message;
        }
        dispatch(fetchBusesFailureAdmin(error));
      });
  };
};

// Bus Log

const fetchBusLogStartAdmin = () => {
  return {
    type: actionTypes.FETCH_BUSES_LOG_START_ADMIN,
  };
};
const fetchBusLogRunningSuccessAdmin = (data) => {
  return {
    type: actionTypes.FETCH_BUSES_LOG_RUNNING_SUCCESS_ADMIN,
    data,
  };
};

const fetchBusLogIdleSuccessAdmin = (data) => {
  return {
    type: actionTypes.FETCH_BUSES_LOG_IDLE_SUCCESS_ADMIN,
    data,
  };
};
const fetchBusLogEmergencySuccessAdmin = (data) => {
  return {
    type: actionTypes.FETCH_BUSES_LOG_EMERGENCY_SUCCESS_ADMIN,
    data,
  };
};
const fetchBusLogFailureAdmin = (error) => {
  return {
    type: actionTypes.FETCH_BUSES_LOG_FAILURE_ADMIN,
    error,
  };
};

export const fetchBusLogAdmin = (status, busId, logTime) => {
  let time, url, func;
  if (status === "running") {
    url = "/admin/view/buslog/live";
    time = Date.now();
    func = fetchBusLogRunningSuccessAdmin;
  } else if (status === "idle") {
    url = "/admin/view/buslog";
    time = logTime;
    func = fetchBusLogIdleSuccessAdmin;
  } else if (status === "emergency") {
    url = "/admin/view/buslog";
    time = logTime;
    func = fetchBusLogEmergencySuccessAdmin;
  }
  console.log(url);
  console.log(new Date(time).getTime());
  console.log(new Date(time));
  return (dispatch) => {
    dispatch(fetchBusLogStartAdmin());
    axiosInstance
      .post(url, {
        busId,
        time,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(func(res.data === "" ? null : res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          fetchBusLogFailureAdmin(
            err.response?.statusText || "Something went wrong!"
          )
        );
      });
  };
};
