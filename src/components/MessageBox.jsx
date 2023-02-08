import React, { useState, useEffect } from "react";

function MessageBox() {
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    // Request notification permission
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setPermissionGranted(true);
        }
      });
    }
  }, []);

  const showNotification = () => {
    // Create a notification
    if (permissionGranted) {
      new Notification("My notification title", {
        body: "My notification body",
      });
    } else {
      // Request notification permission
      if ("Notification" in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            setPermissionGranted(true);
          }
        });
      }
    }
  };

  return (
    <div>
      <button onClick={showNotification}>Show Notification </button>
    </div>
  );
}

export default MessageBox;
