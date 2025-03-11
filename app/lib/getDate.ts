const getDateRange = (range: number) => {
  const dates = [];
  const today = new Date();

  const date = new Date(today);

  for (let i = 0; i < range; i++) {
    date.setDate(today.getDate() - i);
    const formattedDate = `${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}/${date.getDate()}`;
    dates.push(formattedDate);
  }

  const year = date.getFullYear();

  return { dates, year };
};

const getMonthRange = (range: number) => {
  const months = [];
  const today = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  for (let i = 0; i < range; i++) {
    const date = new Date(today);
    date.setMonth(today.getMonth() - i);
    const formattedMonth = `${monthNames[date.getMonth()]}`;
    months.push(formattedMonth);
  }

  return months;
};

export { getDateRange, getMonthRange };
