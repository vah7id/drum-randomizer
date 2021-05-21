import React, { useState, useEffect } from 'react';
import { IElement } from '../../types';

type TreeProps = {
  elements: IElement[];
};

function TreeElements(props: TreeProps) {
  return(
      <div className={'Tree-Elements'}>
        {props.elements.map(element => <div>{element.title}</div>)}
      </div>);
}

export default TreeElements;
