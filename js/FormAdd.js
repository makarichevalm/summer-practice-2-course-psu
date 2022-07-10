let fl = false; //флаг для отслеживания добавления записи
document.querySelector('#closeAdd').onclick = function () {
    document.getElementById('titleText').value = '';
    document.getElementById('placeText').value = '';
    document.getElementById('timeText').value = '';
    document.getElementById('peopleText').value = '';
    document.getElementById('infoText').value = '';
    document.getElementById('formAdd').style.display = 'none';
};
function Add() {
    let titleT = document.getElementById('titleText').value;
    if (titleT == '') {
        document.getElementById('errorTitle').style.display = 'block';
        return;
    } else document.getElementById('errorTitle').style.display = 'none';
    let placeT =
        document.getElementById('placeText').value == ''
            ? ''
            : document.getElementById('placeText').value;
    let timeT =
        document.getElementById('timeText').value == ''
            ? ''
            : document.getElementById('timeText').value;
    let peopleT =
        document.getElementById('peopleText').value == ''
            ? ''
            : document.getElementById('peopleText').value;
    let infoT =
        document.getElementById('infoText').value == ''
            ? ''
            : document.getElementById('infoText').value;
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
        CreateNoteHtml(note);
        document.getElementById('formAdd').style.display = 'none';
    };
    transact.onerror = (event) => {
        if (
            !confirm(
                `Событие ${note.title} уже есть` +
                    'error storing note ' +
                    event.target.errorCode
            )
        ) {
            document.getElementById('formAdd').style.display = 'none';
        }
    };
    console.log(note);
    if (!fl) document.getElementById('text').style.display = 'none';
    document.getElementById('titleText').value = '';
    document.getElementById('placeText').value = '';
    document.getElementById('timeText').value = '';
    document.getElementById('peopleText').value = '';
    document.getElementById('infoText').value = '';
}
function CreateNoteHtml(part) {
    let parent = document.querySelector('#dinamicNotes');
    let div = document.createElement('div');
    div.className = 'note';
    div.id = 'note_' + part.title;
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
    parent.appendChild(div);
    AddOnClickEvents();
}
