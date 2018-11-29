import React from 'react';
import classes from './Header.css';

class NTIHeader extends React.Component{
	constructor(props){
		super(props);
		this.title=props.title;
	}
	render(){
		return (<h1 className={ classes.Header }>{this.props.title}</h1>);
	}
}


export default NTIHeader;