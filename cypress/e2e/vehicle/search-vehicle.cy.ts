describe('Interacción con el Modal de Patente/Vehículo', () => {
  beforeEach(() => {
    cy.clearAllLocalStorage() // clear local storage to assure that vehicle modal will be search the vehicle
    cy.visit('/services/mileage_maintenance/contracting'); // visit the page
    cy.getLocalStorage("vehicle").should('be.null') // vehicle key from @/features/vehicles
  });


  // ---------
  // Test 1: Ingresar patente y validar si se esta buscando

  it.only('Ingresar una patente y simular la búsqueda', () => {
    // get vehicle modal container
    cy.get('[data-cy="cy-vehicle-modal"]')
      .should('be.visible')

      // find the form inside modal
      .find('form').should('be.visible')

      // inside the form, searchs the input to writting de license plate
      .find('input[name="licensePlate"]')
      .should('be.visible')
      .type('ABC123')


    // selects the form again to find the submit button
    cy.get('[data-cy="cy-vehicle-modal"]')
      .find('form')
      .find('button[type="submit"]')
      .should('not.be.disabled')
      .should('contain', 'Continuar')
      .click();

    // verifies if the submit button state has change
    cy.get('[data-cy="cy-vehicle-modal"]')
      .find('form')
      .find('button[type="submit"]')
      .should('contain', 'Buscando...');
  });


  // ---------
  // Test 2: Se encuentra un vehiculo en base de datos
});