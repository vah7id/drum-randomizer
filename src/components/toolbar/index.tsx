import React, {useState, useEffect} from 'react';
import Patterns from './pattern-list';
import { FiPlayCircle } from "react-icons/fi";
import { FiPauseCircle } from "react-icons/fi";
import { FiZap } from "react-icons/fi";
import { FiVolumeX } from "react-icons/fi";
import { FiVolume2 } from 'react-icons/fi';
import * as Tone from 'tone'
import { IElement } from '../../types';

type ToolbarProps = {
    patterns: number[][],
    elements: IElement[],
};

const Toolbar = (props: ToolbarProps) => {
        
    // defaults
    const MAX_DRUM_RACK = 5;
    const DEFAULT_TEMPO = 120;

    // state hooks
    const [play, triggerPlay] = useState<boolean>(false);
    const [mute, triggerMute] = useState<boolean>(false);
    const [tempo, setTempo] = useState<number>(DEFAULT_TEMPO)
    const [sampler, setSampler] = useState<Tone.Sampler | undefined>();
    const [elements, setElemenets] = useState<IElement[]>([]);
    const [loop, setLoop] = useState<any>();


    const playLoop = () => {
        if(elements) {
            const loop = setInterval(() => {

                // setup the drum racks with sampler 
                const drumRack = setupDrumRack();

                // store the sampler for next usage 
                setSampler(drumRack);

            }, 1000 * 60 / tempo);//TODO timeout has to be based on tempo
            
            setLoop(loop);
        }
    }

    const getRandomElements = (elements: IElement[]) => {
        const randNums = new Set();
        while(randNums.size !== MAX_DRUM_RACK) {
            randNums.add(Math.floor(Math.random() * elements.length-1) + 1);
        }
        return elements.filter((el, i) => Array.from(randNums).includes(i));
    }

    const setupDrumRack = () => {
        // by default setup 5 random drum rack to start
        const tempoToMs = 1000 * 60 / tempo;

        const drumRack = new Tone.Sampler({
            C1: `${process.env.REACT_APP_SAMPLES_URL}/${elements[0].destination}`,
            C2: `${process.env.REACT_APP_SAMPLES_URL}/${elements[1].destination}`,
            C3: `${process.env.REACT_APP_SAMPLES_URL}/${elements[2].destination}`,
            C4: `${process.env.REACT_APP_SAMPLES_URL}/${elements[3].destination}`,
            C5: `${process.env.REACT_APP_SAMPLES_URL}/${elements[4].destination}`,   
        }, () => {
            // start time of the sampler
            const startTime = Tone.immediate();

            // play the racks based on current pattern
            props.patterns.forEach((pattern, i) => {
                pattern.forEach((p, idx) => {
                    if(p === 1) {
                        console.log(startTime)
                        drumRack.volume.value = mute ? -100 : 0;
                        drumRack.triggerAttack(`C${i}`,startTime + (idx * ((60 * 1000 / tempoToMs) / 1000)));
                    }
                })
            });
        }).toDestination();    

        drumRack.context.resume(); // necessary for Safari
        return drumRack;
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

    const handleVolume = () => {
        triggerMute(!mute);
        const vol = new Tone.Volume(mute ? 0 : -100);
        Tone.Destination.chain(vol);
    }


    useEffect(() => {
        // first fetch the 5 random unique elements
        if(elements.length === 0) {
            setElemenets(getRandomElements(props.elements));
        }
    })

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
                <button onClick={() => handleVolume()} className={'btn-icon btn-volume'}>
                    {mute ? <FiVolume2 /> : <FiVolumeX />}
                </button>
                <span className={'tempo'}>
                    {tempo} <b>bpm</b>
                </span>
            </div>
            
        </div>
    );
}

export default Toolbar;
