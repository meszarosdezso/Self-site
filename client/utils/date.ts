export const parseISO8601 = (date: string) =>
  date.split("T")[0].replace(/-/g, "/")
