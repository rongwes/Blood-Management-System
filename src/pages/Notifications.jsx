import React from 'react';
import { useNotifications } from '../../context/NotificationContext';

const Notifications = () => {
  const { notifications, markAsRead } = useNotifications();

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((notif) => (
          <div
            key={notif.id}
            style={{
              background: notif.read ? '#e0e0e0' : '#ffe4b2',
              padding: '10px',
              margin: '10px 0',
              borderLeft: '5px solid orange',
            }}
          >
            <p>{notif.message}</p>
            {!notif.read && (
              <button onClick={() => markAsRead(notif.id)}>Mark as Read</button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
