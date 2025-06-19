describe("Reservas: Mantencion por Kilometraje", () => {
  beforeEach(() => {
    // visita esta pagina para simular el flujo del usuario
    cy.visit('/services/mileage_maintenance/contracting')

    cy.createVehicle('abc123')
    cy.searchExistingVehicle('abc123')

    cy.setLocalStorage("service", JSON.stringify({
      name: "mileage_maintenance",
      type: "mileage",
      mileages: "50.000 kms"
    }))
  })

  // ---------
  // Test 1: Verifica que exista un service en el localStorage

  it("Verificar que existe un 'service' en el localStorage", () => {
    cy.visit('/services/mileage_maintenance/booking')

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
    cy.visit('/services/mileage_maintenance/booking')

    cy.log("validating inputs")

    // validating if exist booking form container
    cy.get('[data-cy="cy-booking-form"] div')
      .should('exist')

    // validating inputs

    // user inputs
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

    cy.get('[data-cy="cy-booking-form"] div')
      .find('button[data-cy="custom-select"]')
      .click()
    cy.contains('depto').click()

    cy.get('[data-cy="cy-booking-form"] div')
      .find('input[name="user.additionalInfo"]')
      .should('exist')
      .type('Departamento con rejas negras, segundo piso')
  })
})