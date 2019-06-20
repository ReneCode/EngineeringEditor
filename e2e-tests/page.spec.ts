// import "cypress";

describe("page", () => {
  beforeEach(() => {
    cy.visit(
      "/p/b05fa9d6-3a91-4f78-8c5c-3fbcb2d8e51f/s/15facbeb-e2fa-4026-b2b7-0af3120aa916",
    );

    cy.get(".paper-inspector--autoupdate").click();

    // create a text to have something to delete
    cy.get(".icon-text").click();
    cy.get("#view-0").trigger("mousedown", 200, 200);
    cy.get(".icon-pencil").click();

    cy.get(".graphic-view").type("{ctrl}A");
    cy.get(".icon-delete").click();
  });

  it.skip("dummy", () => {});
  it("create line", () => {
    cy.get(".icon-line").click();

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

  it("create text", () => {
    cy.get(".icon-text").click();

    cy.get("#view-0").trigger("mousedown", 100, 100);
    cy.get(".icon-pencil").click();

    cy.get(".paper-inspector--list")
      .children()
      .should("have.length", 1);
    cy.get(".paper-inspector--list > div").contains(
      "text 100 100 Text",
    );

    // // select text
    cy.get(".graphic-view").trigger("mousedown", 130, 90);
    cy.get(".graphic-view").trigger("mouseup", 130, 90);

    cy.get(".paper-inspector--list")
      .children()
      .should("have.length", 2);
    cy.get(".paper-inspector--list > :nth-child(2)").contains(
      "temp 144.015625 88 Path",
    );

    // edit text
    cy.get(".graphic-view").trigger("mousedown", 130, 90);
    cy.get(".graphic-view").trigger("mouseup", 130, 90);
    cy.get(".edit-text").type("abc{rightarrow}xyz{esc}");
    cy.get(".paper-inspector--list > :nth-child(1)").contains(
      "text 100 100 abcTxyzext",
    );
  });
});
