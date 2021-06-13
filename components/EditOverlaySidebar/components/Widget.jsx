import { Icon } from '../../../components';
import styles from './Widget.module.scss';

const Widget = ({
  canMoveDown,
  canMoveUp,
  deleteWidget,
  moveWidgetDown,
  moveWidgetUp,
  widget,
  widgetKey,
}) => (
  <details className={styles.Widget} key={`widget-${widgetKey}`}>
    <summary>
      <span>{widget.type}</span>
      <div>
        {canMoveUp && (
          <Icon name="arrow-up" small type="button" onClick={moveWidgetUp} />
        )}
        {canMoveDown && (
          <Icon
            name="arrow-down"
            small
            type="button"
            onClick={moveWidgetDown}
          />
        )}
        <Icon name="trash-alt" small type="button" onClick={deleteWidget} />
      </div>
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
