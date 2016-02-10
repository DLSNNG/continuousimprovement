MyTickets = React.createClass({

	getInitialState() {
		return {
			query: {
				createdBy: Meteor.userId()
			}
		}
	},

	render() {
		return (
			<div className="container">
				<h4>My Tickets</h4>
				<div className="col-md-12">
					<TicketSearchResults 
						baseURL="/tickets/"
						query={this.state.query} />
				</div>
			</div>
		)
	}
});