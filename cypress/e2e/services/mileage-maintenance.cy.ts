describe("Rellenar servicio y guardarlo en localStorage", () => {
  beforeEach(() => {
    cy.visit('/services/mileage_maintenance/contracting');
    cy.clearAllLocalStorage();
    cy.getLocalStorage("service").should('be.null');

    cy.createVehicle('abc123')
    cy.searchExistingVehicle('abc123')
  })

  // ---------
  // Test 1: Verificar que los todos los botones existan

  it("Verifica la existencia de los botones", () => {
    cy.get("button").contains("10.000 kms").should("exist")
    cy.get("button").contains("20.000 kms").should("exist")
    cy.get("button").contains("30.000 kms").should("exist")
    cy.get("button").contains("40.000 kms").should("exist")
    cy.get("button").contains("50.000 kms").should("exist")
    cy.get("button").contains("60.000 kms").should("exist")
    cy.get("button").contains("70.000 kms").should("exist")
    cy.get("button").contains("80.000 kms").should("exist")
    cy.get("button").contains("90.000 kms").should("exist")
    cy.get("button").contains("Otro").should("exist")
  })

  // ---------
  // Test 2: Interactuar con la pagina

  it.only("Seleccionar kilometraje deseado", () => {
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
}) 