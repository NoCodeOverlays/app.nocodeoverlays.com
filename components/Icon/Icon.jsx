import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'a11y-components';
import styles from './Icon.module.scss';

const Icon = ({
  disabled,
  large,
  name = 'smile',
  onClick,
  small,
  spin,
  type,
}) => {
  let cx = classNames.bind(styles);
  let className = cx('Icon', {
    'Icon--small': !!small,
    'Icon--large': !!large,
  });

  const icon = (
    <FontAwesomeIcon className={className} icon={name} spin={spin} />
  );
  if (type === 'button') {
    return (
      <Button
        className={styles.IconButton}
        disabled={disabled}
        onClick={disabled ? undefined : onClick}
      >
        {icon}
      </Button>
    );
  } else {
    return icon;
  }
};

export default Icon;
