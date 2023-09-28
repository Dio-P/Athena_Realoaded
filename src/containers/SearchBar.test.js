import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';

import SearchBar from './SearchBar';

describe('Search Bar', () => {
  test('Should render advanced search block', () => {
    render(
      <MockedProvider addTypename={false}>
        <SearchBar />
      </MockedProvider>,
    );

    expect(screen.getByLabelText('Advanced Search')).toBeVisible();
  });

  test('Should render Entity Combobox if Advance Search Bar is Closed', () => {
    render(
      <MockedProvider addTypename={false}>
        <SearchBar />
      </MockedProvider>,
    );

    expect(screen.getByLabelText('search for Entity')).toBeVisible();
  });

  test('Should render AdvanceSearchResultsBox if Advance Search Bar is Open', () => {
    render(
      <MockedProvider addTypename={false}>
        <SearchBar />
      </MockedProvider>,
    );

    act(() => {
      userEvent.click(screen.getByLabelText('Advanced Search'));
    });
    expect(screen.getByLabelText('Advance Search Results')).toBeVisible();
  });
});

// what are the best practises for adding aria label?
// why isn't the last test working ?
// the await makes the difference although the comliler states that it has no effect,
// this could be also the case with the previous tests.
