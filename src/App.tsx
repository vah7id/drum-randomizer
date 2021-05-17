import React from 'react';
import Toolbar from './components/toolbar';
import TreeElements from './components/treeElements';
import Header from './components/header';

function App() {
  return (
    <div className="App">
      <Header />
      <TreeElements />
      <Toolbar />
    </div>
  );
}

export default App;
