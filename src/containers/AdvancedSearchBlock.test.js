import React from 'react';
import { render, screen } from '@testing-library/react';

import AdvancedSearchBlock from './AdvancedSearchBlock';
import useGetAllOfType from '../hooks/queries/useGetAllOfType';

jest.mock('../hooks/queries/useGetAllOfType');

const defaultProps = {
  isOpen: false,
  setIsOpen: jest.fn(),
  advanceQueryParameters: {},
  setAdvanceQueryParameters: jest.fn(),
  onClickSearch: jest.fn(),
};

const propsWithChosenValues = {
  isOpen: true,
  setIsOpen: jest.fn(),
  advanceQueryParameters: {
    name: ['Optimo', 'IGM'],
    mainLinks: ['https://optimo.int.tools.bbc.co.uk/assets/new/editor'],
    type: ['app'],
  },
  setAdvanceQueryParameters: jest.fn(),
  onClickSearch: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  useGetAllOfType.mockImplementation(() => [[]]);
});

describe('AdvancedSearchBlock', () => {
  test('Should only render bar if block is closed', () => {
    render(
      <AdvancedSearchBlock {...defaultProps} />,
    );

    expect(screen.getByLabelText('Advanced Search')).toBeVisible();
    expect(screen.queryByLabelText('search for tags')).not.toBeInTheDocument();
  });

  test('Should render iputs for each type if bolck is open', () => {
    render(
      <AdvancedSearchBlock {...defaultProps} isOpen />,
    );

    expect(screen.getByLabelText('search for tags')).toBeVisible();
    expect(screen.getByLabelText('search for name')).toBeVisible();
    expect(screen.getByLabelText('search for type')).toBeVisible();
    expect(screen.getByLabelText('search for mainLinks')).toBeVisible();
    expect(screen.getByLabelText('search for briefDescription')).toBeVisible();
    expect(screen.getByLabelText('search for leader')).toBeVisible();
  });

  test('should render all values chosen as parameters', () => {
    render(<AdvancedSearchBlock {...propsWithChosenValues} />);

    expect(
      screen.getByRole('button', { name: 'remove type app from query' }),
    ).toBeVisible();
    expect(
      screen.getByRole('button', { name: 'remove mainLinks https://optimo.int.tools.bbc.co.uk/assets/new/editor from query' }),
    ).toBeVisible();
    expect(
      screen.getByRole('button', { name: 'remove name Optimo from query' }),
    ).toBeVisible();
    expect(
      screen.getByRole('button', { name: 'remove name IGM from query' }),
    ).toBeVisible();
  });

  test('Should render search button', () => {
    render(
      <AdvancedSearchBlock {...defaultProps} isOpen />,
    );
    expect(screen.getByLabelText('Search')).toBeVisible();
  });

  test('Should render refresh button', () => {
    render(
      <AdvancedSearchBlock {...defaultProps} isOpen />,
    );
    expect(screen.getByLabelText('Refresh')).toBeVisible();
  });
});
