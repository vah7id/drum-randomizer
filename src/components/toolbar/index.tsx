import React, {useState, useEffect} from 'react';
import Patterns from './pattern-list';
import { FiPlayCircle } from "react-icons/fi";
import { FiPauseCircle } from "react-icons/fi";
import { FiZap } from "react-icons/fi";
import { FiVolumeX } from "react-icons/fi";
import * as Tone from 'tone'
import { IElement } from '../../types';

type ToolbarProps = {
    patterns: number[][],
    elements: IElement[],
};

const Toolbar = (props: ToolbarProps) => {
    const [play, triggerPlay] = useState<boolean>(false);
    const [sampler, setSampler] = useState<Tone.Sampler>();
    const [loop, setLoop] = useState<any>();
    const MAX_DRUM_RACK = 5;

    const playLoop = () => {
        // first fetch the 5 random unique elements
        const randomElements = getRandomElements(props.elements);

        const loop = setInterval(() => {
            
            // setup the drum racks with sampler 
            const drumRack = new Tone.Sampler({
                C1: `${process.env.REACT_APP_SAMPLES_URL}/${randomElements[0].destination}`,
                C2: `${process.env.REACT_APP_SAMPLES_URL}/${randomElements[1].destination}`,
                C3: `${process.env.REACT_APP_SAMPLES_URL}/${randomElements[2].destination}`,
                C4: `${process.env.REACT_APP_SAMPLES_URL}/${randomElements[3].destination}`,
                C5: `${process.env.REACT_APP_SAMPLES_URL}/${randomElements[4].destination}`,   
            }, () => {
                // start time of the sampler
                const startTime = Tone.immediate();

                // play the racks based on current pattern
                props.patterns.forEach((pattern, i) => {
                    pattern.forEach((p, idx) => {
                        if(p === 1) {
                            drumRack.triggerAttack(`C${i}`,startTime + idx/10);
                        }
                    })
                });
            }).toDestination();    

            drumRack.context.resume(); // necessary for Safari

            // store the sampler for next usage 
            setSampler(drumRack);

        }, 1000);
        
        setLoop(loop);
    }

    const getRandomElements = (elements: IElement[]) => {
        const randNums = new Set();
        while(randNums.size !== MAX_DRUM_RACK) {
            randNums.add(Math.floor(Math.random() * elements.length-1) + 1);
        }
        return elements.filter((el, i) => Array.from(randNums).includes(i));
    }

    const stopLoop = () => {
        clearInterval(loop);
        setLoop(null);
    }

    const handlePlay = () => {
        if(play) {
            triggerPlay(false);
            stopLoop();
        } else {
            triggerPlay(true);
            Tone.loaded().then(() => {
                playLoop();
            });
        }
    }

    useEffect(() => {

    });

    return (
        <div className="Toolbar">
            <div className="Toolbar-patterns">
                <Patterns patterns={props.patterns} />
            </div>
            <div className="Toolbar-actions">
                <button onClick={() => handlePlay()} className="btn-icon btn-play">
                    {play ? <FiPauseCircle /> : <FiPlayCircle />}
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
