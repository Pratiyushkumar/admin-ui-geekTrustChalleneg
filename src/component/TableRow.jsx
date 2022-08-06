import React from "react";
import "./TableRow.css";

const TableRow = ({
  items,
  handleDeletionOfRow,
  handleEditRow,
  handleChangeSelection,
}) => {
  return (
    <>
      <tr key={items.id}>
        <td>
          <input
            type="checkbox"
            name={items.name}
            className="admin__checkbox"
            id={items.id}
            onChange={(e) => handleChangeSelection(e)}
            checked={items?.isChecked || false}
          />
        </td>
        <td>{items.name}</td>
        <td>{items.email}</td>
        <td>{items.role}</td>
        <td>
          <span className="span__edit__btn">
            <i
              className="fa-solid fa-pen-to-square edit__btn"
              onClick={(e) => handleEditRow(e, items)}
            ></i>
          </span>
          <span className="span__delete__btn">
            <i
              className="fa-solid fa-trash delete__btn"
              onClick={() => handleDeletionOfRow(items.id)}
            ></i>
          </span>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
