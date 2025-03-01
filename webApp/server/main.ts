import { Meteor } from 'meteor/meteor';
import "../imports/api/methods"
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(async () => {
    const admin = await Meteor.users.findOneAsync(({username: "admin"}))

    if(!admin){
        await Accounts.createUserAsync({username: "admin",password: "admin"})
    }
});
