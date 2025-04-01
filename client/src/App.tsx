// client/src/App.tsx
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';

const Layout: React.FC = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route index element={<SearchBooks />} />
        <Route path="saved" element={<SavedBooks />} />
      </Route>
    </Routes>
  );
};

export default App;
