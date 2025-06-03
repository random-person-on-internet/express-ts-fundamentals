import useNotificationStore from "../store/notificationStore";

function NotificationTester() {
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );
  const clearNotifications = useNotificationStore(
    (state) => state.clearNotifications
  );

  return (
    <div>
      <h2>Notification Tester</h2>
      <button onClick={() => addNotification("Info message", "info")}>
        Add Info
      </button>
      <button onClick={() => addNotification("Success message", "success")}>
        Add Success
      </button>
      <button onClick={() => addNotification("Error message", "error")}>
        Add Error
      </button>
      <button onClick={clearNotifications}>Clear All</button>
    </div>
  );
}

export default NotificationTester;
