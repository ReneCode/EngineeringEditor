describe("page", () => {
  beforeEach(() => {
    cy.visit(
      "/p/b05fa9d6-3a91-4f78-8c5c-3fbcb2d8e51f/s/15facbeb-e2fa-4026-b2b7-0af3120aa916",
    );

    cy.wait(500);
    cy.get(".paper-inspector--autoupdate").click();

    // // create a text to have something to delete
    // cy.get(".icon-text").click();
    // cy.get("#view-0").trigger("mousedown", 200, 200);
    // cy.get("#view-0").trigger("mouseup", 200, 200);
    // cy.get(".icon-pencil").click();

    cy.get(".graphic-view").type("{ctrl}a");
    cy.wait(500);

    cy.get(".graphic-view").type("{backspace}");
    // cy.get(".icon-delete").click();

    cy.get(".paper-inspector--list")
      .children()
      .should("have.length", 0);
  });

  it.skip("dummy", () => {});

  it.only("copy / paste", () => {
    // create line
    cy.get(".graphic-view").type("l");
    cy.get("#view-0").trigger("mousedown", 200, 200);
    cy.get("#view-0").trigger("mouseup", 400, 200);
    cy.get(".graphic-view").type("{esc}");

    // select line
    cy.get("#view-0").trigger("mousedown", 300, 200);
    cy.get("#view-0").trigger("mouseup", 300, 200);

    // copy - paste
    cy.get(".graphic-view").type("{ctrl}c");
    cy.get(".graphic-view").type("{ctrl}v");

    // remove select
    cy.get("#view-0").trigger("mousedown", 300, 300);
    cy.get("#view-0").trigger("mouseup", 300, 300);

    cy.get(".paper-inspector--list")
      .children()
      .should("have.length", 2);
    cy.get(".paper-inspector--list > div").contains(
      "line 200 200 400 200",
    );
  });

  it("create line with raster", () => {
    cy.get(".icon-line").click();

    cy.get("#view-0").trigger("mousemove", 150, 200);
    // second point +50, -50  =>  200, 150 => position = middle = 175, 175
    cy.get(".paper-inspector--list > div").contains(
      ".line 175 175 Path",
    );

    cy.get("#view-0").trigger("mousedown", 98, 99);
    cy.get("#view-0").trigger("mousemove", 301, 152);
    cy.get("#view-0").trigger("mouseup", 301, 152);

    cy.get(".paper-inspector--list")
      .children()
      .should("have.length", 1);
    cy.get(".paper-inspector--list > div").contains(
      "line 100 100 300 150",
    );
  });

  it("create text", () => {
    cy.get(".icon-text").click();

    cy.get("#view-0").trigger("mousemove", 200, 200);
    cy.get(".paper-inspector--list > div").contains(
      ".text 244.015625 188 PointText",
    );

    cy.get("#view-0").trigger("mousedown", 100, 100);
    cy.get(".paper-inspector--list > div").contains(
      ".text 144.015625 88 PointText",
    );

    cy.get("#view-0").trigger("mousemove", 150, 150);
    cy.get("#view-0").trigger("mouseup", 200, 200);

    cy.get(".paper-inspector--list")
      .children()
      .should("have.length", 1);
    cy.get(".paper-inspector--list > div").contains(
      "text 200 200 Text",
    );
    // stop
    cy.get(".icon-pencil").click();

    // // select text
    cy.get(".graphic-view").trigger("mousedown", 220, 180);
    cy.get(".graphic-view").trigger("mouseup", 220, 180);

    cy.get(".paper-inspector--list")
      .children()
      .should("have.length", 2);
    cy.get(".paper-inspector--list > :nth-child(2)").contains(
      "temp 244.015625 188 Path",
    );

    // edit text
    cy.get(".graphic-view").trigger("mousedown", 230, 190);
    cy.get(".graphic-view").trigger("mouseup", 230, 190);
    cy.get(".edit-text").type("abc{rightarrow}xyz{esc}");
    cy.get(".paper-inspector--list > :nth-child(1)").contains(
      "text 200 200 abcTxyzext",
    );
  });
});
