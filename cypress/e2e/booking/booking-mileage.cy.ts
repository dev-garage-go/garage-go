describe("Reservas: Mantencion por Kilometraje", () => {
  beforeEach(() => {
    cy.clearAllLocalStorage();
    cy.getLocalStorage("service").should('be.null');
    cy.getLocalStorage("vehicle").should('be.null');

    // partimos desde aqui para:
    // 1. Simular el flujo de un usuario real
    // 2. Para que se calcule correctamente el monto en base al vehiculo y al servicio
    // 3. Para que la cookie 'baseAmount' desde el backend se establezca correctamente
    cy.visit('/services/mileage_maintenance/contracting')
    cy.createVehicle('abc123')
    cy.searchExistingVehicle('abc123')
    cy.loadMileageService()

    cy.visit('/services/mileage_maintenance/booking')
  })

  // ---------
  // Test 1: Verifica que exista un service en el localStorage

  it("Verificar que existe un 'service' en el localStorage", () => {
    cy.getLocalStorage('service')
      .should('exist')
      .then((value) => {
        const service = JSON.parse(value as string)
        expect(service.name).to.equal("mileage_maintenance")
        expect(service.type).to.equal("mileage")
        expect(service.mileages).to.equal("50.000 kms")
      })
  })


  // ---------
  // Test 2: Borra el 'service' del localStorage para ver si el guard funciona

  it("Guard: Si no existe un service en localStorage, debe sacarme", () => {
    cy.log("delete 'service' from localStorage")
    cy.removeLocalStorage('service')
    cy.visit('/services/mileage_maintenance/booking')
    cy.url().should('not.include', '/booking')
    cy.url().should('include', '/services')
  })


  // ---------
  // Test 3: Verificar inputs y completar el form con data

  it.only("Verificar inputs y rellenarlos", () => {
    // validating if exist booking form container
    cy.log("validating if the booking form exist")
    cy.get('[data-cy="cy-booking-form"] div', { timeout: 15000 })
      .should('exist')

    // User inputs
    cy.log('validating User inputs')

    cy.get('[data-cy="cy-booking-form"] div')
      .find('input[name="user.name"]')
      .should('exist')
      .type('Alan')

    cy.get('[data-cy="cy-booking-form"] div')
      .find('input[name="user.lastName"]')
      .should('exist')
      .type('Turing')

    cy.get('[data-cy="cy-booking-form"] div')
      .find('input[name="user.phone"]')
      .should('exist')
      .type('+541234567')

    cy.get('[data-cy="cy-booking-form"] div')
      .find('input[name="user.email"]')
      .should('exist')
      .type('alan.turing@gmail.com')

    cy.get('[data-cy="cy-booking-form"] div')
      .find('input[name="user.address"]')
      .should('exist')
      .type('Velazco 1983, Santiago de Chile')

    // 1. open custom select
    cy.get('[data-cy="custom-select"]').click()

    // 2. await that option are visible and click it
    cy.contains('[role="option"]', 'depto').should('be.visible').click()


    cy.get('[data-cy="cy-booking-form"] div')
      .find('input[name="user.additionalInfo"]')
      .should('exist')
      .type('Departamento con rejas negras, segundo piso')


    // Appointment inputs
    cy.log('validating Appointment inputs')

    // select a date in the CalendarPicker
    cy.get('[data-cy="cy-booking-form"] div')
      .find('.ant-picker-calendar')
      .should('exist')

    cy.get('div.text-primaryBlue-900')  // selecciona el primer dia habilitado
      .first()
      .click()

    // change to Hour selector
    cy.get('button[type="button"]')
      .contains('Horario')
      .should('exist')
      .click()

    cy.get('button[type="button"]')
      .contains('15:00 pm')
      .click()

    // Continue button to send submit
    cy.get('button[type="submit"]')
      .contains('Continuar')
      .should('exist')
      .click()

    // Continue button to send submit
    cy.get('button[type="submit"]')
      .contains('Procesando...')
      .should('be.visible')

    // Validate email confirmation modal is visible
    cy.get('[data-cy="cy-confirmation-booking-email-modal"]', { timeout: 15000 })
      .should('exist')
      .should('be.visible')
      .contains('reserva')

    // Click en modal and redirect
    cy.get('[data-cy="cy-confirmation-booking-email-modal"]')
      .get('a')
      .contains('Continuar')
      .should('be.visible')
      .click()

    cy.location('pathname').should('match', /\/services$/)
  })
})