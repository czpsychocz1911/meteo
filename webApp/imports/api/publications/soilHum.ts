import { Meteor } from "meteor/meteor";
import { SoilModelCollection } from "../links";

Meteor.publish("soilAll", () => {
    return SoilModelCollection.find()
})