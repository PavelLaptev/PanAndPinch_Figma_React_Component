import * as React from "react";

interface Props {
  panSpeedRatio?: number;
  test?: boolean;
}

const tetsModeStyles = {
  wrapper: {
    background: "rgba(0,0,0,0.1)",
  },
  container: {
    border: "3px solid #0044ff",
  },
};

const PanAndPinch: React.FunctionComponent<Props> = (props) => {
  const [spacePressed, setSpacePressed] = React.useState(false);
  const [mouseKeyIsDown, setMouseKeyIsDown] = React.useState(false);
  const [transform, setTransform] = React.useState({ scale: 1, x: 0, y: 0 });

  const returnZoomMinOrMax = () => {
    if (transform.scale < 0.3) {
      setTransform({
        ...transform,
        scale: 0.31,
      });
    }
    if (transform.scale > 3) {
      setTransform({
        ...transform,
        scale: 2.95,
      });
    }
  };

  // HANDLE ON MOUSE WHEEL (FOR TRACKPADS)
  const handleOnWheel = (e: any) => {
    // DETECT PAN
    if (e.deltaX !== 0 || e.deltaY !== 0) {
      setTransform((prevState) => ({
        ...transform,
        x: prevState.x - e.deltaX / props.panSpeedRatio,
        y: prevState.y - e.deltaY / props.panSpeedRatio,
      }));
    }

    // DETECT PINCH
    if (e.ctrlKey || e.metaKey) {
      setTransform((prevState) => ({
        ...transform,
        scale: prevState.scale - e.deltaY / 100,
      }));
      returnZoomMinOrMax();
    }
  };

  // ON MOUSE MOVE
  const handleOnMouseMove = (e: any) => {
    if (spacePressed && mouseKeyIsDown) {
      if (e.movementX !== 0 || e.movementY > 0) {
        setTransform((prevState) => ({
          ...transform,
          x: prevState.x + e.movementX / props.panSpeedRatio,
          y: prevState.y + e.movementY / props.panSpeedRatio,
        }));
      }
    }
  };

  // ON SPACE PRESSED
  const handleOnKeyDown = (e) => {
    // IF SPACE PRESSED
    if (e.keyCode === 32) {
      setSpacePressed(true);
    }

    // PLUS/MINUS KEYS
    let zoomIndex = 0.5;

    // IF MINUS PRESSED
    if (e.keyCode === 189 && transform.scale > 0.3 && transform.scale < 3) {
      setTransform((prevState) => ({
        ...transform,
        scale: prevState.scale - zoomIndex,
      }));
    }

    // IF PLUS PRESSED
    if (e.keyCode === 187 && transform.scale > 0.3 && transform.scale < 3) {
      setTransform((prevState) => ({
        ...transform,
        scale: prevState.scale + zoomIndex,
      }));
    }

    // IF ZERO PRESSED
    if (e.keyCode === 48) {
      setTransform({
        x: 0,
        y: 0,
        scale: 1,
      });
    }
  };

  const handleOnKeyUp = () => {
    setSpacePressed(false);
    returnZoomMinOrMax();
  };

  // ON MOUSE PRESSED
  const handleOnKeyMouseDown = (e: any) => {
    if (e.which === 1) {
      setMouseKeyIsDown(true);
    }
  };

  const handleOnKeyMouseUp = (e: any) => {
    if (e.which === 1) {
      setMouseKeyIsDown(false);
    }
  };

  // USE EFFECT
  React.useEffect(() => {
    document.addEventListener("mousedown", handleOnKeyMouseDown, false);
    document.addEventListener("mouseup", handleOnKeyMouseUp, false);

    return () => {
      document.removeEventListener("mousedown", handleOnKeyMouseDown, false);
      document.removeEventListener("mouseup", handleOnKeyMouseUp, false);
    };
  });

  return (
    <div
      style={{
        ...(props.test ? tetsModeStyles.wrapper : {}),
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
      onWheel={handleOnWheel}
      onMouseMove={handleOnMouseMove}
      onKeyDown={handleOnKeyDown}
      onKeyUp={handleOnKeyUp}
      tabIndex={0}
    >
      <div
        style={{
          ...(props.test ? tetsModeStyles.container : {}),
          width: "fit-content",
          height: "fit-content",
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

PanAndPinch.defaultProps = {
  panSpeedRatio: 1.4,
  test: false,
} as Partial<Props>;

export default PanAndPinch;
