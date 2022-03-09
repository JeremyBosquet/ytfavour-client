import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
// import HomePage from './pages/HomePage/HomePage'
import VideoPage from './pages/VideoPage/VideoPage'
import VideosPage from './pages/VideosPage/VideosPage'
import UserPage from './pages/UserPage/UserPage'
import LoginPage from './pages/LoginPage/LoginPage';
import AccountPage from './pages/AccountPage/AccountPage';
import AdminPage from './pages/AccountPage/AdminPage';
import './pages/HomePage/HomePage.scoped.css'


function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<VideosPage dataTheme={theme} switchTheme={switchTheme}/>} />
      <Route path="/video/:id" exact element={<VideoPage dataTheme={theme} switchTheme={switchTheme}/>} />
      <Route path="/videos" exact element={<VideosPage dataTheme={theme} switchTheme={switchTheme} />} />
      <Route path="/user/:id" exact element={<UserPage dataTheme={theme} switchTheme={switchTheme}/>} />
      <Route path="/login" exact element={<LoginPage dataTheme={theme} switchTheme={switchTheme}/>} />
      <Route path="/account" exact element={<AccountPage dataTheme={theme} switchTheme={switchTheme}/>} />
      <Route path="/account/admin" exact element={<AdminPage dataTheme={theme} switchTheme={switchTheme}/>} />
      <Route path="*" element={<Navigate to="/" dataTheme={theme} switchTheme={switchTheme}/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
