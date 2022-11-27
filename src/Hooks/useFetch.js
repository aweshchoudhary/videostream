import { useEffect, useState } from "react";
import useAxios from "./useAxiosPrivate";
import axios from "../api/axios";

const useFetch = (url, query, isPrivate) => {
  const [data, setData] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const axiosPrivate = useAxios();

  const source = isPrivate
    ? axiosPrivate.CancelToken.source()
    : axios.CancelToken.source();

  const fetch = async (q) => {
    if (isPrivate) {
      await axiosPrivate
        .get(url, {
          cancelToken: source.token,
          params: { query: q ? q : "" }
        })
        .then((res) => {
          if (res.data.length) {
            setLoading(false);
            setData(res.data);
            setPage(page + 1);
          } else {
            setHasMore(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          setError(err.response.data);
          console.log(err);
        });
    } else {
      await axios
        .get(url, { cancelToken: source.token })
        .then((res) => {
          if (res.data.length) {
            setLoading(false);
            setData(res.data);
          } else {
            setHasMore(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          setError(err.response.data);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);
    fetch(query);
    return () => {
      source.cancel();
    };
  }, [url]);

  return { data, loading, error, fetch, hasMore, page };
};

export default useFetch;
