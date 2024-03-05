export const dateFormat = (timestamp: string) =>
  new Date(timestamp).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const timeFormat = (timestamp: string) =>
  new Date(timestamp).toLocaleTimeString(
    Intl.DateTimeFormat().resolvedOptions().locale,
    {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    },
  );
