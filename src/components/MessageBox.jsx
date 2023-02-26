import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, sendMessageSuccess } from "../app/actions";
import { sendMessage } from "../app/messageAPIS";

function MessageBox({ chatId, socket }) {
  const messageInput = useRef()
  const dispatch = useDispatch();
  const { thisUser } = useSelector((state) => state.default)

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
  


  async function handleSendingMessage(e) {
    e.preventDefault()
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
        />
        <label htmlFor="message" className="form-label message-label">
          Send Message
        </label>
        <i className="fa-regular fa-face-smile btn fs-2 message-smile-icon"/>
      </div>
      <button
        className="fa-solid fa-arrow-right-long btn btn-primary fs-2"
        type="submit"
        style={{ backgroundColor: "#5B96F7"}}
      />
    </form>
  );
}

export default MessageBox;
