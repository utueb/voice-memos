const dbName = "audioDB";
const dbVersion = 1;
const storeName = "audioStore";

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, dbVersion);

    request.onerror = (event) => {
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const store = db.createObjectStore(storeName, {
        keyPath: "id",
        autoIncrement: true,
      });
    };
  });
};

function saveDb(audio) {
  return openDB().then((db) => {
    const transaction = db.transaction(["audioStore"], "readwrite");
    const store = transaction.objectStore("audioStore");
    const request = store.add(audio);

    request.onsuccess = () => {
      console.log("success");
    };

    request.onerror = (event) => {
      console.error(event.target.error);
    };
  });
}
function renderAudioDb(setList) {
  openDB().then((db) => {
    const objectStore = db.transaction("audioStore").objectStore("audioStore");
    objectStore.getAll().onsuccess = (event) => {
      setList(event.target.result);
    };
  });
}
function deleteAudioDb(id) {
  openDB().then((db) => {
    const transaction = db.transaction(["audioStore"], "readwrite");
    const store = transaction.objectStore("audioStore");

    const request = store.delete(id);

    request.onsuccess = () => {
      console.log(`Audio data with id ${id} deleted from IndexedDB`);
    };

    request.onerror = (event) => {
      console.error(
        `Error deleting audio data with id ${id} from IndexedDB`,
        event.target.error
      );
    };
  });
}
export { openDB, saveDb, renderAudioDb, deleteAudioDb };
