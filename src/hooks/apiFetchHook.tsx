import { useContext } from "react";
import {ApiFetchContext} from "../models/ApiFetchContext";

 const useApiFetch = () => {
    const context = useContext(ApiFetchContext);
    if (context === undefined) {
      throw new Error('useApiFetch must be used within an ApiFetchProvider');
    }
    return context;
  };

  export default useApiFetch;