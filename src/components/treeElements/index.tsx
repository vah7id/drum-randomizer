import React, { useState, useEffect } from 'react';
import { IElement } from '../../types';
import * as Tone from 'tone'

type TreeProps = {
  elements: IElement[];
};

function TreeElements(props: TreeProps) {
  
  const playOneShot = (element: IElement) => {
    const player = new Tone.Player(`${process.env.REACT_APP_SAMPLES_URL}/${element.destination}`).toDestination();
    Tone.loaded().then(() => {
      player.start();
    });
  }

  return(
      <div className={'Tree-Elements'}>
        {props.elements.map((element, i) => <div onClick={() => playOneShot(element)} key={`el-${i}`} className={'Tree-Element'}>{element.title}</div>)}
      </div>);
}

export default TreeElements;
