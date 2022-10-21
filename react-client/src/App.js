import logo from './logo.svg';
import './App.css';

function makePolygonPoints(polygon) {

  return "512,532 526,526 532,512 526,498 512,492 498,498 492,512 498,526";
}

function makeGTags(props) {
  if (!props.gameboard)
    return [];

  const gameboard = JSON.parse(props.gameboard);

  return gameboard.polygons.map((polygon, index) => {
    return(<g key={index}><polygon points={makePolygonPoints(polygon)}/></g>);
  });
}

function App(props) {
  return (
      <svg height="100%" width="100%" viewBox="0 0 1024 1024">
        <rect width="100%" height="100%" style={{
          "fill": "rgb(0, 0, 0)",
          "strokeWidth":0,
          "stroke":"rgb(255,0,0)"}}/>
        {makeGTags(props)}
      </svg>
  );
}

export default App;
