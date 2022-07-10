document.querySelector('#closeShow').onclick = function () {
    document.getElementById('formShow').style.display = 'none';
    document.querySelector('#dinamicNotes').innerHTML = '';
    document.getElementById('text').style.display = '';
};

document.querySelector('#addBut').onclick = function () {
    document.getElementById('formAdd').style.display = 'block';
    document.getElementById('formAdd').style.zIndex = '2';
    document.getElementById('formShow').style.zIndex = '1';

    console.log('add');
};
function EditNote(title) {
    document.getElementById('formChange').style.display = 'block';
    console.log(title);
    let tr = db.transaction('notes', 'readwrite');
    let store = tr.objectStore('notes');
    let request = store.openCursor(title);
    request.onsuccess = function () {
        let cursor = request.result;
        if (cursor) {
            let key = cursor.key;
            let val = cursor.value;
            console.log(key, val);
            document.getElementById('titleTextC').value = val.title;
            document.getElementById('placeTextC').value = val.place;
            document.getElementById('timeTextC').value = val.time;
            document.getElementById('peopleTextC').value = val.people;
            document.getElementById('infoTextC').value = val.info;
            document.getElementById('formChange').name = val.title;
            console.log(document.getElementById('formChange').name);
        }
        console.log('Получено ' + request.result);
    };
}
function DeleteNote(title) {
    console.log(title);
    console.log('find delete');
    let tr = db.transaction('notes', 'readwrite');
    let store = tr.objectStore('notes');
    let request = store.delete(title);
    request.onsuccess = function () {
        console.log('Удалено ' + request.result);
    };
    document.getElementById(`note_${title}`).remove();
}

function GetNote(key) {
    //key - день
    console.log('shhhoooooow' + ' ' + typeof key);
    let tr = db.transaction('notes', 'readwrite');
    let store = tr.objectStore('notes');
    let dayInd = store.index('day_idx');
    let find = dayInd.getAll(key);
    find.onsuccess = function () {
        if (find.result.length !== 0) {
            console.log('Notes ', find.result);
            document.getElementById('text').style.display = 'none';
            for (let i = 0; i < find.result.length; i++) {
                CreateNoteHtml(find.result[i]);
            }
        } else {
            console.log('No notes');
        }
    };
    tr.oncomplete = function () {
        console.log('Transaction is complete');
    };
}

function AddOnClickEvents() {
    var deletes = document.getElementsByClassName('imgDelete');
    console.log(deletes);
    for (let del of deletes) {
        del.onclick = function () {
            DeleteNote(del.alt);
        };
    }
    var edits = document.getElementsByClassName('imgEdit');
    console.log(edits);
    for (let ed of edits) {
        ed.onclick = function () {
            EditNote(ed.alt);
        };
    }
}
