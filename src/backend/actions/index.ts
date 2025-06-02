/*
if the default export (export * from './folder/file") is used in this file,
the Next compiler may give warnings about possible conflicts.

Important: For this reason you must export each function individually.
Example: export { func } from './folder/file'
*/

export { validateAdminPassword } from './admin/validateAdminPassword';
export { createBooking } from './booking/createBooking';
export { getBookings } from './booking/getBookings';
export { sendEmailAction } from './emails/send-email';
export { calcMileageMaintenanceAmount } from './services/calcMileageMaintenanceAmount';
export { calcTiresChangeAmount } from './services/calcTiresChangeAmount';
export { getServiceAmount } from './services/getServicesAmount';
