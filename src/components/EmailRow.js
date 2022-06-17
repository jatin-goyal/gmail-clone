import React from "react";
import "./EmailRow.css";
import { Checkbox, IconButton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LabelImportant from "@mui/icons-material/LabelImportant";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectMail } from "../features/mailSlice";
import { auth } from "../firebase";

export default function EmailRow({ id, title, subject, time, description }) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  let from = auth.currentUser.email;
  let senderName = auth.currentUser.displayName;
  const openMail = () => {
    dispatch(
      selectMail({
        id,
        from,
        senderName,
        title,
        subject,
        time,
        description,
      })
    );

    navigate("/mail");
  };

  return (
    <div className="emailRow" onClick={openMail}>
      <div className="emailRow_options">
        <IconButton>
          <Checkbox />
        </IconButton>
        <IconButton>
          <StarBorderIcon />
        </IconButton>
        <IconButton>
          <LabelImportant />
        </IconButton>
      </div>
      <h3 className="emailRow_title">{senderName}</h3>
      <div className="emailRow_message">
        <h4>
          {subject}
          <span className="emailRow_description">{description}</span>
        </h4>
      </div>

      <div className="time">{time}</div>
    </div>
  );
}
