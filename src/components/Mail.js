import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PrintIcon from "@mui/icons-material/Print";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LabelIcon from "@mui/icons-material/Label";
import ErrorIcon from "@mui/icons-material/Error";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import React from "react";
import "./Mail.css";
import MoreVert from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectOpenMail } from "../features/mailSlice";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function Mail() {
  let navigate = useNavigate();
  const selectedMail = useSelector(selectOpenMail);
  // console.log(selectedMail);

  const deleteMail = async (id) => {
    const userMail = doc(db, "emails", id);
    await deleteDoc(userMail);
    navigate("/");
  };

  return (
    <div className="mail">
      <div className="mail_tools">
        <div className="mail_toolLeft">
          <IconButton onClick={() => navigate("/")}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton>
            <MoveToInboxIcon />
          </IconButton>
          <IconButton>
            <ErrorIcon />
          </IconButton>
          <IconButton onClick={() => deleteMail(selectedMail?.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton>
            <MarkAsUnreadIcon />
          </IconButton>
          <IconButton>
            <WatchLaterIcon />
          </IconButton>
          <IconButton>
            <CheckCircleIcon />
          </IconButton>
          <IconButton>
            <LabelIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
        <div className="mail_toolsRight">
          <IconButton>
            <UnfoldMoreIcon />
          </IconButton>

          <IconButton>
            <PrintIcon />
          </IconButton>

          <IconButton>
            <ExitToAppIcon />
          </IconButton>
        </div>
      </div>
      <div className="mail_body">
        <div className="mail_header">
          <h2> {selectedMail?.subject}</h2>
          {/* <LabelIcon className="mail_important" /> */}
          <div className="mail_info">
            <div>
              <h4>From: {selectedMail?.from || "Not Available"}</h4>
              <h4>To: {selectedMail?.title}</h4>
            </div>

            <p>{selectedMail?.time}</p>
          </div>
        </div>
        <div className="mail_message">{selectedMail?.description}</div>
      </div>
    </div>
  );
}
