import { Button } from 'a11y-components';
import { Icon } from '../';
import styles from './Modal.module.scss';

const Modal = ({ children, title, onClose, buttons = [] }) => (
  <div className={styles.Modal}>
    <div className={styles['Modal--container']}>
      <div className={styles['Modal--header']}>
        <h1>{title}</h1>
        <Button onClick={onClose}>
          <Icon name="times" />
        </Button>
      </div>
      <div className={styles['Modal--body']}>{children}</div>
      <div className={styles['Modal--footer']}>
        {buttons.map((button) => button)}
      </div>
    </div>
  </div>
);

export default Modal;
