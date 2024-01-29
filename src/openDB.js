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

export { openDB };
