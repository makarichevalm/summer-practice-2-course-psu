document.querySelector('#closeChange').onclick = function () {
    document.getElementById('titleTextC').value = '';
    document.getElementById('placeTextC').value = '';
    document.getElementById('timeTextC').value = '';
    document.getElementById('peopleTextC').value = '';
    document.getElementById('infoTextC').value = '';
    document.getElementById('formChange').style.display = 'none';
};
function Change() {
    let titleT = document.getElementById('titleTextC').value;
    if (titleT == '') {
        document.getElementById('errorTitleC').style.display = 'block';
        return;
    } else document.getElementById('errorTitleC').style.display = 'none';
    let placeT =
        document.getElementById('placeTextC').value == ''
            ? ''
            : document.getElementById('placeTextC').value;
    let timeT =
        document.getElementById('timeTextC').value == ''
            ? ''
            : document.getElementById('timeTextC').value;
    let peopleT =
        document.getElementById('peopleTextC').value == ''
            ? ''
            : document.getElementById('peopleTextC').value;
    let infoT =
        document.getElementById('infoTextC').value == ''
            ? ''
            : document.getElementById('infoTextC').value;
    let transact = db.transaction('notes', 'readwrite');
    let store = transact.objectStore('notes');
    note = {
        day: dateDay,
        year: dateYear,
        title: titleT,
        place: placeT,
        time: timeT,
        people: peopleT,
        info: infoT,
    };
    console.log(note);
    store.add(note);
    transact.oncomplete = () => {
        console.log('stored note!');
        RewriteNoteHtml(note);
        console.log(document.getElementById('formChange').name);
        Delete(document.getElementById('formChange').name);
        document.getElementById('formChange').style.display = 'none';
    };
    transact.onerror = (event) => {
        if (!confirm(`Событие ${note.title} уже есть `)) {
            document.getElementById('formChange').style.display = 'none';
        }
    };
    console.log(note);
    if (!fl) document.getElementById('text').style.display = 'none';
}
function RewriteNoteHtml(part) {
    lastTitle = document.getElementById('formChange').name;
    let parent = document.querySelector('#dinamicNotes');
    let div = document.getElementById(
        `note_${document.getElementById('formChange').name}`
    );
    console.log(`note_${document.getElementById('formChange').name}`);
    div.innerHTML = '';
    let partIcons =
        '<div class="Icons">' +
        '<div class="EditBut">' +
        `<img src="icons/edit.ico"  class="imgEdit" alt="${part.title}" id="EditBut"  height="40px" width="40px">` +
        '</div>' +
        '<div class="DeleteBut" >' +
        `<img src="icons/delete.ico" class="imgDelete" alt="${part.title}" id="DeleteBut" height="29px" width="29px">` +
        '</div>' +
        '</div>';
    let partInfo =
        '<div class="Info" id="Info">' +
        '<div class="InnerShow" id="TitleShow">' +
        `<div class="Pole">Название:</div><div class="Res" id="${part.title}">${part.title}</div>` +
        '</div>' +
        '<div class="InnerShow" id="PlaceShow">' +
        `<div class="Pole">Место:</div><div class="Res">${part.place}</div>` +
        '</div>' +
        '<div class="InnerShow" id="TimeShow">' +
        `<div class="Pole">Время:</div><div class="Res">${part.time}</div>` +
        '</div>' +
        '<div class="InnerShow" id="PeopleShow">' +
        `<div class="Pole">Участники:</div><div class="Res">${part.people}</div>` +
        '</div>' +
        '<div class="InnerShow" id="InfoShow">' +
        `<div class="Pole">Дополнительная информация:</div><div class="Res">${part.info}</div>` +
        '</div>' +
        '</div>';
    div.innerHTML = partInfo + partIcons;
    div.id = 'note_' + part.title;
    AddOnClickEvents();
}
function Delete(title) {
    console.log(title);
    console.log('find delete');
    let tr = db.transaction('notes', 'readwrite');
    let store = tr.objectStore('notes');
    let request = store.delete(title);
    request.onsuccess = function () {
        console.log('Удалено ' + request.result);
    };
}
