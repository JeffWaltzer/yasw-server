import {makePolygonPoints} from './makePolygonPoints';

function GTag(props) {
    const polygon = props.polygon;
    const index = props.index;

    let items = polygon.wireframe.map((wf, index) => {
      return <polygon key={index} points={makePolygonPoints(wf)} stroke={wf.color}/>;
    })
    if (polygon.score > 0)
      items.push(<text
          key={`score-${index}`}
          x={polygon.position[0]}
          y={polygon.position[1]+20}
      >{polygon.score}</text>);

    return (<g>{items}</g>);
}

export default GTag;
