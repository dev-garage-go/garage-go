/*
Actions cannot be exported by default because next.js will generate a conflict. This file must contain only exports named
Example: export { functionExample } from './example-file'.
*/

export { validateAdminPassword } from './admin/validateAdminPassword';
export { createBooking } from './booking/createBooking';
export { getBookings } from './booking/getBookings';
export { sendEmailAction } from './emails/send-email';
export { calcMileageMaintenanceAmount } from './services/calcMileageMaintenanceAmount';
export { calcTiresChangeAmount } from './services/calcTiresChangeAmount';
export { getServiceAmount } from './services/getServicesAmount';
export { getVehicleByLicensePlate } from './vehicle/getVehicleByLicensePlata';
