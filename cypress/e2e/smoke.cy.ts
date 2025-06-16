describe('smoke test', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get("h1").should("contain.text", "HACEMOS MÁS FÁCIL")
  })
})