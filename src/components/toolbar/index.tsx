import React from 'react';
import Patterns from './pattern-list';
import { FiPlayCircle } from "react-icons/fi";
import { FiZap } from "react-icons/fi";
import { FiVolumeX } from "react-icons/fi";

function Toolbar() {
  return (
    <div className="Toolbar">
        <div className="Toolbar-patterns">
            <Patterns />
        </div>
        <div className="Toolbar-actions">
            <button className="btn-icon btn-play">
                <FiPlayCircle />
            </button>
            <button className={'btn-icon btn-shuffle'}>
                <FiZap />
            </button>
            <button className={'btn-icon btn-volume'}>
                <FiVolumeX />
            </button>
            <span className={'tempo'}>
                120 <b>bpm</b>
            </span>
        </div>
        
    </div>
  );
}

export default Toolbar;
