import React from 'react';
import './App.css';
import UsersDataTable from './containers/users-data/users-data';
import Navbar from './components/Navbar/Navbar';
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <UsersDataTable></UsersDataTable>
    </div>
  );
}

export default App;
