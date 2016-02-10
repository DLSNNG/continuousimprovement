CollectionDropdown = React.createClass({

	propTypes: {
		subscribeTo: React.PropTypes.string,
		collection: React.PropTypes.string,
		display: React.PropTypes.string,
		value: React.PropTypes.string,
		placeholder: React.PropTypes.string
	},

	mixins: [ReactMeteorData],

	getMeteorData() {
		var handle = Meteor.subscribe(this.props.subscribeTo || this.props.collection.toLowerCase());
		return {
			loading: !handle.ready(),
			collection: Collections[this.props.collection].find({}).fetch()
		}
	},

	getInitialState() {
		var selected = this.props.selected || "";
		return {
			selected: selected
		}
	},

	updateSelected(event) {
		var selected = event.target.value;
		this.setState({ selected: selected });
	},

	getValue() {
		return this.state.selected;
	},

	render() {
		if(this.data.loading) {
			return <LoadingSpinner />;
		}
		else {
			return (
				<Dropdown 
					items={this.data.collection}
					keyToUse="_id"
					display={this.props.display}
					name={this.props.collection}
					value={this.props.value} 
					onChange={this.updateSelected}
					placeholder={this.props.placeholder}
					selected={this.props.selected} />
			)
		}
	}
});