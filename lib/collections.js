Collections = {
	Departments: new Mongo.Collection("Departments"),
	Categories: new Mongo.Collection("Categories"),
	Tickets: new Mongo.Collection("Tickets"),
	TicketStatusOptions: new Mongo.Collection("TicketStatusOptions"),
	Notifications: new Mongo.Collection(null),
	Users: Meteor.users
};