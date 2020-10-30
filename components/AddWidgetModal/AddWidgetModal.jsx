import { useState, useLayoutEffect } from 'react';
import { Button, Input, Listbox } from '@amb-codes-crafts/a11y-components';
import { Modal } from '../';

const widgetTypeOptions = [
  { id: '', label: 'Choose a type' },
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
    { id: 'width', label: 'Width', type: 'number' },
    { id: 'height', label: 'Height', type: 'number' },
    { id: 'xPosition', label: 'X Position', type: 'number' },
    { id: 'yPosition', label: 'Y Position', type: 'number' },
    { id: 'color', label: 'Color (hex)', type: 'text' },
    { id: 'textAlign', label: 'Horizontal Alignment', type: 'select' },
    { id: 'verticalAlign', label: 'Vertical Alignment', type: 'select' },
  ],
};

const AddWidgetModal = ({ fontFamilies, onClose, onAdd }) => {
  const [widgetType, setWidgetType] = useState('');
  const [attributes, setAttributes] = useState({});

  let canAddWidget = false;
  if (widgetType) {
    const numberOfAttributesGiven = Object.keys(attributes).length - 1;
    const numberOfAttributesNeeded = typesToAttributes[widgetType].length;
    canAddWidget = numberOfAttributesGiven === numberOfAttributesNeeded;
  }

  return (
    <Modal
      title="Add a widget"
      onClose={onClose}
      buttons={[
        <Button
          disabled={!canAddWidget}
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
                    const selectedFontFamily = fontFamilies[nextOptionId];
                    setAttributes({
                      ...attributes,
                      [id]: selectedFontFamily.label,
                      type: widgetType,
                    });
                  }}
                />
              );
            } else if (id === 'textAlign') {
              return (
                <Listbox
                  label={label}
                  options={[
                    { id: 'left', label: 'Left' },
                    { id: 'center', label: 'Center' },
                    { id: 'right', label: 'Right' },
                    { id: 'justify', label: 'Justify' },
                  ]}
                  onChange={(nextTextAlign) => {
                    setAttributes({
                      ...attributes,
                      [id]: nextTextAlign,
                      type: widgetType,
                    });
                  }}
                />
              );
            } else if (id === 'verticalAlign') {
              return (
                <Listbox
                  label={label}
                  options={[
                    { id: 'top', label: 'Top' },
                    { id: 'middle', label: 'Middle' },
                    { id: 'bottom', label: 'Bottom' },
                  ]}
                  onChange={(nextVerticalAlign) => {
                    setAttributes({
                      ...attributes,
                      [id]: nextVerticalAlign,
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
                onChange={(e) => {
                  const value = e.target.value;
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
