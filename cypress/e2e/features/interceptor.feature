Feature: Uso de intercept, buenas prácticas

    Scenario: Uso de wait
        Given I visit the url "https://www.max.com/es/es"
        And I wait 2000 miliseconds
        Then I click on the button named "Aceptar todo" with a timeout of 2000 miliseconds
# Scenario: Uso de intercept y wait al alias de la api call dentro de la misma funcion
#     Given I visit the url "https://www.max.com/es/es"
#     When I click on the button named "Aceptar todo" and wait for api call "**/ot_guard_logo.svg"
# Scenario: Uso de intercept y wait al alias de la api call en pasos parametrizados
#     Given I intercept the api call "**/ot_guard_logo.svg" with the alias "cookies"
#     When I visit the url "https://www.max.com/es/es"
#     And I wait maximum of 5000 miliseconds for the api call with the alias "cookies"
#     Then I click on the button named "Aceptar todo" with a timeout of 1 miliseconds