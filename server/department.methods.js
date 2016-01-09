Meteor.methods({
    'saveDepartment': function(doc){
      var dept = Collections.Departments.upsert({ _id: doc._id }, doc);
      return dept.insertedId || doc._id;
    }
});