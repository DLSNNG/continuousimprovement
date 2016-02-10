Meteor.publish('departments', function() {
	return Collections.Departments.find({});
});

Meteor.publish('categories', function() {
	return Collections.Categories.find({});
});

Meteor.publish('tickets', function() {
	return Collections.Tickets.find({});
});

Meteor.publish('ticketStatusOptions', function() {
	return Collections.TicketStatusOptions.find({});
});

Meteor.publish('users', function() {
	return Collections.Users.find({});
});