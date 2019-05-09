import React from 'react';
import './App.css';
import ExpenseView from './Components/ExpenseView/ExpenseView'
import logo from './logo.png'


function App() {
  return (
    <div className="App">
      <img src={logo} style={{width: "auto", height: 100}} alt="Logo" />
      <ExpenseView />
    </div>
  );
}

export default App;
