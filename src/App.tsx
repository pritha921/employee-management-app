import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import EmployeeForm from "./components/EmployeeForm";
import ApiFetchProvider from "./models/ApiFetchContext";
import { EmployeeProvider } from "./models/EmployeeContext";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools/>

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
    </QueryClientProvider>
  );
};

export default App;
