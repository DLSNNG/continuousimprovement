Meteor.methods({
    'saveTicket': function(doc){
   		var ticket = Collections.Tickets.upsert({ _id: doc._id }, doc);
   		console.log(ticket);
   		return ticket.insertedId || doc._id;
    },
    'removeTicket': function(doc) {
    	var numDeleted = Collections.Tickets.remove({ _id: doc._id });
    	return numDeleted;
    }
});