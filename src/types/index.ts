// interfaces

export interface IElement {
    title: string,
    destination: string,
    tag: string
}

export interface TreeState {
    patterns: number[][],
    loading: boolean,
    defaultElements: IElement[],
    currentElements: IElement[],
};

export interface TreeProps {
    version?: string
}

export interface PatternsProps {
    patterns: number[][],
    isPlaying?: boolean,
    updatePattern(pattern: number[], value: number): void
}

export interface ToolbarProps {
    patterns: number[][],
    elements: IElement[],
    shuffleElements(): void,
};

export interface TempoProps {
    tempo: number,
    disabled: boolean,
    handleTempo(e: any): void
}