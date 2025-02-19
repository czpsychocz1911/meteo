import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Index } from '/imports/ui/Index';

Meteor.startup(() => {
  const router = createBrowserRouter([{
    path: "/",
    element: <Index/>
  }])
  const container = document.getElementById('react-target');
  const root = createRoot(container!);
  root.render(
    <RouterProvider router={router}/>
  );
});
