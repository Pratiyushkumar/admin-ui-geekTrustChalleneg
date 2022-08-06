import React from "react";
import "./editTable.css";
import "../themes.css";

const EditTable = ({
  editableFormData,
  handleRowChange,
  handleEditFormSubmit,
}) => {
  return (
    <>
      <tr>
        <td>
          <input type="checkbox" name="admin_checkbox" id="" />
        </td>
        <td>
          <input
            type="text"
            name="name"
            id=""
            placeholder="Enter the name"
            value={editableFormData.name}
            onChange={handleRowChange}
          />
        </td>
        <td>
          <input
            type="email"
            name="email"
            id=""
            placeholder="Enter the email"
            value={editableFormData.email}
            onChange={handleRowChange}
          />
        </td>
        <td>
          <input
            type="text"
            name="role"
            id=""
            placeholder="Enter the role"
            value={editableFormData.role}
            onChange={handleRowChange}
          />
        </td>
        <td>
          <span>
            <i
              className="fa-solid fa-check span_check_btn"
              onClick={(e) => handleEditFormSubmit(e)}
            ></i>
          </span>
          {/* <span>
            <i className="fa-solid fa-xmark span_cross_btn"></i>
          </span> */}
        </td>
      </tr>
    </>
  );
};

export default EditTable;
