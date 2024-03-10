import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = request => {
    const [response, setResponse] = useState([]);
  
    useEffect(() => {
      const getData = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/${request}`
        );
  
        setResponse(res.data);
      };
  
      getData();
    }, [request]);
  
    return response;
  };
  
  export default useFetch;