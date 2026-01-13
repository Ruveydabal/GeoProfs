/// <reference types="cypress" />

describe('Login GeoProfs', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('logt succesvol in als office manager en navigeert naar de goede pagina', () => {
    //Email invullen
    cy.get('input[aria-label="email"]').type('officemanager@gmail.com')
    
    //Wachtwoord invullen
    cy.get('input[aria-label="wachtwoord"]').type('officemanager')

    //Knop klikken
    cy.contains('Log in').click()

    //Navigatie naar de goede pagina 
    cy.visit('http://localhost:5173/offficemanager/voorpagina/')
  })

  it('logt succesvol in als manager en navigeert naar de goede pagina', () => {
    //Email invullen
    cy.get('input[aria-label="email"]').type('manager@gmail.com')
    
    //Wachtwoord invullen
    cy.get('input[aria-label="wachtwoord"]').type('manager')

    //Knop klikken
    cy.contains('Log in').click()

    //Navigatie naar de goede pagina 
    cy.visit('http://localhost:5173/manager/voorpagina/')
  })

  it('logt succesvol in als medewerker en navigeert naar de goede pagina', () => {
    //Email invullen
    cy.get('input[aria-label="email"]').type('medewerker@gmail.com')
    
    //Wachtwoord invullen
    cy.get('input[aria-label="wachtwoord"]').type('medewerker')

    //Knop klikken
    cy.contains('Log in').click()

    //Navigatie naar de goede pagina 
    cy.visit('http://localhost:5173/medewerker/voorpagina/')
  })

  it('logt in zonder email in te vullen', () => {
    //Wachtwoord invullen
    cy.get('input[aria-label="wachtwoord"]').type('medewerker')

    //Knop klikken
    cy.contains('Log in').click()
  })

  it('logt in zonder wachtwoord in te vullen', () => {
    //Email invullen
    cy.get('input[aria-label="email"]').type('medewerker@gmail.com')

    //Knop klikken
    cy.contains('Log in').click()
  })

  it('logt in zonder gegevens in te vullen', () => {
    //Knop klikken
    cy.contains('Log in').click()
  })
})