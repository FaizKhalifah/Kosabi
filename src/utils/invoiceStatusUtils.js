export default calculateStatus = (paidAmount, totalAmount, dueDate) => {
  if (paidAmount >= totalAmount) {
    return "PAID";
  }

  const now = new Date();

  if (now > dueDate) {
    return "OVERDUE";
  }

  if (paidAmount > 0) {
    return "PARTIAL";
  }

  return "UNPAID";
};
