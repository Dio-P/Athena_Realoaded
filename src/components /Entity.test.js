import React, { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';

import Entity from './Entity';
import defaultEntity from '../fixtures/cpubEntity.json';
import childEntity from '../fixtures/authoringEntity.json';
import useChildrenByIdsSearch from '../hooks/queries/useChildrenByIdsSearch';

jest.mock('../hooks/queries/useChildrenByIdsSearch');

const defaultProps = {
  entity: defaultEntity,
  // setDisplayedEntity,
  paramsCustomObj: {
    cPub: {
      id: '4',
      index: 1,
      name: 'cPub',
    },
  },
  renderChosenEntity: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  useChildrenByIdsSearch.mockImplementation(() => [[childEntity], jest.fn()]);
});

describe('Entity', () => {
  test('should render correctly the parent and child entity', () => {
    render(
      <MockedProvider addTypename={false}>
        <Entity {...defaultProps} />
      </MockedProvider>,
    );

    expect(screen.getByText('CPub')).toBeVisible();
    expect(screen.getByText('description:')).toBeVisible();
    expect(screen.getByText('Content Publishing')).toBeVisible();
    expect(screen.getByText('Authoring')).toBeVisible();
  });

  test('should render the child on click', () => {
    render(
      <MockedProvider addTypename={false}>
        <Entity {...defaultProps} />
      </MockedProvider>,
    );
    screen.debug();
    userEvent.click(screen.getByLabelText('Authoring'));

    expect(defaultProps.renderChosenEntity).toHaveBeenCalledWith(
      'Authoring',
      '5',
      { cPub: { id: '4', index: 1, name: 'cPub' } },
    );
  });
});
