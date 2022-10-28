import { makePolygonPoints } from '../makePolygonPoints';

describe("makePolygonPoints", () => {
  let polygon = {
    wireframe: [
      {
        points: [
          [512, 532],
          [526, 526],
          [532, 512],
          [526, 498],
          [512, 492],
          [498, 498],
          [492, 512],
          [498, 526]
        ]
      }
    ]
  };

  it ("extracts and formats the points correctly", () => {
    expect(makePolygonPoints(polygon)).toEqual(
      "512,532 526,526 532,512 526,498 512,492 498,498 492,512 498,526");
  });
});
