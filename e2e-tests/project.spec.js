import { wait } from "react-testing-library";

describe("project", () => {
  const projectName = "zTest";

  afterEach(() => {
    cy.visit("/");
    cy.contains("Projects").click();
    cy.wait(400);

    // delete last project
    cy.get(".projectcard")
      .last()
      .find('div[title="Delete"]')
      .click();
  });

  it("create new project", () => {
    cy.visit("/");
    cy.contains("Projects").click();
    cy.url().should("include", "/project");
    cy.wait(400);

    cy.contains("+ New Project").click();

    cy.get("#projectname").type(projectName);
    cy.get("button").click();

    const newProjectCard = cy.contains(projectName);
    newProjectCard.click();
    newProjectCard.click();

    cy.url().should("include", "/nopage");
  });

  it.only("create line", () => {
    cy.visit("/");
    cy.contains("Projects").click();
    cy.contains("ProjectA").click();
    cy.contains("ProjectA").click();

    cy.contains("Pages").click();
    cy.contains("Page-1").click();

    cy.contains("Drawing").click();
    cy.contains("Line").click();

    const canvas = cy.get(".GraphicView");
    canvas.trigger("mousedown", 100, 50);
    canvas.trigger("mousemove", 200, 150);
    canvas.trigger("mouseup", 200, 150);
  });
});
