SearchLayout = React.createClass({
	render() {
		return (
			<div>
				<div>{this.props.searchBar}</div>
		        <main>{this.props.content}</main>
		     </div>
		)
	}
})