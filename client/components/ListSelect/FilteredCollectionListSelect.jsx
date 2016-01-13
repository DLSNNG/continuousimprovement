FilteredCollectionListSelect = React.createClass({

	propTypes: {
		subscribeTo: React.PropTypes.string,
		collection: React.PropTypes.string,
		display: React.PropTypes.string,
		value: React.PropTypes.string,
		placeholder: React.PropTypes.string
	},

	getInitialState() {
		return {
			searchString: ""
		}
	},
	
	handleSearchInput(e) {
		var searchString = e.target.value;
		this.setState({ searchString: searchString });
	},
	
	render() {
		return (
			<div className={this.props.className}>
				<input 
					type="text" 
					className="filter-list-input"
					placeholder={this.props.placeholder}
					value={this.state.searchString} 
					onInput={this.handleSearchInput} />
				<CollectionListSelect
					collection={this.props.collection}
					subscribeTo={this.props.subscribeTo || this.props.collection.toLowerCase()}
					display={this.props.display}
					value={this.props.value}
					searchString={this.state.searchString} />
			</div>
		)
	}
});