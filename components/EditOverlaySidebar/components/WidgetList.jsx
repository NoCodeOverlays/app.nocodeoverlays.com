import { firebaseAPI } from '../../../lib/firebase';
import Widget from './Widget';

const WidgetList = ({ setIsSaving, setWidgets, widgets }) =>
  Object.keys(widgets).map((widgetKey) => {
    const widget = widgets[widgetKey];
    return (
      <Widget
        deleteWidget={() => {
          delete widgets[widgetKey];
          setIsSaving(true);
          firebaseAPI('updateOverlayWidgets', widgets).then(() => {
            setWidgets({ ...widgets });
            setIsSaving(false);
          });
        }}
        widget={widget}
        widgetKey={widgetKey}
      />
    );
  });

export default WidgetList;
