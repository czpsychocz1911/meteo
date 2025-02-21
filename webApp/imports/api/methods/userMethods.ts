import { Meteor } from "meteor/meteor";
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    async "update.username"(id,username){
        check(id,String)
        check(username,String)

        const user = await Meteor.userAsync()

        if(!user) throw new Meteor.Error("404","You are not logged in")

        if(id !== user._id) throw new Meteor.Error("404","You are not logged in")

        const usernameExists = await Meteor.users.findOneAsync({username: username})

        if(usernameExists){
            throw new Meteor.Error("404","This username exits")
        }

        await Meteor.users.upsertAsync({ _id: user._id }, { $set: { username: username } })

        return true
    },

    async "update.password"(oldPW,newPW,user: Meteor.User){
        check(oldPW,String)
        check(newPW,String)
        check(user, Object)

        const match = Accounts._checkPassword(user,oldPW)

        if(!match.error){
            await Accounts.setPasswordAsync(user._id,newPW)
            return true
        }

        throw new Meteor.Error("404", "Wrong password")
    }
})