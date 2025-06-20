import "cypress-localstorage-commands";

// ! Vehicle commands
Cypress.Commands.add("searchExistingVehicle", (licensePlate: string) => {
  // selecciona el modal
  cy.get('[data-cy="cy-vehicle-modal"]').should('be.visible')

  // escribe ABC123 en el input de la patente
  cy.get('[data-cy="cy-vehicle-modal"] input[name="licensePlate"]')
    .should('be.visible')
    .type(licensePlate)

  // clickea el boton enviando el formulario
  cy.get('[data-cy="cy-vehicle-modal"] form')
    .find('button[type="submit"]')
    .should('not.be.disabled')
    .click()

  // se asegura de que los datos se muestren en la ui
  cy.get("h2")
    .should("exist")
    .contains(`Patente: ${licensePlate}`)

  // busca el vehiculo en el local storage
  cy.getLocalStorage('vehicle')
    .should('exist')
    .then((value) => {
      const vehicle = JSON.parse(value as string)
      expect(vehicle.licensePlate).to.equal(licensePlate)
    })

  // verifica que el modal se cerró
  cy.get('[data-cy="cy-vehicle-modal"]').should('not.exist')
})

Cypress.Commands.add("createVehicle", (licensePlate: string) => {
  cy.request('POST', '/api/testing/vehicle', {
    licensePlate: licensePlate,
    brand: 'Chevrolet',
    model: 'Tracker LTZ AT',
    year: '2019',
    mileage: 80000,
    type: 'suv / camioneta'
  })
})

// ! Vehicle commands
Cypress.Commands.add("loadMileageService", () => {
  cy.get("button")
    .contains("50.000 kms")
    .click()

  cy.get('button[type="submit"]')
    .contains("Continuar")
    .click()

  // verifica que se haya redirigido a booking
  cy.url().should('include', '/mileage_maintenance/booking')

  // verifica que exista el servicio en el local storage
  cy.getLocalStorage('service')
    .should('exist')
    .then((value) => {
      const service = JSON.parse(value as string)
      expect(service.name).to.equal("mileage_maintenance")
      expect(service.type).to.equal("mileage")
      expect(service.mileages).to.equal("50.000 kms")
    })
})
