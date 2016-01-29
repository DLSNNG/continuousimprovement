TicketSearch = React.createClass({

	getInitialState() {
		return {
			query: {}
		}
	},

	updateQueryParams() {
		var newQuery = {};
		var assignedToIds = this.refs.assignedToIds.getSelected();
		var categoryIds = this.refs.categoryIds.getSelected();
		var statusIds = this.refs.statusIds.getSelected();
		if(assignedToIds.length > 0) { newQuery['assignedToIds'] = {$in: assignedToIds} }
		if(categoryIds.length > 0) { newQuery['categoryIds'] = {$in: categoryIds} }
		if(statusIds.length > 0) { newQuery['currentStatusId'] = {$in: statusIds} }
		this.setState({ query: newQuery });
		console.log("test", newQuery);
	},

	render() {
		return (
			<div>
				<div className="col-md-4">
					<h4>Assigned to</h4>
					<div className="scroll-list" onClick={this.updateQueryParams}>
					<CollectionListSelect
						ref="assignedToIds"
						collection="Users"
						display="username"
						value="_id" />
					</div>
				</div>
				<div className="col-md-4">
					<h4>Categories</h4>
						<div className="scroll-list" onClick={this.updateQueryParams}>
						<CollectionListSelect
							ref="categoryIds"
							collection="Categories"
							display="name"
							value="_id" />
					</div>
				</div>
				<div className="col-md-4">
					<h4>Status</h4>
						<div className="scroll-list" onClick={this.updateQueryParams}>
						<CollectionListSelect
							ref="statusIds"
							collection="TicketStatusOptions"
							display="name"
							value="_id" />
					</div>
				</div>
				<div className="col-md-12">
					<CollectionList 
						collection='Tickets'
						display='title'
						baseURL="/tickets/"
						query={this.state.query} />
				</div>
			</div>
		)
	}
});