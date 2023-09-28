import React, { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import App from './App';
import useGetAllOfType from './hooks/queries/useGetAllOfType';
import useParamsHelper from './hooks/useParamsHelper';
import useEntityByIdSearch from './hooks/queries/useEntityByIdSearch';

jest.mock('./hooks/queries/useGetAllOfType');
jest.mock('./hooks/useParamsHelper');
jest.mock('./hooks/queries/useEntityByIdSearch');

const returnedEntity = {
  id: '4',
  name: 'CPub',
  type: 'team',
  leader: 'Danny Morgan',
  mainLinks: ['www.sommebbcDoc.co.uk'],
  briefDescription: 'Content Publishing',
  teamsResponsible: undefined,
  properties: {
    docs: ['2'],
    tags: [],
    technologies: [],
  },
  children: ['5'],
  connections: {
    audienceFacing: false,
    receivesDataFrom: undefined,
    givesDataTo: undefined,
  },
  interactions: {
    isLinkUpToDate: true,
    comments: [
      {
        timeStamp: 'some date and time',
        userId: 'some user Id or name',
        text: 'some text',
      },
    ],
    requestedActions: [
      {
        timeStamp: 'some date and time',
        typeOfAction: 'some action type',
        description: 'some comments',
        requestingUserId: 'some user Id or name',
      },
    ],
  },
};

const searchEntity = jest.fn();

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
