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
export { calculateFinalChargeByService } from './payment/charges/by-service'
export { calculateBaseChargeByVehicle } from './payment/charges/by-vehicle'
export { getBaseAmountInCookie, setBaseAmountInCookie } from './payment/cookies/amount'

// Vehicle
export { getVehicleByLicensePlate } from './vehicle/getVehicleByLicensePlate';
export { addNewVehicle } from './vehicle/addNewVehicle';
