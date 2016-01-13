AddUserForm = React.createClass({
	addUser(e) {
		e.preventDefault();
		console.log("added user");
		var doc = {
			username: ReactDOM.findDOMNode(this.refs.username).value.trim(),
			email: ReactDOM.findDOMNode(this.refs.email).value.trim(),
			password: ReactDOM.findDOMNode(this.refs.password).value.trim()
		}
		var user = new Models.User(doc);
		var status = user.save();
		if(status.passes) { e.target.reset(); this.setErrorText(""); console.log(Collections.Users.find({}).fetch() )}
		else{ this.setErrorText(status.error); }
	},
	setErrorText(text) {
		var error = ReactDOM.findDOMNode(this.refs.errorText);
			error.innerHTML = text;
	},
	render() {
		return (
			<div>
				<form className="add-user-form" onSubmit={this.addUser} >
					<h3>Add User</h3>
					<input
						type="text"
						ref="username"
						placeholder="Username" />
					<input
						type="email"
						ref="email"
						placeholder="Email" />
					<input
						type="password"
						ref="password"
						placeholder="Password" />
					<div ref="errorText" className="bg-danger"></div>

					<input
						type="submit"
						value="Add User" />
					
				</form>
			</div>
		)
	}
});