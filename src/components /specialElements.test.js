import React from 'react';
import { render, screen } from '@testing-library/react';
import { WarningElement } from './specialElements';

describe('WarningElement', () => {
  test('', () => {
    render(<WarningElement info="This is a custom message to be displayed with warning" />);

    expect(screen.getByText(/Warning/)).toBeVisible();
    expect(screen.getByText('This is a custom message to be displayed with warning')).toBeVisible();
  });
});

// describe('SearchBar', () => {
//   const mockSearch = jest.fn();
//   test.only('', () => {
//     render(<SearchBar searchingQuery="opti" search={mockSearch} />);
//     // screen.debug();
//     expect(screen.getByRole('textbox')).toBeVisible();
//   });
// });
