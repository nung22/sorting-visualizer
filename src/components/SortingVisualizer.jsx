import React, { useState, useEffect } from 'react';
import BubbleSort from '../services/BubbleSort';
import getMergeSortAnimations from '../services/getMergeSortAnimatins';

export default function SortingVisualizer(props) {
  const [array, setArray] = useState([]);
  const [needNewArray, setNeedNewArray] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(10);
  const [arrayLength, setArrayLength] = useState(100);
  // This is the main color of the array bars.
  const PRIMARY_COLOR = '#4338ca';

  // This is the color of array bars that are being compared throughout the animations.
  const SECONDARY_COLOR = 'red';

  const randomIntFromInterval = (min, max) => {
    // min & max inclusive
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const resetArray = () => {
    setArray([]);
    needNewArray ? setNeedNewArray(false) : setNeedNewArray(true);
  }
  
  useEffect(() => {
    for(let i = 0 ; i < arrayLength; i++) {
      array.push(randomIntFromInterval(15, 800));
    }
    console.log(array);
    setArray([...array]);
  }, [needNewArray]);
  

  const mergeSort = () => {
    const animations = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * animationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * animationSpeed);
      }
    }
  }

  return(
    <div className='p-10'>
      <div className='flex gap-5'>
        <button type="button" class="inline-block px-6 py-2.5 bg-yellow-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out" onClick={resetArray}>Genereate New Array</button>
        <button type="button" class="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out" onClick={() => { BubbleSort(array); setArray([...array])}}>Bubble Sort</button>
        <button type="button" class="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out" onClick={mergeSort}>Merge Sort</button>
      </div>
      <div className='flex gap-2 items-end justify-center py-56' style={{height:'70rem'}}>
        {array.map( (value, i) =>
          <div key={i} className="array-bar bg-indigo-700 w-2 text-center rounded" style={{height:`${value}px`}}></div>
        )}
      </div>
    </div>
  )
}