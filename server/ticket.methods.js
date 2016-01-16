Meteor.methods({
    'saveTicket': function(doc){
    	doc.createdBy = Meteor.userId();
   		var ticket = Collections.Tickets.upsert({ _id: doc._id }, doc);
   		console.log(ticket);
   		return ticket.insertedId || doc._id;
    }
});