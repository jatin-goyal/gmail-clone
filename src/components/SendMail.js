import React from "react";
import "./SendMail.css";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "../features/mailSlice";
import { db, auth } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { create } from "@mui/material/styles/createTransitions";

export default function SendMail() {
  console.log(auth.currentUser.email);
  const emailsCollectionRef = collection(db, "emails");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const createEmail = async (formData) => {
    let timeNow = new Date();

    await addDoc(emailsCollectionRef, {
      senderName: auth.currentUser.displayName,
      from: auth.currentUser.email,
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      time: timeNow,
    });
  };

  const onSubmit = (formData) => {
    console.log(formData);
    createEmail(formData);
    dispatch(closeSendMessage());
  };

  return (
    <div className="sendMail">
      <div className="sendMail_header">
        <h3>New Message</h3>
        <CloseIcon
          className="sendMail_close"
          onClick={() => dispatch(closeSendMessage())}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="To"
          {...register("to", {
            required: {
              value: true,
              message: "This is required",
            },
          })}
        />

        {errors.to && <p className="sendMail_error">To is required</p>}
        <input
          // name="subject"
          type="text"
          placeholder="Subject"
          {...register("subject", {
            required: {
              value: true,
              message: "This is required",
            },
          })}
        />
        {errors.subject && (
          <p className="sendMail_error">Subject is required</p>
        )}
        <input
          // name="message"
          style={{ border: "none" }}
          type="text"
          className="sendMail_message"
          {...register("message", {
            required: {
              value: true,
              message: "This is required",
            },
          })}
        />
        {errors.message && (
          <p className="sendMail_error">message is required</p>
        )}
        <div className="sendMail_options">
          <Button
            className="sendMail_send"
            variant="contained"
            color="primary"
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
