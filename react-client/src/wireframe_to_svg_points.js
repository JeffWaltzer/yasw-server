export function wireframe_to_svg_points(wireframe) {
  return wireframe.map((point_pair) => {
    return point_pair.join(',');
  }).join(" ");
}
