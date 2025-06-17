describe('Interacción con el Modal de Patente/Vehículo', () => {
  beforeEach(() => {
    cy.visit('/services/mileage_maintenance/contracting');
    cy.clearAllLocalStorage();
    cy.getLocalStorage("vehicle").should('be.null');
  });



  // ---------
  // Test 1: Ingresar patente y validar si se esta buscando

  it('Ingresar una patente y simular la búsqueda', () => {
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
  it.only('Se encuentra un vehiculo con la patente ingresada', () => {

    // selecciona el modal
    cy.get('[data-cy="cy-vehicle-modal"]').should('be.visible')

    // escribe ABC123 en el input de la patente
    cy.get('[data-cy="cy-vehicle-modal"] input[name="licensePlate"]')
      .should('be.visible')
      .type('ABC123')

    // clickea el boton enviando el formulario
    cy.get('[data-cy="cy-vehicle-modal"] form')
      .find('button[type="submit"]')
      .should('not.be.disabled')
      .click()

    // busca el vehiculo en el local storage
    cy.getLocalStorage('vehicle')
      .should('exist')
  });
});