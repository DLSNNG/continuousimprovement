CollectionField = React.createClass({

	propTypes: {
		subscribeTo: React.PropTypes.string,
		collection: React.PropTypes.string,
		_id: React.PropTypes.string,
		display: React.PropTypes.string,
		baseURL: React.PropTypes.string
	},

	mixins: [ReactMeteorData],

	getMeteorData() {
		var handle = Meteor.subscribe(this.props.subscribeTo || this.props.collection.toLowerCase());
		return {
			loading: !handle.ready(),
			doc: Collections[this.props.collection].findOne({ _id: this.props._id})
		}
	},

	render() {
		if(this.data.loading) {
			console.log("test");
			return <LoadingSpinner />;
		}
		if(!this.data.doc) {
			return (
				<div className="bg-danger">Not found</div>
			)
		}
		if (this.props.baseURL) {
			return (
				<a href={this.props.baseURL+this.props._id}>this.data.doc[this.props.display]</a>
			)
		}
		else {
			return (
				<div>{this.data.doc[this.props.display]}</div>
			)
		}
		
	}
});