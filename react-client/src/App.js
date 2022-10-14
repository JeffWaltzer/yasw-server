import logo from './logo.svg';
import './App.css';

function makeGTags(props) {
  if (!props.gameboard)
    return [];

  const gameboard = JSON.parse(props.gameboard);

  return gameboard.polygons.map((polygon, index) => {
    return(<g key={index}><polygon/></g>);
  });
}

function App(props) {
  return (
      <svg height="100%" width="100%" viewBox="0 0 1024 1024">
        <rect width="100%" height="100%" style={{
          "fill": "rgb(0, 0, 0)",
          "stroke-width":0,
          "stroke":"rgb(255,0,0)"}}/>
        {makeGTags(props)}
      </svg>
  );
}

export default App;
