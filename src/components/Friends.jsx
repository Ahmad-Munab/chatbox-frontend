import React, { useEffect } from "react";
import SearchUser from "./SearchUser";

import { useSelector, useDispatch } from "react-redux";
import { getFriends, removeFriend } from "../app/friendAPIS";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Friends = () => {
  const { friends, loadingFriends } = useSelector((state) => state.default);
  const dispatch = useDispatch();

  function handleRemovingFriend(_id) {
    dispatch(removeFriend(_id))
  }

  useEffect(() => {
    friends === null && dispatch(getFriends());
  }, [dispatch, friends]);
  return (
    <div className="section-1">
      <h2 className="fw-semibold">All Friends</h2>
      <div className="add-plus-div">
        <div className="thin-blue">Add new friend</div>
        <SearchUser />
      </div>
      <hr className="w-100 bg-black mt-0" />
      <div className="vstack gap-4 overflow-auto hide-scrollbar">
        {loadingFriends ? (
          <p className="text-center">Loading...</p>
        ) : friends !== null && friends.length > 0 ? (
          friends.map((friend) => (
            <div key={friend._id} className="p-3 rounded-4 w-100 d-flex align-items-center gap-3 shadow-sm bg-white">
              <img src={friend.profilePic} alt={friend.username} style={{ width: "50px", background: "transparent" }} className=""/>
              <h4 className="text-center">{friend.username}</h4>
              {/* <FontAwesomeIcon icon="fa-regular fa-user-xmark" /> */}
              <i className="fa-solid fa-user-minus fs-4 ms-auto" onClick={() => handleRemovingFriend(friend._id)}></i>
            </div>
          ))
        ) : (
          <div className="mt-3 d-flex flex-column justify-content-between align-items-center">
            <h6 className="text-primary text-center">
              No friends
            </h6>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
