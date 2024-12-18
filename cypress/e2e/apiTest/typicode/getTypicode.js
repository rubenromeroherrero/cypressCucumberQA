//npx cypress open => runner de cypress abierto
//npx cypress run => no abre el runner, te muestra resultado por la terminal

describe("Use GET method to get data from typicode", () => {
  // it("first visit and get on typicode.com", () => {
  // Tirará del baseUrl que tengamos establecido
  //   cy.visit("https://jsonplaceholder.typicode.com/");
  //   cy.request({
  //     method: "GET",
  //     url: "/posts",
  //   });
  // });

  it("Get on typicode.com", () => {
    cy.request({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/posts",
    });
  });

  it("Get without declare parameter (method and url) on typicode.com", () => {
    cy.request("GET", "https://jsonplaceholder.typicode.com/posts");
  });

  it("Get without methode on typicode.com", () => {
    cy.request("https://jsonplaceholder.typicode.com/posts");
  });

  it("Check status code with then", () => {
    //then es una promesa, la cual esperamos
    cy.request("https://jsonplaceholder.typicode.com/posts").then(
      (response) => {
        expect(response.status).to.equal(200);
      }
    );
  });

  it("Check status code with its body", () => {
    //el its sí respeta el timeout, el then no
    cy.request("https://jsonplaceholder.typicode.com/posts")
      .its("status")
      .should("eq", 200);
  });

  it("Get on typicode.com and check the length of body response", () => {
    cy.request("https://jsonplaceholder.typicode.com/posts")
      .its("body")
      .should("have.length", 100);
  });

  it("Get on typicode.com and use should and expect on the response", () => {
    cy.request("https://jsonplaceholder.typicode.com/posts").should(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length(100);
      }
    );
  });

  it("Get on typicode.com and check status, length and it is an array", () => {
    cy.request("https://jsonplaceholder.typicode.com/posts").should(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length(100);
        expect(response.body).not.to.be.a("number");
        expect(response.body).to.be.an("array");
      }
    );
  });

  it("Check status code for /posts/1 with its body", () => {
    cy.request("https://jsonplaceholder.typicode.com/posts/1")
      .its("status")
      .should("eq", 200);
  });

  it("Check status code for /posts/1 with should", () => {
    cy.request("https://jsonplaceholder.typicode.com/posts/1").should(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).not.to.be.an("array");
        expect(response.body).to.be.a("object");
      }
    );
  });

  //Exercise for 11/11/2024
  it("Check status, type of keys and the value of keys in /posts/1 with should", () => {
    cy.request({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/posts/1",
    }).should((response) => {
      expect(response.status).to.eq(200);

      expect(response.body).to.be.an("object");
      expect(response.body.userId).to.be.a("number");
      expect(response.body.id).to.be.a("number");
      expect(response.body.title).to.be.a("string");
      expect(response.body.body).to.be.a("string");

      expect(response.body.userId).to.be.eq(1);
      expect(response.body.title).to.be.contain(
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
      );
      expect(response.body.body).to.be.contain(
        "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      );
    });
  });

  it("Check status, datatype and length of data response in /comments", () => {
    cy.request({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/posts/1/comments",
    }).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a("array");
      expect(response.body).to.have.length(5);

      response.body.forEach((comment) => {
        if (comment.id === 4) {
          expect(comment.email).to.be.a("string");
          expect(comment.email).to.be.eq("Lew@alysha.tv");
          expect(comment.email).to.be.contain("@");
        }
      });
    });
  });

  // Formas diferentes de hacerlo
  it("Checks email for id = 4 using find", () => {
    cy.request({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/posts/1/comments",
    }).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length(5);
      // Usando find para buscar un id en especifico

      const id_4 = response.body.find((alias) => alias.id === 4);
      expect(id_4).to.exist;
      expect(id_4.email).to.be.a("string");
      expect(id_4.email).to.eq("Lew@alysha.tv");
      expect(id_4.email).to.contain("@");
      expect(id_4.name).to.be.a("string");
      expect(id_4.name).to.contain("alias");
      expect(id_4.name).to.eq("alias odio sit");
    });
  });

  /*
  it("get data from a typicode/post1/comments, check its status code, type of response body and assert over object with id 4", () => {
    cy.request("/posts/1/comments").should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a("array");
      expect(response.body).to.have.length(5);
      response.body.filter((comment) => {
        comment.id === 4 && expect(comment.email).to.eq("Lew@alysha.tv");
      });
    });
  });
  */

  it("Checks data for id = 4 using some", () => {
    cy.request({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/posts/1/comments",
    }).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length(5);

      // Buscar directamente sobre el id === 4 usando some (personalmente prefiero como tu lo has hecho o con find)
      expect(
        response.body.some(
          ({ id, email, name }) =>
            id === 4 && email === "Lew@alysha.tv" && name === "alias odio sit"
        )
      ).to.be.true;
    });
  });

  it("get data from a typicode/post1, check its status code, type of response body and evaluates type of value", () => {
    cy.request("https://jsonplaceholder.typicode.com/posts/1").should(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.a("object");
        Object.values(response.body).forEach((value) => {
          // Comparar si los values de las key son string o un number
          expect(typeof value === "number" || typeof value === "string").to.be
            .true;
        });
        // Se puede comprobar en la misma aserción si es un string o un number además de comprobar el valor exacto que tiene
        expect(response.body["title"])
          .to.be.a("string")
          .to.eq(
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
          );
        expect(response.body["userId"]).to.be.a("number").to.eq(1);
        expect(response.body["body"])
          .to.be.a("string")
          .to.eq(
            "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
          );
      }
    );
  });

  it("a 404 error is displayed when getting data from typicode/post1/comment", () => {
    cy.request({
      url: "https://jsonplaceholder.typicode.com/posts/1/comment",
      //Se tiene que poner failOnStatusCode, para evitar que nos falle el test si da un error 4XX o 5XX y el test pase con la validación
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
