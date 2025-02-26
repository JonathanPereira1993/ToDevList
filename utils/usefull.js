export const getFormattedDate = (date) => {
  if (!date || !(date instanceof Date)) {
    console.error("Invalid date passed to getFormattedDate:", date);
    return "";
  }

  const dateObject = new Date(date);

  const formattedDate = dateObject.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
};

export const getFormattedDateFull = (date) => {
  if (!date || !(date instanceof Date)) {
    console.error("Invalid date passed to getFormattedDate:", date);
    return "";
  }

  const dateYearMonthDay = getFormattedDate(date);

  const dateObject = new Date(date);

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const formattedDate = `${dateYearMonthDay} - ${hours}:${minutes}`;

  return formattedDate;
};
