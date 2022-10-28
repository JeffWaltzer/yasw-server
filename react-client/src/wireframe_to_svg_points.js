function wireframe_to_svg_points(wireframe) {
  return wireframe.map((point_pair) => {
    return point_pair.join(',');
  }).join(" ");
}

module.exports.wireframe_to_svg_points = wireframe_to_svg_points;
