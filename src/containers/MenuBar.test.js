import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import MenuBar from './MenuBar';

describe('Menu Bar', () => {
  test('Should render breadcrumbs menu', () => {
    render(
      <MockedProvider addTypename={false}>
        <MenuBar />
      </MockedProvider>,
    );

    expect(screen.getByLabelText('Breadcrumbs Menu')).toBeVisible();
  });

  test('Should render SearchBar', () => {
    render(
      <MockedProvider addTypename={false}>
        <MenuBar />
      </MockedProvider>,
    );

    expect(screen.getByLabelText('Search Bar')).toBeVisible();
  });
});
