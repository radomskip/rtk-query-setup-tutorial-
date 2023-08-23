import Albums from './components/Albums';
import NewAlbumForm from './components/NewAlbumForm';

import styles from './App.module.css';
import UpdateAlbumForm from './components/UpdateAlbumForm';
import { useState, useCallback } from "react";

function App() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const [show, setShow] = useState(true);

  const handleUpdate = useCallback(() => setSelectedAlbum(null), []);

  if (!show) {
    return <button onClick={() => setShow(true)}>On</button>;
  }

  return (
    <div className={styles.wrapper}>
      <Albums setSelectedAlbum={setSelectedAlbum} />
      <NewAlbumForm />
      <UpdateAlbumForm selectedAlbum={selectedAlbum} onUpdate={handleUpdate} />
      <button onClick={() => setShow(false)}>off</button>
    </div>
  );
}

export default App;
