import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import uniqid from "uniqid";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { format } from "date-fns";
import { GlobalFilter } from "./filter-global-component";

const TransactionsList = (props) => {
  const deleteTransaction = (id) => {
    axios
      .delete("http://localhost:4000/transactions/" + id)
      .then((res) => console.log(res.data));

    const updTransactions = props.transactions.filter((el) => el._id !== id);
    props.setTransactions(updTransactions);
  };

  const deleteAllTransactions = (id) => {
    axios
      .delete("http://localhost:4000/transactions/")
      .then((res) => console.log(res.data));

    const updTransactions = [];
    props.setTransactions(updTransactions);
  };

  const columns = React.useMemo(
    () => [
      { accessor: "account", Header: "Account" },
      {
        accessor: "date",
        Header: "Date",
        Cell: ({ value }) => {
          return format(new Date(value), "MM/dd/yyyy");
        },
      },
      { accessor: "type", Header: "Type" },
      { accessor: "action", Header: "Action" },
      { accessor: "quantity", Header: "Quantity" },
      { accessor: "underlyingsymbol", Header: "Symbol" },
      {
        accessor: "expiration",
        Header: "Expiration",
        Cell: ({ value }) => {
          return format(new Date(value), "MM/dd/yyyy");
        },
      },
      { accessor: "callput", Header: "C/P" },
      { accessor: "strikeprice", Header: "Strike" },
      { accessor: "avgprice", Header: "Avg" },
      { accessor: "value", Header: "Value" },
      { accessor: "commissions", Header: "Commissions" },
      { accessor: "fees", Header: "Fees" },
      { accessor: "order", Header: "Order" },
    ],
    []
  );

  const data = React.useMemo(() => props.transactions);

  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

  const { pageIndex } = state;

  return (
    <div className="p-3">
      <h3>Transactions ({props.transactions.length})</h3>
      <div>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <button onClick={() => deleteAllTransactions()}>Delete All</button>
      </div>
      <div>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
      <div className="table-responsive">
        <table
          {...getTableProps()}
          className="table table-hover align-middle align-items-center"
        >
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className="text-center"
                      >
                        {
                          // Render the header
                          column.render("Header")
                        }
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? "Y"
                              : "N"
                            : ""}
                        </span>
                      </th>
                    ))
                  }
                  <th>Actions</th>
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              page.map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()} id={"test" + row.original.id}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()} className="text-center">
                            {
                              // Render the cell contents
                              cell.render("Cell")
                            }
                          </td>
                        );
                      })
                    }
                    <td key={uniqid()}>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="actions"
                      >
                        {/* <Link className="" to={"/edit-transaction/" + row._id}> */}
                        <button
                          className="btn btn-primary nav-link"
                          onClick={(e) => console.log()}
                        >
                          <i className="bi bi-pen text-light"></i>
                        </button>
                        {/* </Link> */}
                        <button
                          className="btn btn-danger"
                          type="submit"
                          onClick={(e) => deleteTransaction(row._id)}
                        >
                          <i className="bi bi-x-circle icon-white"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsList;
