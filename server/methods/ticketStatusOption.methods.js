Meteor.methods({
    'saveTicketStatusOption': function(doc){
      var stat = Collections.TicketStatusOptions.upsert({ _id: doc._id }, doc);
      return stat.insertedId || doc._id;
    },
    'removeTicketStatusOption': function(doc) {
    	var numDeleted = Collections.TicketStatusOptions.remove({ _id: doc._id });
    	return numDeleted;
    }
});