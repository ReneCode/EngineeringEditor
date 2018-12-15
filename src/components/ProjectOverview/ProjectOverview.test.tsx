import React from "react";
import { render, waitForElement } from "react-testing-library";

import ProjectOverview from "./ProjectOverview";
import { BrowserRouter as Router } from "react-router-dom";

describe("ProjectOverview", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("start", async () => {
    // const OverView = () => <ProjectOverview />;
    const newProjectName = "MyNewProject";

    fetch.mockResponses(
      [JSON.stringify(["fileA", "fileB"])],
      [
        JSON.stringify({
          data: { projects: [{ id: "a1", name: "P1" }] },
        }),
      ],

      [
        JSON.stringify({
          data: {
            createProject: { id: "new", name: newProjectName },
          },
        }),
      ],
    );

    const { getByText, getByLabelText, getByTestId } = render(
      <Router>
        <ProjectOverview />
      </Router>,
    );

    await waitForElement(() => getByText("P1"));

    const a1Card = getByText("P1");

    const createCard = getByText("+ New Project");
    createCard.click();
    await waitForElement(() => getByText("Create New Project"));
    const nameInput = getByLabelText("Name:");
    // https://stackoverflow.com/questions/53195381/react-testing-library-with-typescript-set-an-inputs-value
    (nameInput as HTMLInputElement).value = newProjectName;
    const createButton2 = getByText("Create");
    createButton2.click();

    // check if backend is called

    // check if list contains the new project
    const newProjectCard = getByText("fileA");
    const list = getByTestId("projectlist");
    // chck
  });
});
