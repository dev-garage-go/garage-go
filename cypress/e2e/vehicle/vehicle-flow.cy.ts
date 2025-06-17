describe('Interacción con el Modal de Patente/Vehículo', () => {
  beforeEach(() => {
    cy.visit('/services/mileage_maintenance/contracting');
    cy.clearAllLocalStorage();
    cy.getLocalStorage("vehicle").should('be.null');

    cy.request('POST', '/api/testing/vehicle', {
      licensePlate: 'abc123',
      brand: 'Chevrolet',
      model: 'Tracker LTZ AT',
      year: '2019',
      mileage: 80000,
      type: 'suv / camioneta'
    })
  });

  const existingLicensePlate = 'abc123'
  const nonExistingLicensePlate = 'qwe456'
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
      .type(existingLicensePlate)


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

  it('Se encuentra un vehiculo en la DB, con la patente ingresada', () => {

    // selecciona el modal
    cy.get('[data-cy="cy-vehicle-modal"]').should('be.visible')

    // escribe ABC123 en el input de la patente
    cy.get('[data-cy="cy-vehicle-modal"] input[name="licensePlate"]')
      .should('be.visible')
      .type(existingLicensePlate)

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
        expect(vehicle.licensePlate).to.equal(existingLicensePlate)
      })
  });


  // ---------
  // Test 3: NO se encuentra un vehiculo en base de datos, el modal cambia

  it('No se encuentra vehiculo en DB, cambia el formulario', () => {

    // selecciona el modal
    cy.get('[data-cy="cy-vehicle-modal"]').should('be.visible')

    // escribe QWE456 en el input de la patente
    cy.get('[data-cy="cy-vehicle-modal"] input[name="licensePlate"]')
      .should('be.visible')
      .type(nonExistingLicensePlate)

    // clickea el boton enviando el formulario
    cy.get('[data-cy="cy-vehicle-modal"] form')
      .find('button[type="submit"]')
      .should('not.be.disabled')
      .click()

    // busca los inputs del nuevo formulario
    cy.get('[data-cy="cy-vehicle-modal"] form')
      .find('input[name="licensePlate"]')

    cy.get('[data-cy="cy-vehicle-modal"] form')
      .find('input[name="brand"]')

    cy.get('[data-cy="cy-vehicle-modal"] form')
      .find('input[name="model"]')

    cy.get('[data-cy="cy-vehicle-modal"] form')
      .find('input[name="year"]')

    cy.get('[data-cy="cy-vehicle-modal"] form')
      .find('input[name="mileage"]')
  });


  // ---------
  // Test 4: Se crea un vehiculo en la DB

  it.only('Se crea un vehiculo en la DB', () => {

    // selecciona el modal
    cy.get('[data-cy="cy-vehicle-modal"]').should('be.visible')

    // escribe QWE456 en el input de la patente
    cy.get('[data-cy="cy-vehicle-modal"] input[name="licensePlate"]')
      .should('be.visible')
      .type(nonExistingLicensePlate)

    // clickea el boton enviando el formulario
    cy.get('[data-cy="cy-vehicle-modal"] form')
      .find('button[type="submit"]')
      .should('not.be.disabled')
      .click()

    // rellena los inputs con los datos del vehiculo del usuario
    cy.get('[data-cy="cy-vehicle-modal"] form')
      .find('input[name="licensePlate"]')
      .type(nonExistingLicensePlate)

    cy.get('[data-cy="cy-vehicle-modal"] form')
      .find('input[name="brand"]')
      .type('Ford')

    cy.get('[data-cy="cy-vehicle-modal"] form')
      .find('input[name="model"]')
      .type('Mustang')

    cy.get('[data-cy="cy-vehicle-modal"] form')
      .find('input[name="year"]')
      .type('2019')

    cy.get('[data-cy="cy-vehicle-modal"] form')
      .find('input[name="mileage"]')
      .type('25500')

    cy.get('[data-cy="cy-vehicle-modal"] form')
      .find('button[data-cy="custom-select"]')
      .click()
    cy.contains('alta gama').click()

    // clickea el boton enviando el formulario
    cy.get('[data-cy="cy-vehicle-modal"] form')
      .find('button[type="submit"]')
      .should('not.be.disabled')
      .click()

    // verifica que los datos se estan mostrando en la UI
    cy.get("h2")
      .should("exist")
      .contains(`Patente: ${nonExistingLicensePlate}`)
  });
});