import { getBookingByID } from './booking/getBookingByID';
/*
Actions cannot be exported by default because next.js will generate a conflict. This file must contain only exports named
Example: export { functionExample } from './example-file'.
*/

// Admin
export { validateAdminPassword } from './admin/validateAdminPassword';
export { sendNewServiceState } from './admin/sendNewServiceState';

// Booking
export { createBooking } from './booking/createBooking';
export { getBookingsWithVehicleData } from './booking/getBookingsWithVehicleData';
export { getBookings } from './booking/getBookings';
export { getBookingByID } from './booking/getBookingByID';
export { updateBookingWithOrderID } from './booking/updateBookingWithOrderId';

// Emails
export { sendOrderStateEmail } from './emails/sendOrderStateEmail'

// Payment
export { calculateFinalChargeByService } from './payment/charges/by-service'
export { calculateBaseChargeByVehicle } from './payment/charges/by-vehicle'
export { getBaseAmountInCookie, loadBaseAmountInCookie, deleteBaseAmountInCookie } from './payment/cookies/amount'

// Vehicle
export { getVehicleByLicensePlate } from './vehicle/getVehicleByLicensePlate';
export { getVehicleByID } from './vehicle/getVehicleByID';
export { addNewVehicle } from './vehicle/addNewVehicle';

// Orders
export { createInitialOrder } from './orders/createInitialOrder'
export { updateInitialOrder } from './orders/updateInitialOrder'
export { getOrderByID } from './orders/getOrderByID'
export { getOrderBySecureToken } from './orders/getOrderBySecureToken'
