import './Gameboard.css';
import GTag from './GTag.js';

function Gameboard(props) {
  let polygons = props.gameboard ?
      JSON.parse(props.gameboard).polygons :
      [];

  if (!polygons)
    polygons = [];

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

export default Gameboard;
