import React, { useState, ChangeEvent, useCallback, FormEvent } from 'react';
import axios from 'axios';

interface SearchProps {
  token: string;
  refreshToken: () => Promise<void>;
}

const Search = ({token, refreshToken}: SearchProps) => {
  const [query, setQuery] = useState<string>('');

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;

    setQuery(value);
  }, [setQuery]);

  const onSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    try {
      const {data} = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log(data);
    } catch (err) {
      await refreshToken();

      return;
    }
  }, [query, token]);

  return (
    <form onSubmit={onSubmit}>
      <input onChange={onChange} value={query} />
    </form>
  );
}

export {Search};