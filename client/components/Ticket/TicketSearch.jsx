TicketSearch = React.createClass({

	//Need to find way to persist date ranges. Possibly create new react component for dates.
	getInitialState() {
		//get session data
		var assignedToIds = Session.get("assignedToIds");
		var categoryIds = Session.get("categoryIds");
		var statusIds = Session.get("statusIds");
		var startDate = Session.get("startDate");
		var endDate = Session.get("endDate");
		var dueStart = Session.get("dueStart");
		var dueEnd = Session.get("dueEnd");
		var previousQuery = Session.get("query");
		var query = previousQuery ? JSON.parse(previousQuery) : {};
		return {
			query: query,
			assignedToIds: assignedToIds,
			categoryIds: categoryIds,
			statusIds: statusIds,
			startDate: startDate,
			endDate: endDate,
			dueStart: dueStart,
			dueEnd: dueEnd
		}
	},

	updateQueryParams() {
		var newQuery = {};
		var dateRange = {};
		var dueRange = {};
		var assignedToIds = this.refs.assignedToIds.getSelected();
		var categoryIds = this.refs.categoryIds.getSelected();
		var statusIds = this.refs.statusIds.getSelected();
		var startDate = this.refs.startDate.value;
		var endDate = this.refs.endDate.value;
		var dueStart = this.refs.dueStart.value;
		var dueEnd = this.refs.dueEnd.value;
		if(assignedToIds.length > 0) { newQuery['assignedToIds'] = {$in: assignedToIds} }
		if(categoryIds.length > 0) { newQuery['categoryIds'] = {$in: categoryIds} }
		if(statusIds.length > 0) { newQuery['currentStatusId'] = {$in: statusIds} }
		if(startDate) { dateRange['$gte'] = moment(startDate).toDate() }
		if(endDate) { dateRange['$lte'] = moment(endDate).toDate() }
		if(dueStart) { dueRange['$gte'] = moment(dueStart).toDate() }
		if(dueEnd) { dueRange['$lte'] = moment(dueEnd).toDate() }
		if(startDate || endDate) { newQuery['createdDate'] = dateRange }
		if(dueStart || dueEnd) { newQuery['dueDate'] = dueRange }
		this.setState({ query: newQuery });
		this.setState({ assignedToIds: assignedToIds });
		this.setState({ categoryIds: categoryIds });
		this.setState({ statusIds: statusIds });
		this.setState({ startDate: startDate });
		this.setState({ endDate: endDate });
		this.setState({ dueStart: dueStart });
		this.setState({ dueEnd: dueEnd });
		console.log(newQuery);
	},

	updateStartDate(event) {
		this.setState({ startDate: event.target.value });
		this.updateQueryParams();
	},

	updateEndDate(event) {
		this.setState({ endDate: event.target.value });
		this.updateQueryParams();
	},

	updateDueStart(event) {
		this.setState({ dueStart: event.target.value });
		this.updateQueryParams();
	},

	updateDueEnd(event) {
		this.setState({ dueEnd: event.target.value });
		this.updateQueryParams();
	},

	componentWillUnmount() {
		//persist throughout session
		Session.set("assignedToIds", this.state.assignedToIds);
		Session.set("categoryIds", this.state.categoryIds);
		Session.set("statusIds", this.state.statusIds);
		Session.set("startDate", this.state.startDate);
		Session.set("endDate", this.state.endDate);
		Session.set("dueStart", this.state.dueStart);
		Session.set("dueEnd", this.state.dueEnd);
		Session.set("query", JSON.stringify(this.state.query));
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
							subscribeTo="ticketStatusOptions"
							display="name"
							value="_id" />
					</div>
				</div>
				<div className="col-md-3">
					<h4>Created Date</h4>
					<label htmlFor="start-date">Start</label>
					<div className="input-group">
						<input 
							ref="startDate" 
							value={this.state.startDate}
							onChange={this.updateStartDate} 
							className="form-control" 
							type="date" 
							id="start-date" />
					</div>
					<label htmlFor="end-date">End</label>
					<div className="input-group">
						<input 
							ref="endDate" 
							value={this.state.endDate}
							onChange={this.updateEndDate} 
							className="form-control" 
							type="date" 
							id="end-date" />
					</div>

					<h4>Due Date</h4>
					<label htmlFor="due-start">Start</label>
					<div className="input-group">
						<input 
							ref="dueStart" 
							value={this.state.dueStart}
							onChange={this.updateDueStart} 
							className="form-control" 
							type="date" 
							id="due-start" />
					</div>
					<label htmlFor="due-end">End</label>
					<div className="input-group">
						<input 
							ref="dueEnd" 
							value={this.state.dueEnd}
							onChange={this.updateDueEnd} 
							className="form-control" 
							type="date" 
							id="due-end" />
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