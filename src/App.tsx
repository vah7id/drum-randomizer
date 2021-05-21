import React from 'react';
import Toolbar from './components/toolbar';
import TreeElements from './components/treeElements';
import Header from './components/header';
import {TreeProps, TreeState} from './types';
import defaultPatterns from './resources/patterns';
import defaultElement from './resources/elements';


class App extends React.Component<TreeProps, TreeState> {
  state: TreeState = {
    patterns: defaultPatterns,
    elements: defaultElement
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
