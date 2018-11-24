import React from "react";
import { render, waitForElement } from "react-testing-library";

import ProjectOverview from "./ProjectOverview";

describe("ProjectOverview", () => {
  it("start", async () => {
    // const OverView = () => <ProjectOverview />;
    const { getByText, getByLabelText, getByTestId } = render(
      <ProjectOverview />,
    );
    const createButton = getByText("Create Project");
    createButton.click();
    await waitForElement(() => getByText("Create New Project"));
    const nameInput = getByLabelText("Name:");
    // https://stackoverflow.com/questions/53195381/react-testing-library-with-typescript-set-an-inputs-value
    (nameInput as HTMLInputElement).value = "new-project";
    const createButton2 = getByText("Create");
    createButton2.click();

    // check if backend is called

    // check if list contains the new project
    const list = getByTestId("projectlist");
    // chck
  });
});
