/* eslint-disable no-loop-func */
import React, { useState, useEffect } from "react";
import "./Visualizer.css"
import Controls from "./Controls";
import Bars from "./Bars";

import Algorithms from "../algorithms/algorithms";

function Vizualizer() {
  const [barsArray, setBarsArray] = useState([]);
  const [SORT_SPEED, setSORT_SPEED] = useState(1);

  const NUMBER_BARS = 100;
  const BAR_COLOR = "#d8ac9c";
  const SELECTED_BAR_COLOR = "blue";
  let isAnimating = false;

  useEffect(() => {
    resetArray();
  }, []);

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  

  function resetArray() {
    if (isAnimating) return;
    
    const array = [];
    for (let index = 0; index < NUMBER_BARS; index++) array.push(randomIntFromInterval(5, 500));
    
    setBarsArray(array);
  }

  async function animationHandler(algorithm) {
    if (isAnimating) return;
    isAnimating = true;
    
    let solution;
    switch (algorithm) {
      case "bubbleSort":
        solution = Algorithms.bubbleSort(barsArray);
        break;
      case "insertionSort":
        solution = Algorithms.insertionSort(barsArray);
        break;
      case "selectionSort":
        solution = Algorithms.selectionSort(barsArray);
        break;
      case "shellSort":
        solution = Algorithms.shellSort(barsArray);
        break;
      default:
        break;
    }

    let iStored = 0;
    for (let i = 0; i < solution.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");

      setTimeout(() => {
        //makes the current two elements have the standard bar color
        arrayBars[solution[iStored].elements[0]].style.backgroundColor = BAR_COLOR;
        arrayBars[solution[iStored].elements[1]].style.backgroundColor = BAR_COLOR;
        
        if (solution[i].swapped === true) {
          //swap the height of the two current elements 
          [arrayBars[solution[i].elements[0]].style.height, arrayBars[solution[i].elements[1]].style.height] 
          = 
          [arrayBars[solution[i].elements[1]].style.height,arrayBars[solution[i].elements[0]].style.height];

          //makes the current two elements appear 'selected'
          arrayBars[solution[i].elements[0]].style.backgroundColor = SELECTED_BAR_COLOR;
          arrayBars[solution[i].elements[1]].style.backgroundColor = SELECTED_BAR_COLOR;
        }

        if (i === solution.length - 1) {
          isAnimating = false;
        } else {
          isAnimating = true;
        }
        iStored = i;
      }, i * SORT_SPEED);
    }
  }

  return (
    <div>
      <Bars barsArray={barsArray} />
      <Controls resetHandler={resetArray} animationHandler={animationHandler} sliderHandler={setSORT_SPEED}/>
    </div>
  );
}

export default Vizualizer;
