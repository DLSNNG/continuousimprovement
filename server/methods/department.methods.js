Meteor.methods({
    'saveDepartment': function(doc){
      var dept = Collections.Departments.upsert({ _id: doc._id }, doc);
      return dept.insertedId || doc._id;
    },
    'removeDepartment': function(doc) {
    	var numDeleted = Collections.Departments.remove({ _id: doc._id });
    	return numDeleted;
    }
});