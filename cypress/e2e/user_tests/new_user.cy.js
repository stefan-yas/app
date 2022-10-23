import {
  userName,
  userPassword,
  syncingServer
} from '../../fixtures/user/new_user_email_and_password.js'

describe('New User', () => {

  it('registers a new user', function () {

    cy.visit('/')

    // click the "Account menu" button
    cy.get('button').contains('Open Account menu').click()

    // click the "Create free account" option
    cy.get('button').contains('Create free account').click()

    // enter user email
    cy.get('input[type=email]').type(`${userName}{enter}`)

    // enter user password
    cy.get('input[placeholder="Password"]').type(`${userPassword}`)

    // expand "Advanced options" menu
    cy.get('div').contains('Advanced options').click()

    // check the "Custom sync server" option
    cy.get('input[name=custom-sync-server]').click()

    // remove default prod server
    cy.get('input[value="https://api.standardnotes.com"]').clear()

    // replace with dev server
    cy.get('input[placeholder="https://api.standardnotes.com"]').type(`${syncingServer}{enter}`)

    // click the "Next" button
    cy.get('button').contains('Next').click()

    // confirm user password
    cy.get('input[type=password]').type(`${userPassword}{enter}`)
  })
})
