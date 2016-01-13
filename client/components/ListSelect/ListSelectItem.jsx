ListSelectItem = React.createClass({
	propTypes: {
		display: React.PropTypes.string,
		selected: React.PropTypes.string,
		value: React.PropTypes.string,
		selectItem: React.PropTypes.func
	},
	selectItem(e) {
		this.props.selectItem(e.target.dataset.value);
		console.log(e.target.dataset.value);
	},
	render() {
		return (
			<li className={"list-group-item " + this.props.selected} 
				data-value={this.props.value}
				onClick={this.selectItem}>
				{this.props.display}
			</li>
		)
	}
});