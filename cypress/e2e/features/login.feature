#Para comentar en un archivo .feature se hace con este símbolo #
#Esto es la descripción de la batería de test contenida en este archivo
@smoke @regression @login
Feature: Login test suite

    Background: Visit the url
        #Esto es equivalente al beforeEach
        Given I visit the url "https://www.saucedemo.com/"

    # Los Scenarios son los tests (lo que antes era "it")
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

    Scenario: Login with invalid password
        Given I check that the url "not.contain" the endpoint "/inventory"
        And I check that the "error" message "Epic sadface: Username and password do not match any user in this service" is not shown
        When I type in the input "username" the value "standard_user"
        And I type in the input "password" the value "User1234"
        And I click on the "login-button" button
        And I check that the "error" message is "Epic sadface: Username and password do not match any user in this service"
        Then I check that the url "not.contain" the endpoint "/inventory"

    Scenario: Check error message for locked out user
        Given I check that the url "not.contain" the endpoint "/inventory"
        And I check that the "error" message "Epic sadface: Sorry, this user has been locked out." is not shown
        When I login with "locked out" user
        And I click on the "login-button" button
        And I check that the "error" message is "Epic sadface: Sorry, this user has been locked out."
        Then I check that the url "not.contain" the endpoint "/inventory"

    Scenario: Check error message for empty fields
        Given I check that the url "not.contain" the endpoint "/inventory"
        And I check that the "error" message "Epic sadface: Username is required" is not shown
        When I fill with "blank data" the fields of login
        And I click on the "login-button" button
        And I check that the "error" message is "Epic sadface: Username is required"
        Then I check that the url "not.contain" the endpoint "/inventory"

    Scenario: Check error message for empty username
        Given I check that the url "not.contain" the endpoint "/inventory"
        And I check that the "error" message "Epic sadface: Username is required" is not shown
        When I fill with "empty username" the fields of login
        And I click on the "login-button" button
        And I check that the "error" message is "Epic sadface: Username is required"
        Then I check that the url "not.contain" the endpoint "/inventory"

    Scenario: Check error message for empty password
        Given I check that the url "not.contain" the endpoint "/inventory"
        And I check that the "error" message "Epic sadface: Password is required" is not shown
        When I fill with "empty password" the fields of login
        And I click on the "login-button" button
        And I check that the "error" message is "Epic sadface: Password is required"
        Then I check that the url "not.contain" the endpoint "/inventory"

    Scenario Outline: Login with two different users
        Given I check that the url "not.contain" the endpoint "/inventory"
        When I login with "<username>" user
        Examples:
            | username |
            | standard |
            | visual   |

    Scenario Outline: Login with two different users
        Given I check that the url "not.contain" the endpoint "/inventory"
        When I type in the input "username" the value "<username>"
        And I type in the input "password" the value "<password>"
        And I click on the "login-button" button
        And I check that the "error" message is "<errorMessage>"
        Then I check that the url "not.contain" the endpoint "/inventory"
        Examples:
            | username        | password     | errorMessage                                                              |
            | standard_user   | User1234     | Epic sadface: Username and password do not match any user in this service |
            | locked_out_user | secret_sauce | Epic sadface: Sorry, this user has been locked out.                       |
            |                 |              | Epic sadface: Username is required                                        |
            |                 | secret_sauce | Epic sadface: Username is required                                        |
            | standard_user   |              | Epic sadface: Password is required                                        |
