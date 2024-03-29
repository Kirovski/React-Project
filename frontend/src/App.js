import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Outlet, useNavigate, Navigate } from 'react-router-dom';

import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';
import './App.css';

class App extends Component {
  state = {
    token: null,
    userId: null,
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
    // Use the navigate function to redirect after logging in
    const navigate = useNavigate();
    navigate('/events'); // Redirect to the events page after login
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout,
            }}
          >
            <MainNavigation/>
            <main className="main-content">
              <Routes>
                {/* Redirect to events if authenticated */}
                {this.state.token && <Route path="/" element={<Outlet />} />}
                {/* Redirect to auth if not authenticated */}
                {!this.state.token && (
                  <Route path="/" element={<AuthPage />} />
                )}
                <Route path="/events" element={<EventsPage />} />
                {this.state.token && (
                  <Route path="/bookings" element={<BookingsPage />} />
                )}
              </Routes>
            </main> 
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
