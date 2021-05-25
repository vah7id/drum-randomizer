import React, {useState, useEffect} from 'react';
import Patterns from './pattern-list';
import { FiPlayCircle } from "react-icons/fi";
import { FiPauseCircle } from "react-icons/fi";
import { FiZap } from "react-icons/fi";
import { FiVolumeX } from "react-icons/fi";
import { FiVolume2 } from 'react-icons/fi';
import * as Tone from 'tone'
import { IElement, ToolbarProps } from '../../types';
import Tempo from './tempo';

const Toolbar = (props: ToolbarProps) => {
        
    // defaults
    const MAX_DRUM_RACK = 5;
    const DEFAULT_TEMPO = 120;

    // state hooks
    const [play, triggerPlay] = useState<boolean>(false);
    const [mute, triggerMute] = useState<boolean>(false);
    const [tempo, setTempo] = useState<number>(DEFAULT_TEMPO)
    const [sampler, setSampler] = useState<Tone.Sampler | undefined>();
    const [elements, setElemenets] = useState<IElement[]>(props.elements);
    const [loop, setLoop] = useState<any>();
    const [pattern, setPattern] = useState<number[][]>(props.patterns[0]);

    const playLoop = () => {
        if(elements) {
            // setup the drum racks with sampler 
            setupDrumRack(true);
        }
    }

    const updatePattern = (patternIndex: number[], value: number) => {
        let tmp: any = pattern;
        tmp[patternIndex[0]][patternIndex[1]] = value === 1 ? 0 : 1;
        
        // play the current rack sound 
        if(sampler) {
            sampler.triggerAttack(`C${patternIndex[0]+1}`);
        }

        setPattern(tmp);

        if(play) {
            playBack();
        }
    }

    const setupDrumRack = (autoplay: boolean) => {
        // by default setup 5 random drum rack to start
        const drumRack = new Tone.Sampler({
            C1: `${process.env.REACT_APP_SAMPLES_URL}/${elements[0].destination}`,
            C2: `${process.env.REACT_APP_SAMPLES_URL}/${elements[1].destination}`,
            C3: `${process.env.REACT_APP_SAMPLES_URL}/${elements[2].destination}`,
            C4: `${process.env.REACT_APP_SAMPLES_URL}/${elements[3].destination}`,
            C5: `${process.env.REACT_APP_SAMPLES_URL}/${elements[4].destination}`,   
        }, () => {

            // store the sampler for next usage 
            setSampler(drumRack);

            // start the sequencer based on pattern
            if(autoplay) {
                playSequencer(drumRack);
            }

        }).toDestination();    

        drumRack.context.resume(); // necessary for Safari
        return drumRack;
    }

    const playSequencer = (drumRack: any) => {
       
        const seq = new Tone.Sequence((time, note) => {
            // play the racks based on current pattern
            pattern.forEach((patternRow, i) => {
                patternRow.forEach((patternIndex, idx) => {
                    if(patternIndex === 1) {
                        const scheduleTime = time + (idx * ((60 * 1000 / tempo) / 1000));
                        const sequencerPatternEl = document.getElementById(`column-${i}-${idx}`);
                        
                        drumRack.volume.value = mute ? -100 : -10;
                        drumRack.triggerAttack(`C${i+1}`, scheduleTime);

                        if(sequencerPatternEl) {
                            setTimeout(() => {
                                const bg = sequencerPatternEl.style.background;
                                sequencerPatternEl.style.background = 'yellow';
                                
                                // clear activated pattern
                                setTimeout(() => sequencerPatternEl.style.background = bg, 500);
                            }, scheduleTime * (60/tempo)*1000);
                        }
                    }
                })
            });
            // subdivisions are given as subarrays
        }, ["C1", "C2", "C3", "C4", "C5"], ((60/tempo) * 16) / 2 ).start(0);
        
        Tone.Transport.start();
        setLoop(seq);
    }

    const stopLoop = () => {
        Tone.Transport.stop();
        loop.stop();
        sampler?.disconnect();
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
        Tone.Destination.chain(new Tone.Volume(mute ? 0 : -100));
    }

    const handleTempo = (e: any) => {
        setTempo(e.target.value);
        
        if(play) {
            e.target.setAttribute('disabled', 'disabled');
            playBack();
            // this timeout will fix the performance issue
            setTimeout(() => {
                e.target.removeAttribute('disabled');
            }, 200);
        }
       
    }

    const playBack = () => {
        // stop the sequencer and disconnect the sampler
        Tone.Transport.stop();
        sampler?.disconnect();

        // if the loop was going on just don't stop the music :M
        if(loop) {
            loop?.stop();
            triggerPlay(true);
            playLoop();
        }
    }

    const shufflePattern = () => {
        // disconnect the sampler before reset the elements
        Tone.Transport.stop();
        sampler?.disconnect();

        // set random pattern from default patterns
        setPattern(props.patterns[Math.floor(Math.random() * props.patterns.length-1) + 1]);
        props.shuffleElements();

        if(loop) {
            playBack();
        }
    }

    useEffect(() => {
        // setup and initialize the drum rack sampler
        setupDrumRack(false);
        if(Object.keys(props.elements) !== Object.keys(elements)) {
            setElemenets(props.elements);
        }
    }, [elements, pattern, play])

    return (
        <div className="Toolbar">
            <div className="Toolbar-patterns">
                <Patterns 
                    isPlaying={play} 
                    updatePattern={updatePattern.bind(this)} 
                    patterns={pattern} 
                />
            </div>
            <div className="Toolbar-actions">
                <button onClick={() => handlePlay()} className="btn-icon btn-play">
                    {play ? <FiPauseCircle /> : <FiPlayCircle />}
                </button>
                <button onClick={() => shufflePattern()} className={'btn-icon btn-shuffle'}>
                    <FiZap />
                </button>
                <button onClick={() => handleVolume()} className={'btn-icon btn-volume'}>
                    {mute ? <FiVolume2 /> : <FiVolumeX />}
                </button>
                <Tempo tempo={tempo} handleTempo={handleTempo} />
            </div>
            
        </div>
    );
}

export default Toolbar;
