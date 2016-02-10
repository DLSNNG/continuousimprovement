if ( Meteor.users.find().count() === 0 ) {
    Accounts.createUser({
        username: 'admin',
        email: 'nng@dlslab.com',
        password: 'admin1234'
    });
}