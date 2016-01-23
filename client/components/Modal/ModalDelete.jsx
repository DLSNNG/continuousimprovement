ModalDelete = React.createClass({

	propTypes: {
		docName: React.PropTypes.string,
		deleteDoc: React.PropTypes.func.isRequired
	},

	showModal() {
		this.refs.modal.showModal();
	},

	hideModal() {
		this.refs.modal.hideModal();
	},

	render() {
		return (
			<div className="row">
				<h1 onClick={this.showModal} className="glyphicon glyphicon-remove pull-right text-danger"></h1>
				<ModalToggle ref="modal">
					<div className="col-xs-12">
						<h3>Are you sure you want to delete this {this.props.docName}?</h3>
						<button className="btn btn-danger" onClick={this.props.deleteDoc}>Delete</button>
						<button className="btn btn-caution" onClick={this.hideModal}>Cancel</button>
					</div>
				</ModalToggle>
			</div>
		)
	}
});