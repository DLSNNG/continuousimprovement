TicketDetails = React.createClass({

	//need to create date-picker component to facilitate due date.

	propTypes: {
		ticketId: React.PropTypes.string		
	},
	
	mixins: [ReactMeteorData],

	getMeteorData() {
		var handle = Meteor.subscribe("tickets");
		return {
			loading: !handle.ready(),
			ticket: Collections.Tickets.findOne({ _id: this.props.ticketId })
		}
	},

	saveUpdates() {
		//need to add a few more fields
		console.log("duedate", this.refs.dueDate.getSelected());
		var doc = {
			_id: this.data.ticket._id,
			title: this.refs.title.getValue().trim(),
			description: this.refs.description.getValue().trim(),
			createdDate: this.data.ticket.createdDate,
			createdBy: this.data.ticket.createdBy,
			categoryIds: this.refs.categoryIds.getSelected(),
			dueDate: this.refs.dueDate.getSelected(),
			assignedToIds: this.refs.assignedToIds.getSelected(),
			currentStatusId: this.refs.ticketStatusId.getValue()
		}

		var ticket = new Models.Ticket(doc);
		var status = ticket.save();
		if(status.passes) { this.setSuccessText("Update saved successfully"); }
		else{ this.setErrorText(status.error); }
	},

	deleteTicket() {
		var doc = this.data.ticket;
		var ticket = new Models.Ticket(doc);
		var status = ticket.remove();
		if(status.passes) { FlowRouter.go('/tickets'); this.setErrorText("Deleted Ticket"); }
		else { this.setErrorText(status.error); }

	},

	setErrorText(text) {
		Notifier.addError(text, 5000);
	},

	setSuccessText(text) {
		Notifier.addSuccess(text, 5000);
	},

	renderTicket() {
		return (
			<div className="container">
				<ModalDelete
					docName="Ticket"
					deleteDoc={this.deleteTicket} />

				<div ref="errorText" className="bg-danger"></div>
				<div ref="successText" className="bg-success"></div>
				<h3>
					<ContentEditable
						ref="title"
						display={this.data.ticket.title} />
				</h3>
				<hr />
				<div className="col-md-4 col-md-push-8">
					<h4>Status</h4>
					<CollectionDropdown
						ref="ticketStatusId"
						collection="TicketStatusOptions"
						subscribeTo="ticketStatusOptions"
						display="name"
						value="_id"
						selected={this.data.ticket.currentStatusId} />
					<h4>Due date</h4>
					<DateSelect 
						ref="dueDate"
						selected={this.data.ticket.dueDate} />
					<h4>Assigned to</h4>
					<div className="scroll-list">
						<CollectionListSelect
							ref="assignedToIds"
							collection="Users"
							display="username"
							value="_id"
							selectedItems={this.data.ticket.assignedToIds} />
					</div>
					<h4>Categories</h4>
					<div className="scroll-list">
						<CollectionListSelect
							ref="categoryIds"
							collection="Categories"
							display="name"
							value="_id"
							selectedItems={this.data.ticket.categoryIds} />
					</div>
				</div>
				<div className="col-md-8 col-md-pull-4">
					<h4>Description</h4>
					<div className="well">
						<ContentEditable
							ref="description"
							display={this.data.ticket.description} />
					</div>
					<h4>Created by</h4>
					<div className="well">
						<CollectionField
							collection="Users"
							display="username"
							_id={this.data.ticket.createdBy} />
					</div>
					<h4>Created on</h4>
					<div className="well">
						{this.data.ticket.createdDate.toString()}
					</div>
				</div>
				<input className="col-xs-12" type="submit" value="Save Changes" onClick={this.saveUpdates} />
			</div>
		)
	},
	render() {
		if(this.data.loading) {
			return <LoadingSpinner />
		}
		else {
			return this.renderTicket()
		}
	}
});