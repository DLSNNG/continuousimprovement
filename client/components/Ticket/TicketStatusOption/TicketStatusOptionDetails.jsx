TicketStatusOptionDetails = React.createClass({

	propTypes: {
		ticketStatusOptionId: React.PropTypes.string		
	},
	
	mixins: [ReactMeteorData],

	getMeteorData() {
		return {
			ticketStatusOption: Collections.TicketStatusOptions.findOne({ _id: this.props.ticketStatusOptionId })
		}
	},

	saveUpdates() {
		//need to add a few more fields
		var doc = {
			_id: this.data.ticketStatusOption._id,
			name: this.refs.name.getValue().trim(),
			description: this.refs.description.getValue().trim()
		}

		var ticketStatusOption = new Models.TicketStatusOption(doc);
		var status = ticketStatusOption.save();
		if(status.passes) { this.setSuccessText("Update saved successfully"); }
		else{ this.setErrorText(status.error); }
	},

	deleteTicketStatusOption() {
		var doc = this.data.ticketStatusOption;
		var ticketStatusOption = new Models.TicketStatusOption(doc);
		var status = ticketStatusOption.remove();
		if(status.passes) { FlowRouter.go('/ticketStatusOptions'); this.setErrorText("Deleted Ticket Status");}
		else { this.setErrorText(status.error); }

	},

	setErrorText(text) {
		Notifier.addError(text, 5000);
	},

	setSuccessText(text) {
		Notifier.addSuccess(text, 5000);
	},

	render() {
		//need to refactor error/success texts later to be its own component,
		//and add moment for dates
		return (
			<div className="container">
				<ModalDelete
					docName="Ticket Status Option"
					deleteDoc={this.deleteTicketStatusOption} />

				<div ref="errorText" className="bg-danger"></div>
				<div ref="successText" className="bg-success"></div>
				<h3>
					<ContentEditable
						ref="name"
						display={this.data.ticketStatusOption.name} />
				</h3>
				<hr />
				<h4>Description</h4>
				<div className="well">
					<ContentEditable
						ref="description"
						display={this.data.ticketStatusOption.description} />
				</div>
				<input type="submit" value="Save Changes" onClick={this.saveUpdates} />
			</div>
		)
	}
});