import { useState, useLayoutEffect } from 'react';
import { Listbox } from '@amb-codes-crafts/a11y-components';
import { Button, Input, Modal } from '../';

const widgetTypeOptions = [
  { id: 'color', label: 'Color Block' },
  { id: 'image', label: 'Image' },
  { id: 'text', label: 'Text Block' },
];

const typesToAttributes = {
  color: [
    { id: 'width', label: 'Width', type: 'number' },
    { id: 'height', label: 'Height', type: 'number' },
    { id: 'xPosition', label: 'X Position', type: 'number' },
    { id: 'yPosition', label: 'Y Position', type: 'number' },
    { id: 'color', label: 'Color (Hex)', type: 'text' },
  ],
  image: [
    { id: 'width', label: 'Width', type: 'number' },
    { id: 'height', label: 'Height', type: 'number' },
    { id: 'xPosition', label: 'X Position', type: 'number' },
    { id: 'yPosition', label: 'Y Position', type: 'number' },
    { id: 'url', label: 'URL', type: 'text' },
  ],
  text: [
    { id: 'text', label: 'Text', type: 'text' },
    { id: 'fontFamily', label: 'Font Family', type: 'select' },
    { id: 'fontSize', label: 'Font Size', type: 'number' },
    { id: 'xPosition', label: 'X Position', type: 'number' },
    { id: 'yPosition', label: 'Y Position', type: 'number' },
  ],
};

const AddWidgetModal = ({ onClose, onAdd }) => {
  const [widgetType, setWidgetType] = useState('');
  const [attributes, setAttributes] = useState({});
  const [fontFamilies, setFontFamilies] = useState([]);

  useLayoutEffect(() => {
    if (widgetType === 'text') {
      fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${process.env.NEXT_PUBLIC_GOOGLE_WEB_FONTS_DEVELOPER_API_KEY}`
      ).then((res) => {
        res.json().then((data) => {
          const sortedFamilies = data.items
            .slice(0, 100)
            .map((font, index) => ({ id: index, label: font.family }))
            .sort((a, b) => (a.label <= b.label ? -1 : 1));
          setFontFamilies(sortedFamilies);
        });
      });
    }
  }, [widgetType]);

  return (
    <Modal
      title="Add a widget"
      onClose={onClose}
      buttons={[
        <Button
          disabled={!widgetType}
          onClick={() => {
            onAdd(attributes);
          }}
        >
          Add
        </Button>,
      ]}
    >
      <Listbox
        label="Widget Type"
        options={widgetTypeOptions}
        value={widgetType}
        onChange={(newWidgetType) => {
          console.log(newWidgetType);
          setWidgetType(newWidgetType);
        }}
      />

      {widgetType && (
        <>
          {typesToAttributes[widgetType].map(({ id, label, type }) => {
            if (id === 'fontFamily') {
              return (
                <Listbox
                  label="Font family"
                  options={fontFamilies}
                  onChange={(nextOptionId) => {
                    const selectedFontFamily = fontFamilies[nextOptionId].label;
                    setAttributes({
                      ...attributes,
                      [id]: selectedFontFamily,
                      type: widgetType,
                    });
                  }}
                />
              );
            }

            return (
              <Input
                id={id}
                key={`widgetInput-${id}`}
                label={label}
                type={type}
                value={attributes[id] || ''}
                onChange={(value) => {
                  setAttributes({
                    ...attributes,
                    [id]: value,
                    type: widgetType,
                  });
                }}
              />
            );
          })}
        </>
      )}
    </Modal>
  );
};

export default AddWidgetModal;
