describe("Test Scenario User Create Account", () => {
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

  //Positive Test Case
  it("User Successfully Create Account", () => {
    //arrange
    cy.visit("/user-management/user");
    cy.get(
      'a[href="http://127.0.0.1:8000/user-management/user/create"]'
    ).click();
    cy.contains("Validasi Tambah Data").should("be.visible");

    //act
    cy.get("#name").type("Ifan Muhammad");
    cy.get("#email").clear().type("adminmagang@gmail.com");
    cy.get("#password").clear().type("123445678");

    cy.get(".btn-primary").click().should("contain", "Submit");

    //assert
    cy.get("p").should("be.visible");
    cy.get("p").should("contain", "Data Berhasil Ditambahkan");
  });

  it.only("User Cancel Create Account", () => {
    //arrange
    cy.visit("/user-management/user");
    cy.get(
      'a[href="http://127.0.0.1:8000/user-management/user/create"]'
    ).click();
    cy.contains("Validasi Tambah Data").should("be.visible");

    //act
    cy.get(".btn-secondary").click();

    //assert
    cy.contains("User Management").should("be.visible");
  });

  //Negative Test Case
  it("User Empty Field Name", () => {
    //arrange
    cy.visit("/user-management/user");
    cy.get(
      'a[href="http://127.0.0.1:8000/user-management/user/create"]'
    ).click();
    cy.contains("Validasi Tambah Data").should("be.visible");

    //act
    //cy.get("#name").type("Ifan Muhammad");
    cy.get("#email").clear().type("adminmagang@gmail.com");
    cy.get("#password").clear().type("123445678");

    cy.get(".btn-primary").click().should("contain", "Submit");

    //assert
    cy.get(".invalid-feedback").should(
      "be.visible",
      "contain",
      "The name field is required."
    );
  });

  it("User Empty Field Email", () => {
    //arrange
    cy.visit("/user-management/user");
    cy.get(
      'a[href="http://127.0.0.1:8000/user-management/user/create"]'
    ).click();
    cy.contains("Validasi Tambah Data").should("be.visible");

    //act
    cy.get("#name").type("Ifan Muhammad");
    //cy.get("#email").clear().type("adminmagang@gmail.com");
    cy.get("#password").clear().type("123445678");

    cy.get(".btn-primary").click().should("contain", "Submit");

    //assert
    cy.get(".invalid-feedback").should(
      "be.visible",
      "contain",
      "The email field is required."
    );
  });

  it("User Empty Field Password", () => {
    //arrange
    cy.visit("/user-management/user");
    cy.get(
      'a[href="http://127.0.0.1:8000/user-management/user/create"]'
    ).click();
    cy.contains("Validasi Tambah Data").should("be.visible");

    //act
    cy.get("#name").type("Ifan Muhammad");
    cy.get("#email").clear().type("adminmagang@gmail.com");
    //cy.get("#password").clear().type("123445678");

    cy.get(".btn-primary").click().should("contain", "Submit");

    //assert
    cy.get(".invalid-feedback").should(
      "be.visible",
      "contain",
      "The password field is required."
    );
  });

  it("User Empty All Field", () => {
    //arrange
    cy.visit("/user-management/user");
    cy.get(
      'a[href="http://127.0.0.1:8000/user-management/user/create"]'
    ).click();
    cy.contains("Validasi Tambah Data").should("be.visible");

    //act
    //cy.get("#name").type("Ifan Muhammad");
    cy.get("#email").clear();
    cy.get("#password").clear();

    cy.get(".btn-primary").click().should("contain", "Submit");

    //assert
    cy.get(".invalid-feedback").should(
      "be.visible",
      "contain",
      "The name field is required."
    );
    cy.get(".invalid-feedback").should(
      "be.visible",
      "contain",
      "The email field is required."
    );
    cy.get(".invalid-feedback").should(
      "be.visible",
      "contain",
      "The password field is required."
    );
  });
});
