import { toast } from "@/hooks/use-toast";

// Define notification types
export type NotificationType = 
  | "petition_assigned"
  | "investigation_started"
  | "investigation_completed"
  | "decision_made"
  | "petition_closed";

// Define notification priority
export type NotificationPriority = "low" | "medium" | "high";

// Define notification recipient
export interface NotificationRecipient {
  userId: string;
  email: string;
  phoneNumber?: string;
  name: string;
}

// Define notification content
export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  timestamp: string;
  petitionId: string;
  petitionNumber: string;
  recipients: NotificationRecipient[];
  read: boolean;
}

class NotificationService {
  private static instance: NotificationService;
  private notifications: Notification[] = [];

  private constructor() {}

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Send notification to recipients
  public async sendNotification(notification: Omit<Notification, "id" | "timestamp" | "read">): Promise<void> {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
    };

    // Store notification
    this.notifications.push(newNotification);

    // Send email notifications
    await this.sendEmailNotifications(newNotification);

    // Send push notifications
    await this.sendPushNotifications(newNotification);

    // Show toast notification
    toast({
      title: newNotification.title,
      description: newNotification.message,
      variant: newNotification.priority === "high" ? "destructive" : "default",
    });
  }

  // Get notifications for a user
  public getNotifications(userId: string): Notification[] {
    return this.notifications.filter(notification => 
      notification.recipients.some(recipient => recipient.userId === userId)
    );
  }

  // Mark notification as read
  public markAsRead(notificationId: string, userId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  // Private helper methods
  private async sendEmailNotifications(notification: Notification): Promise<void> {
    // In a real app, this would send emails using a service like SendGrid or AWS SES
    // Implementation would go here
  }

  private async sendPushNotifications(notification: Notification): Promise<void> {
    // In a real app, this would send push notifications using a service like Firebase Cloud Messaging
    // Implementation would go here
  }
}

export default NotificationService; 