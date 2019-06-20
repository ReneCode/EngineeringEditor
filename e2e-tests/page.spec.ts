// import "cypress";

describe("page", () => {
  beforeEach(() => {
    cy.visit(
      "http://localhost:3000/p/b05fa9d6-3a91-4f78-8c5c-3fbcb2d8e51f/s/15facbeb-e2fa-4026-b2b7-0af3120aa916",
    );

    cy.wait(1000);
    cy.get("canvas").type("{ctrl}A");
    cy.wait(1000);
    cy.get("canvas").type("{backspace}");
    cy.wait(1000);

    cy.get(".paper-inspector--autoupdate").click();
  });
  it("start", () => {
    cy.get(":nth-child(2) > .icon-btn > svg").click();

    cy.get("#view-0").trigger("mousedown", 100, 100);
    cy.get("#view-0").trigger("mousemove", 300, 150);
    cy.get("#view-0").trigger("mouseup", 300, 150);

    cy.get(".paper-inspector--list")
      .children()
      .should("have.length", 1);
    cy.get(".paper-inspector--list > div").contains(
      "line 100 100 300 152",
    );
  });
});
