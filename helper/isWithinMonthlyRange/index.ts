const isWithinMonthlyRange = (start: Date, end: Date, month: Date) => {
  return (
    start.getMonth() < month.getMonth() && month.getMonth() < end.getMonth()
  );
};

export default isWithinMonthlyRange;
