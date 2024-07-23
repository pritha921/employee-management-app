import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import EmployeeForm from "./components/EmployeeForm";
import ApiFetchProvider from "./models/ApiFetchContext";
import { EmployeeProvider } from "./models/EmployeeContext";

const App = () => {
  return (
    <ApiFetchProvider>
      <EmployeeProvider>
        <div>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add" element={<EmployeeForm mode="add" />} />
              <Route path="/edit/:id" element={<EmployeeForm mode="edit" />} />
            </Routes>
          </Router>
        </div>
      </EmployeeProvider>
    </ApiFetchProvider>
  );
};

export default App;
