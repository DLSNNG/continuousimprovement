Dropdown = React.createClass({

	propTypes: {
		items: React.PropTypes.array,
		display: React.PropTypes.string,
		value: React.PropTypes.string,
		keyToUse: React.PropTypes.string,
		name: React.PropTypes.string,
		placeholder: React.PropTypes.string
	},

	renderPlaceholder() {
		return <option value="">{this.props.placeholder || ""}</option>
	},

	renderOptions() {
		return this.props.items.map( (item) => {
			return (
				<option key={item[this.props.keyToUse]} value={item[this.props.value]}>
					{item[this.props.display]}
				</option>
			) 
				
		})
	},

	render() {
		return (
			<select name={this.props.name} defaultValue="">
				{this.renderPlaceholder()}
				{this.renderOptions()}
			</select>
		)
	}
});