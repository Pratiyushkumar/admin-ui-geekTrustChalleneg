import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adminUi.css";
import "../themes.css";
import SearchInput from "./SearchInput";
import Pagination from "./Pagination";
import { apiGetEndpoint } from "../constants";
import TableRow from "./TableRow";
import EditTable from "./EditTable";

const AdminUI = () => {
  const [debounceTimeOut, setDebounceTimeOut] = useState(0);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [editDeatilsId, setEditDetailsId] = useState(null);
  const [editableFormData, setEditableFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  /**
   * fetchData is a function use to get data from the API aand set into
   * the userData state so that data gets rendered from the  API to
   * the browser.
   */
  const fetchData = async () => {
    try {
      const urlResponse = await axios.get(apiGetEndpoint);
      // console.log(urlResponse.data);
      urlResponse.data.forEach((ele) => (ele.isChecked = false));
      setUserData(urlResponse.data);
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Pagination concept
   */

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  let currentPageData = userData.slice(indexOfFirstData, indexOfLastData);

  const paginate = (number) => {
    setCurrentPage(number);
  };

  /**
   * deletion of row on clicking on delete button
   */
  const handleDeletionOfRow = (itemId) => {
    for (let i = 0; i < currentPageData.length; i++) {
      if (currentPageData[i].id === itemId) {
        let element = [...userData];
        element.splice(i, 1);
        setUserData(element);
      }
    }
  };
  /**
   * For Searching from seacrh box
   */
  const debounceSearch = (value) => {
    if (debounceTimeOut) {
      clearTimeout(debounceTimeOut);
    }
    let timerid = setTimeout(() => {
      handleSearch(value);
    }, 1000);
    setDebounceTimeOut(timerid);
  };

  const handleSearch = (value) => {
    let elements = [...userData];
    const searchText = elements.filter((ele) => {
      if (ele.name === value) {
        return ele;
      } else if (ele.email === value) {
        return ele;
      } else if (ele.role === value) {
        return ele;
      }
    });
    if (value === "") {
      setUserData(elements);
    } else {
      setUserData(searchText);
    }
  };

  /**
   * handleEditRow, handleRowChange, handleEditFormSubmit to edit row and submit form of row of table
   */

  const handleEditRow = (event, row) => {
    setEditDetailsId(row.id);
    const formValue = {
      name: row.name,
      email: row.email,
      role: row.role,
    };
    setEditableFormData(formValue);
  };

  const handleRowChange = (event) => {
    let inputName = event.target.name;
    let inputValue = event.target.value;
    const newUserData = { ...editableFormData };
    newUserData[inputName] = inputValue;
    setEditableFormData(newUserData);
  };

  const handleEditFormSubmit = (event) => {
    const editedDetails = {
      id: editDeatilsId,
      name: editableFormData.name,
      email: editableFormData.email,
      role: editableFormData.role,
    };
    const newData = [...userData];
    const index = userData.findIndex((ele) => ele.id === editDeatilsId);
    newData[index] = editedDetails;
    setUserData(newData);
    setEditDetailsId(null);
  };

  const handleChangeSelection = (e) => {
    const element = [...currentPageData];
    const { name, id, checked } = e.target;
    if (name === "allselect") {
      let tempData = userData.map((ele) => {
        if (element.includes(ele)) return { ...ele, isChecked: checked };
        else return ele;
      });
      setUserData(tempData);
    } else {
      let tempData = userData.map((ele) =>
        ele.id === id ? { ...ele, isChecked: checked } : ele
      );
      setUserData(tempData);
    }
  };

  const handleDeleteSelected = () => {
    let element = [...userData];
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].isChecked === true) {
        element.splice(element.indexOf(userData[i]), 1);
      }
    }
    setUserData(element);
  };

  return (
    <>
      <div className="admin__ui__container">
        <SearchInput debounceSearch={debounceSearch} />
        <div className="admin__table__container">
          <form action="">
            <table className="admin__table">
              <thead className="admin__table__heading">
                <tr className="admin__table__row">
                  <th>
                    <input
                      type="checkbox"
                      name="allselect"
                      id="admin__main__checkbox"
                      onChange={handleChangeSelection}
                    />
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="admin__table__body">
                {currentPageData.map((items) => (
                  <React.Fragment key={items.id}>
                    {editDeatilsId === items.id ? (
                      <EditTable
                        editableFormData={editableFormData}
                        handleRowChange={handleRowChange}
                        handleEditFormSubmit={handleEditFormSubmit}
                      />
                    ) : (
                      <TableRow
                        items={items}
                        handleDeletionOfRow={handleDeletionOfRow}
                        handleEditRow={handleEditRow}
                        handleChangeSelection={handleChangeSelection}
                      />
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </form>
        </div>
        <div className="adminui__footer">
          <div>
            <button className="button-deleted" onClick={handleDeleteSelected}>
              Delete Selected
            </button>
          </div>
          <div className="backwardButtons">
            <button
              className="left__last__page"
              onClick={() => setCurrentPage(1)}
            >
              <i className="fa-solid fa-angles-left left__last__page__button"></i>
            </button>
            <button
              className="left__page"
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              <i className="fa-solid fa-angle-left"></i>
            </button>
          </div>
          <Pagination
            dataPerPage={dataPerPage}
            totalData={userData.length}
            paginate={paginate}
          />
          <div className="forwardButtons">
            <button
              className="right__page"
              onClick={() => {
                if (currentPage < Math.ceil(userData.length / dataPerPage)) {
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              <i className="fa-solid fa-angle-right"></i>
            </button>
            <button
              className="right__last__page"
              onClick={() =>
                setCurrentPage(Math.ceil(userData.length / dataPerPage))
              }
            >
              <i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUI;
