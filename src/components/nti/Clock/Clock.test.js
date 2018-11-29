import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';

import React from 'react';
import { configure,shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Clock from './Clock';

configure({ adapter : new Adapter() });

const createProps = props => ({
	initialSetTime: 5,
	...props
})

describe('<Clock/>', () => {
    let wrapper;
    
    beforeEach(() => {
        let props = createProps()
        wrapper = mount(<Clock initialSetTime={ props.initialSetTime } />);
    });

    it("always renders a `ClockDisplay`", () => {
        expect(Clock.length).toBe(1);
    });

    it("should received a default time of 5", () => {
        expect(wrapper.props().initialSetTime).toEqual(5);
    });

    it("should received a default time", () => {  
        expect(Object.keys(wrapper.props()).length).toBe(1);
    });
})