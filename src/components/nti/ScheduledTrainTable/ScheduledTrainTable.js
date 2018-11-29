import React from 'react';
import {trains, trainSchedulerEngine} from './Helpers';
import classes from './ScheduledTrainTable.css';

// start scheduler component
class ScheduledTrainTable extends React.Component{
	constructor(props){
		super(props);
		// initiate state, and any default values.
		this.initialSetHours=props.initialSetHours;
		this.schedulerMinutes=props.schedulerMinutes;
		this.pageSize=props.pageSize;
		// state initialize
		this.state={data:[], startSchedulerDate: this.setInitialTime(this.initialSetHours)} 
	}
	
	componentDidMount() {
		this.schedulerTick(trains); //only for first time rendering.
    	this.timerId=setInterval(()=> this.schedulerTick(trains), (1000 * 5));					 
  	}
	
	// release resources
	componentWillUnmount() {
		clearInterval(this.timerId);
	}

	setInitialTime(hours){
        let startDate= new Date().setHours(hours);
        startDate= new Date(startDate).setMinutes(0);
        return new Date(new Date(startDate).setSeconds(0));
	}

	addMinutes(dateOffset, minutes){
		return new Date(dateOffset.getTime() + (minutes * (1000 * 60)))
	}

	// update state
	schedulerTick(trainsClass){
        let trains=[ 
            new trainsClass('Central Station', (dateTime)=>{
            // this train run every 20 minutes
            return dateTime.getMinutes() % 20 === 0;
        }) ,new trainsClass('Circular', (dateTime)=> {
                // this train run every 60 minutes
                return dateTime.getMinutes() === 0;
        }) ,new trainsClass('North Square', (dateTime)=> {
                // this train run every 12 minutes from 07:00 until 22:00
                return (dateTime.getHours() >=7 &&
                        dateTime.getHours() <=22 &&
                        dateTime.getMinutes() % 12 === 0);
        }) ,new trainsClass('West Market', (dateTime)=> {
                // this train run every 6 minutes from 05:30 until 01:30
                return ((dateTime.getHours() + dateTime.getMinutes() >= 35)  &&
                        (dateTime.getHours() + dateTime.getMinutes() <= 31)  &&
                        dateTime.getMinutes() % 6 === 0);
        })]

		let engine= new trainSchedulerEngine(trains); //initiate the train Scheduler Engine with default timing defined.
		let endSchedulerDate=this.addMinutes(this.state.startSchedulerDate, 15); // Define endScheduler Date for train (every 15 mins)
		endSchedulerDate= new Date(endSchedulerDate).setSeconds(0); //define the endScheduler unix timing 
        
        //transform data
		let rawData= engine.getTrainScheduleBetweenDates(new Date(this.state.startSchedulerDate), new Date(endSchedulerDate)); //get the data of trains during scheduled time.
        let flattenData= rawData.reduce((a,b)=> {return a.concat(b);} ); //accumulate the raw data 
        let sortedData = flattenData.sort((a,b)=> {return a.expectedArrivalDate - b.expectedArrivalDate;}); //sort the accumulated data
        
        // show pages each interval (3 seconds)
		let pagedData= sortedData.slice(0, this.pageSize).map((v,i) => {
            return {
                'station': v.train, 'expectedArrivalDate':v.expectedArrivalDate, 'minutesToArrive':v.minutesToArrive
            }
        });
		
        this.setState((prevState, props) => {
		    return { data:pagedData, startSchedulerDate: this.addMinutes(prevState.startSchedulerDate, this.schedulerMinutes)};
		});
	}
	render(){      
		return  (
			<ul className={ classes.TrainListing}>
				{	this.state.data.map((value, idx)=>	<li key={idx+1} className={ classes.Train }> <h4>  {idx+1} -   {value.station} -  {value.minutesToArrive + ' min'} </h4> </li>)	}
			</ul>
		);
	}
}
// end scheduler

export default ScheduledTrainTable;