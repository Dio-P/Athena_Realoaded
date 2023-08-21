import { render, screen } from '@testing-library/react';
import SearchComboBox from './SearchComboBox';
import useGetAllOfType from '../hooks/queries/useGetAllOfType';
import userEvent from '@testing-library/user-event';

jest.mock("../hooks/queries/useGetAllOfType")

const defaultProps = {
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
useGetAllOfType.mockImplementation(() => ([allOptionsOfType]))
})

describe('SearchComboBox', () => {
  describe('removeChoice()', () => {
    test('should delete a choice if it is not the only one of a field', () => {
      render(<SearchComboBox {...defaultProps} />);
      userEvent.type(screen.getByRole('textbox'), "a")
      userEvent.click(screen.getByText('App'))
      expect(screen.getAllByRole("button")).toBeVisible();
      // both App option and Choice are divs with no arias, make them buttons with arias or some way to know
    });

    // test('should completely delete the field key value pair from query object if choice is the only one of a field', () => {
    //   return 
    // });
  });
})