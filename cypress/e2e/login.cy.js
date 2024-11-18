describe("Test Scenario Login", () => {
  //Positive Test Case
  it.only("Admin login successfully", () => {
    //arrange
    cy.visit("/");
    cy.contains("Login").should("be.visible");

    //act
    cy.get('input[type="email"]').type("superadmin@gmail.com");
    cy.get('input[type="password"]').type("password");
    cy.get('button[data-testid="button-login"]').click();

    //assert
    cy.get(".nav-link > .d-sm-none").should("contain", "Hi, SuperAdmin");

    cy.get('a[data-testid="dropdown-id"]').click();
    cy.get('a[data-testid="logout-id"]').should("contain", "Logout").click();

    cy.contains("Login").should("be.visible");
  });

  //Negative Test Case
  it("Admin input data not registered in the system", () => {
    //arrange
    cy.visit("/");

    //act
    cy.get('input[type="email"]').type("admin@gmail.com");
    cy.get('input[type="password"]').type("1234567");
    cy.get('button[data-testid="button-login"]').click();

    //assert
    cy.get(".invalid-feedback").should(
      "contain",
      "These credentials do not match our records."
    );
  });

  it("Admin empty email", () => {
    //arrange
    cy.visit("/");

    //act
    cy.get('input[type="password"]').type("password");
    cy.get('button[data-testid="button-login"]').click();

    //assert
    cy.get(".invalid-feedback").should(
      "contain",
      "The email field is required."
    );
  });

  it("Admin empty password", () => {
    //arrange
    cy.visit("/");

    //act
    cy.get('input[type="password"]').type("password");
    cy.get('button[data-testid="button-login"]').click();

    //assert
    cy.get(".invalid-feedback").should(
      "contain",
      "The password field is required."
    );
  });

  it("Admin empty email and password", () => {
    //arrange
    cy.visit("/");

    //act
    cy.get('button[data-testid="button-login"]').click();

    //assert
    cy.get(".invalid-feedback").should(
      "contain",
      "The email field is required."
    );
    cy.get(".invalid-feedback").should(
      "contain",
      "The password field is required."
    );
  });
});
