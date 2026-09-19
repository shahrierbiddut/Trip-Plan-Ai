
const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");
const getBaseUrl = () => `${API_URL}/api/notifications`;

export interface Notification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "trip" | "system";
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export const fetchNotifications = async (userId: string): Promise<Notification[]> => {
  try {
    const response = await fetch(`${getBaseUrl()}/${userId}`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.warn("Could not fetch notifications, backend might be down.");
    return [];
  }
};

export const fetchUnreadCount = async (userId: string): Promise<number> => {
  try {
    const response = await fetch(`${getBaseUrl()}/${userId}/unread`);
    if (!response.ok) return 0;
    const data = await response.json();
    return data.data.count || 0;
  } catch (error) {
    console.warn("Could not fetch unread count, backend might be down.");
    return 0;
  }
};

export const markNotificationAsRead = async (id: string): Promise<void> => {
  await fetch(`${getBaseUrl()}/${id}/read`, { method: "PATCH" });
};

export const markAllNotificationsAsRead = async (userId: string): Promise<void> => {
  await fetch(`${getBaseUrl()}/user/${userId}/read-all`, { method: "PATCH" });
};

export const deleteNotification = async (id: string): Promise<void> => {
  await fetch(`${getBaseUrl()}/${id}`, { method: "DELETE" });
};

export const createTestNotification = async (userId: string): Promise<Notification> => {
  const response = await fetch(`${getBaseUrl()}/test`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId })
  });
  const data = await response.json();
  return data.data;
};
