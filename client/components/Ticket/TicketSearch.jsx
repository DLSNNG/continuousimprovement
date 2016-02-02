TicketSearch = React.createClass({

	//Need to find way to persist date ranges. Possibly create new react component for dates.
	getInitialState() {
		//get session data
		var assignedToIds = Session.get("assignedToIds");
		var categoryIds = Session.get("categoryIds");
		var statusIds = Session.get("statusIds");
		var startDate = Session.get("startDate");
		var endDate = Session.get("endDate");
		var previousQuery = Session.get("query");
		var query = previousQuery ? JSON.parse(previousQuery) : {};
		return {
			query: query,
			assignedToIds: assignedToIds,
			categoryIds: categoryIds,
			statusIds: statusIds,
			startDate: startDate,
			endDate: endDate
		}
	},

	updateQueryParams() {
		var newQuery = {};
		var dateRange = {};
		var assignedToIds = this.refs.assignedToIds.getSelected();
		var categoryIds = this.refs.categoryIds.getSelected();
		var statusIds = this.refs.statusIds.getSelected();
		var startDate = this.refs.startDate.value;
		var endDate = this.refs.endDate.value;
		if(assignedToIds.length > 0) { newQuery['assignedToIds'] = {$in: assignedToIds} }
		if(categoryIds.length > 0) { newQuery['categoryIds'] = {$in: categoryIds} }
		if(statusIds.length > 0) { newQuery['currentStatusId'] = {$in: statusIds} }
		if(startDate) { dateRange['$gte'] = moment(startDate).format('M/D/YYYY') }
		if(endDate) { dateRange['$lte'] = moment(endDate).format('M/D/YYYY') }
		if(startDate || endDate) { newQuery['createdDate'] = dateRange }
		this.setState({ query: newQuery });
		//persist throughout session
		Session.set("assignedToIds", assignedToIds);
		Session.set("categoryIds", categoryIds);
		Session.set("statusIds", statusIds);
		Session.set("startDate", startDate);
		Session.set("endDate", endDate);
		Session.set("query", JSON.stringify(newQuery));
	},

	render() {
		return (
			<div className="container">
				<div className="col-md-3">
					<h4>Assigned to</h4>
					<div className="scroll-list" onClick={this.updateQueryParams}>
						<CollectionListSelect
							selectedItems={this.state.assignedToIds}
							ref="assignedToIds"
							collection="Users"
							display="username"
							value="_id" />
					</div>
				</div>
				<div className="col-md-3">
					<h4>Categories</h4>
					<div className="scroll-list" onClick={this.updateQueryParams}>
						<CollectionListSelect
							selectedItems={this.state.categoryIds}
							ref="categoryIds"
							collection="Categories"
							display="name"
							value="_id" />
					</div>
				</div>
				<div className="col-md-3">
					<h4>Status</h4>
					<div className="scroll-list" onClick={this.updateQueryParams}>
						<CollectionListSelect
							selectedItems={this.state.statusIds}
							ref="statusIds"
							collection="TicketStatusOptions"
							display="name"
							value="_id" />
					</div>
				</div>
				<div className="col-md-3">
					<h4>Created Date</h4>
					<label for="start-date">Start</label>
					<div className="input-group">
						<input 
							ref="startDate" 
							onChange={this.updateQueryParams} 
							className="form-control" 
							type="date" 
							id="start-date" />
					</div>
					<label for="end-date">End</label>
					<div className="input-group">
						<input 
							ref="endDate" 
							onChange={this.updateQueryParams} 
							className="form-control" 
							type="date" 
							id="end-date" />
					</div>
				</div>
				<div className="col-md-12">
					<TicketSearchResults 
						baseURL="/tickets/"
						query={this.state.query} />
				</div>
			</div>
		)
	}
});