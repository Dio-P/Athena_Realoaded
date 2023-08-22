import { render, screen, act } from '@testing-library/react';
import SearchComboBox from './SearchComboBox';
import useGetAllOfType from '../hooks/queries/useGetAllOfType';
import userEvent from '@testing-library/user-event';

jest.mock("../hooks/queries/useGetAllOfType")


const defaultProps = {
  ofType: "type",
  chosenValues: {},
  onClickOption: jest.fn(),
}

const propsWithChosenValues = {
  ofType: "type",
  chosenValues: {
    name: ["Optimo"],
    mainLink: ["https://optimo.int.tools.bbc.co.uk/assets/new/editor"],
    type: ["app"]
  },
  onClickOption: jest.fn(),
}
const allOptionsOfType = ["app", "company", "department","subTeam", "team"]
beforeEach(() => {
  jest.clearAllMocks();
  useGetAllOfType.mockImplementation(() => ([allOptionsOfType]))
})
// const customRendered = (defaultProps) => jest.fn(() => render(<SearchComboBox {...defaultProps} />));

describe('SearchComboBox', () => {
  test('should render a textbox without any options if no options are available', () => {
    useGetAllOfType.mockImplementation(() => ( [""] ));
    render(<SearchComboBox {...defaultProps} />);

    expect(screen.getByRole('textbox')).toBeVisible()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()

  });

  test('should render a textbox with options if options are available', () => {
    render(<SearchComboBox {...defaultProps} />);

    expect(screen.getByRole('textbox')).toBeVisible()
    expect(screen.queryByRole('button', {name: 'add type app to query'})).toBeVisible()
    expect(screen.queryByRole('button', {name: 'add type company to query'})).toBeVisible()
    expect(screen.queryByRole('button', {name: 'add type department to query'})).toBeVisible()
    expect(screen.queryByRole('button', {name: 'add type subTeam to query'})).toBeVisible()
    expect(screen.queryByRole('button', {name: 'add type team to query'})).toBeVisible()

  });

  test('should render added choices if exist in chosenValues', () => {
    render(<SearchComboBox {...propsWithChosenValues} />);
   
    expect(screen.getByRole('button', {name: 'remove type app from query'})).toBeVisible();

  });

  test('should remove added choices', () => {
    render(<SearchComboBox {...propsWithChosenValues} />);
  
    const deleteButton = screen.queryByRole('button', {name: 'remove type app from query'});
    expect(deleteButton).toBeVisible();

    userEvent.click(deleteButton);
    expect(deleteButton).not.toBeInTheDocument(); //should this be working?
  });
})

// how to test remove choice ?