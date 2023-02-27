import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMessages } from "../app/messageAPIS";
// import Message from "./Message";
import MessageBox from "./MessageBox";

import Skeleton from "react-loading-skeleton";
import MessagesSkeleton from "./MessagesSkeleton";

const PrivetChat = ({ socket }) => {
  const { chatId } = useParams();

  const dispatch = useDispatch();
  const { chats, loadingMessages, thisUser } = useSelector(
    (state) => state.default
  );

  const [chatData, setChatData] = useState(undefined);
  const chatBodyRef = useRef();

  useEffect(() => {
    socket.emit("join_chat", chatId);
    if (chatData) {
      if (
        !chats.find((chat) => chat._id === chatId).messages &&
        !loadingMessages
      ) {
        dispatch(getMessages(chatId));
      }
    }
  }, [dispatch, chatId, socket, chatData, loadingMessages, chats]);

  useEffect(() => {
    if (chats !== null && chats) {
      setChatData(chats.find((chat) => chat._id === chatId));
    }
  }, [chats, chatId, chatData]);

  useEffect(() => {
    if (chatData?.messages?.length > 0 && chatBodyRef?.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatData]);

  return (
    <div className="section-2 d-flex flex-fill">
      <header className="chat-header hstack p-3 justify-content-between">
        {!chatData || !thisUser ? (
          <div className="p-3 rounded-4 w-100 d-flex justify-content-start align-items-center gap-3">
            <Skeleton circle width={55} height={55} />
            <div className="vstack gap-2">
              <Skeleton width={150} />
              <Skeleton width={100} />
            </div>
          </div>
        ) : (
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
        )}

        <div>Options</div>
      </header>
      {loadingMessages || !thisUser ? (
        <MessagesSkeleton />
      ) : (
        <div className="chat-body" ref={chatBodyRef}>
          {chatData?.messages &&
            chatData.messages.map((message) => {
              return (
                <div
                  key={message._id}
                  className={`chat-message ${
                    (message.from._id === thisUser._id ||
                      message.from === thisUser._id) &&
                    "mine pl-auto"
                  }`}
                >
                  <div
                    className={`text ${
                      (message.from._id === thisUser._id ||
                        message.from === thisUser._id) &&
                      "mine"
                    }`}
                  >
                    {message.text}
                  </div>
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
      )}
      <MessageBox chatId={chatId} socket={socket} />
    </div>
  );
};

export default PrivetChat;
