import React from 'react';
import './App.css';
import ElementConversion from './Pages/2. ElementConversion/ElementConversion';

function App() {
  const [count, setCount] = React.useState(0);

  console.log('App Component Render')
  return (
    <div className="App">
      {/* <ComponentType /> */}

      <ElementConversion />
    </div>
  );
}

export default App;

document.createElement('a',)
