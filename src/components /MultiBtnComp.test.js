import React from 'react';
import { render, screen } from '@testing-library/react';
import MultiBtnComp from './MultiBtnComp';
import { refreshIcon } from '../helpers/svgIcons';

describe('TagButton', () => {
  const tagBtnDefaultProps = {
    label: 'app',
    type: 'tag',
    aria: 'tag button',
    withDelete: false,
  };

  test('should display the correct aria-label', () => {
    render(<MultiBtnComp {...tagBtnDefaultProps} />);

    expect(screen.getByLabelText('tag button')).toBeVisible();
  });

  test('should have the correct description label', () => {
    render(<MultiBtnComp {...tagBtnDefaultProps} />);

    expect(screen.getByText('app')).toBeVisible();
  });
});

describe('SmallButton', () => {
  const smallBtnDefaultProps = {
    icon: refreshIcon,
    onClickFunction: jest.fn(),
    type: 'small',
    aria: 'small button',
  };

  test('should display the correct aria-label', () => {
    render(<MultiBtnComp {...smallBtnDefaultProps} />);

    expect(screen.getByLabelText('small button')).toBeVisible();
  });

  test('should display the correct icon', () => {
    render(<MultiBtnComp {...smallBtnDefaultProps} />);

    expect(screen.getByLabelText('refresh')).toBeVisible();
  });
});

describe('MainButton', () => {
  const MockCustomButtonContainer = () => (
    <div>
      MockCustomButtonContainer
    </div>
  );

  describe('default version', () => {
    const defaultMainButtonDefaultProps = {
      CustomButtonContainer: MockCustomButtonContainer,
      type: undefined, // why would anyone want to pass a type here?
      label: 'a label',
      clicked: false,
      onClickFunction: jest.fn(),
      aria: 'some aria-label',
    };

    test('should render the correct aria-label', () => {
      render(<MultiBtnComp {...defaultMainButtonDefaultProps} />);

      screen.debug();
      expect(screen.getByLabelText('refresh')).toBeVisible();
    });

    // test('', () => {

    // });
  });
});

// describe('DropDownButton', () => {
//   test('', () => {

//   });

//   test('', () => {

//   });
// });

// describe('MultiBtnComp', () => {
//   test('', () => {

//   });

//   test('', () => {

//   });
// });
