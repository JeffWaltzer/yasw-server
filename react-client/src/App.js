import logo from './logo.svg';
import './App.css';
import { makePolygonPoints } from './makePolygonPoints';


// make this a react component?
// or just line 14 ( <G> </G> )
function makeGTags(props) {
  if (!props.gameboard)
    return [];

  const gameboard = JSON.parse(props.gameboard);

  return gameboard.polygons.map((polygon, index) => {
    return (
        <GTag key={`g-${index}`} polygon={polygon} index={index} />
    );
  });
}

function GTag(props) {
  const polygon = props.polygon;
  const index = props.index;
  return(
      <g key={index}><polygon key="{index}-poly" points={makePolygonPoints(polygon)}/></g>
  );
}

function App(props) {
  return (
      <svg height="100%" width="100%" viewBox="0 0 1024 1024">
        <rect key="9999" width="100%" height="100%" style={{
          "fill": "rgb(0, 0, 0)",
          "strokeWidth":0,
          "stroke":"rgb(255,0,0)"}}/>
        {makeGTags(props)}
      </svg>
  );
}

export default App;
