import React, { ComponentType } from 'react';
import './App.css';
import { useAppContext } from './store';

export const App: ComponentType = () => {
  const { state } = useAppContext();
  console.log(state);
  const toggle = () => state && (state.selected = !state?.selected);
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={toggle}>
          Toggle
        </button>
      </header>
    </div>
  );
}