Models = {
	Department: department,
	Category: category,
	Ticket: ticket,
	User: user
}

function department(doc) {
	
	var department = {
		name: doc.name,
		members: doc.members || [],
		subscriptions: doc.subscriptions || [],
		save: function() {
			var validation = this.validation();
			if (validation.passes) {
				Meteor.call('saveDepartment', this, function(error, result){ 
					this._id = result;
					console.log(Collections.Departments.findOne(this._id));
				}); 
			}
			else {
				console.log(validation.error)
			}
			return validation; 
		},
		validation: function() {
			var validator = new Validator();
				validator.checkString(this.name, "Please enter a valid value for the department.");
			return validator.status;
		}
	}

	if(doc._id) { department._id = doc._id; }
	return department;
}

function category(doc) {

	var category = {
		name: doc.name,
		description: doc.description,
		departmentIds: doc.departmentIds || [],
		createdDate: doc.createdDate || new Date(),
		createdBy: doc.createdBy || Meteor.userId,
		save: function() {
			var validation = this.validation();
			if(validation.passes) {
				Meteor.call('saveCategory', this, function(error, result) {
					this._id = result;
					console.log(Collections.Categories.findOne(this._id));
				})
			}
			else {
				console.log(validation.error);
			}
			return validation;
		},
		validation: function() {
			var validator = new Validator();
				validator.checkString(this.name, "Please enter a valid name.");
				validator.checkString(this.description, "Please enter a valid description");
				validator.checkDate(this.createdDate, "Invalid date provided");
			return validator.status;
		}
	}

	if(doc._id) { category._id = doc._id; }
	return category;
}

function ticket(doc) {

	var ticket = {
		title: doc.title,
		description: doc.description,
		createdDate: doc.createdDate || new Date(),
		createdBy: doc.createdBy || Meteor.userId,
		categoryIds: doc.categoryIds || [], 
		assignedToIds: doc.assignedToIds || [],
		save: function() {
			var validation = this.validation();
			if(validation.passes) {
				Meteor.call('saveTicket', this, function(error, result) {
					this._id = result;
					console.log(Collections.Tickets.findOne(this._id));
				});
			}
			else {
				console.log(validation.error);
			}
			return validation;
		},
		remove: function() {
			var status = new Models.Status();
			Meteor.call('removeTicket', this, function(error, result) {
				if(error) {
					status.passes = false;
					status.error = "There was an issue deleting this ticket.";
					throw new Meteor.Error(403, error.reason);
				}
				else {
					console.log(result);
				}
			});
			return status;
		},
		validation: function() {
			var validator = new Validator();
				validator.checkString(this.title, "Please enter a valid title.");
				validator.checkString(this.description, "Please enter a valid description");
				validator.checkDate(this.createdDate, "Invalid date provided");
			return validator.status;
		}
	}

	if(doc._id) { ticket._id = doc._id; }
	return ticket;
}

function user(doc) {

	var user = {
		username: doc.username.trim(),
		email: doc.email.trim(),
		password: doc.password.trim(),
		save: function() {
			var validation = this.validation();
			if(validation.passes) {
				Meteor.call('saveUser', this, function(error, result) {
					this._id = result;
				});
			}
			else {
				console.log(validation.error);
			}
			return validation;
		},
		validation: function() {
			var validator = new Validator();
				validator.checkString(this.username, "Please enter a valid username.");
				validator.checkString(this.email, "Please enter a valid email");
				validator.checkString(this.password, "Please enter a valid password");
			return validator.status;
		}
	}

	if(doc._id) { user._id = doc._id; }
	return user;
}