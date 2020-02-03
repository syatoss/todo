import React from 'react';
import  { useObserver } from 'mobx-react'
import {HashRouter as Router,Switch,Route} from 'react-router-dom';
import './App.css';
import  {StoreContext,StoreProvider} from './components/GlobalVals';
import Notes from './components/Notes'
import AddNote from './components/AddNote'


const App:React.FC = () => {
  const store = React.useContext(StoreContext);



 
  return useObserver(()=>(
    <StoreProvider>
    <div className="App">
      <br/>

          <AddNote/>
          <br/>
          <br/>
          <Notes/>
    </div>
    </StoreProvider>
  ));
}

export default App;


