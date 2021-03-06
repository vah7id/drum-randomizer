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
    const DEFAULT_TEMPO = 140;

    // state hooks
    const [play, triggerPlay] = useState<boolean>(false);
    const [mute, triggerMute] = useState<boolean>(false);
    const [tempo, setTempo] = useState<number>(DEFAULT_TEMPO)
    const [sampler, setSampler] = useState<Tone.Sampler | undefined>();
    const [elements, setElemenets] = useState<IElement[]>(props.elements);
    const [loop, setLoop] = useState<any>();
    const [pattern, setPattern] = useState<number[][]>([[]]);

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
        sampler?.triggerAttack(`C${patternIndex[0]+1}`);

        // update pattern in state
        setPattern(tmp);

        if(play) {
            playBack();
        }
    }

    const setupDrumRack = (autoplay: boolean) => {

        // by default setup 5 random drum rack to start
        const drumRack = new Tone.Sampler({
            C1: elements[0].destination,
            C2: elements[1].destination,
            C3: elements[2].destination,
            C4: elements[3].destination,
            C5: elements[4].destination,   
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
       
        const seq = new Tone.Sequence((time) => {

            // play the racks based on current pattern
            pattern.forEach((patternRow, i) => {
                patternRow.forEach((patternIndex, idx) => {
                    
                    if(patternIndex !== 0) {
                        // schedule time to trigger note
                        const scheduleTime = time + (idx * ((60 * 1000 / tempo) / 1000));
                        const sequencerPatternEl = document.getElementById(`column-${i}-${idx}`);
                        
                        drumRack.volume.value = mute ? -100 : -10;
                        drumRack.triggerAttack(`C${i+1}`, scheduleTime);

                        if(sequencerPatternEl) {
                            setTimeout(() => {
                                const bg = sequencerPatternEl.style.background;
                                sequencerPatternEl.style.background = 'yellow';
                                
                                // clear activated pattern
                                setTimeout(() => sequencerPatternEl.style.background = bg, 200);
                            }, (idx * ((60 * 1000 / tempo) / 1000)) * 1000 );
                        }
                    }
                })
            });
        }, ["C1", "C2", "C3", "C4", "C5"], ((60/tempo) * 16)).start(0);
        
        Tone.Transport.start();
        setLoop(seq);
    }

    const stopLoop = () => {
        Tone.Transport.stop();
        loop.stop();
        sampler?.releaseAll();
        sampler?.dispose();
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
        Tone.Transport.stop();
        sampler?.disconnect();
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

    const getRandomPatterns = (patterns: number[][]) => {
        const randNums = new Set();
        
        // generate 5 random number of racks from default elements
        while(randNums.size !== 5) {
            randNums.add(Math.floor(Math.random() * patterns.length-1) + 1);
        }
        return patterns.filter((el, i) => Array.from(randNums).includes(i));
    }

    const isPatternValid = (patterns: number[][]): boolean => {
        let flag = true;
        patterns.forEach(pattern => {
            if(pattern.every(p => p === 0)) {
                flag = false;
            }
        });
        return flag;
    }

    const shufflePattern = () => {

        // disconnect the sampler before reset the elements
        if(loop){
            triggerPlay(false);
            stopLoop();
        }

        setTimeout(() => {

            // set random pattern from default patterns
            let rndPatterns: number[][] = [];
            let isValid = false;
            
            // fetch another pattern when the pattern is not valid
            while(!isValid) {
                rndPatterns = getRandomPatterns(props.patterns);
                isValid = isPatternValid(rndPatterns);
            }
        
            setPattern(rndPatterns);
            props.shuffleElements();
           
        }, 500);

    }

    useEffect(() => {
        // fetch 5 random data set from patterns model
        
        if(pattern.length !== 5) {
            shufflePattern();
        }

        // setup and initialize the drum rack sampler
        setupDrumRack(false);
        if(Object.keys(props.elements) !== Object.keys(elements)) {
            setElemenets(props.elements);
        }
    }, [elements, pattern, play]) // eslint-disable-line react-hooks/exhaustive-deps


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
                <Tempo disabled={play} tempo={tempo} handleTempo={handleTempo} />
            </div>
            
        </div>
    );
}

export default Toolbar;
