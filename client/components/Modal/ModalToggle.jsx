ModalToggle = React.createClass({

	propTypes: {
		showInitially: React.PropTypes.bool.isRequired
	},
	
	getInitialState: function() {
		return {
			shown: this.props.showInitially || false
		}
	},

	showModal() {
		this.setState({ shown: true });
	},

	hideModal() {
		this.setState({ shown: false });
	},

	render() {
		return (
			<div>
				<Modal shown={this.state.shown} hideModal={this.hideModal}>
					{this.props.children}
				</Modal>
			</div>
		)
	}
});