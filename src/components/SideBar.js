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
import React from "react";
import "./SideBar.css";
import SideBarOption from "./SideBarOption";
import LabelImportant from "@mui/icons-material/LabelImportant";
import Duo from "@mui/icons-material/Duo";
import { useDispatch } from "react-redux";
import { openSendMessage } from "../features/mailSlice";

export default function SideBar() {
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
      <SideBarOption title="Inbox" Icon={InboxIcon} number="54" selected />
      <SideBarOption title="Starred" Icon={StarIcon} number="4" />
      <SideBarOption title="Snoozed" Icon={WatchLaterIcon} number="2" />
      <SideBarOption title="Important" Icon={LabelImportant} number="10" />
      <SideBarOption title="Sent" Icon={SendIcon} number="22" />
      <SideBarOption title="Drafts" Icon={ArticleIcon} number="5" />
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
