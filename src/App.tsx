import React from 'react';
import './App.css';
import ButtonGroup from "./Components/ElementConversion/CreateElement";
import Sample from './Components/ElementConversion/Sample';
import ComponentType from './Pages/ComponentType';

function App() {
  const [count, setCount] = React.useState(0);

  console.log('App Component Render')
  return (
    <div className="App">
      {/* <ComponentType /> */}
      {/* {<Sample />} */}
      <ButtonGroup />
    </div>
  );
}

export default App;

document.createElement('a',)
