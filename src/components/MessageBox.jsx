import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../app/actions";
import { sendMessage } from "../app/messageAPIS";

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

function MessageBox({ chatId, socket }) {
    // const [permissionGranted, setPermissionGranted] = useState(false);

  // useEffect(() => {
  //   // Request notification permission
  //   if ("Notification" in window) {
  //     Notification.requestPermission().then((permission) => {
  //       if (permission === "granted") {
  //         setPermissionGranted(true);
  //       }
  //     });
  //   }
  // }, []);

  // const showNotification = () => {
  //   // Create a notification
  //   if (permissionGranted) {
  //     new Notification("My notification title", {
  //       body: "My notification body",
  //     });
  //   } else {
  //     // Request notification permission
  //     if ("Notification" in window) {
  //       Notification.requestPermission().then((permission) => {
  //         if (permission === "granted") {
  //           setPermissionGranted(true);
  //         }
  //       });
  //     }
  //   }
  // };


  const messageInput = useRef()
  const dispatch = useDispatch();
  const { thisUser } = useSelector((state) => state.default)

  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  async function handleSendingMessage(e) {
    e.preventDefault()
    setShowEmojiPicker(false)
    let message = messageInput.current.value
    if (!message || message.trim().length === 0) {
      return
    }

    const message_data = {
      from: thisUser._id,
      to: chatId,
      text: message,
      createdAt: new Date().toISOString(),
      _id: new Date().toISOString()
    }
    await socket.emit("send_message", message_data)
    dispatch(sendMessage(chatId, message, thisUser._id))
    messageInput.current.value = ""
  }

  useEffect(() => {
    socket.on("receive_message", (message_data) => {
      dispatch(addMessage(message_data))
    })
  }, [dispatch, socket])

  

  return (
    <form className="chat-footer" onSubmit={handleSendingMessage}>
      <div className="form-floating d-flex flex-fill justify-conetnt-between align-items-center">
        {/* <i className="fa-sharp fa-solid fa-link btn fs-2 message-link-icon"/> */}
        <input
          type="text"
          className="form-control"
          name="message"
          id="message"
          placeholder="Send message"
          ref={messageInput}
          autoComplete="off"
          autoFocus={true}
        />
        <label htmlFor="message" className="form-label message-label">
          Send Message
        </label>
        <i className="fa-regular fa-face-smile btn fs-2 message-emoji-icon btn" onClick={() => setShowEmojiPicker(!showEmojiPicker)}/>
      </div>
      <button
        className="fa-solid fa-arrow-right-long btn btn-primary fs-2"
        type="submit"
        style={{ backgroundColor: "#5B96F7"}}
      />
      {showEmojiPicker && <div className="emojiPicker"><Picker data={data} onEmojiSelect={(emoji) => {messageInput.current.value = `${messageInput.current.value+emoji.native}`; messageInput.current.focus() }}/></div>}
    </form>
  );
}

export default MessageBox;
