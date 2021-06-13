import { Icon } from '../../../components';
import styles from './Widget.module.scss';

const Widget = ({ deleteWidget, widget, widgetKey }) => (
  <details className={styles.Widget} key={`widget-${widgetKey}`}>
    <summary>
      <span>{widget.type}</span>
      <Icon name="trash-alt" small type="button" onClick={deleteWidget} />
    </summary>
    <div>
      {Object.keys(widget).map((attribute) => (
        <span
          key={`widgetAttribute-${attribute}-${widgetKey}`}
          style={{ display: 'block' }}
        >
          <strong>{attribute}:</strong>{' '}
          {widget[attribute].family
            ? widget[attribute].family
            : widget[attribute]}
        </span>
      ))}
    </div>
  </details>
);

export default Widget;
