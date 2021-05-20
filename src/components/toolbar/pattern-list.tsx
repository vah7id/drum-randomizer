import React from 'react';

type PatternsProps = {
    patterns: number[][]
}

const Patterns = (props: PatternsProps) => {
  return (
    <div className="Patterns">
        {
            props.patterns.map((pattern, index) => 
                <div className={'pattern-row'} key={`row-${index}`}>
                    {pattern.map((p, index) => <span className={p === 1 ? 'active':'' }></span>)}
                </div>
            )
        }
    </div>
  );
}

export default Patterns;
