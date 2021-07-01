import { useOverlay } from '@contexts';

const textAlignToJustifyContent = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const alignItemsToVerticalAlign = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const Overlay = ({ width, height }) => {
  const { data } = useOverlay();
  const { widgets } = data;

  return (
    <div
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        overflow: 'hidden',
        backgroundColor: 'white',
      }}
    >
      {widgets.map((widget, index) => {
        if (widget.type === 'color') {
          return (
            <div
              key={`widget-${index}`}
              style={{
                width: `${widget.width}px`,
                height: `${widget.height}px`,
                backgroundColor: widget.color,
                position: 'absolute',
                top: `${widget.yPosition}px`,
                left: `${widget.xPosition}px`,
              }}
            ></div>
          );
        } else if (widget.type === 'image') {
          return (
            <img
              key={`widget-${index}`}
              src={widget.url}
              style={{
                width: `${widget.width}px`,
                height: `${widget.height}px`,
                position: 'absolute',
                top: `${widget.yPosition}px`,
                left: `${widget.xPosition}px`,
              }}
            />
          );
        } else if (widget.type === 'text') {
          return (
            <div
              key={`widget-${index}`}
              style={{
                alignItems: alignItemsToVerticalAlign[widget.verticalAlign],
                color: `${widget.color}`,
                display: 'flex',
                fontFamily: widget.fontFamily,
                fontSize: `${widget.fontSize}px`,
                height: `${widget.height}px`,
                justifyContent: textAlignToJustifyContent[widget.textAlign],
                left: `${widget.xPosition}px`,
                position: 'absolute',
                top: `${widget.yPosition}px`,
                width: `${widget.width}px`,
              }}
            >
              {widget.text}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Overlay;
