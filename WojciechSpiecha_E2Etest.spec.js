describe('Wojciech Spiecha AVSystem CorrectLoginTest', () => {
  
  it('successfully loads the page', () => {
    cy.visit('http://qa2021.avsystem.cloud/login/v1')
  })

  it('allows user to log in', () => {
    cy.visit('http://qa2021.avsystem.cloud/login/v1 ')
    
    cy.get('#login')
      .type('login')
        
    cy.get('#password')
      .type('password')

    cy.get('button')
      .contains('Log in')
      .click()
        
    cy.url().should('include', '/success')
  cy.contains('Login successful')
  })


  it('allows user to log in using enter', () => {
    cy.visit('http://qa2021.avsystem.cloud/login/v1 ')
  
    cy.get('#login')
      .type('login')
        
    cy.get('#password')
      .type('password')
      .type('{enter}')

    cy.url().should('include', '/success')
    cy.contains('Login successful')
  })
})

describe('Wojciech Spiecha AVSystem InvalidUserLoginDataTest', () => {

  it('checks if login input and output values match', () => {
    cy.visit('http://qa2021.avsystem.cloud/login/v1 ')

    cy.get('#login').type('login').should('have.value', 'login')
  })

  it('checks if password input and output values match', () => {
    cy.visit('http://qa2021.avsystem.cloud/login/v1 ')

    cy.get('#password').type('password').should('have.value', 'password')
  })


  it('notifies user about incorrect login', () => {
    cy.visit('http://qa2021.avsystem.cloud/login/v1 ')

    cy.get('#login')
      .type('1234')

    cy.get('button')
      .contains('Log in')
      .click()
    
    if(Cypress.browser.name == 'chrome')
    {
      cy.get('#login').should('have.value', '1234').invoke('prop', 'validationMessage')
      .should('equal', 'Podaj wartość w wymaganym formacie.');
    }
    if(Cypress.browser.name == 'edge')
    {
      cy.get('#login').should('have.value', '1234').invoke('prop', 'validationMessage')
      .should('equal', 'Dopasuj do żądanego formatu.')
    }
    cy.url().should('include', 'login/v1')
  })


  it('notifies user about lack of login', () => {
    cy.visit('http://qa2021.avsystem.cloud/login/v1 ')

    cy.get('#password')
      .type('password')

    cy.get('button')
      .contains('Log in')
      .click()

    cy.url().should('include', 'login/v1')
    cy.get('#login').invoke('prop', 'validationMessage')
      .should('equal', 'Wypełnij to pole.')
    cy.get('#password').should('have.value', 'password')
  })


  it('notifies user about incorrect password', () => {
    cy.visit('http://qa2021.avsystem.cloud/login/v1 ')

    cy.get('#login')
      .type('login')

    cy.get('#password')
      .type('haslo1234')

    cy.get('button')
      .contains('Log in')
      .click()

    cy.url().should('include', 'login/v1')
    cy.get('#login').should('have.value', 'login')

    if(Cypress.browser.name == 'chrome')
    {
      cy.get('#password').should('have.value', 'haslo1234').invoke('prop', 'validationMessage')
        .should('equal', 'Podaj wartość w wymaganym formacie.')
    }
    if(Cypress.browser.name == 'edge')
    {
      cy.get('#password').should('have.value', 'haslo1234').invoke('prop', 'validationMessage')
        .should('equal', 'Dopasuj do żądanego formatu.')
    }
  })


  it('notifies user about lack of password', () => {
    cy.visit('http://qa2021.avsystem.cloud/login/v1 ')

    cy.get('#login')
      .type('login')

    cy.get('#password')
      .should('have.value', '')

    cy.get('button')
      .contains('Log in')
      .click()

    cy.url().should('include', 'login/v1')
    cy.get('#login').should('have.value', 'login')
    cy.get('#password').should('have.value', '').invoke('prop', 'validationMessage')
      .should('equal', 'Wypełnij to pole.')
  })


  it('notifies user about lack of login and password', () => {
    cy.visit('http://qa2021.avsystem.cloud/login/v1 ')

    cy.get('button')
      .contains('Log in')
      .click()

    cy.url().should('include', 'login/v1')
    cy.get('#login').invoke('prop', 'validationMessage')
      .should('equal', 'Wypełnij to pole.')
  })
})

describe('Wojciech Spiecha AVSystem SpellingAndVisibilityTest', () => {

    it('checks button visibility', () => {
        cy.visit('http://qa2021.avsystem.cloud/login/v1 ')

        cy.get('button')
          .should('be.visible')
    })


  it('checks "login" label spelling', () => {
    cy.visit('http://qa2021.avsystem.cloud/login/v1 ')

    cy.contains('Login')
  })


  it('checks "password"  label spelling', () => {
    cy.visit('http://qa2021.avsystem.cloud/login/v1 ')

    cy.contains('Password')
  })


  it('checks button description spelling', () => {
    cy.visit('http://qa2021.avsystem.cloud/login/v1 ')

    cy.get('button')
      .contains('Log in')
  })


  it('checks success page spelling', () => {
    cy.visit('http://qa2021.avsystem.cloud/success ')

    cy.contains('Login successful')
  })
})
