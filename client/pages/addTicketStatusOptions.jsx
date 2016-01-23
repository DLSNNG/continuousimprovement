AddTicketStatusOptionsPage = React.createClass({
	render() {
		return (
			<div className="container">
				<AddTicketStatusOptionForm />
				<CollectionList
					collection="TicketStatusOptions"
					display="name" 
					baseURL="/ticketStatusOptions/" />
			</div>
		)
	}
});