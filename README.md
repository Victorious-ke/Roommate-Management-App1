## Notifications Feature

This branch introduces a Notifications Center to the app. Users can now view, filter, and manage in-app notifications in one place.


Notification Bell (Navbar)

Shows unread count.

Dropdown preview of recent notifications.

Links to the full Notification Center.

Notification Center Page (/notifications)

Displays all notifications in a scrollable list.

Supports filtering by type (bills, chores, messages, events).

Filter by unread vs all.

Ability to:

Mark a single notification as read (click it).

Mark all as read.

Clear all notifications.

Integration with Authentication

Notifications are only available when the user is logged in (isAuthenticated = true).

Guests are redirected to /login if they attempt to access /notifications.

## Implementation Details

State Management: Powered by zustand via useNotificationStore.

Routes:

/notifications → full Notification Center (protected).

/ (Home) → shows a notification summary teaser.

Components:

NotificationsPage.jsx → main notification center UI.

Navbar.jsx → notification bell with unread count.

ProtectedRoute.jsx → wrapper to protect private routes.

## Testing the Feature

Start the app:

npm run dev


Go to Home (/) → You’ll see a notification summary.

Go to Login (/login) → Use the temporary “Mock Login” button until real login is merged.

Once logged in:

Navbar appears with notification bell.

Click the bell to preview notifications or go to Notification Center.