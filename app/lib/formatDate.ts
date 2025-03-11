export const formatDate = (date: string) => {
  // Create a new Date object
  const dateObj = new Date(date);

  // Format the date
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long"
  });

  return formattedDate;
};
