import { firebaseAPI } from '../../../lib/firebase';
import { useOverlay } from '../../../context/overlay';
import Widget from './Widget';

const WidgetList = ({ setIsSaving }) => {
  const { data, setData } = useOverlay();
  const { widgets } = data;

  return widgets.map((widget, index) => {
    return (
      <Widget
        deleteWidget={() => {
          widgets.splice(index, 1);
          setIsSaving(true);
          firebaseAPI('deleteWidget', widget).then(() => {
            setData({ ...data, widgets: [...widgets] });
            setIsSaving(false);
          });
        }}
        widget={widget}
      />
    );
  });
};

export default WidgetList;
