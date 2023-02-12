import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../app/messageAPIS";

function MessageBox({ chatId }) {
  const [message, setMessage] = useState();
  const dispatch = useDispatch();



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
  


  function handleSendingMessage(e) {
    e.preventDefault()
    if (!message || message.trim().length === 0) {
      return
    }
    dispatch(sendMessage(chatId, message))
  }

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
          onChange={(e) => setMessage(e.target.value)}
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
