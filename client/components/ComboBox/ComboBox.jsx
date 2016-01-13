ComboBox = React.createClass({
	propTypes: {
		items: React.PropTypes.array,
		keyToUse: React.PropTypes.string,
		display: React.PropTypes.string,
		name: React.PropTypes.string,
		placeholder: React.PropTypes.string
	},

	renderOptions() {
		return this.props.items.map( (item) => {
			return <option 
						key={item[this.props.keyToUse]}
						value={item[this.props.display]} />
		});
	},

	render() {
		return (
			<div>
				<input 
					type="text" 
					className="form-control combo-box" 
					id={this.props.name+"-search-string"} 
					placeholder={this.props.placeholder} 
					autoComplete="off" 
					list={"select-"+this.props.name} 
					name={"selected"+this.props.name} />
				<datalist id={"select-"+this.props.name} name={"select"+this.props.name}>
					{this.renderOptions()}
				</datalist>
			</div>
		)
	}
});