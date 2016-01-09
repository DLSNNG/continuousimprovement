Models = {
	Department: department,
	Category: category
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

	return department;
}

function category(doc) {

	var category = {
		name: doc.name,
		description: doc.description,
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

	return category;
}