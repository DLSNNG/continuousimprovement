AddUsersPage = React.createClass({
	render() {
		return (
			<div className="container">
				<AddUserForm />
				<CollectionList 
					collection="Users"
					display="username" />
			</div>
		)
	}
});