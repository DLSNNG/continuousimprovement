DateSelect = React.createClass({

	propTypes: {
		selected: React.PropTypes.string,
		className: React.PropTypes.string
	},
	
	getInitialState() {
		var date = this.props.selected ? moment(this.props.selected).format("YYYY-MM-DD") : null;
		return {
			date: date
		}
	},

	onDateChange(event) {
		var date = event.target.value;
		this.setState({ date: date });
	},

	getSelected() {
		var date = moment(this.state.date).format("MM/DD/YYYY");
		return date;
	},

	render() {
		return (
			<input 
				type="date" 
				className={this.props.className || ""} 
				value={this.state.date} 
				onChange={this.onDateChange}/>
		)
	}
});