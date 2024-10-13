import { useEffect, useState } from 'react';


function useFetchData( url ) {

  console.log('URL: ', url);

  const [error, setError] = useState();
  const [isFetching, setIsfetching] = useState();
  const [fetchedData, setFetchedData] = useState([]);

  // useEffect((async function() {
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   await setFetchedData(data);
  //   console.log('DATA: ', data);
  // })(), []);

  useEffect(() => {
    async function fetchData(params) {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setFetchedData(data);
      } catch(err) {
        setFetchedData([]);
      }
    }
    fetchData();
  }, [url]);

  return {
    fetchedData
  }

}

export default useFetchData;