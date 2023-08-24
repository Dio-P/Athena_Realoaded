import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing'

import MenuBar from './MenuBar';


beforeEach(() => {
   
})

describe('Menu Bar', () => {
  test.only('Should render breadcrumbs menu', () => {
    render(
      <MockedProvider addTypename={false}>
        <MenuBar />
      </MockedProvider>
    ) 

    screen.debug()
  });

  test('Should render SearchBar', () => {
    render(
      <MockedProvider addTypename={false}>
        <MenuBar />
      </MockedProvider>
    ) 
  });
})