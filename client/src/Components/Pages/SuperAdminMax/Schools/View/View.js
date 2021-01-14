import { useEffect, useState } from "react";
import ReactTable from "../../../../UI/ReactTable/ReactTable";
import "./View.css";
import EachView from "./EachView/EachView";
import uniqueId from "uniqid";
import { useDispatch, useSelector } from "react-redux";
import RefreshButton from "../../../../UI/RefreshButton/RefreshButton";
import { axiosInstance } from "../../../../Utility/axiosInstance";
import AsyncButton from "../../../../UI/AsyncButton/AsyncButton";
import { NavLink } from "react-router-dom";
import { fetchSchoolsSuperAdminMax } from "../../../../redux/SuperadminMax/Schools/actions";
import ErrorBox from "../../../../UI/ErrorBox/ErrorBox";
import EmptyMessage from "../../../../UI/EmptyMessage/EmptyMessage";

var mount = 1;

const View = (props) => {
  const [containerId] = useState(uniqueId());
  const [eachDetail, setEachDetail] = useState({});
  const dispatch = useDispatch();
  const data = useSelector((state) => state.schoolsSuperadminMax.data);
  const loading = useSelector((state) => state.schoolsSuperadminMax.loading);
  const tableError =
    useSelector((state) => state.schoolsSuperadminMax.error) || "";
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = () => {
    dispatch(fetchSchoolsSuperAdminMax());
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
        parentName: el.parentName,
        name: el.name,
        age: el.age,
        email: el.email,
        phone: el.phone ? el.phone[0] : "",
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
      .post("company/view/superadmin/single", { _id: id })
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
    const container = document.getElementById(containerId);
    if (container.classList.contains("parent-scroll-right"))
      container.classList.remove("parent-scroll-right");
    container.classList.add("parent-scroll-left");
  };
  const close = () => {
    const container = document.getElementById(containerId);
    if (container.classList.contains("parent-scroll-left"))
      container.classList.remove("parent-scroll-left");
    container.classList.add("parent-scroll-right");
  };

  const addNewStudent = (
    <div className="d-inline-flex" style={{ width: "100%" }}>
      <NavLink to="/admin/add">
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
    <div className="parent-scroller-container">
      <div className="view-parents-container" id={containerId}>
        <div className="view-parents-table">
          <ReactTable
            aboveTable={addNewStudent}
            style={{ position: "relative" }}
            extraComponent={
              <RefreshButton
                onClick={fetchData}
                className="refresh-button"
                loading={loading}
              />
            }
            loading={loading}
            loaderCount={[5, 3]}
            data={getTableData()}
            // data={tableData.details}
            emptyMessage={
              tableError.length > 0 ? (
                <ErrorBox message="We ran into trouble ! Try again" />
              ) : (
                <EmptyMessage message="No Admins so far" />
              )
            }
            columns={[
              {
                Header: "Name",
                accessor: "name",
              },
              {
                Header: "Email",
                accessor: "email",
              },
              {
                Header: "Phone",
                accessor: "phone",
                sortable: false,
                filterable: false,
              },
            ]}
          />
        </div>
        <div className="each-parent-view-container">
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

export default View;
