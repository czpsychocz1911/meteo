import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Index } from '/imports/ui/Index';
import { ProtectedRoute } from '/imports/ui/ProtectedRoute';

Meteor.startup(() => {
  const router = createBrowserRouter([{
    path: "/",
    element: <Index/>,
  },{
    path: "/main",
    element: (
      <ProtectedRoute>
        <p>ASDF</p>
      </ProtectedRoute>
    ),
  }])
  const container = document.getElementById('react-target');
  const root = createRoot(container!);
  root.render(
    <RouterProvider router={router}/>
  );
});
