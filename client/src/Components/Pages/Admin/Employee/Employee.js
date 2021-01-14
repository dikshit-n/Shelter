import { useEffect, useState } from "react";
import ReactTable from "../../../UI/ReactTable/ReactTable";
import "./Employee.css";
import EachView from "./EachView/EachView";
import uniqueId from "uniqid";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeesAdmin } from "../../../redux/Admin/Employees/actions";
import RefreshButton from "../../../UI/RefreshButton/RefreshButton";
import { NavLink } from "react-router-dom";
import AsyncButton from "../../../UI/AsyncButton/AsyncButton";
import ErrorBox from "../../../UI/ErrorBox/ErrorBox";
import EmptyMessage from "../../../UI/EmptyMessage/EmptyMessage";
import { axiosInstance } from "../../../Utility/axiosInstance";
import { capitalize } from "../../../Utility/stringFunctions";

var mount = 1;

const Employee = (props) => {
  const [containerId] = useState(uniqueId());
  const [eachDetail, setEachDetail] = useState({});
  const dispatch = useDispatch();
  const data = useSelector((state) => state.employeesAdmin.data);
  const loading = useSelector((state) => state.employeesAdmin.loading);
  const tableError = useSelector((state) => state.employeesAdmin.error) || "";
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = () => {
    dispatch(fetchEmployeesAdmin());
  };

  useEffect(() => {
    if (props.location.state?.refresh || mount === 1) {
      mount = 0;
      fetchData();
    }
  }, []);

  const getTableData = () => {
    return data.map((el) => {
      return {
        name: el.name,
        phone: el.phone ? el.phone[0] : "",
        designation: capitalize(el.designation?.split("_").join(" ")),
        actions: {
          className: "pointer",
          onClick: () => {
            open(el);
            gatherData(el._id);
          },
        },
      };
    });
  };
  const gatherData = (id) => {
    setDetailLoading(true);
    setError("");
    axiosInstance
      .post("/admin/view/employee/single", { employeeId: id })
      .then((res) => {
        console.log(res.data);
        setDetailLoading(false);
        setEachDetail({ ...res.data });
      })
      .catch((err) => {
        console.log(err);
        setDetailLoading(false);
        setEachDetail((prev) => ({ ...prev }));
        setError("Something went wrong!");
      });
  };

  const open = (detail) => {
    setEachDetail({ ...detail });
    const container = document.getElementById(containerId);
    if (container.classList.contains("employee-scroll-right"))
      container.classList.remove("employee-scroll-right");
    container.classList.add("employee-scroll-left");
  };
  const close = () => {
    const container = document.getElementById(containerId);
    if (container.classList.contains("employee-scroll-left"))
      container.classList.remove("employee-scroll-left");
    container.classList.add("employee-scroll-right");
  };

  const addNewEmployee = (
    <div className="d-inline-flex" style={{ width: "100%" }}>
      <NavLink to="/employees/addemployee">
        <AsyncButton
          // onClick={openModal}
          disabled={loading}
          className="bg-green white buses-header-button"
        >
          Add
        </AsyncButton>
      </NavLink>
    </div>
  );

  return (
    <div className="employee-scroller-container">
      <div className="view-employees-container" id={containerId}>
        <div className="view-employees-table">
          <ReactTable
            aboveTable={addNewEmployee}
            loading={loading}
            loaderCount={[5, 3]}
            data={getTableData()}
            extraComponent={
              <RefreshButton
                onClick={fetchData}
                className="refresh-button"
                loading={loading}
              />
            }
            // data={tableData.details}
            emptyMessage={
              tableError.length > 0 ? (
                <ErrorBox message="We ran into trouble ! Try again" />
              ) : (
                <EmptyMessage message="No Employees so far" />
              )
            }
            columns={[
              {
                Header: "Name",
                accessor: "name",
              },
              {
                Header: "Phone",
                accessor: "phone",
              },
              {
                Header: "Designation",
                accessor: "designation",
              },
            ]}
          />
        </div>
        <div className="each-employee-view-container">
          <EachView
            error={error}
            loading={detailLoading}
            afterUpdate={fetchData}
            onClick={open}
            close={close}
            details={eachDetail}
          />
        </div>
      </div>
    </div>
  );
};

export default Employee;
