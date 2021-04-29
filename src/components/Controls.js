import React from "react";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

function Controls({resetHandler, animationHandler, sliderHandler}) {
  return (
    <div>
      <div className="btns">
        <Button variant="contained" onClick={resetHandler}>
          Reset
        </Button>

        <ButtonGroup
          color="default"
          variant="contained"
          aria-label="outlined secondary button group"
          disableElevation
          className="algo-btns"
        >
          <Button onClick={() => animationHandler("bubbleSort")}>Bubble</Button>
          <Button onClick={() => animationHandler("insertionSort")}>Insertion Sort</Button>
          <Button onClick={() => animationHandler("selectionSort")}>Selection Sort</Button>
          <Button onClick={() => animationHandler("shellSort")}>Shell Sort</Button>
        </ButtonGroup>
        <Typography
          variant="button"
          style={{
            display: "inline-block",
            color: "white",
            marginLeft: "2em",
          }}
        >
          Speed:
        </Typography>
        <Slider
          defaultValue={1}
          valueLabelDisplay="auto"
          getAriaValueText={(e) => sliderHandler(e)}
          step={3}
          marks
          min={1}
          max={10}
          style={{
            width: "15em",
            marginLeft: "2em",
            verticalAlign: "middle",
          }}
        />
      </div>
    </div>
  );
}

export default Controls;
