import React from 'react';
import { render, screen } from '@testing-library/react';
import MultiBtnComp from './MultiBtnComp';

describe('TagButton', () => {
  const tagBtnDefaultProps = {
    label: 'app',
    type: 'tag',
    aria: 'tag button',
    withDelete: false,
  };

  test('', () => {
    render(<MultiBtnComp {...tagBtnDefaultProps} />);

    screen.debug();
  });

  // test('', () => {

  // });
});

// describe('MainButton', () => {
//   test('', () => {

//   });

//   test('', () => {

//   });
// });

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
