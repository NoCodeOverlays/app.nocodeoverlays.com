/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { useAuth } from '../../context/auth';
import LoginPage from '../login';

jest.mock('../../context/auth');

describe('<LoginPage />', () => {
  beforeAll(() => {
    useAuth.mockReturnValue({
      user: null,
      userLoading: false,
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('successfully renders', () => {
    render(<LoginPage />);

    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent('Welcome to No-Code Overlays!');

    const secondHeading = screen.getByRole('heading', { level: 2 });
    expect(secondHeading).toHaveTextContent('Please log in to get going.');

    const emailInput = screen.getByLabelText('Email');
    expect(emailInput).toBeVisible();

    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toBeVisible();

    const goButton = screen.getByRole('button');
    expect(goButton).toHaveTextContent("Let's Go!");
  });
});
