import moment from 'moment';

describe('Ziekmelden E2E', () => {

  // Happy flow: gebruiker kan ziekmelden
  context('gebruiker kan zich ziekmelden', () => {
    beforeEach(() => {
      cy.visit('/ziekmelden', {
        onBeforeLoad(win) {
          // Mock ingelogde gebruiker
          win.localStorage.setItem('userId', '123');
          win.localStorage.setItem('rol', 'medewerker');
          win.localStorage.setItem('isLoggedIn', 'true');
        }
      });

      // Stub Firestore Listen calls
      cy.intercept('POST', '**/Firestore/Listen/**', { statusCode: 200 });
    });

    it('vult datumvelden correct in en kan ziekmelden', () => {
      const vandaag = moment().format('D-MM-YYYY');
      const volgendeDag = moment().add(1, 'days').format('D-MM-YYYY');

      cy.get('input').eq(0).should('have.value', vandaag);
      cy.get('input').eq(1).should('have.value', volgendeDag);
      cy.get('input').eq(2).should('have.value', 'Ziek');

      cy.get('[data-cy=ziekmelden-button]', { timeout: 10000 })
        .should('be.visible')
        .click();

      cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Ziekmelding is verstuurd!');
      });

      cy.url().should('include', '/medewerker/voorpagina');
    });

    it('knop wordt correct ingeschakeld en toont loading state', () => {
      cy.get('[data-cy=ziekmelden-button]', { timeout: 10000 })
        .should('be.visible')
        .and('not.be.disabled')
        .click();

      cy.get('[data-cy=ziekmelden-button]').contains('Bezig met ziekmelden...');
    });

    it('vult verloftype correct uit Firestore (mocked)', () => {
      cy.get('input').eq(2).should('have.value', 'Ziek');
    });
  });

  // Unhappy flow: gebruiker zonder userId
  context('gebruiker zonder userId ziet foutmelding', () => {
    beforeEach(() => {
      cy.visit('/ziekmelden', {
        onBeforeLoad(win) {
          // helemaal leeg, geen userId
          win.localStorage.clear();
        }
      });
      cy.intercept('POST', '**/Firestore/Listen/**', { statusCode: 200 });
    });

    it('toont alert bij ontbreken van userId', () => {
      // Spy op window.alert
      cy.window().then((win) => {
        cy.spy(win, 'alert').as('alertSpy');
      });

      // Trigger de click handler
      cy.window().then((win) => {
        const button = win.document.querySelector('[data-cy=ziekmelden-button]');
        if (button) {
          button.onclick(); // call de click handler
        } else if (win.ZiekmeldenBehandel) {
          win.ZiekmeldenBehandel();
        }
      });

      // Controleer dat de alert is aangeroepen
      cy.get('@alertSpy').should(
        'have.been.calledWith',
        'Geen gebruiker gevonden. Log opnieuw in.'
      );
    });
  });
});
