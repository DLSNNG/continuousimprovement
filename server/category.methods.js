Meteor.methods({
    'saveCategory': function(doc){
   		var cat = Collections.Categories.upsert({ _id: doc._id }, doc);
   		console.log(cat);
   		return cat.insertedId || doc._id;
    }
});