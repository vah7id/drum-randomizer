import React from 'react';
import { TempoProps } from '../../types';

const Tempo = (props: TempoProps) => {
    return (
        <span className={'tempo'}>
            <input type={'number'} 
                className={'input-tempo'} 
                name={'tempo'} 
                value={props.tempo.toString()} 
                onChange={(e) => props.handleTempo(e)}
            />
            <span className={'tempo-hint'}></span>
            <b>bpm</b>
        </span>
    );
}

export default Tempo;
