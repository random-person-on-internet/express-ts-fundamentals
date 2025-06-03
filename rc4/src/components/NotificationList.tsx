import useNotificationStore from "../store/notificationStore";

function NotificationList() {
  const notifications = useNotificationStore((state) => state.notifications);
  const markAsRead = useNotificationStore((state) => state.markAsRead);

  const unreadNotifications = notifications.filter((n) => !n.read);

  return (
    <div>
      <h2>Unread Notifications</h2>
      <ul>
        {unreadNotifications.map((n) => (
          <li key={n.id}>
            <strong>[{n.type.toUpperCase()}]</strong> {n.message}
            <button onClick={() => markAsRead(n.id)}>Mark as read</button>
          </li>
        ))}
        {unreadNotifications.length === 0 && <li>No unread notifications</li>}
      </ul>
    </div>
  );
}

export default NotificationList;
