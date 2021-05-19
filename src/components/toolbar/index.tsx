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

    const playLoop = () => {
        const loop = setInterval(() => {
            const drumRack = new Tone.Sampler({
                C1: props.elements[0].destination,
                C2: props.elements[1].destination,
                C3: props.elements[2].destination,
                C4: props.elements[3].destination,
                C5: props.elements[4].destination            
            }, () => {
                props.patterns.forEach((pattern, i) => {
                    const startTime = Tone.immediate();
                    pattern.forEach((p, idx) => {
                        if(p === 1) {
                            console.log('active idx: ', idx);
                            console.log('pattern: ', i);

                            drumRack.triggerAttack(`C${i}`,startTime + idx/10);
                        }
                    })
                });
            }).toDestination();    
            drumRack.context.resume() // necessary for Safari
            setSampler(drumRack);
        }, 2000);
        setLoop(loop);
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
                <Patterns />
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
