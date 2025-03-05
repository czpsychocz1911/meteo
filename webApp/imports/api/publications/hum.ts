import { Meteor } from "meteor/meteor";
import { RelHumidityModelCollection } from "../links";

Meteor.publish("humAll", () => {
    return RelHumidityModelCollection.find()
})