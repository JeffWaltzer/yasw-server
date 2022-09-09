// import { render, screen } from '@testing-library/react';

import { configure, shallow } from 'enzyme';
import sinon from 'sinon';
import App from './App';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("<App />", () => {
  it('renders learn react link', () => {
    let screen= shallow(<App />);

    console.log(`App(): ${JSON.stringify(App(), null, 4)}`);
    console.log(`screen: ${JSON.stringify(screen, null, 4)}`);

    expect(screen.find("div")).to.have.lengthOf(1);

    // const linkElement = screen.getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
  });
});

// describe('<App />', () => {
//   it('renders three <Foo /> components', () => {
//     const wrapper = shallow(<MyComponent />);
//     expect(wrapper.find(Foo)).to.have.lengthOf(3);
//   });

//   it('renders an `.icon-star`', () => {
//     const wrapper = shallow(<MyComponent />);
//     expect(wrapper.find('.icon-star')).to.have.lengthOf(1);
//   });

//   it('renders children when passed in', () => {
//     const wrapper = shallow((
//       <MyComponent>
//         <div className="unique" />
//       </MyComponent>
//     ));
//     expect(wrapper.contains(<div className="unique" />)).to.equal(true);
//   });

//   it('simulates click events', () => {
//     const onButtonClick = sinon.spy();
//     const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
//     wrapper.find('button').simulate('click');
//     expect(onButtonClick).to.have.property('callCount', 1);
//   });
// });
