TicketSearchResults = React.createClass({

	propTypes: {
		baseURL: React.PropTypes.string,
		query: React.PropTypes.object
	},

	mixins: [ReactMeteorData],

	getMeteorData() {
		Meteor.subscribe("tickets");
		return {
			tickets: Collections.Tickets.find(this.props.query || {}).fetch()
		}
	},

	renderHeaders() {
		return (
			<thead>
				<tr>
					<th>Title</th>
					<th>Added By</th>
					<th>Status</th>
				</tr>
			</thead>
		)
	},

	renderItem(item) {
		return (
			<tr>
				<td><a href={this.props.baseURL+item._id}>{item.title}</a></td>
				<td>
					<CollectionField
						collection="Users"
						_id={item.createdBy}
						display="username" />
				</td>
				<td>
					<CollectionField
						collection="TicketStatusOptions"
						_id={item.currentStatusId}
						display="name" />
				</td>
			</tr>
		)
	},

	render() {
		var that = this;
		return (
			<div className="table-responsive">
				<table className="table">
					{that.renderHeaders()}
					<tbody>
						{that.data.tickets.map(function(ticket) {
							return that.renderItem(ticket);
						})}
					</tbody>
				</table>
			</div>
		)
	}
});