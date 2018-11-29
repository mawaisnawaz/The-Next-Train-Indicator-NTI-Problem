import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';

import React from 'react';
import { configure,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from './Header';

configure({ adapter : new Adapter() });

const createProps = props => ({
	header: 'Next Train Indicator',
	...props
})

describe('<Header/>', () => {
	it('renders the header text', () => {
        let props = createProps()
		const wrapper = shallow(<Header title={ props.header } />);
        expect(wrapper.html()).toBe('<h1>Next Train Indicator</h1>');
	})
});





