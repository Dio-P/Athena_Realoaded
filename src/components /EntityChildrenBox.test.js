import React, { render, screen } from '@testing-library/react';

import EntityChildrenBox from './EntityChildrenBox';

import child1 from '../fixtures/authoringEntity.json';
import child2 from '../fixtures/curationEntity.json';

const defaultProps = {
  returnedChildren: [child1, child2],
  renderChosenEntity: jest.fn(),
  paramsCustomObj: {
    cPub: {
      id: '4',
      index: 1,
      name: 'cPub',
    },
  },
};

describe('EnityChildrenBox', () => {
  test('should render correctly all children', () => {
    render(<EntityChildrenBox {...defaultProps} />);

    screen.debug();
    expect(screen.getByText('Authoring')).toBeVisible();
    expect(screen.getByText('Curation')).toBeVisible();
  });
});
