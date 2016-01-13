AddDepartmentForm = React.createClass({
	addDepartment(e) {
		e.preventDefault();
		console.log("added department");
		var doc = {
			name: ReactDOM.findDOMNode(this.refs.deptName).value.trim()
		}
		var department = new Models.Department(doc);
		var status = department.save();
		if(status.passes) { e.target.reset(); this.setErrorText(""); }
		else{ this.setErrorText(status.error); }
	},
	setErrorText(text) {
		var error = ReactDOM.findDOMNode(this.refs.errorText);
			error.innerHTML = text;
	},
	render() {
		return (
			<div>
				<form className="add-department-form" onSubmit={this.addDepartment} >
					<h3>Add Department</h3>
					<input
						type="text"
						ref="deptName"
						placeholder="Department Name" />
					<input
						type="submit"
						value="Add Department" />
					<div ref="errorText" className="bg-danger"></div>
				</form>
			</div>
		)
	}
});