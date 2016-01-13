AddTicketsPage = React.createClass({
	render() {
		return (
			<div className="container">
				<AddTicketForm />
				<CollectionList
					collection="Tickets"
					display="title" />
			</div>
		)
	}
});