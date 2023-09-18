import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdvanceSearchResultsBox from './AdvanceSearchResultsBox';

const defaultProps =  {
  advanceSearchResults: [],
  onClickOption: jest.fn(),
};

describe('AdvanceSearchResultsBox', () => {
  test('should display a results box', () => {
    render(<AdvanceSearchResultsBox {...defaultProps} />);

    expect(screen.getByRole('textbox')).toBeVisible();
  });

  test('should display results if there are any', () => {
    render(<AdvanceSearchResultsBox 
    {...defaultProps} 
    advanceSearchResults={[{
      id: 'someId',
      name: 'Optimo',
      type: 'app',
      mainLink: 'www.optimo.tools.bbc.co.uk',
      briefDescription: 'The best app in the world',
      teamsResponsible: ['authoring'],
      properties: {
        tags: ['app',],
      }}
    ]}/>);

    screen.debug();
    expect(screen.getByText('Optimo')).toBeVisible();
    expect(screen.getByLabelText('choose Optimo')).toBeVisible();
  });

  test('should display no options if no results', () => {
    render(<AdvanceSearchResultsBox {...defaultProps} />);

    screen.debug();
    expect(screen.queryByLabelText(/choose/)).not.toBeInTheDocument();
  });
});
