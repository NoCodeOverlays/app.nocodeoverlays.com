import { shallow } from 'enzyme';
import { useAuth } from '../../context/auth';
import Layout from './Layout';

jest.mock('../../context/auth');

describe('<Layout />', () => {
  describe('greeting', () => {
    it('greets the user by `displayName` if there is one set', () => {
      useAuth.mockReturnValueOnce({
        user: {
          displayName: 'TestUser',
        },
        userLoading: false,
      });

      const wrapper = shallow(<Layout />);
      expect(wrapper.find('span').text()).toBe('Hey, TestUser!');
    });

    it('greets the user by email if no `displayName` set', () => {
      useAuth.mockReturnValueOnce({
        user: {
          email: 'test@test.com',
        },
        userLoading: false,
      });

      const wrapper = shallow(<Layout />);
      expect(wrapper.find('span').text()).toBe('Hey, test@test.com!');
    });
  });
});
