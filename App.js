
import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router';
import ContactList from './Components/Contacts/ContactList/ContactList';
import AddContact from './Components/Contacts/AddContact/AddContact';
import EditContact from './Components/Contacts/EditContact/EditContact';
import ViewContact from './Components/Contacts/ViewContact/ViewContact';
import NavBar from './Components/NavCompo/NavBar'
// import Spinner from './Components/Spinner/Spinner';

function App() {
  return (
   <div className="app">
    {/* <Spinner/> */}
    <NavBar/>
      <React.Fragment>
          <Routes>
              <Route path='/' element={<Navigate to={'contact/list'}/>}/>
              <Route path='/contact/list' element={<ContactList/>}/>
              <Route path='/Contact/Add' element={<AddContact/>}/>
              <Route path='/Contact/Edit/:contactID' element={<EditContact/>}/>
              <Route path='/Contact/View/:contactID' element={<ViewContact/>}/>
          </Routes>
      </React.Fragment>
      
   </div>
  );
}

export default App;
