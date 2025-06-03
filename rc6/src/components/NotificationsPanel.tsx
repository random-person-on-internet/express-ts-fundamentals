import { useDesignHubStore } from "../store";

export function NotificationsPanel() {
  const notifications = useDesignHubStore((s) => s.notifications);
  const addNotification = useDesignHubStore((s) => s.addNotification);
  const markAsRead = useDesignHubStore((s) => s.markAsRead);
  const clearNotifications = useDesignHubStore((s) => s.clearNotifications);

  const unread = notifications.filter((n) => !n.read);

  return (
    <div>
      <h3>Notifications</h3>
      <button
        onClick={() =>
          addNotification({
            id: Date.now().toString(),
            message: "New Notification!",
            read: false,
          })
        }
      >
        Add Notification
      </button>
      <button onClick={clearNotifications}>Clear All</button>
      <ul>
        {notifications.map((n) => (
          <li key={n.id}>
            {n.message} {n.read ? "(Read)" : "(Unread)"}
            {!n.read && (
              <button onClick={() => markAsRead(n.id)}>Mark as Read</button>
            )}
          </li>
        ))}
      </ul>
      <p>
        Total: {notifications.length}, Unread: {unread.length}
      </p>
    </div>
  );
}
