CollectionListSelect = React.createClass({

	propTypes: {
		subscribeTo: React.PropTypes.string,
		collection: React.PropTypes.string,
		display: React.PropTypes.string,
		value: React.PropTypes.string,
		searchString: React.PropTypes.string
	},

	getInitialState() {
		return {
			selectedItems: []
		}
	},

	mixins: [ReactMeteorData],

	getMeteorData() {
		Meteor.subscribe(this.props.subscribeTo || this.props.collection.toLowerCase());
		return {
			collection: Collections[this.props.collection].find({}).fetch()
		}
	},

	isSelected(item) {
		var value = item[this.props.value];
		var selectedItems = this.state.selectedItems;
		return selectedItems.indexOf(value) > -1 ? "selected" : "";
	},

	getSelected() {
		return this.state.selectedItems;
	},

	clearSelected() {
		this.setState({ selectedItems: [] });
	},

	selectItem(itemValue) {
		var items = this.state.selectedItems;
		var index = items.indexOf(itemValue);
		//remove item if already selected
		if (index > -1) { 
			items.splice(index, 1);
		}
		else {
			items.push(itemValue);
		}
		this.setState({ selectedItems: items });
		console.log(this.state.selectedItems);
	},

	render() {
		return (
			<ListSelect 
				items={this.data.collection}
				keyToUse="_id"
				display={this.props.display}
				value={this.props.value}
				selectedItems={this.state.selectedItems}
				selectItem={this.selectItem}
				isSelected={this.isSelected} 
				searchString={this.props.searchString || null} />
		)
	}
});