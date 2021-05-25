import React from 'react';
import Toolbar from './components/toolbar';
import TreeElements from './components/treeElements';
import Header from './components/header';
import IntroPopup from './components/header/intro';
import {TreeProps, TreeState, IElement} from './types';
import defaultPatterns from './resources/patterns';
import defaultElements from './resources/elements';


class App extends React.Component<TreeProps, TreeState> {
 
  state: TreeState = {
    loading: true,
    patterns: [],
    defaultElements: defaultElements,
    currentElements: []
  };

  shuffleElements() {
    this.setState({
      currentElements: this.getRandomElements(this.state.defaultElements)
    });
  }

  parseDataPatterns() {
    let result: number[][] = [];
    const parsedPatterns = defaultPatterns.split('\n');
    
    parsedPatterns.map((pattern: any, i) => {
      result[i] = pattern.split(',').map((p: string) => parseInt(p)).slice(0, 16);
    });

    this.setState({ patterns: result });
  }

  getRandomElements(elements: IElement[]) {
    const randNums = new Set();
    
    // generate 5 random number of racks from default elements
    while(randNums.size !== 5) {
        randNums.add(Math.floor(Math.random() * elements.length-1) + 1);
    }

    return elements.filter((el, i) => Array.from(randNums).includes(i));
  }

  componentDidMount() {
    this.shuffleElements();
    this.parseDataPatterns();
  }

  render() {
    return (
      <div className="App">
        <IntroPopup />
        <Header />
        {(this.state.currentElements.length !== 0 &&
          this.state.patterns.length !== 0) &&
          <>
            <TreeElements 
              elements={this.state.currentElements}
            />
            <Toolbar 
              shuffleElements={this.shuffleElements.bind(this)}
              elements={this.state.currentElements} 
              patterns={this.state.patterns} 
            />
          </>
        }
      </div>
    );
  }
}

export default App;
