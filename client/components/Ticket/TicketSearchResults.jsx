TicketSearchResults = React.createClass({

	propTypes: {
		baseURL: React.PropTypes.string,
		query: React.PropTypes.object
	},

	mixins: [ReactMeteorData],

	getMeteorData() {
		Meteor.subscribe("tickets");
		Meteor.subscribe("ticketStatusOptions");
		return {
			tickets: Collections.Tickets.find(this.props.query || {}, this.state.sortBy || {}).fetch()
		}
	},

	getInitialState() {
		return {
			sortBy: { sort: {dueDate: 1} }
		}
	},

	sortBy(property) {
		var oldSort = this.state.sortBy;
		var direction = oldSort.sort[property] ? oldSort.sort[property] * -1 : 1;
		var sort = {};
			sort[property] = direction;
		this.setState({ sortBy: { sort: sort } });
	},

	sortByTitle() {
		this.sortBy('title');
	},

	sortByCreatedBy() {
		this.sortBy('createdBy');
	},

	sortByCreatedDate() {
		this.sortBy('createdDate');
	},

	sortByDueDate() {
		this.sortBy('dueDate');
	},

	sortByCurrentStatusId() {
		this.sortBy('currentStatusId');
	},

	renderHeaders() {
		return (
			<thead>
				<tr>
					<th onClick={this.sortByTitle}>Title</th>
					<th onClick={this.sortByCreatedBy}>Added By</th>
					<th onClick={this.sortByCreatedDate}>Created on</th>
					<th onClick={this.sortByDueDate}>Due by</th>
					<th onClick={this.sortByCurrentStatusId}>Status</th>
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
						{moment(item.createdDate).format("MM/DD/YYYY")}
					</td>
					<td>
						{item.dueDate ? moment(item.dueDate).format("MM/DD/YYYY") : ""}
					</td>
					<td>
						<CollectionField
							collection="TicketStatusOptions"
							subscribeTo="ticketStatusOptions"
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