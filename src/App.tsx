import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import EmployeeForm from "./components/EmployeeForm";
import  ApiFetchProvider  from './models/ApiFetchContext';

const App = () => {
  return (
    
    
    <Router>
      <ApiFetchProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<EmployeeForm mode="add" />} />
          <Route path="/edit/:id" element={<EmployeeForm mode="edit" />} />
        </Routes>
      </div>
      </ApiFetchProvider>
    </Router>
   
  );
};

export default App;
