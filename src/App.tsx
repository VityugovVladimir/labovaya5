import React, { useEffect, useState } from 'react';
import api, { RESPONSE_DATA } from './api';

const App: React.FC = () => {
  const [data, setData] = useState<RESPONSE_DATA | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await api.get.data();
        setData(responseData);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{data?.greeting}</h1>
    </div>
  );
}

export default App;
