import { Icon } from '@components';
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
      <div className={styles.WidgetControls}>
        <Icon
          disabled={!canMoveUp}
          name="arrow-up"
          onClick={moveWidgetUp}
          small
          type="button"
        />
        <Icon
          disabled={!canMoveDown}
          name="arrow-down"
          onClick={moveWidgetDown}
          small
          type="button"
        />
        <Icon name="trash-alt" small type="button" onClick={deleteWidget} />
      </div>
    </summary>
    <div>
      {Object.keys(widget)
        .filter((key) => key !== 'id')
        .map((attribute) => (
          <div className={styles.WidgetAttribute}>
            <p key={`widgetAttribute-${attribute}-${widgetKey}`}>
              <span>
                <strong>{attribute}:</strong>
              </span>{' '}
              <span>
                {widget[attribute].family
                  ? widget[attribute].family
                  : widget[attribute]}
              </span>
            </p>
          </div>
        ))}
    </div>
  </details>
);

export default Widget;
