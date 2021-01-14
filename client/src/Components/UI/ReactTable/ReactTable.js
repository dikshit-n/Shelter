// import "./ReactTable.css";

// const ReactTable = (props) => {
//   return (
//     <div className="react-table-container container">
//       <table className="rwd-table">
//         <tbody>
//             <tr>
//             {
//                 props.options.map((el, index) => (
//                 <th>{el.Header}</th>
//                 ))
//             }
//             </tr>

//           <tr>
//             <th>Supplier Code</th>
//             <th>Supplier Name</th>
//             <th>Invoice Number</th>
//             <th>Invoice Date</th>
//             <th>Due Date</th>
//             <th>Net Amount</th>
//           </tr>
//           <tr>
//             <td data-th="Supplier Code">UPS5005</td>
//             <td data-th="Supplier Name">UPS</td>
//             <td data-th="Invoice Number">ASDF19218</td>
//             <td data-th="Invoice Date">06/25/2016</td>
//             <td data-th="Due Date">12/25/2016</td>
//             <td data-th="Net Amount">$8,322.12</td>
//           </tr>
//           <tr>
//             <td data-th="Supplier Code">UPS3449</td>
//             <td data-th="Supplier Name">UPS South Inc.</td>
//             <td data-th="Invoice Number">ASDF29301</td>
//             <td data-th="Invoice Date">6/24/2016</td>
//             <td data-th="Due Date">12/25/2016</td>
//             <td data-th="Net Amount">$3,255.49</td>
//           </tr>
//           <tr>
//             <td data-th="Supplier Code">BOX5599</td>
//             <td data-th="Supplier Name">BOX Pro West</td>
//             <td data-th="Invoice Number">ASDF43000</td>
//             <td data-th="Invoice Date">6/27/2016</td>
//             <td data-th="Due Date">12/25/2016</td>
//             <td data-th="Net Amount">$45,255.49</td>
//           </tr>
//           <tr>
//             <td data-th="Supplier Code">PAN9999</td>
//             <td data-th="Supplier Name">Pan Providers and Co.</td>
//             <td data-th="Invoice Number">ASDF33433</td>
//             <td data-th="Invoice Date">6/29/2016</td>
//             <td data-th="Due Date">12/25/2016</td>
//             <td data-th="Net Amount">$12,335.69</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ReactTable;.

/*eslint-disable*/
import React, { Fragment, useState } from "react";
import {
  useTable,
  useFilters,
  // useAsyncDebounce,
  useSortBy,
  usePagination,
  useAsyncDebounce,
  useGlobalFilter,
} from "react-table";
// import classnames from "classnames";
import "./ReactTable.css";
// A great library for fuzzy filtering/sorting items
import { matchSorter } from "match-sorter";
// react plugin used to create DropdownMenu for selecting items
import Select from "react-select";

// reactstrap components
import { Container, Row, Col, FormGroup, Input } from "reactstrap";
import Loader from "./Loader/Loader";
import GlobalFilter from "./GlobalFilter/GlobalFilter";

var showEmpty = false;

// Define a default UI for filtering

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

