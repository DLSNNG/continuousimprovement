AddTicketStatusOptionsPage = React.createClass({
	render() {
		return (
			<div className="container">
				<AddTicketStatusOptionForm />
				<CollectionList
					collection="TicketStatusOptions"
					subscribeTo="ticketStatusOptions"
					display="name" 
					baseURL="/ticketStatusOptions/" />
			</div>
		)
	}
});