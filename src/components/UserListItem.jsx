export default function UserListItem({ user, friends, onAddFriend }) {
    return (
      <div
        className="d-flex justify-content-start m-2 p-3 gap-3 border rounded-3"
      >
        <img
          src={user.profilePic}
          alt={user.username}
          style={{ width: "50px" }}
          className="rounded-circle"
        />
        <h5>{user.username}</h5>
        <p>{user.handle}</p>
        {friends.some((friend) => friend.handle === user.handle) ? (
          <i className="fa-solid fa-circle-check fs-2 text-center ms-auto"></i>
        ) : (
          <i
            className={`fa-regular fa-square-plus my-auto ms-auto me-2 fs-2 btn`}
            onClick={() => onAddFriend(user._id)}
          ></i>
        )}
      </div>
    );
  }