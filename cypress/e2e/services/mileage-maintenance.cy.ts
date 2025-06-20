describe("Rellenar servicio y guardarlo en localStorage", () => {
  beforeEach(() => {
    cy.clearAllLocalStorage();
    cy.getLocalStorage("service").should('be.null');
    cy.getLocalStorage("vehicle").should('be.null');

    cy.visit('/services/mileage_maintenance/contracting');

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

  it("Seleccionar kilometraje deseado", () => {
    cy.loadMileageService()
  })
}) 