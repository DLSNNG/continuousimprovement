Meteor.methods({
    'saveUser': function(doc){
    	if (!doc._id) {
    		var user = Accounts.createUser(doc);
    		return user;
    	}
   		var user = Collections.Users.upsert({ _id: doc._id }, doc);
   		console.log(user);
   		return user.insertedId || doc._id;
    }
});