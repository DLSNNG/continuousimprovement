AddTicketStatusOptionForm = React.createClass({
	addTicketStatusOption(e) {
		e.preventDefault();
		console.log("added ticket status option");
		var doc = {
			name: ReactDOM.findDOMNode(this.refs.statusName).value.trim(),
			description: ReactDOM.findDOMNode(this.refs.statusDescription).value.trim()
		}
		var ticketStatusOption = new Models.TicketStatusOption(doc);
		var status = ticketStatusOption.save();
		if(status.passes) { e.target.reset(); this.setErrorText(""); }
		else{ this.setErrorText(status.error); }
	},
	setErrorText(text) {
		var error = ReactDOM.findDOMNode(this.refs.errorText);
			error.innerHTML = text;
	},
	render() {
		return (
			<div>
				<form className="add-ticket-status-option-form" onSubmit={this.addTicketStatusOption} >
					<h3>Add Ticket Status Option</h3>
					<input
						type="text"
						ref="statusName"
						placeholder="Status Name" />
					<input
						type="text"
						ref="statusDescription"
						placeholder="Status Description" />
					<input
						type="submit"
						value="Add Status Option" />
					<div ref="errorText" className="bg-danger"></div>
				</form>
			</div>
		)
	}
});