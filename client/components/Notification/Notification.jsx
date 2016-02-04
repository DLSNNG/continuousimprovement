Notification = React.createClass({

	propTypes: {
		message: React.PropTypes.string,
		className: React.PropTypes.string	
	},

	render() {
		return (
			<div className={this.props.className}>
				{this.props.message}
			</div>
		)
	}
});