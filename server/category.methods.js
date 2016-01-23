Meteor.methods({
    'saveCategory': function(doc){
   		var cat = Collections.Categories.upsert({ _id: doc._id }, doc);
   		console.log(cat);
   		return cat.insertedId || doc._id;
    },
    'removeCategory': function(doc) {
    	var numDeleted = Collections.Categories.remove({ _id: doc._id });
    	return numDeleted;
    }
});