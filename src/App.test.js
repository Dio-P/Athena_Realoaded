import { render, screen } from '@testing-library/react';
import App from './App';


describe('app', () => {
  test('renders menu bar', () => {
    render(<App />);

    expect(screen.getByRole()).toBeVisible();
  });
})
