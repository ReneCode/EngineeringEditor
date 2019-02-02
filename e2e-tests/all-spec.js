import { wait } from "react-testing-library";

describe("first test", () => {
  it.skip("start", () => {
    cy.visit("/");
    cy.contains("Projects").click();
    cy.url().should("include", "/project");
    cy.wait(400);
    const card = cy.contains("new project");
    card.click();
    card.click();

    cy.contains("Pages").click();
    cy.contains("new page A").click();
    // cy.contains("Pages").click();
    cy.contains("new page A").should("have.class", "active");

    // cy.contains("new project");
    // cy.get("new project").click();
    // cy.get("[data-testid=projectlist] > :nth-child(2)").click();
  });
});
