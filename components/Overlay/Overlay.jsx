import { useOverlay } from '@contexts/overlay';

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
            <span
              key={`widget-${index}`}
              style={{
                width: `${widget.width}px`,
                height: `${widget.height}px`,
                lineHeight: `${widget.height}px`,
                position: 'absolute',
                top: `${widget.yPosition}px`,
                left: `${widget.xPosition}px`,
                fontFamily: widget.fontFamily,
                fontSize: `${widget.fontSize}px`,
                color: `${widget.color}`,
                textAlign: `${widget.textAlign}`,
                verticalAlign: `${widget.verticalAlign}`,
              }}
            >
              {widget.text}
            </span>
          );
        }
      })}
    </div>
  );
};

export default Overlay;
