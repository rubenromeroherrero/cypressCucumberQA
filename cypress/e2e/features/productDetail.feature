@regression
Feature: Product Detail test suite

    Background: Login with a type of user
        Given I login with keep session with "standard" user

    Scenario: Add one product to shopping cart in Product detail page
        Given I check that the "shopping-cart-link" item "exists"
        When I check that the "shopping-cart-badge" item "does not exist"
        And I check that the url "include" the endpoint "/inventory"
        And I navigate to the "Sauce Labs Bike Light" product detail through "inventory-item-name" link
        And I check that the product "contain" the "inventory-item-name" attribute with "Sauce Labs Bike Light"
        And I check that the url "include" the endpoint "/inventory-item.html"
        And I check that the "shopping-cart-badge" item "does not exist"
        And I add a product in the Product Detail page after click in "Add to cart" button
        And I check that the "add-to-cart" item "not.exist"
        And I check that the "remove" item "exists"
        And I check that the "shopping-cart-badge" contains the quantity 1
        And I click on the "shopping-cart-link" button
        And I check that the url "include" the endpoint "/cart"
        Then I check that the "inventory-item" item "exists"
        And I check that the product "contain" the "inventory-item-name" attribute with "Sauce Labs Bike Light"
