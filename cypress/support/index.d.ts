/// <reference types="cypress" />

import "cypress-localstorage-commands";

declare global {
  namespace Cypress {
    interface Chainable {
      // Busca y selecciona un vehículo por patente
      searchExistingVehicle(licensePlate: string): Chainable<void>,
      createVehicle(licensePlate: string): Chainable<void>
    }
  }
}