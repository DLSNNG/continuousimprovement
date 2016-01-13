AddTicketForm = React.createClass({
	addTicket(e) {
		e.preventDefault();
		console.log("added ticket");
		var doc = {
			title: ReactDOM.findDOMNode(this.refs.ticketTitle).value.trim(),
			description: ReactDOM.findDOMNode(this.refs.ticketDescription).value.trim(),
			categoryIds: this.refs.categoryList.getSelected()
		}
		var ticket = new Models.Ticket(doc);
		var status = ticket.save();
		if(status.passes) { e.target.reset(); this.setErrorText(""); this.refs.categoryList.setState({ selectedItems: [] }); }
		else{ this.setErrorText(status.error); console.log(Collections.Tickets.find({}).fetch() ) }
	},
	setErrorText(text) {
		var error = ReactDOM.findDOMNode(this.refs.errorText);
			error.innerHTML = text;
	},
	render() {
		return (
			<div>
				<form className="add-category-form" onSubmit={this.addTicket} >
					<h3>Add Ticket</h3>
					<input
						type="text"
						ref="ticketTitle"
						placeholder="Ticket Title" />
					<input
						type="text"
						ref="ticketDescription"
						placeholder="Ticket Description" />
					<div ref="errorText" className="bg-danger"></div>

					<div className="scroll-list-wrapper">	
						<div className="scroll-list">
							<CollectionListSelect
								collection="Categories"
								display="name"
								value="_id"
								ref="categoryList"/>
						</div>
					</div>
					<input
						type="submit"
						value="Add Ticket" />
					
				</form>
			</div>
		)
	}
});