CollectionList = React.createClass({

	propTypes: {
		subscribeTo: React.PropTypes.string,
		collection: React.PropTypes.string,
		display: React.PropTypes.string,
		baseURL: React.PropTypes.string,
		query: React.PropTypes.object
	},

	mixins: [ReactMeteorData],

	getMeteorData() {
		Meteor.subscribe(this.props.subscribeTo || this.props.collection.toLowerCase());
		return {
			collection: Collections[this.props.collection].find(this.props.query || {}).fetch()
		}
	},

	render() {
		return (
			<List 
				items={this.data.collection}
				keyToUse="_id"
				display={this.props.display}
				baseURL={this.props.baseURL} />
		)
	}
});