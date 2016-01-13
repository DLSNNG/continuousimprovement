ListSelect = React.createClass({
	propTypes: {
		items: React.PropTypes.array,
		keyToUse: React.PropTypes.string,
		display: React.PropTypes.string,
		value: React.PropTypes.string,
		selectedItems: React.PropTypes.array,
		selectItem: React.PropTypes.func,
		isSelected: React.PropTypes.func,
		searchString: React.PropTypes.string
	},
	
	isSelected(item) {
		return this.props.isSelected(item);
	},

	selectItem(itemValue) {
		this.props.selectItem(itemValue);
	},

	renderList() {
		return this.props.items.map((item) => {
			if(this.props.searchString && 
				item[this.props.display].toLowerCase().indexOf(this.props.searchString.toLowerCase()) === -1) {
				return; //dont show values unless they match search string.
			}
	      	return <ListSelectItem 
	      			key={item[this.props.keyToUse]} 
	      			display={item[this.props.display]} 
	      			value={item[this.props.value]}
	      			selected={this.isSelected(item)} 
	      			selectItem={this.selectItem} />;
	    });
	},

	render() {
		return (
			<ul className="list-group">
				{this.renderList()}
			</ul>
		)
	}
});