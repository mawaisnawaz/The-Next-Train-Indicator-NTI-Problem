import React from 'react';
import classes from './Clock.css';

class Clock extends React.Component{
	constructor(props){
		super(props);
		// initiate state, and any default values. (5) is the default time.
	  	let startDate= new Date().setHours(props.initialSetTime);
	  	startDate= new Date(startDate).setMinutes(0);
		startDate= new Date(startDate).setSeconds(0);

		this.state = {
            localTime: new Date(startDate)
        };
	}
	
	// render event, bind clock to each second timer
	componentDidMount() {
        this.timerId=setInterval(()=> this.tick(), 1000);
  	}
	
	// release resources
	componentWillUnmount() {
		clearInterval(this.timerId);
	}
	
	// update state
	tick(){
		this.setState((preState) =>({localTime: new Date( (new Date(preState.localTime).getTime() + (1000 * 60)) )}));
	}
    
	render(){
		return (<h5 className={ classes.Clock }> {this.state.localTime.toLocaleTimeString()} </h5>);
	}
}

export default Clock;