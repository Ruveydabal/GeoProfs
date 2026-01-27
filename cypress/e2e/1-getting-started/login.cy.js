/// <reference types="cypress" />

describe('Login GeoProfs', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('logt succesvol in als office manager', () => {
    cy.get('input[aria-label="email"]').type('officemanager@gmail.com')
    cy.get('input[aria-label="wachtwoord"]').type('officemanager')

    cy.contains('Log in').click()

    // ✅ URL check
    cy.url().should('include', '/officemanager/voorpagina')

    // ✅ LocalStorage checks
    cy.window().then((win) => {
      expect(win.localStorage.getItem('isLoggedIn')).to.eq('true')
      expect(win.localStorage.getItem('rol')).to.eq('officemanager')
      expect(win.localStorage.getItem('userId')).to.exist
    })

    // ✅ Geen foutmelding
    cy.contains('Vul zowel e-mailadres als wachtwoord in.').should('not.exist')
  })

  it('logt succesvol in als manager', () => {
    cy.get('input[aria-label="email"]').type('manager@gmail.com')
    cy.get('input[aria-label="wachtwoord"]').type('manager')

    cy.contains('Log in').click()

    cy.url().should('include', '/manager/voorpagina')

    cy.window().then((win) => {
      expect(win.localStorage.getItem('rol')).to.eq('manager')
    })
  })

  it('logt succesvol in als medewerker', () => {
    cy.get('input[aria-label="email"]').type('medewerker@gmail.com')
    cy.get('input[aria-label="wachtwoord"]').type('medewerker')

    cy.contains('Log in').click()

    cy.url().should('include', '/medewerker/voorpagina')

    cy.window().then((win) => {
      expect(win.localStorage.getItem('rol')).to.eq('medewerker')
    })
  })

  it('geeft foutmelding zonder email', () => {
    cy.get('input[aria-label="wachtwoord"]').type('medewerker')
    cy.contains('Log in').click()

    // ❌ Blijft op loginpagina
    cy.url().should('eq', 'http://localhost:5173/')

    // ❌ Foutmelding zichtbaar
    cy.contains('Vul zowel e-mailadres als wachtwoord in.').should('be.visible')
  })

  it('geeft foutmelding zonder wachtwoord', () => {
    cy.get('input[aria-label="email"]').type('medewerker@gmail.com')
    cy.contains('Log in').click()

    cy.contains('Vul zowel e-mailadres als wachtwoord in.').should('be.visible')
  })

  it('geeft foutmelding zonder gegevens', () => {
    cy.contains('Log in').click()

    cy.contains('Vul zowel e-mailadres als wachtwoord in.').should('be.visible')
  })

  it('geeft foutmelding bij onjuist wachtwoord', () => {
    cy.get('input[aria-label="email"]').type('medewerker@gmail.com')
    cy.get('input[aria-label="wachtwoord"]').type('verkeerd')

    cy.contains('Log in').click()

    cy.contains('Onjuist wachtwoord.').should('be.visible')
    cy.url().should('eq', 'http://localhost:5173/')
  })
})
