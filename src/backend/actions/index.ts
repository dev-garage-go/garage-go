/*
Actions cannot be exported by default because next.js will generate a conflict. This file must contain only exports named
Example: export { functionExample } from './example-file'.
*/

// Admin
export { validateAdminPassword } from './admin/validateAdminPassword';

// Booking
export { createBooking } from './booking/createBooking';
export { getBookingsWithVehicleData } from './booking/getBookingsWithVehicleData';

// Emails
export { sendEmailAction } from './emails/send-email';

// Payment
export { calculateServiceCharge } from './payment/charges'

// Vehicle
export { getVehicleByLicensePlate } from './vehicle/getVehicleByLicensePlate';
export { addNewVehicle } from './vehicle/addNewVehicle';
