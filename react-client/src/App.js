import './App.css';
import {makePolygonPoints} from './makePolygonPoints';


function GTag(props) {
    const polygon = props.polygon;
    const index = props.index;

    const items = polygon.wireframe.map((wf, index) => {
      return <polygon key={index} points={makePolygonPoints(wf)} stroke={wf.color}/>;
    })

    return (<g>{items}</g>);
}

function App(props) {
  let polygons = props.gameboard ?
      JSON.parse(props.gameboard).polygons :
      [];

  return (
      <svg height="100%" width="100%" viewBox="0 0 1024 1024">
        <rect width="100%" height="100%" style={{
          "fill": "rgb(0, 0, 0)",
          "strokeWidth":0,
          "stroke":"rgb(255,0,0)"}}/>
          {
            polygons.map((polygon, index) => {
              return (
                  <GTag key={index} polygon={polygon} index={index} />
              );
            })
          }
      </svg>
  );
}

export default App;
