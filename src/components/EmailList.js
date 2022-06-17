import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { Checkbox, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import InboxIcon from "@mui/icons-material/Inbox";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import React, { useEffect, useState } from "react";
import "./EmailList.css";
import MoreVert from "@mui/icons-material/MoreVert";
import Section from "./Section";
import EmailRow from "./EmailRow";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export default function EmailList() {
  const [emailList, setEmailList] = useState([]);
  const emailsCollectionRef = collection(db, "emails");
  const q = query(emailsCollectionRef, orderBy("time", "desc"));

  const getEmailList = async () => {
    const data = await getDocs(q);
    setEmailList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    // console.log(emailList);
  };

  useEffect(() => {
    getEmailList();
  }, []);

  return (
    <div className="emailList">
      <div className="emailList_settings">
        <div className="emailList_settings_Left">
          <Checkbox />
          <IconButton>
            <ArrowDropDown />
          </IconButton>
          <IconButton
            onClick={() => {
              window.location.reload(false);
            }}
          >
            <RefreshIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>

        <div className="emailList_settings_Right">
          <IconButton>
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton>
            <ArrowForwardIosIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
      <div className="emailList_sections">
        <Section Icon={InboxIcon} title="Primary" color="red" selected />
        <Section Icon={PeopleIcon} title="Social" color="blue" />
        <Section Icon={LocalOfferIcon} title="Promotion" color="green" />
      </div>
      <div className="emailList_List">
        {emailList.map((email) => {
          return (
            <EmailRow
              id={email.id}
              key={email.id}
              title={email.to}
              subject={email.subject}
              description={email.message}
              time={new Date(email.time?.seconds * 1000).toString()}
            />
          );
        })}

        {/* <EmailRow
          title="alphabet"
          subject={"hello world"}
          description="this is a test"
          time="10:10pm"
        /> */}
      </div>
    </div>
  );
}
