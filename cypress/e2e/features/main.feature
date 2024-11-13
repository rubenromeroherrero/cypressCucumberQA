@regression @main
Feature: Main test suite

    Background: Login with a type of user
        # Given I visit the url "https://www.saucedemo.com/"
        # When I check that the url "not.include" the endpoint "/inventory"
        # And I login with "standard" user
        # When I check that the url "include" the endpoint "/inventory"
        Given I login with keep session with "standard" user

    Scenario: Add the first product to the shopping cart
        Given I check that the "shopping-cart-link" item "exists"
        When I check that the "shopping-cart-badge" item "does not exist"
        And I check that the url "include" the endpoint "/inventory"
        And I click on the "shopping-cart-link" button
        And I check that the url "include" the endpoint "/cart"
        And I check that the "inventory-item" item "does not exist"
        And I click on the "continue-shopping" button
        When I add to the cart the "first" product in the list
        And I check that the "shopping-cart-badge" contains the quantity 1
        And I click on the "shopping-cart-link" button
        And I check that the url "include" the endpoint "/cart"
        Then I check that the "inventory-item" item "exists"

    Scenario: Check the order after applying the filter by price
        Given I check that the selected option is "Name (A to Z)"
        When I check that the "first" product in the list has the "name" attribute with the "Sauce Labs Backpack" value
        And I check that the "first" product in the list has the "price" attribute with the "29.99" value
        And I check that the "last" product in the list has the "name" attribute with the "Test.allTheThings() T-Shirt (Red)" value
        And I check that the "last" product in the list has the "price" attribute with the "15.99" value
        And I select the option "Price (low to high)"
        And I check that the "first" product in the list has the "name" attribute with the "Sauce Labs Onesie" value
        And I check that the "first" product in the list has the "price" attribute with the "7.99" value
        And I check that the "last" product in the list has the "name" attribute with the "Sauce Labs Fleece Jacket" value
        And I check that the "last" product in the list has the "price" attribute with the "49.99" value
        And I select the option "Price (high to low)"
        And I check that the "first" product in the list has the "name" attribute with the "Sauce Labs Fleece Jacket" value
        And I check that the "first" product in the list has the "price" attribute with the "49.99" value
        And I check that the "last" product in the list has the "name" attribute with the "Sauce Labs Onesie" value
        Then I check that the "last" product in the list has the "price" attribute with the "7.99" value

    Scenario: Add one product from the Main page, and another form the Product detail page
        Given I check that the "shopping-cart-link" item "exists"
        And I check that the "shopping-cart-badge" item "does not exist"
        And I check that the url "include" the endpoint "/inventory"
        And I add to the shopping cart the "Sauce Labs Backpack" from Main page
        And I check that product "Sauce Labs Backpack" is added in Shopping Cart page
        And I check that the "shopping-cart-badge" contains the quantity 1
        And I check that the url "include" the endpoint "/cart"
        And I click on the "continue-shopping" button
        And I check that the url "include" the endpoint "/inventory"
        And I add to the shopping cart the "Sauce Labs Fleece Jacket" from Product Detail page
        And I check that the url "include" the endpoint "/inventory-item"
        Then I check that product "Sauce Labs Fleece Jacket" is added in Shopping Cart page
        And I check that product "Sauce Labs Backpack" is added in Shopping Cart page
        And I check that the url "include" the endpoint "/cart"
        And I check that the "shopping-cart-badge" contains the quantity 2
