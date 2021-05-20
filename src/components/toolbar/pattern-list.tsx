import React from 'react';

type PatternsProps = {
    patterns: number[][]
}

const Patterns = (props: PatternsProps) => {
  return (
    <div className="Patterns">
        {
            props.patterns.map((pattern, i) => 
                <div className={'pattern-row'} key={`row-${i}`}>
                    {
                        pattern.map((p, index) => <span 
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
