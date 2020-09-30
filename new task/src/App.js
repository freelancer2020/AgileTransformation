import React from 'react';

import './App.css';
import Top1 from './top1'
import Top2 from './top2'
import Top3 from './top3'
import Top4 from './top4'
import Top5 from './top5'

function App() {
  return (
    <div className="App">
     
       <Top1 country="JP"/>
       <Top2 country="US"/>
       <Top3 country="GB"/>
       <Top4 country="AU"/>
       <Top5 country="DE"/>
 
    </div>
  );
}

export default App;
