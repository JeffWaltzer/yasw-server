// // import { render, screen } from '@testing-library/react';
//
// import { configure, mount, shallow  } from 'enzyme';
//
// import sinon from 'sinon';
// import App from './App';
//
// import Adapter from 'enzyme-adapter-react-17';
// configure({ adapter: new Adapter() });
//
// describe("<App />", () => {
// const the_sun={
//   "polygons": [
//     {
//       "wireframe": [
//         {
//           "points": [
//             [
//               512,
//               532
//             ],
//             [
//               526,
//               526
//             ],
//             [
//               532,
//               512
//             ],
//             [
//               526,
//               498
//             ],
//             [
//               512,
//               492
//             ],
//             [
//               498,
//               498
//             ],
//             [
//               492,
//               512
//             ],
//             [
//               498,
//               526
//             ]
//           ],
//           "color": "orange"
//         }
//       ],
//       "score": 0,
//       "position": [
//         512,
//         512
//       ]
//     },
//   ],
//   "field_size": [
//     1024,
//     1024
//   ]
// }
//
//   it('renders learn react link', () => {
//     let screen= shallow(<App gameboard="{}"/>);
//
//     let svg_tags = screen.find("svg")
//     expect(svg_tags.length).toEqual(1);
//   });
//
//   it('renders the sun', () => {
//     let screen= mount(<App gameboard="{JSON.stringify(the_sun)}"/>);
//
//     let svg_tags = screen.find("polygon")
//     expect(svg_tags.length).toEqual(1);
//
//   })
// });



import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

const the_sun_json = {
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
};

const two_suns_json = {
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
        }
      ],
      "score": 0,
      "position": [
        512,
        512
      ]
    },
    {
      "wireframe": [
        {
          "points": [
            [712, 732],
            [726, 726],
            [732, 712],
            [726, 698],
            [712, 692],
            [698, 698],
            [692, 712],
            [698, 726]
          ],
          "color": "orange"
        }
      ],
      "score": 0,
      "position": [
        712,
        712
      ]
    }
  ],
  "field_size": [
    1024,
    1024
  ]
}

describe('app with no JSON', () => {
  let app;
  let svg_tags;

  beforeEach(() => {
    const {container} = render(<App />);
    svg_tags = container.querySelectorAll("svg");
  });

  it('produces exactly one svg tag', () => {
    expect(svg_tags.length).toEqual(1);
  });

  describe('the svg tag', () => {
    let the_svg_tag;

    beforeEach(() => {
      the_svg_tag = svg_tags[0];
    });

    it('is full height', () => {
      expect(the_svg_tag.getAttribute('height')).toEqual("100%");
    });

    it('is full width', () => {
      expect(the_svg_tag.getAttribute('width')).toEqual("100%");
    });

    it('has the correct viewbox', () => {
      expect(the_svg_tag.getAttribute('viewBox')).toEqual("0 0 1024 1024");
    });
  });
});

describe('game field', () => {
  let container;
  beforeEach(()=>{
    container = render(<App gameboard={JSON.stringify(two_suns_json)}/>)
        .container
  })

  it('generates the g tags', () => {
    const g_tags = container.querySelectorAll("g");
    expect(g_tags.length).toEqual(2);
  })

  describe('the rect tag for the background', () => {
    let rect_tags, the_tag;

    beforeEach(() => {
      rect_tags = container.querySelectorAll("rect");
      the_tag= rect_tags[0];
    });

    it('has the correct width',  () => {
      expect(the_tag.getAttribute("width")).toEqual("100%");
    });

    it('has the correct height',  () => {
      expect(the_tag.getAttribute("height")).toEqual("100%");
    });

    it('has the correct style',  () => {
      expect(the_tag.getAttribute("style")).
        toEqual("fill: rgb(0, 0, 0); stroke-width: 0; stroke: rgb(255,0,0);");
    });
  });

  describe('the polygon tags',  () => {
    let polygon_tags;

    beforeEach(() => {
      polygon_tags = container.querySelectorAll("polygon");
    });

    it('are generated',  () => {
      expect(polygon_tags.length).toEqual(2);
    });
  });
})

