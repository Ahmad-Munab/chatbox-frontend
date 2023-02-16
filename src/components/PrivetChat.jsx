import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMessages } from "../app/messageAPIS";
// import Message from "./Message";
import MessageBox from "./MessageBox";

const PrivetChat = ({ socket }) => {
  const { chatId } = useParams();
  const [joinedChat, setJoinedChat] = useState(false);

  const dispatch = useDispatch();
  const { chats, loadingMessages, thisUser } = useSelector(
    (state) => state.default
  );

  const [chatData, setChatData] = useState();
  const chatBodyRef = useRef()

  useEffect(() => {
    let thisChat = chats?.find((chat) => chat._id === chatId)
    if (Array.isArray(chats) && !chatData && !thisChat?.messages) {
      dispatch(getMessages(chatId));
    }

    if (!joinedChat) {
      socket.emit("join_chat", chatId)
      setJoinedChat(true)
    }
  }, [dispatch, chatId, chats, chatData, socket, joinedChat]);

  useEffect(() => {
    if (chats !== null) {
      setChatData(chats.find((chat) => chat._id === chatId));
    }
  }, [chats, chatId]);

  useEffect(() => {
    if (chatData?.messages?.length > 0) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatData]);

  return (
    <div className="section-2 d-flex flex-fill">
      {loadingMessages || !chatData || !thisUser ? (
        "Loading..."
      ) : (
        <>
          <header className="chat-header hstack p-3 justify-content-between">
            <div className="hstack gap-3">
              <img
                src={
                  chatData.users[1].profilePic !== thisUser.profilePic
                    ? chatData.users[1].profilePic
                    : chatData.users[0].profilePic
                }
                alt={chatData.users[0].handle}
                style={{ width: "60px" }}
                className="rounded-circle"
              />
              <div className="vstack pt-1">
                <h5>
                  {chatData.users[1].username !== thisUser.username
                    ? chatData.users[1].username
                    : chatData.users[0].username}
                </h5>
                <p>is online</p>
              </div>
            </div>
            <div>Options</div>
          </header>
          <div className="chat-body" ref={chatBodyRef}>
            {chatData?.messages &&
              chatData.messages.map((message) => {
  
                return (
                  <div key={message._id} className={`chat-message ${message.from._id === thisUser._id && "mine pl-auto"}`}>
                    <div className={`text ${message.from._id === thisUser._id && "mine"}`}>{message.text}</div>
                    <div className="time">
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
      <MessageBox chatId={chatId}  socket={socket}/>
    </div>
  );
};

export default PrivetChat;
