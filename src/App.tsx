import React from 'react';
import Toolbar from './components/toolbar';
import TreeElements from './components/treeElements';
import Header from './components/header';
import * as types from './types';
import defaultPatterns from './resources/patterns';

type TreeState = {
  patterns: number[][],
  elements: types.IElement[],
  play: boolean,
  mute: boolean,
  tempo: number,
};

class App extends React.Component<any, TreeState> {
  state: TreeState = {
    patterns: defaultPatterns[0],
    elements: [
      {title: 'hat', destination: 'https://tonejs.github.io/audio/salamander/C4.mp3'},
      {title: 'cat', destination: 'https://tonejs.github.io/audio/berklee/gong_1.mp3'},
      {title: 'juice', destination: 'https://tonejs.github.io/audio/berklee/gong_1.mp3'},
      {title: 'street', destination: 'https://tonejs.github.io/audio/berklee/gong_1.mp3'},
      {title: 'wind', destination: 'https://tonejs.github.io/audio/salamander/C4.mp3'}
    ],
    play: false,
    mute: false,
    tempo: 120
  };
  render() {
    return (
      <div className="App">
        <Header />
        <TreeElements 
          elements={this.state.elements} 
        />
        <Toolbar 
          elements={this.state.elements} 
          patterns={this.state.patterns} 
        />
      </div>
    );
  }
}

export default App;
