import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";

import BreadcrumbsMenu from "./BreadcrumbsMenu";
import userEvent from "@testing-library/user-event";

const defaultProps = {
  paramsCustomObj: {
    cPub: { id: "4", index: 0, name: "cPub" },
    Authoring: { id: "5", index: 1, name: "Authoring" },
    optimo: { id: "6", index: 2, name: "optimo" },
  },
  renderChosenEntity: jest.fn(),
};

describe("Breadcrumbs Menu", () => {
  // this test can probably be improved
  test("Should render breadcrumbs menu with correct links", () => {
    render(<BreadcrumbsMenu {...defaultProps} />);

    expect(screen.getByText("/cPub")).toBeVisible();
    expect(screen.getByText("/Authoring")).toBeVisible();
    expect(screen.getByText("/optimo")).toBeVisible();
  });

  test("Should render the right entity if link is clicked", () => {
    render(<BreadcrumbsMenu {...defaultProps} />);

    userEvent.click(screen.getByText("/cPub"));
    expect(defaultProps.renderChosenEntity).toHaveBeenCalledWith("cPub", "4", {
      Authoring: { id: "5", index: 1, name: "Authoring" },
      cPub: { id: "4", index: 0, name: "cPub" },
      optimo: { id: "6", index: 2, name: "optimo" },
    });
  });
});
