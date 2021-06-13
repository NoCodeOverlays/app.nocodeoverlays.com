import { Listbox as A11yListbox } from 'a11y-components';
import styles from './Listbox.module.scss';

const Listbox = (props) => (
  <A11yListbox
    buttonClassName={styles.ListboxButton}
    containerClassName={styles.ListboxContainer}
    labelClassName={styles.ListboxLabel}
    listItemClassName={styles.ListboxItem}
    unorderedListClassName={styles.ListboxList}
    {...props}
  />
);

export default Listbox;
