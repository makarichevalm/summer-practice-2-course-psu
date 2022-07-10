let db;
let index; //индекс для поиска по дате
let notes;
let note;
let dbReq = indexedDB.open('myNotes', 1); //название бд и версия
//срабатывает, если нет базы данных, инициализация
dbReq.onupgradeneeded = (event) => {
    // Зададим переменной db ссылку на базу данных
    db = event.target.result;
    // Создадим хранилище объектов с именем notes.
    notes = db.createObjectStore('notes', { keyPath: 'title' });
    index = notes.createIndex('day_idx', 'day');
};

dbReq.onsuccess = (event) => {
    db = event.target.result;
};
dbReq.onerror = (event) => {
    alert('error opening database ' + event.target.errorCode);
    //indexedDB.deleteDatabase('myNotes');
};
