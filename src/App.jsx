import React from 'react';
import Header from './components/Header';
import IncomeTaxCalculator from './pages/Calculator/ITC';
import './styles/sass/main.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <IncomeTaxCalculator />
      </main>
    </div>
  );
}

export default App;
