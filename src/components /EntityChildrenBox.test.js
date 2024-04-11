import React, { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

describe('EntityChildrenBox', () => {
  test('should render correctly all children', () => {
    render(<EntityChildrenBox {...defaultProps} />);

    screen.debug();
    expect(screen.getByText('Authoring')).toBeVisible();
    expect(screen.getByText('Curation')).toBeVisible();
  });

  test('should render the child on click', () => {
    render(<EntityChildrenBox {...defaultProps} />);

    userEvent.click(screen.getByLabelText('Authoring'));

    expect(defaultProps.renderChosenEntity).toHaveBeenCalledWith(
      'Authoring',
      '5',
      { cPub: { id: '4', index: 1, name: 'cPub' } },
    );
  });

  test('should render a btn for adding a child', () => {
    render(<EntityChildrenBox {...defaultProps} />);

    expect(screen.getByRole('button', { name: 'Add Child' })).toBeVisible();
  });
});
