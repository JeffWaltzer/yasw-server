const { wireframe_to_svg_points } =  require('../wireframe_to_svg_points');

describe("wireframe_to_svg_points", () => {
  let wireframe = [
    [512, 532],
    [526, 526],
    [532, 512],
    [526, 498],
    [512, 492],
    [498, 498],
    [492, 512],
    [498, 526]
  ];

  it ("extracts and formats the points correctly", () => {
    expect(wireframe_to_svg_points(wireframe)).toEqual(
      "512,532 526,526 532,512 526,498 512,492 498,498 492,512 498,526");
  });
});
