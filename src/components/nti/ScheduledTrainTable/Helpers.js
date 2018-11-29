// start utilties
let utilities= function(){

		let setInitialTime= function(hours){
			let startDate= new Date().setHours(hours);
		  	startDate= new Date(startDate).setMinutes(0);
			return new Date(new Date(startDate).setSeconds(0));
		}

		let addMinutes= function(dateOffset, minutes){
			return new Date(dateOffset.getTime() + (minutes * (1000 * 60)))
		}

		let dTDiffInDays= function(startDate, endDate){
        return Math.round((endDate - startDate)/(1000*60*60*24));
		}

		let dTDiffInMins= function(startDate, endDate){
			return Math.round((endDate - startDate)/(1000*60));
		}

	return { setInitialTime, dTDiffInDays, dTDiffInMins, addMinutes };
}
let utilitiesFactory=new utilities();
// end utilities

//start train engine api
let train =function(name, predicate){
    let checkArrivalTime= function(dateTime){
        if(predicate(dateTime))
            return true;
        return false;
    }   
    return {
        checkArrivalTime, name
    };
};

module.exports.trains = train;



let trainSchedulerEngine=function(trains){
	let trainsFunctor=[...trains];

    let registerTrains =function(trains){
        //TODO: validate that train by name, is not already exists.
        return trains.forEach(train => {
            trainsFunctor.push(train);
        });
    };


    let generateTrainSchedule= function(train, startDate, endDate){
            // validate that date difference is maximum one day, else we should in think in different scale 
            if(utilitiesFactory.dTDiffInDays(startDate, endDate) > 1)
                throw new Error('Not Supported');

            let initialDate=startDate;
            let trainsSchedule=[];
            while(initialDate <= endDate){
                if(train.checkArrivalTime(initialDate))
                   trainsSchedule.push({'train': train.name, 'expectedArrivalDate':initialDate,  'minutesToArrive': (utilitiesFactory.dTDiffInMins(startDate, initialDate))});
                initialDate=new Date(initialDate.getTime() + (1 * (1000 * 60)))
            }
            return trainsSchedule;
    };

    let getTrainScheduleBetweenDates =  function(startDate, endDate){
        return trainsFunctor.map((train)=> {
            return generateTrainSchedule(train, startDate, endDate);        
        });
    }
	return {registerTrains, getTrainScheduleBetweenDates}
};


module.exports.trainSchedulerEngine = trainSchedulerEngine;