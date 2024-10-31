#Para comentar en un archivo .feature se hace con este símbolo #
#Esto es la descripción de la batería de test contenida en este archivo
Feature: Login test suite
    Background:
        #Esto es equivalente al beforeEach
        Given I visit the url "https://www.saucedemo.com/"
    #Los Scenarios son los tests (lo que antes era "it")
    Scenario: Check the endpoint of login page
        Given I check that the url "eq" the endpoint "https://www.saucedemo.com/"
        And I check that the url "not.contain" the endpoint "/inventory"

    Scenario: Login with a standard user
        Given I check that the url "not.contain" the endpoint "/inventory"
        When I type in the input "username" the value "standard_user"
        And I type in the input "password" the value "secret_sauce"
        And I click on the "login-button" button
        Then I check that the url "contain" the endpoint "/inventory"

    Scenario: Login with complete happy path
        Given I check that the url "not.contain" the endpoint "/inventory"
        When I login with "standard" user
        Then I check that the url "contain" the endpoint "/inventory"

    Scenario: Check error message for locked out user
        Given I check that the url "not.contain" the endpoint "/inventory"
        When I login with "locked out" user
        Then I check that the "error" message is "Epic sadface: Sorry, this user has been locked out."

    Scenario: Check error message for empty fields
        Given I check that the url "not.contain" the endpoint "/inventory"
        When I fill with "blank data" the fields of login
        Then I check that the "error" message is "Epic sadface: Username is required"

    Scenario: Check error message for empty username
        Given I check that the url "not.contain" the endpoint "/inventory"
        When I fill with "empty username" the fields of login
        Then I check that the "error" message is "Epic sadface: Username is required"

    Scenario: Check error message for empty password
        Given I check that the url "not.contain" the endpoint "/inventory"
        When I fill with "empty password" the fields of login
        Then I check that the "error" message is "Epic sadface: Password is required"
