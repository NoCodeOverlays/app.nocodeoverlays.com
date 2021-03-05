import { shallow } from 'enzyme';
import { useAuth } from '../../context/auth';
import Layout from './Layout';

jest.mock('../../context/auth');

const mockUser = {
  displayName: 'TestUser',
  email: 'test@test.com',
};

describe('<Layout />', () => {
  describe('greeting', () => {
    it('greets the user by email if no `displayName` set', () => {
      const mockUserCopy = { ...mockUser };
      delete mockUserCopy.displayName;

      useAuth.mockReturnValueOnce({
        user: mockUserCopy,
        userLoading: false,
      });

      const wrapper = shallow(<Layout />);
      expect(wrapper.find('span').text()).toBe(`Hey, ${mockUser.email}!`);
    });

    it('greets the user by `displayName` if there is one set', () => {
      useAuth.mockReturnValueOnce({
        user: mockUser,
        userLoading: false,
      });

      const wrapper = shallow(<Layout />);
      expect(wrapper.find('span').text()).toBe(`Hey, ${mockUser.displayName}!`);
    });
  });
});
