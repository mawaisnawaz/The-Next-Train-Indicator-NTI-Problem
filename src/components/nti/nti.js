import React from 'react';
import NTIHeader from './Header/Header';
import ScheduledTrainTable from './ScheduledTrainTable/ScheduledTrainTable';
import Clock from './Clock/Clock';
import classes from './nti.css';

// NTI main component
class NTIComponent extends React.Component{
	render(){
		return (
			<div>
				 <div id="NTI-compoent" className={ classes.MainContainer }>
						<header>
							<NTIHeader title={"Next Train Indicator"}/>
						</header>

						<section>
					        <ScheduledTrainTable initialSetHours={5} schedulerMinutes={15} pageSize={2}  />
						</section>

						<footer>
						    <Clock initialSetTime={5}/>
						</footer>
				 </div> 
			</div>
		);
	}
}

export default NTIComponent;