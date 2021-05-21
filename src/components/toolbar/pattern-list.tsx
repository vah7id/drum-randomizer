import React from 'react';
import { PatternsProps } from '../../types';

const Patterns = (props: PatternsProps) => {

    const handlePatternChange = (e: MouseEvent, row: number, index: number) => {
        const value = props.patterns[row][index];
        const el = e.currentTarget as HTMLElement;
        
        // update the pattern in state and toggle the button
        props.updatePattern([row, index], value);
        el.classList.toggle('active');
    }

    return (
        <div className="Patterns">
            {
                props.patterns.map((pattern, i) => 
                    <div className={'pattern-row'} key={`row-${i}`}>
                        {
                            pattern.map((p, index) => <span 
                                onClick={(e: any) => handlePatternChange(e, i, index)}
                                key={`column-${i}-${index}`} 
                                className={p === 1 ? 'active':''}
                            ></span>)
                        }
                    </div>
                )
            }
        </div>
    );
}

export default Patterns;
