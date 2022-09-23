// import { render, screen } from '@testing-library/react';

import { configure, shallow } from 'enzyme';
import sinon from 'sinon';
import App from './App';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("<App />", () => {
  it('renders learn react link', () => {
    let screen= shallow(<App gameboard="{}"/>);

    let svg_tags = screen.find("svg")
    expect(svg_tags.length).toEqual(1);
  });
});
