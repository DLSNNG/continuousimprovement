TicketDetails = React.createClass({

	propTypes: {
		ticketId: React.PropTypes.string		
	},
	
	mixins: [ReactMeteorData],

	getMeteorData() {
		return {
			ticket: Collections.Tickets.findOne({ _id: this.props.ticketId })
		}
	},

	saveUpdates() {
		//need to add a few more fields
		var doc = {
			_id: this.data.ticket._id,
			title: this.refs.title.getValue().trim(),
			description: this.refs.description.getValue().trim(),
			categoryIds: this.refs.categoryIds.getSelected(),
			assignedToIds: this.refs.assignedToIds.getSelected()
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
		if(status.passes) { FlowRouter.go('/tickets'); }
		else { this.setErrorText(status.error); }

	},

	setErrorText(text) {
		var error = ReactDOM.findDOMNode(this.refs.errorText);
			error.innerHTML = text;
	},

	setSuccessText(text) {
		var success = ReactDOM.findDOMNode(this.refs.successText);
			success.innerHTML = text;
	},

	render() {
		//need to refactor error/success texts later to be its own component,
		//and add moment for dates
		return (
			<div className="container">
				<div className="row">
					<h1 onClick={this.deleteTicket} className="glyphicon glyphicon-remove pull-right text-danger"></h1>
				</div>
				<div ref="errorText" className="bg-danger"></div>
				<div ref="successText" className="bg-success"></div>
				<h3>
					<ContentEditable
						ref="title"
						display={this.data.ticket.title} />
				</h3>
				<hr />
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
				<h4>Categories</h4>
				<div className="scroll-list">
					<CollectionListSelect
						ref="categoryIds"
						collection="Categories"
						display="name"
						value="_id"
						selectedItems={this.data.ticket.categoryIds} />
				</div>
				<h4>Assigned to</h4>
				<div className="scroll-list">
					<CollectionListSelect
						ref="assignedToIds"
						collection="Users"
						display="username"
						value="_id"
						selectedItems={this.data.ticket.assignedToIds} />
				</div>
				<input type="submit" value="Save Changes" onClick={this.saveUpdates} />
			</div>
		)
	}
});