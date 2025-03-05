import { Meteor } from "meteor/meteor";
import { TempModelCollection } from "../links";

Meteor.publish("tempAll", () => {
    return TempModelCollection.find()
})