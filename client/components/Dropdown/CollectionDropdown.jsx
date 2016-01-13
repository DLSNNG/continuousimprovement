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
		Meteor.subscribe(this.props.subscribeTo || this.props.collection.toLowerCase());
		return {
			collection: Collections[this.props.collection].find({}).fetch()
		}
	},

	render() {
		return (
			<Dropdown 
				items={this.data.collection}
				keyToUse="_id"
				display={this.props.display}
				name={this.props.collection}
				value={this.props.value} 
				placeholder={this.props.placeholder} />
		)
	}
});