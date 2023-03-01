import EditIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
import React, { useMemo, useState } from "react";
import "./actions.css";

function ActionsButtons({ handleDelete, handleEdit, classNames }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const { container, actionButton, actionButtonOptions } = useMemo(() => {
    let classList = {
      container: "",
      actionButton: "",
      actionButtonOptions: "",
    };
    if (classNames) classList = { ...classList, ...classNames };
    return classList;
  }, []);

  return (
    <div className={`action-buttons-container ${container}`}>
      <button
        onClick={handleClick}
        className={`actions-button ${actionButton}`}
      >
        <MoreHorizSharpIcon />
      </button>
      <div
        className={`action-buttons-options ${
          open ? "open" : ""
        } ${actionButtonOptions}`}
      >
        <button
          onClick={() => {
            setOpen(false);
            handleDelete();
          }}
        >
          <DeleteOutlineIcon />
        </button>
        <button
          onClick={() => {
            setOpen(false);
            handleEdit();
          }}
        >
          <EditIcon />
        </button>
      </div>
    </div>
  );
}

export default ActionsButtons;
