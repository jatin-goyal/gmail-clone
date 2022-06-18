import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InboxIcon from "@mui/icons-material/Inbox";
import SendIcon from "@mui/icons-material/Send";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import StarIcon from "@mui/icons-material/Star";
import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhoneIcon from "@mui/icons-material/Phone";
import React, { useEffect, useState } from "react";
import "./SideBar.css";
import SideBarOption from "./SideBarOption";
import LabelImportant from "@mui/icons-material/LabelImportant";
import Duo from "@mui/icons-material/Duo";
import { useDispatch } from "react-redux";
import { openSendMessage } from "../features/mailSlice";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();

  const [emailList, setEmailList] = useState([]);
  const emailsCollectionRef = collection(db, "emails");
  const q = query(emailsCollectionRef, orderBy("time", "desc"));

  const getEmailList = async () => {
    const data = await getDocs(q);
    setEmailList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getEmailList();
  }, []);

  const dispatch = useDispatch();

  return (
    <div className="sidebar">
      <Button
        startIcon={<AddIcon fontSize="large" />}
        className="sidebar_compose"
        onClick={() => dispatch(openSendMessage())}
      >
        Compose
      </Button>
      <SideBarOption
        title="Inbox"
        Icon={InboxIcon}
        number={emailList.length}
        selected
      />
      <SideBarOption title="Sent" Icon={SendIcon} number="" />
      <SideBarOption title="Starred" Icon={StarIcon} number="" />
      <SideBarOption title="Snoozed" Icon={WatchLaterIcon} number="" />
      <SideBarOption title="Important" Icon={LabelImportant} number="" />

      <SideBarOption title="Drafts" Icon={ArticleIcon} number="" />
      <SideBarOption title="More" Icon={ExpandMoreIcon} />

      <div className="sidebar_footer">
        <div className="sidebar_footerIcons">
          <IconButton>
            <PersonIcon />
          </IconButton>
          <IconButton>
            <Duo />
          </IconButton>
          <IconButton>
            <PhoneIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
