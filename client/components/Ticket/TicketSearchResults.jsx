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
		var tickets = this.data.tickets.map(function(item, i) {
			return (
				<tr key={i} className="row-transition">
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
		}.bind(this));
		return (
			<div className="table-responsive">
				<table className="table">
					{this.renderHeaders()}
					<tbody>
						{tickets}
					</tbody>
				</table>
			</div>
		)
	}
});