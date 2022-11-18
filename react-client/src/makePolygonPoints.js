export function makePolygonPoints(wireframe) {
  return wireframe.points.map((point_pair) => {
    return point_pair.join(',');
  }).join(" ");

};
