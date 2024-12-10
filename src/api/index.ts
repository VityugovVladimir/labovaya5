import getEndpoints from '../server/db';  
const endpoints = getEndpoints();


type ENDPOINTS = keyof typeof endpoints;
type RESPONSE_DATA = {
  greeting: string;
};


const getJson = async <T>(endpoint: ENDPOINTS): Promise<T> => {
  const path =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:3001/${endpoint}` 
    : `https://raw.githubusercontent.com/VityugovVladimir/labovaya5/master/src/server/db/${endpoint}.json`; 

  const response = await fetch(path);
  return await response.json();
};


type API = {
  get: {
    data: () => Promise<RESPONSE_DATA>; 
  };
};


const api: API = {
  get: {
    data: () => getJson<RESPONSE_DATA>("data"), 
  },
};


export type { RESPONSE_DATA, ENDPOINTS };
export default api;
