import React, { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import App from './App';
import useGetAllOfType from './hooks/queries/useGetAllOfType';
import useParamsHelper from './hooks/useParamsHelper';
import useEntityByIdSearch from './hooks/queries/useEntityByIdSearch';
import useChildrenByIdsSearch from './hooks/queries/useChildrenByIdsSearch';

import cPubEntity from './fixtures/cpubEntity.json';
import authoringEntity from './fixtures/authoringEntity.json';

jest.mock('./hooks/queries/useGetAllOfType');
jest.mock('./hooks/useParamsHelper');
jest.mock('./hooks/queries/useEntityByIdSearch');
jest.mock('./hooks/queries/useChildrenByIdsSearch');

const returnedEntity = cPubEntity;
const returnedChildren = [authoringEntity];

const searchEntity = jest.fn();
const searchChildren = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  useGetAllOfType.mockImplementation(() => ([]));
  useParamsHelper.mockImplementation(() => ({
    displayedEntityId: '1',
    renderChosenEntity: jest.fn(),
    setSearchParams: jest.fn(),
  }));
  useEntityByIdSearch.mockImplementation(() => ([
    returnedEntity,
    searchEntity,
  ]));
  useChildrenByIdsSearch.mockImplementation(() => ([
    returnedChildren,
    searchChildren,
  ]));
});

describe('app', () => {
  test('renders menu bar', () => {
    render(
      <MockedProvider addTypename={false}>
        <App />
      </MockedProvider>,
    );

    expect(screen.getByLabelText('menu bar')).toBeVisible();
  });

  test('renders entity if returnedEntity', () => {
    render(
      <MockedProvider addTypename={false}>
        <App />
      </MockedProvider>,
    );

    expect(screen.getByLabelText('CPub')).toBeVisible();
  });

  test('should not renders entity if no returnedEntity', () => {
    useEntityByIdSearch.mockImplementation(() => ([
      undefined,
      searchEntity,
    ]));

    render(
      <MockedProvider addTypename={false}>
        <App />
      </MockedProvider>,
    );

    expect(screen.queryByLabelText('CPub')).not.toBeInTheDocument();
  });
});
