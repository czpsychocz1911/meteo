import { Meteor } from 'meteor/meteor';
import "../imports/api/methods"
import "../imports/api/publications"
import { Accounts } from 'meteor/accounts-base';
import { Redis } from './redis';

Meteor.startup(async () => {
    const admin = await Meteor.users.findOneAsync(({username: "admin"}))

    if(!admin){
        await Accounts.createUserAsync({username: "admin",password: "admin"})
    }

    await Redis.initialize()
});
