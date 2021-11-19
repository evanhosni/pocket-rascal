import './style.css';
// import Matter from './libraries/matter'
// import './rascal'


function Scene() {
  return (
  <div>
    {/* <input type="checkbox" id="devMode" onclick="devMode()">
    <label for="devMode">devMode</label><br> */}
    <button id="checkCoor" onClick="checkCoor()">checkCoordinates</button>
    <button id="changeSelections" onClick="changeSelections()">changeSelections</button>
    <div id="canvas_container"></div>
    {/* <script src="./libraries/matter.js"></script> */}
    <script src="./rascal.js"></script>
  </div>
  );
}

export default Scene;
