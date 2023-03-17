import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import  TeachersPage  from './TeachersPage';
import  StudentsPage  from './StudentsPage';
import  Home from './Home';
import Error from './Error';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/teachersPage/:id" element={<TeachersPage />} />
        <Route path="/studentsPage/:id" element={<StudentsPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
      
  );
}

export default App;
