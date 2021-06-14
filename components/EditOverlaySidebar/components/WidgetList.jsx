import { firebaseAPI } from '../../../lib/firebase';
import { useOverlay } from '../../../contexts/overlay';
import Widget from './Widget';

const WidgetList = ({ setIsSaving }) => {
  const { data, setData } = useOverlay();
  const { widgets } = data;
  const numWidgets = widgets.length;

  return [...widgets].reverse().map((widget, index) => (
    <Widget
      canMoveDown={widget.position > 0}
      canMoveUp={widget.position < numWidgets - 1}
      deleteWidget={() => {
        widgets.splice(index, 1);
        setIsSaving(true);
        firebaseAPI('deleteWidget', widget).then(() => {
          setData({ ...data, widgets: [...widgets] });
          setIsSaving(false);
        });
      }}
      moveWidgetDown={() => {
        const currentPosition = widget.position;
        const widgetToSwapWith = widgets[currentPosition - 1];
        firebaseAPI('swapWidgets', widget, widgetToSwapWith).then(
          (updatedWidgets) => {
            setData({ ...data, widgets: [...updatedWidgets] });
          },
        );
      }}
      moveWidgetUp={() => {
        const currentPosition = widget.position;
        const widgetToSwapWith = widgets[currentPosition + 1];
        firebaseAPI('swapWidgets', widget, widgetToSwapWith).then(
          (updatedWidgets) => {
            setData({ ...data, widgets: [...updatedWidgets] });
          },
        );
      }}
      widget={widget}
    />
  ));
};

export default WidgetList;
