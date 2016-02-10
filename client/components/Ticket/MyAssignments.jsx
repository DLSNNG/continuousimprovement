MyAssignments = React.createClass({

	getInitialState() {
		return {
			query: {
				assignedToIds: Meteor.userId()
			}
		}
	},

	render() {
		return (
			<div className="container">
				<div className="col-md-12">
					<h4>My Assignments</h4>
					<TicketSearchResults 
						baseURL="/tickets/"
						query={this.state.query} />
				</div>
			</div>
		)
	}
});