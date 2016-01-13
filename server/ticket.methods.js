Meteor.methods({
    'saveTicket': function(doc){
   		var ticket = Collections.Tickets.upsert({ _id: doc._id }, doc);
   		console.log(ticket);
   		return ticket.insertedId || doc._id;
    }
});