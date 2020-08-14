import React, { Component } from "react";
import "./Visualizer.css";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

import Algorithms from "../algorithms/algorithms";

const NUMBER_BARS = 100;
const BAR_COLOR = "#ffbcbc";
// const SORT_SPEED = 1;

class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.isAnimating = false;
    this.SORT_SPEED = 1;
  }

  state = {
    array: [],
  };

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    if (this.isAnimating) {
      return;
    }
    const array = [];
    for (let index = 0; index < NUMBER_BARS; index++) {
      array.push(this.randomIntFromInterval(5, 500));
    }
    this.setState({ array });
  }

  async animationHandler(algorithm) {
    if (this.isAnimating === true) {
      return;
    }
    let solution;
    switch (algorithm) {
      case "bubbleSort":
        solution = Algorithms.bubbleSort(this.state.array);
        break;
      case "insertionSort":
        solution = Algorithms.insertionSort(this.state.array);
        break;
      case "selectionSort":
        solution = Algorithms.selectionSort(this.state.array);
        break;
      case "shellSort":
        solution = Algorithms.shellSort(this.state.array);
        break;
    }

    let iStored = 0;
    for (let i = 0; i < solution.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      setTimeout(() => {
        arrayBars[
          solution[iStored].elements[0]
        ].style.backgroundColor = BAR_COLOR;
        arrayBars[
          solution[iStored].elements[1]
        ].style.backgroundColor = BAR_COLOR;
        if (solution[i].swapped === true) {
          [
            arrayBars[solution[i].elements[0]].style.height,
            arrayBars[solution[i].elements[1]].style.height,
          ] = [
            arrayBars[solution[i].elements[1]].style.height,
            arrayBars[solution[i].elements[0]].style.height,
          ];
          arrayBars[solution[i].elements[0]].style.backgroundColor = "blue";
          arrayBars[solution[i].elements[1]].style.backgroundColor = "blue";
        }
        if (i === solution.length - 1) {
          this.isAnimating = false;
        } else {
          this.isAnimating = true;
        }
        iStored = i;
      }, i * this.SORT_SPEED);
    }

    //makes last bars red
    const arrayBars = document.getElementsByClassName("array-bar");
    arrayBars[arrayBars.length - 1].style.backgroundColor = BAR_COLOR;
    arrayBars[arrayBars.length - 1].style.backgroundColor = BAR_COLOR;

    this.isAnimating = false;
  }

  randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  sliderHandler = (value) => {
    this.SORT_SPEED = value;
  };

  render() {
    return (
      <div>
        <div className="array-container">
          {this.state.array.map((value, id) => (
            <div
              className="array-bar"
              key={id}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>

        <div className="btns">
          <Button variant="contained" onClick={() => this.resetArray()}>
            Reset
          </Button>

          <ButtonGroup
            color="default"
            variant="contained"
            aria-label="outlined secondary button group"
            disableElevation
            className="algo-btns"
          >
            <Button onClick={() => this.animationHandler("bubbleSort")}>
              Bubble
            </Button>
            <Button onClick={() => this.animationHandler("insertionSort")}>
              Insertion Sort
            </Button>
            <Button onClick={() => this.animationHandler("selectionSort")}>
              Selection Sort
            </Button>
            <Button onClick={() => this.animationHandler("shellSort")}>
              Shell Sort
            </Button>
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
            getAriaValueText={(e) => this.sliderHandler(e)}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0.25}
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
}

export default Visualizer;
