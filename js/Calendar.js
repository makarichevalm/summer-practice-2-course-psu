var dateDay; // дата-подпись календаря
var dateYear; // год-подпись календаря
function Calendar(id, year, month) {
    var Dlast = new Date(year, month + 1, 0).getDate(),
        D = new Date(year, month, Dlast),
        DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay(),
        DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(),
        calendar = '<tr>',
        month = {
            1: 'Январь',
            2: 'Февраль',
            3: 'Март',
            4: 'Апрель',
            5: 'Май',
            6: 'Июнь',
            7: 'Июль',
            8: 'Август',
            9: 'Сентябрь',
            10: 'Октябрь',
            11: 'Ноябрь',
            12: 'Декабрь',
        };
    if (DNfirst != 0) {
        for (var i = 1; i < DNfirst; i++) calendar += '<td>';
    } else {
        for (var i = 0; i < 6; i++) calendar += '<td>';
    }
    for (var i = 1; i <= Dlast; i++) {
        if (
            i == new Date().getDate() &&
            D.getFullYear() == new Date().getFullYear() &&
            D.getMonth() == new Date().getMonth()
        ) {
            calendar += '<td class="today">' + i;
        } else {
            calendar += '<td>' + i;
        }
        if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
            calendar += '<tr>';
        }
    }
    for (var i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
    document.querySelector('#' + id + ' tbody').innerHTML = calendar;
    document.querySelector('#' + id + ' thead td:nth-child(2)').innerHTML =
        month[D.getMonth() + 1];
    document.querySelector('#' + id + ' thead td:nth-child(3)').innerHTML =
        D.getFullYear();
    document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.month =
        D.getMonth();
    document.querySelector('#' + id + ' thead td:nth-child(3)').dataset.year =
        D.getFullYear();
    if (document.querySelectorAll('#' + id + ' tbody tr').length < 6) {
        // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
        document.querySelector('#' + id + ' tbody').innerHTML +=
            '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
    }
    var cells = document.querySelectorAll('#' + id + ' tbody td');
    var m = document.querySelector('#' + id + ' thead td:nth-child(2)');
    var y = document.querySelector('#' + id + ' thead td:nth-child(3)');
    for (var i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', function () {
            if (this.innerHTML != '' && this.innerHTML != '&nbsp;') {
                console.log(this.innerHTML + ' ' + m.innerHTML);
                dateDay =
                    this.innerHTML + ' ' + getKeyByValue(month, m.innerHTML);
                dateYear = y.innerHTML;
                console.log(dateDay);
                document.getElementById('formShow').style.display = 'block';
                document.getElementById('DateNow').innerHTML =
                    this.innerHTML +
                    '.' +
                    getKeyByValue(month, m.innerHTML) +
                    '.' +
                    dateYear;
                GetNote(dateDay);
            }
        });
        if (cells[i].innerHTML != '' && cells[i].innerHTML != '&nbsp;') {
            /*let res = ShowInHtml(
                cells[i].innerHTML + ' ' + getKeyByValue(month, m.innerHTML)
            );
            console.log(res);
            if (res === 1) {
                cells[i].style.border = '2px solid #449576;';
            } else {
                cells[i].style.border = '';
            }
            //dataForBase.push(
            //cells[i].innerHTML + ' ' + getKeyByValue(month, m.innerHTML)
            //);*/
        }
    }
    //console.log(dataForBase);
    //ShowInHtml(dataForBase);
}
Calendar('calendar2', new Date().getFullYear(), new Date().getMonth());
// переключатель минус месяц
document.querySelector(
    '#calendar2 thead tr:nth-child(1) td:nth-child(1)'
).onclick = function () {
    Calendar(
        'calendar2',
        document.querySelector('#calendar2 thead td:nth-child(3)').dataset.year,
        parseFloat(
            document.querySelector('#calendar2 thead td:nth-child(2)').dataset
                .month
        ) - 1
    );
};
// переключатель плюс месяц
document.querySelector(
    '#calendar2 thead tr:nth-child(1) td:nth-child(4)'
).onclick = function () {
    Calendar(
        'calendar2',
        document.querySelector('#calendar2 thead td:nth-child(3)').dataset.year,
        parseFloat(
            document.querySelector('#calendar2 thead td:nth-child(2)').dataset
                .month
        ) + 1
    );
};
//преобразование ключа для вывода на экран
function getKeyByValue(object, value) {
    var num = Object.keys(object).find((key) => object[key] === value);
    if (num.length < 2) {
        num = '0' + num;
    }
    return num;
}
//выделение ячеек с данными
function ShowInHtml(cell) {
    console.log(cell);
    //dbReq.onsuccess = function (event) {
    let tr = db.transaction('notes', 'readwrite');
    let store = tr.objectStore('notes');
    let dayInd = store.index('day_idx');
    let find = dayInd.get(cell);
    console.log(find);
    find.onsuccess = function () {
        //console.log(find.result.length);
        //return find.result.length !== 0 ? 1 : 0;
        if (find.result !== undefined) {
            console.log(find.result);
        } else console.log('no');
        // return 1;
        //} else {
        // return 0;
        //}
        // };
    };
}
