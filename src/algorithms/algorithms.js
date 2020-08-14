class Algorithms {
  //BUBBLE SORT
  static bubbleSort(array) {
    let solution = [];
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - 1; j++) {
        if (array[j] > array[j + 1]) {
          solution.push({ elements: [j, j + 1], swapped: true });
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        } else {
          solution.push({ elements: [j, j + 1], swapped: false });
        }
      }
    }
    return solution;
  }

  //INSERTION SORT
  static insertionSort(array) {
    let solution = [];
    for (let i = 1; i < array.length; i++) {
      for (let j = i; j > 0; j--) {
        if (array[j] < array[j - 1]) {
          solution.push({ elements: [j, j - 1], swapped: true });
          [array[j], array[j - 1]] = [array[j - 1], array[j]];
        } else {
          solution.push({ elements: [j, j - 1], swapped: false });
          break;
        }
      }
    }
    return solution;
  }

  //SELECTION SORT
  static selectionSort(array) {
    let solution = [];
    for (let i = 0; i < array.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }

      if (i !== minIndex) {
        solution.push({ elements: [i, minIndex], swapped: true });
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
      } else {
        solution.push({ elements: [i, minIndex], swapped: false });
      }
    }
    return solution;
  }


  //SHELL SORT
  static shellSort(array) {
    let elements = array;
    const n = array.length;
    let solution = [];

    for (let gap = parseInt(n / 2); gap > 0; gap = parseInt(gap / 2)) {
      for (let i = gap; i < n; ++i) {
        const temp = elements[i];
        let j;

        for (j = i; j >= gap && elements[j - gap] > temp; j -= gap) {
          solution.push({ elements: [j, j - gap], swapped: true });
          elements[j] = elements[j - gap];
        }

        elements[j] = temp;
      }
    }

    return solution;
  }
}

export default Algorithms;
