import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ScheduledTrainTable from './ScheduledTrainTable';

configure({ adapter : new Adapter() });

const createProps = props => ({
	initialSetHours : 5,
    schedulerMinutes : 15, 
    pageSize : 2,
	...props
})

describe('<ScheduledTrainTable/>', () => {
	it('renders the scheduled train with some entries', () => {
		let props = createProps()
		const wrapper = shallow(<ScheduledTrainTable initialSetHours={ props.initialSetHours } schedulerMinutes={ props.schedulerMinutes } pageSize={ props.pageSize } />)
        expect(wrapper.find('li').length).toBeLessThanOrEqual(4);
        expect(wrapper.find('li').length).toBeGreaterThanOrEqual(0);
	})
});