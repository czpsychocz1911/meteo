import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Index } from '/imports/ui/Index';
import { ProtectedRoute } from '../imports/ui/ProtectedRoute';
import { MainPage } from '/imports/ui/MainPage';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { DarkModeToggle } from '/imports/ui/DarkModeToggle';
import { GraphPage } from '/imports/ui/GraphPage';
import { HumidityContentPaper } from '/imports/ui/ContentPage/HumidityContentPaper';
import { TableContentTempPaper } from '/imports/ui/ContentPage/TableContentTempPaper';
import { TableSoilContentPaper } from '/imports/ui/ContentPage/TableSoilContentPaper';

const getDefaultTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const App = () => {
  const [themeMode, setThemeMode] = useState(getDefaultTheme());

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: (themeMode ?? "light") as "light" | "dark", 
        },
      }),
    [themeMode]
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/main",
      element: (
        <ProtectedRoute>
          <MainPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/main/graphs",
      element: (
        <ProtectedRoute>
          <GraphPage/>
        </ProtectedRoute>
      )
    },
    {
      path: "/main/graphs/humidity",
      element: (
        <ProtectedRoute>
          <HumidityContentPaper/>
        </ProtectedRoute>
      )
    },
    {
      path: "main/graphs/soil",
      element: (
        <ProtectedRoute>
          <HumidityContentPaper/>
        </ProtectedRoute>
      )
    },
    {
      path: "main/table",
      element: (
        <ProtectedRoute>
          <TableContentTempPaper/>
        </ProtectedRoute>
      )
    },
    {
      path: "main/table/humidity",
      element: (
        <p>Humidity</p>
      )
    },
    {
      path: "main/table/soil",
      element: (
          <ProtectedRoute>
            <TableSoilContentPaper/>
          </ProtectedRoute>
      )
    }
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
      <DarkModeToggle themeMode={themeMode} setThemeMode={setThemeMode}/>
    </ThemeProvider>
  );
};

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  if (!container) return;
  const root = createRoot(container);
  root.render(<App />);
});
