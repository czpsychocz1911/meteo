import { Navigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import React from "react";


export const ProtectedRoute: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const user = useTracker(() => Meteor.user());
    if (!user) {
        return <Navigate to="/" replace/>;
    }
    return children;
}