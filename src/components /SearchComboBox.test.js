import { render, screen, act } from "@testing-library/react";
import SearchComboBox from "./SearchComboBox";
import useGetAllOfType from "../hooks/queries/useGetAllOfType";
import userEvent from "@testing-library/user-event";

jest.mock("../hooks/queries/useGetAllOfType");

const defaultProps = {
  ofType: "type",
  chosenValues: {},
  onClickOption: jest.fn(),
};

const propsWithChosenValues = {
  ofType: "type",
  chosenValues: {
    name: ["Optimo", "IGM"],
    mainLink: ["https://optimo.int.tools.bbc.co.uk/assets/new/editor"],
    type: ["app"],
  },
  onClickOption: jest.fn(),
};
const allOptionsOfType = ["app", "company", "department", "subTeam", "team"];
beforeEach(() => {
  jest.clearAllMocks();
  useGetAllOfType.mockImplementation(() => [allOptionsOfType]);
});
// const customRendered = (defaultProps) => jest.fn(() => render(<SearchComboBox {...defaultProps} />));

describe("SearchComboBox", () => {
  test("should render a textbox without any options if no options are available", () => {
    useGetAllOfType.mockImplementation(() => [""]);
    render(<SearchComboBox {...defaultProps} />);

    expect(screen.getByRole("textbox")).toBeVisible();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  test("should render a textbox with options if options are available", () => {
    render(<SearchComboBox {...defaultProps} />);

    expect(screen.getByRole("textbox")).toBeVisible();
    expect(
      screen.queryByRole("button", { name: "add type app to query" })
    ).toBeVisible();
    expect(
      screen.queryByRole("button", { name: "add type company to query" })
    ).toBeVisible();
    expect(
      screen.queryByRole("button", { name: "add type department to query" })
    ).toBeVisible();
    expect(
      screen.queryByRole("button", { name: "add type subTeam to query" })
    ).toBeVisible();
    expect(
      screen.queryByRole("button", { name: "add type team to query" })
    ).toBeVisible();
  });

  test("should render all values chosen as parameters", () => {
    render(<SearchComboBox {...propsWithChosenValues} />);

    expect(
      screen.getByRole("button", { name: "remove type app from query" })
    ).toBeVisible();
  });

  test("should completely remove the type from parameters, if value to delete was the only one of type", async () => {
    render(<SearchComboBox {...propsWithChosenValues} />);

    const deleteButton = screen.queryByRole("button", {
      name: "remove type app from query",
    });
    expect(deleteButton).toBeVisible();

    userEvent.click(deleteButton);

    expect(propsWithChosenValues.onClickOption).toHaveBeenCalledWith({
      mainLink: ["https://optimo.int.tools.bbc.co.uk/assets/new/editor"],
      name: ["Optimo", "IGM"],
    });
  });

  test("should only remove value from parameters, if value to delete was not the only one of type", async () => {
    render(<SearchComboBox {...propsWithChosenValues} chosenValues={{
      mainLink: ["https://optimo.int.tools.bbc.co.uk/assets/new/editor"],
      name: ["Optimo", "IGM"],
      type: ["app","mainLink"],
    }}
    />);

    const deleteButton = screen.queryByRole("button", {
      name: "remove type app from query",
    });
    expect(deleteButton).toBeVisible();

    await userEvent.click(deleteButton);
    expect(propsWithChosenValues.onClickOption).toHaveBeenCalledWith({
      mainLink: ["https://optimo.int.tools.bbc.co.uk/assets/new/editor"],
      name: ["Optimo", "IGM"],
      type: ["mainLink"],
    });
  });
//to  move to parent
  // test("should render all values chosen as parameters", () => {
  //   render(<SearchComboBox {...propsWithChosenValues} />);

  //   expect(
  //     screen.getByRole("button", { name: "remove type app from query" })
  //   ).toBeVisible();
  //   expect(
  //     screen.getByRole("button", { name: "remove mainLink https://optimo.int.tools.bbc.co.uk/assets/new/editor from query" })
  //   ).toBeVisible();
  //   expect(
  //     screen.getByRole("button", { name: "remove name Optimo from query" })
  //   ).toBeVisible();
  //   expect(
  //     screen.getByRole("button", { name: "remove name IGM from query" })
  //   ).toBeVisible();
  // });
});
