import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMessages } from "../app/messageAPIS";
// import Message from "./Message";
import MessageBox from "./MessageBox";

const PrivetChat = () => {
  const { chatId } = useParams();

  const dispatch = useDispatch();
  const { chats, loadingMessages, thisUser } = useSelector(
    (state) => state.default
  );

  const [chatData, setChatData] = useState();

  useEffect(() => {
    if (Array.isArray(chats) && !chatData) {
      dispatch(getMessages(chatId));
    }
  }, [dispatch, chatId, chats, chatData]);

  useEffect(() => {
    if (chats !== null) {
      setChatData(chats.find((chat) => chat._id === chatId));
    }
  }, [chats, chatId]);

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
          <div className="chat-body vstack">
            {chatData?.messages &&
              chatData.messages.map((message) => {
                return (
                  <div key={message._id} className="d-flex mb-1">
                    <div className="d-flex align-items-center mr-3">
                      <img
                        src={message.profilePic}
                        alt={message.username}
                        className="rounded-circle"
                        width="50"
                        height="50"
                      />
                    </div>
                    <div className="card bg-light p-3">
                      <p className="card-text">{message.text}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
      <MessageBox chatId={chatId} />
    </div>
  );
};

export default PrivetChat;
