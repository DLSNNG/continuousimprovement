AddDepartmentsPage = React.createClass({
	render() {
		if(!Meteor.user()) {
			FlowRouter.go('/');
		}
		return (
			<div className="container">
				<AddDepartmentForm />
				<CollectionList
					collection="Departments"
					display="name" 
					baseURL="/departments/" />
			</div>
		)
	}
});