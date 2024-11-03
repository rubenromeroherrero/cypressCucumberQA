Feature: Main test suite

    Background:
        Given I visit the url "https://www.saucedemo.com/"
        When I check that the url "not.include" the endpoint "/inventory"
    # Añade el login al background y así no tienes que ponerlo en cada test
        Then I login with "standard" user

    Scenario: Add product by position to the shopping cart
        Given I check that the "shopping-cart-link" item "exists"
        And I check that the "shopping-cart-badge" item "does not exist"
        And I check that the url "include" the endpoint "/inventory"
        And I click on the "shopping-cart-link" button
        And I check that the url "include" the endpoint "/cart"
        And I check that the "inventory-item" item "does not exist"
        And I click on the "continue-shopping" button
        When I add to the cart the 2 product in the list
        And I check that the "shopping-cart-badge" contains the number 1
        And I click on the "shopping-cart-link" button
        And I check that the url "include" the endpoint "/cart"
        Then I check that the "inventory-item" item "exists"

    Scenario: Add product by name to the shopping cart
        Given I check that the "shopping-cart-link" item "exists"
        And I check that the "shopping-cart-badge" item "does not exist"
        And I check that the url "include" the endpoint "/inventory"
        And I click on the "shopping-cart-link" button
        And I check that the url "include" the endpoint "/cart"
        And I check that the "inventory-item" item "does not exist"
        And I click on the "continue-shopping" button
        When I add to the cart the product with the name "Sauce Labs Onesie"
        And I check that the "shopping-cart-badge" contains the number 1
        And I click on the "shopping-cart-link" button
        And I check that the url "include" the endpoint "/cart"
        And I check that the "inventory-item" item "exists"
        # Then I check that the element "cart-list" should "contain" the content "Sauce Labs Onesie"
        Then I check that the element "inventory-item" should "contain" the content "Sauce Labs Onesie"

    Scenario: Check the order after applying the filter by price
        When I check that the selected option is "Name (A to Z)"
        And I check that the "first" product in the list has the "name" "Sauce Labs Backpack"
        And I check that the "first" product in the list has the "price" "29.99"
        And I check that the "last" product in the list has the "name" "Test.allTheThings() T-Shirt (Red)"
        And I check that the "last" product in the list has the "price" "15.99"
        And I select the option "Price (low to high)"
        And I check that the "first" product in the list has the "name" "Sauce Labs Onesie"
        And I check that the "first" product in the list has the "price" "7.99"
        And I check that the "last" product in the list has the "name" "Sauce Labs Fleece Jacket"
        And I check that the "last" product in the list has the "price" "49.99"
        And I select the option "Price (high to low)"
        Then I check that the "first" product in the list has the "name" "Sauce Labs Fleece Jacket"
        And I check that the "first" product in the list has the "price" "49.99"
        And I check that the "last" product in the list has the "name" "Sauce Labs Onesie"
        And I check that the "last" product in the list has the "price" "7.99"


    Scenario: Different Check the order after applying the filter by price (using the new step to check values for attribute products in the list)
        When I check that the selected option is "Name (A to Z)"
        And I check that the product 1 in the position list has the "name" attribute with the "Sauce Labs Backpack" value
        And I check that the product 1 in the position list has the "price" attribute with the "29.99" value
        And I check that the product 6 in the position list has the "name" attribute with the "Test.allTheThings() T-Shirt (Red)" value
        And I check that the product 6 in the position list has the "price" attribute with the "15.99" value
        And I select the option "Price (low to high)"
        And I check that the product 1 in the position list has the "name" attribute with the "Sauce Labs Onesie" value
        And I check that the product 1 in the position list has the "price" attribute with the "7.99" value
        And I check that the product 6 in the position list has the "name" attribute with the "Sauce Labs Fleece Jacket" value
        And I check that the product 6 in the position list has the "price" attribute with the "49.99" value
        And I select the option "Price (high to low)"
        And I check that the product 1 in the position list has the "name" attribute with the "Sauce Labs Fleece Jacket" value
        And I check that the product 1 in the position list has the "price" attribute with the "49.99" value
        And I check that the product 6 in the position list has the "name" attribute with the "Sauce Labs Onesie" value
        And I check that the product 6 in the position list has the "price" attribute with the "7.99" value