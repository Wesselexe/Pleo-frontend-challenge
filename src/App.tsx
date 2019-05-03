import React from 'react';
import './App.css';
import ExpenseView from './Components/ExpenseView/ExpenseView'
import Menu from './Components/Menu/Menu'

function App() {
  return (
    <div className="App">
      <h1>Expense Master 2000</h1>
      <Menu />
      <ExpenseView />
    </div>
  );
}

export default App;
