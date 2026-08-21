import * as Notifications from 'expo-notifications';

export async function requestNotificationPermissions() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  return finalStatus;
}

export async function scheduleHabitReminder(habitId, title, timeString) {
  await cancelHabitReminder(habitId);
  if (!timeString) return null;

  const [hours, minutes] = timeString.split(':').map(Number);
  const now = new Date();
  const trigger = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0
  );

  if (trigger <= now) {
    trigger.setDate(trigger.getDate() + 1);
  }

  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: '💕 Habit Reminder',
      body: `Time for your daily habit: ${title}`,
      sound: true,
      data: { habitId },
    },
    trigger: {
      hour: hours,
      minute: minutes,
      repeats: true,
    },
  });

  return identifier;
}

export async function cancelHabitReminder(habitId) {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  const match = scheduled.find((n) => n.content.data?.habitId === habitId);
  if (match) {
    await Notifications.cancelScheduledNotificationAsync(match.identifier);
  }
}
