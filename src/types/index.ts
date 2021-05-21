// interfaces

export interface IElement {
    title: string,
    destination: string,
    tag: string
}

export interface TreeState {
    patterns: number[][][],
    elements: IElement[],
};

export interface TreeProps {
    version?: string
}

export interface PatternsProps {
    patterns: number[][],
    updatePattern(pattern: number[], value: number): void
}

export interface ToolbarProps {
    patterns: number[][][],
    elements: IElement[],
};

export interface TempoProps {
    tempo: number,
    handleTempo(e: any): void
}