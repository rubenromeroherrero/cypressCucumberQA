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
        expect(response.body).to.have.property("userId", 1);
        expect(response.body).to.have.property("id", 1);
        expect(response.body).to.have.property("title");
        expect(response.body).to.have.property("body");
      }
    );
  });

  it('check that the response fot the endpoint "/posts"  and include the keys userId, id, title, body ', () => {
    cy.request("https://jsonplaceholder.typicode.com/posts").should(
      (response) => {
        response.body.forEach((array) => {
          expect(array).to.include.all.keys(["userId", "id", "title", "body"]);
        });
      }
    );
  });
});
