import "cypress-localstorage-commands";

// Vehicle commands
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

  // busca el vehiculo en el local storage
  cy.getLocalStorage('vehicle')
    .should('exist')
    .then((value) => {
      const vehicle = JSON.parse(value as string)
      expect(vehicle.licensePlate).to.equal(licensePlate)
    })

  // se asegura de que los datos se muestren en la ui
  cy.get("h2")
    .should("exist")
    .contains(`Patente: ${licensePlate}`)
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
