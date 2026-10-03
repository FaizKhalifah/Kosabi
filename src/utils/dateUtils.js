import { ResponseError } from "./errorsUtils.js";
export default calculateDueDate = (year, month, billingDay, rentalEndDate) => {
  if (!billingDay) {
    throw new ResponseError(400, "Billing day belum ditentukan pada rental");
  }

  const lastDayOfMonth = new Date(year, month, 0).getDate();

  const actualBillingDay = Math.min(billingDay, lastDayOfMonth);

  const dueDate = new Date(year, month - 1, actualBillingDay);

  const endDate = new Date(rentalEndDate);

  if (dueDate > endDate) {
    throw new ResponseError(400, "Tanggal jatuh tempo melebihi masa sewa");
  }

  return dueDate;
};
