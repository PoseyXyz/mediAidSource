import React from 'react'
import './App.scss';
import {Switch, Route} from 'react-router-dom'
import Home from './pages/Home';
import SymptomDetails from './components/SymptomDetails';
import DiagnosesList from './pages/DiagnosesList';
import FullDiagnosisDetails from './pages/FullDiagnosisDetails';
import SymptomsList from './components/SymptomsList';


function App() {
    return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/symptoms' component={SymptomsList}/>
        <Route exact path='/d' component={DiagnosesList}/>
        <Route exact path='/:slug' component={SymptomDetails}/>
        <Route exact path='/diagnosis/:slug' component={FullDiagnosisDetails}/>
       
      </Switch>
    </div>
  );
}

export default App;
