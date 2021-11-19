// import logo from './logo.svg';
import './style.css';
// import './libraries/matter'
import './rascal'


function App() {
  return (
  <div>
    {/* <input type="checkbox" id="devMode" onclick="devMode()">
    <label for="devMode">devMode</label><br> */}
    <button id="checkCoor" onclick="checkCoor()">checkCoordinates</button>
    <button id="changeSelections" onclick="changeSelections()">changeSelections</button>
    <div id="canvas_container"></div>
  </div>
  );
}

export default App;
