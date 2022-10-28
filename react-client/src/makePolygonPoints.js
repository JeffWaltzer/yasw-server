export function makePolygonPoints(polygon) {
  return polygon.wireframe[0].points.map((point_pair) => {
    return point_pair.join(',');
  }).join(" ");

};
