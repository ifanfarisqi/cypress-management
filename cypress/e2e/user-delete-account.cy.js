describe("Test Scenario Delete Account", () => {
  beforeEach(() => {
    //reset db
    cy.exec(
      "cd ../demo-app-cypress-automation && php artisan migrate:fresh --seed"
    );
    //arrange
    cy.visit("/");
    cy.contains("Login").should("be.visible");

    //act
    cy.get('input[type="email"]').type("superadmin@gmail.com");
    cy.get('input[type="password"]').type("password");
    cy.get('button[data-testid="button-login"]').click();

    //assert
    cy.get(".nav-link > .d-sm-none").should("contain", "Hi, SuperAdmin");
  });

  it.only("User Successfully Delete Account", () => {
    //arrange
    cy.visit("/user-management/user");
    cy.get('a[href="http://127.0.0.1:8000/user-management/user"]');
    cy.contains("User Management").should("be.visible");

    //act
    cy.get('form[action="http://127.0.0.1:8000/user-management/user/2"]')
      .click()
      .should("contain", "Delete");
    cy.contains("If you delete this").should("be.visible");
    cy.get(".swal-button--confirm").click();

    //assert
    cy.get("p").should("be.visible");
    cy.get("p").should("contain", "User Deleted Successfully");
  });

  it("User Cancel Delete Account", () => {
    //arrange
    cy.visit("/user-management/user");
    cy.get('a[href="http://127.0.0.1:8000/user-management/user"]');
    cy.contains("User Management").should("be.visible");

    //act
    cy.get('form[action="http://127.0.0.1:8000/user-management/user/2"]')
      .click()
      .should("contain", "Delete");
    cy.contains("If you delete this").should("be.visible");
    cy.get(".swal-button--cancel").click();

    //assert
    cy.contains("User Management").should("be.visible");
  });
});
