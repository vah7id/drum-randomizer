import React from 'react';
import Toolbar from './components/toolbar';
import TreeElements from './components/treeElements';
import Header from './components/header';
import * as types from './types';
import defaultPatterns from './resources/patterns';
import defaultElement from './resources/elements';

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
    elements: defaultElement,
    play: false,
    mute: false,
    tempo: 120
  };
  render() {
    console.log(this.props)
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
