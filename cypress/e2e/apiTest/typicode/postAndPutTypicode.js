describe("Use POST and PUT methods to get data from typicode", () => {
  it("Send first POST", () => {
    cy.request({
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/posts/",
      body: {
        userID: 1,
        title: "API testing with cypress",
        body: "First POST",
      },
    });
  });

  it("Check log with cy.log on first POST", () => {
    cy.request("POST", "https://jsonplaceholder.typicode.com/posts/", {
      userID: 1,
      title: "API testing with cypress",
      body: "First POST",
    }).then((response) => {
      //Recurso para imprimir por pantalla algo
      cy.log(JSON.stringify(response.body));
    });
  });

  it("Check response on first POST", () => {
    cy.request("POST", "https://jsonplaceholder.typicode.com/posts/", {
      userID: 1,
      title: "API testing with cypress",
      body: null,
    }).then((response) => {
      const postBody = response.body;
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(201);
      expect(response.duration).to.be.below(500);
      expect(postBody.title).to.be.a("string");
      expect(postBody).to.have.property("title", "API testing with cypress");
      //valida que tenga propiedad, y además validamos su valor
      expect(postBody).to.have.property("body", null);
      //valida solo el valor del parámetro
      expect(postBody.body).to.be.eq(null);
    });
  });

  //PUT renueva o sobrescribe todo (todo aquello que no indiques, te lo va a machacar, si no indicas title, te lo va a borrar)
  it("Send PUT and check all the values modified on the response", () => {
    const putBody = {
      userId: 5,
      id: 5,
      title: "news",
      body: "first post",
    };
    cy.request(
      "PUT",
      "https://jsonplaceholder.typicode.com/posts/5",
      putBody
    ).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.eq(putBody);
    });
  });

  //PATCH solo para cambiar una propiedad, el resto lo mantiene igual
  it("Send PATCH and check all the values modified on the response", () => {
    const putBody = {
      id: 5,
      title: "news",
    };
    cy.request(
      "PATCH",
      "https://jsonplaceholder.typicode.com/posts/5",
      putBody
    ).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id", 5);
      expect(response.body).to.have.property("title", "news");
    });
  });

  //PATCH solo para cambiar una propiedad, el resto lo mantiene igual
  it("Send PATCH and check all the values modified on the response without object", () => {
    cy.request("PATCH", "https://jsonplaceholder.typicode.com/posts/5", {
      //El id siempre va a ser el mismo, ese no cambia
      id: 5,
      title: "test",
    }).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id", 5);
      expect(response.body).to.have.property("title", "test");
    });
  });

  it("Delete first post", () => {
    cy.request("DELETE", "https://jsonplaceholder.typicode.com/posts/1").should(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
  });

  it("Send first DELETE method", () => {
    cy.request("DELETE", "https://jsonplaceholder.typicode.com/posts/1");
  });

  it("Add the body in a const and check all the response body with to.deep.include", () => {
    const postData = {
      name: "User data testing",
      data: {
        year: 2024,
        price: 10,
        "CPU model": "Api testing with Cypress",
        "Hard disk size": "1 TB",
      },
    };
    cy.request("POST", "https://api.restful-api.dev/objects", postData).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.include(postData);
        //Guardar en un alias el id del object creado
        cy.wrap(response.body.id).as("objectID");
      }
    );
    //Requiere una promesa, para esperar a que exista ese id, para poder borrar
    //Obtener el objeto, y espera a que se cargue ese objeto (promesa)
    cy.get("@objectID").then((objectID) => {
      cy.log(objectID);
      cy.request("GET", `https://api.restful-api.dev/objects/${objectID}`).then(
        (response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.deep.include(postData);
        }
      );
      cy.request("DELETE", `https://api.restful-api.dev/objects/${objectID}`);
      cy.request({
        url: `https://api.restful-api.dev/objects/${objectID}`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
});
