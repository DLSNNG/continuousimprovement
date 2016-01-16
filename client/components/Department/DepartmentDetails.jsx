DepartmentDetails = React.createClass({

	propTypes: {
		departmentId: React.PropTypes.string		
	},
	
	mixins: [ReactMeteorData],

	getMeteorData() {
		return {
			department: Collections.Departments.findOne({ _id: this.props.departmentId })
		}
	},

	saveUpdates() {
		var doc = {
			_id: this.data.department._id,
			name: this.refs.name.getValue().trim(),
			members: this.refs.members.getSelected()
		}

		var department = new Models.Department(doc);
		var status = department.save();
		if(status.passes) { this.setSuccessText("Update saved successfully"); }
		else{ this.setErrorText(status.error); }
	},

	setErrorText(text) {
		var error = ReactDOM.findDOMNode(this.refs.errorText);
			error.innerHTML = text;
	},

	setSuccessText(text) {
		var success = ReactDOM.findDOMNode(this.refs.successText);
			success.innerHTML = text;
	},

	render() {
		//need to refactor error/success texts later to be its own component
		return (
			<div className="container">
				<div ref="errorText" className="bg-danger"></div>
				<div ref="successText" className="bg-success"></div>
				<h3>
					<ContentEditable
						ref="name"
						display={this.data.department.name} />
				</h3>
				<hr />
				<h4>Members</h4>
				<div className="scroll-list">
					<CollectionListSelect
						ref="members"
						collection="Users"
						display="username"
						value="_id"
						selectedItems={this.data.department.members} />
				</div>
				<input type="submit" value="Save Changes" onClick={this.saveUpdates} />
			</div>
		)
	}
});