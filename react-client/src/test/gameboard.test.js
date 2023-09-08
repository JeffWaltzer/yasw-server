import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import Gameboard from '../Gameboard'

const two_wireframe_sun = {
  "polygons": [
    {
      "wireframe": [
        {
          "points": [
            [512, 532],
            [526, 526],
            [532, 512],
            [526, 498],
            [512, 492],
            [498, 498],
            [492, 512],
            [498, 526]
          ],
          "color": "orange"
        },
        {
          "points": [
            [512, 532],
            [526, 526],
            [492, 512],
            [498, 526]
          ],
          "color": "green"
        }
      ],
      "score": 0,
      "position": [
        512,
        512
      ]
    },
  ],
  "field_size": [
    1024,
    1024
  ]
}

describe('gamefield with polygon with two wireframes', () => {
  let container;

  beforeEach(() => {
    container = render(<Gameboard gameboard={JSON.stringify({})}/>).container;
  });

  describe("The first wireframes", () => {
    let the_points;
    let polygon_tags;

    beforeEach(() => {
      polygon_tags = container.querySelectorAll("polygon");
    });

    it ('has the correct list', () => {
      console.log(polygon_tags);
      expect(polygon_tags.length).toEqual(0);
    });
  })
});

describe('gamefield with polygon with two wireframes', () => {
  let container;

  beforeEach(() => {
    container = render(<Gameboard gameboard={JSON.stringify(two_wireframe_sun)}/>)
      .container;
  });

  describe("The first wireframes", () => {
    let the_points;
    let polygon_tags;

    beforeEach(() => {
      polygon_tags = container.querySelectorAll("polygon");
      the_points = polygon_tags[0].getAttribute('points');
    });

    it ('has the correct list', () => {
      expect(the_points).toEqual("512,532 526,526 532,512 526,498 512,492 498,498 492,512 498,526");
    });
  })

  describe("The second wireframes", () => {
    let the_points;
    let polygon_tags;

    beforeEach(() => {
      polygon_tags = container.querySelectorAll("polygon");
      the_points = polygon_tags[1].getAttribute('points');
    });

    it ('has the correct list', () => {
      expect(the_points).toEqual("512,532 526,526 492,512 498,526");
    });
  });

})
