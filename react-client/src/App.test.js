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
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from './App'

it('loads and displays greeting', async () => {
  const {container} = render(<App url="/greeting" />)

  let svg_tags = container.querySelectorAll("svg")
  expect(svg_tags.length).toEqual(1);
})