// Our table component
function Table({
  columns,
  aboveTable = null,
  data,
  emptyMessage,
  number = true,
  loading,
  loaderCount,
  extraComponent = null,
  style = null,
}) {
  const [numberOfRows, setNumberOfRows] = React.useState({
    value: 10,
    label: "10 rows",
  });
  const [pageSelect, handlePageSelect] = React.useState({
    value: 0,
    label: "Page 1",
  });
  const [showEmpty, setShowEmpty] = useState(false);
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
    column,
  }) {
    // const [showEmpty, setShowEmpty] = useState(false);
    const count = preFilteredRows.length;

    return (
      <div></div>
      // <FormGroup>
      //   <Input
      //     // style={{ maxWidth: 180 }}
      //     // placeholder={`Search ${count} records...`}
      //     className="react-table-input"
      //     type="text"
      //     onChange={async (e) => {
      //       await setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      //       if (column.filteredRows?.length === 0) {
      //         setShowEmpty(true);
      //       } else {
      //         setShowEmpty(false);
      //       }
      //     }}
      //   />
      // </FormGroup>
    );
  }

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    visibleColumns,
    nextPage,
    pageOptions,
    pageCount,
    previousPage,
    canPreviousPage,
    canNextPage,
    setPageSize,
    gotoPage,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: {
        pageSize: 10000000000000000000000000000000000000000000000000000,
        pageIndex: 0,
      },
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  // const firstPageRows = rows.slice(0, 10);
  let pageSelectData = Array.apply(
    null,
    Array(pageOptions.length)
  ).map(function () {});
  let numberOfRowsData = [5, 10, 20, 25, 50, 100];
  return (
    <div
      className="ReactTable -striped -highlight primary-pagination"
      style={style}
    >
      {/* <div className="pagination-top">
          <div className="-pagination">
            <div className="-previous">
              <button
                style={{ backgroundColor: "coral" }}
                type="button"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="-btn"
              >
                Previous
              </button>
            </div>
            <div className="-center">
              <Container>
                <Row className="justify-content-center">
                  <Col md="4" sm="6" xs="12">
                    <Select
                      className="react-select primary"
                      classNamePrefix="react-select"
                      name="pageSelect"
                      value={pageSelect}
                      onChange={(value) => {
                        gotoPage(value.value);
                        handlePageSelect(value);
                      }}
                      options={pageSelectData.map((prop, key) => {
                        return {
                          value: key,
                          label: "Page " + (key + 1),
                        };
                      })}
                      // placeholder="Choose Page"
                    />
                  </Col>
                  <Col md="4" sm="6" xs="12">
                    <Select
                      className="react-select primary"
                      classNamePrefix="react-select"
                      name="numberOfRows"
                      value={numberOfRows}
                      onChange={(value) => {
                        setPageSize(value.value);
                        setNumberOfRows(value);
                      }}
                      options={numberOfRowsData.map((prop) => {
                        return {
                          value: prop,
                          label: prop + " rows",
                        };
                      })}
                      // placeholder="Choose Rows"
                    />
                  </Col>
                </Row>
              </Container>
            </div>
            <div className="-next">
              <button
                style={{ backgroundColor: "coral" }}
                type="button"
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="-btn"
              >
                Next
              </button>
            </div>
          </div>
        </div> */}
      {extraComponent}
      <div className="my-table-container">
        <div style={{ width: "fit-content", minWidth: "100%" }}>
          <div className="above-table">
            <div style={{ flex: 1 }}>{aboveTable}</div>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </div>
          <table
            {...getTableProps()}
            className="rwd-table react-table-container"
          >
            <thead className="rt-thead -header">
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="rt-tr"
                  onClick={() => {}}
                >
                  {number ? (
                    <th
                      style={{
                        padding: 10,
                        minWidth: 50,
                        maxWidth: "fit-content",
                      }}
                    >
                      NO
                    </th>
                  ) : null}
                  {headerGroup.headers.map((column, key) => {
                    column = {
                      ...column,
                      canFilter:
                        columns[key].filterable === undefined
                          ? true
                          : columns[key].filterable,
                    };
                    headerGroups.map((el, index) => {
                      // console.log(el.headers);
                      el.headers.map((ele, index) => {
                        // console.log(ele.filteredRows);
                        // console.log(ele);
                        if (ele.filteredRows?.length === 0) {
                          // setShowEmpty(true);
                          // ele.filteredRows = [{}]
                        }
                      });
                    });
                    return (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        onClick={() => {}}
                        // style={{ padding: 0 }}
                        // className={classnames("rt-th rt-resizable-header", {
                        //   "-cursor-pointer": headerGroup.headers.length - 1 !== key,
                        //   "-sort-asc": column.isSorted && !column.isSortedDesc,
                        //   "-sort-desc": column.isSorted && column.isSortedDesc,
                        // })}
                      >
                        <div>
                          <div
                            className="rt-resizable-header-content"
                            style={{ fontSize: 13 }}
                          >
                            {column.render("Header")}
                          </div>
                          {/* Render the columns filter UI */}
                          <div>
                            {
                              // headerGroup.headers.length - 1 === key
                              //   ? null
                              column.canFilter ? column.render("Filter") : null
                              // <div className="dummy-text-box"></div>
                            }
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            {data.length === 0 && !loading && !showEmpty ? null : ( // </div> //   {emptyMessage ? emptyMessage : <h4>...</h4>} // <div className="empty-message-container">
              <Fragment>
                <tbody {...getTableBodyProps()} className="rt-tbody">
                  {page.map((row, i) => {
                    prepareRow(row);
                    // console.log(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        {...row.original.actions}
                        //   className={classnames(
                        //     "rt-tr",
                        //     { " -odd": i % 2 === 0 },
                        //     { " -even": i % 2 === 1 }
                        //   )}
                      >
                        {number ? (
                          <td style={{ minWidth: 50, maxWidth: "fit-content" }}>
                            {i + 1}
                          </td>
                        ) : null}
                        {row.cells.map((cell, index) => {
                          return (
                            <td
                              data-th={cell.column.Header}
                              style={{ maxWidth: 250 }}
                              {...cell.getCellProps()}
                              className="rt-td overflow-elipsis"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
                {showEmpty ? (
                  <tbody className="rt-tbody">
                    <tr>
                      <td
                        style={{ minWidth: 50, maxWidth: "fit-content" }}
                      ></td>
                      {columns.map((el, index) => (
                        <td></td>
                      ))}
                    </tr>
                  </tbody>
                ) : null}
              </Fragment>
            )}
            {loading ? (
              <tbody>
                <Loader number={number} count={loaderCount} />
              </tbody>
            ) : null}
          </table>
          <div>
            {data.length === 0 && !loading ? (
              <div className="empty-message-container">
                {emptyMessage ? (
                  emptyMessage
                ) : (
                  <p style={{ margin: 0 }}>Empty </p>
                )}
              </div>
            ) : null}
          </div>
        </div>
        <div className="pagination-bottom"></div>
      </div>
    </div>
  );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== "number";

export default Table;
