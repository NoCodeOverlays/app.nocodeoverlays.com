/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { useAuth } from '../../context/auth';
import HomePage from '../index';

jest.mock('../../context/auth');

const mockUser = {
  displayName: 'TestUser',
  email: 'test@test.com',
};

describe('<HomePage />', () => {
  beforeAll(() => {
    useAuth.mockReturnValue({
      user: mockUser,
      userLoading: false,
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('successfully renders', () => {
    render(<HomePage />);

    const mainHeading = screen.getByRole('heading', { level: 2 });
    expect(mainHeading).toBeVisible();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links[0].href).toMatch(/\/overlay$/);
    expect(links[1].href).toMatch(/\/edit\/overlay$/);
    expect(links[2].href).toMatch(/\/profile$/);
  });
});
