import React, { useState } from 'react';
import {
  useDeleteAlbumMutation,
  useGetAlbumsQuery,
} from '../app/services/jsonServerApi';

export default function Albums(props) {
  const { setSelectedAlbum } = props;

  const [page, setPage] = useState(1);
  const {
    data: albums = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetAlbumsQuery(page, {
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  const [deleteAlbum] = useDeleteAlbumMutation();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isFetching) {
    return <div>fetching...</div>;
  }

  if (isError) {
    console.log({ error });
    return <div>{error.status}</div>;
  }

  return (
    <div>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            {album.id} - {album.title}{" "}
            <button onClick={() => setSelectedAlbum(album)}>edit</button>{" "}
            <button onClick={() => deleteAlbum(album.id)}>delete</button>
          </li>
        ))}
      </ul>
      <button disabled={page <= 1} onClick={() => setPage((prev) => prev - 1)}>
        Prev
      </button>
      <button
        disabled={albums.length < 10}
        onClick={() => setPage((prev) => prev + 1)}
      >
        Next
      </button>
      <button onClick={() => refetch()}>Refetch</button>
    </div>
  );
}
