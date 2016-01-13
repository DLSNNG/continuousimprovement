AddDepartmentsPage = React.createClass({
	render() {
		return (
			<div className="container">
				<AddDepartmentForm />
				<CollectionList
					collection="Departments"
					display="name" />
			</div>
		)
	}
});