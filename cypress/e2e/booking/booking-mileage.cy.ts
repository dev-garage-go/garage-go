describe("Reservas: Mantencion por Kilometraje", () => {
  beforeEach(() => {
    // visita esta pagina para simular el flujo del usuario
    cy.visit('/services/mileage_maintenance/contracting')
    cy.clearAllLocalStorage()

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

  it.only("Guard: Si no existe un service en localStorage, debe sacarme", () => {
    cy.log("delete 'service' from localStorage")
    cy.removeLocalStorage('service')
    cy.visit('/services/mileage_maintenance/booking')
    cy.url().should('not.include', '/booking')
    cy.url().should('include', '/services')
  })
})