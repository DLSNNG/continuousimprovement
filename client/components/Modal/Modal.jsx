Modal = React.createClass({

	propTypes: {
		shown: React.PropTypes.bool.isRequired,
		hideModal: React.PropTypes.func
	},

	backgroundStyle: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		position: 'fixed',
		left: '0px',
		right: '0px',
		top: '0px',
		bottom: '0px',
		zIndex: '1000'
	},

	rowStyle: {
		width: '100%',
		textAlign: 'right'
	},

	clickModal(event) {
		event.stopPropagation();
		console.log("stopped");
	},

	renderModalShown: function() {
		return (
			<div style={this.backgroundStyle} onClick={this.props.hideModal}>
				<div className="react-modal" onClick={this.clickModal}>
					<div style={this.rowStyle}>
						<span className="glyphicon glyphicon-remove" onClick={this.props.hideModal}></span>
					</div>
					<div>
						{this.props.children}
					</div>
				</div>
			</div>
		)
	},

	renderModalHidden: function() {
		return (
			<div></div>
		)
	},

	render() {
		if(this.props.shown){
			return this.renderModalShown()
		}
		else {
			return this.renderModalHidden()
		}
	}
});