var data = {};
var users = [];

get();

function getPage() {
    var select = document.getElementById('page');

    return select.options[select.selectedIndex].value;
};

function setPage(page) {
    document.getElementById('page').options[page - 1].selected = true;
};

function get() {
    var page = getPage();

    axios.get('https://reqres.in/api/users?page=' + page).then(function (response) {
        data = response.data;
        users = response.data.data;
        generateGrid();
    });
};

function generateGrid() {
    var tbody = document.getElementById('table-body');

    var usersLength = users.length;

    for (var x = 0; x < usersLength; x++) {
        var tr = document.createElement('tr');

        for (var key in users[x]) {
            generateRow[key](users[x], tr);
        }

        tbody.appendChild(tr);

    }
};

generateRow = {
    'avatar': function (user, tr) {
        var td = document.createElement('td');
        var img = document.createElement('img');
        img.className = 'avatar';
        img.setAttribute('src', user.avatar);
        td.appendChild(img);
        tr.appendChild(td);
    },
    'first_name': function (user, tr) {
        var td = document.createElement('td');
        td.textContent = formatName(user.first_name, user.last_name);
        tr.appendChild(td);
    },
    'last_name': function () {

    },
    'id': function (user, tr) {
        var td = document.createElement('td');
        td.textContent = user['id'];
        tr.appendChild(td);
    }
};

function clearGrid() {
    var tbody = document.getElementById('table-body');
    while (tbody.rows.length > 0) {
        tbody.deleteRow(0);
    }
}

function nextPage() {
    var page = getPage();

    var nextPage = parseInt(page) + 1;
    if (nextPage > data.total_pages) {
        nextPage = data.total_pages;
    } else {
        setPage(nextPage);
        clearGrid();
        get();
    }
}

function previousPage() {
    var page = getPage();
    var previousPage = parseInt(page) - 1;
    if (previousPage < 1) {
        previousPage = 1;
    } else {
        setPage(previousPage);
        clearGrid();
        get();
    }
}

function changePage() {
    var page = getPage();

    setPage(page);
    clearGrid();
    get();
}


// binds 
var nextBtn = document.getElementById('next');

var previousBtn = document.getElementById('previous');

var pageSelect = document.getElementById('page');

nextBtn.addEventListener('click', nextPage, false);

previousBtn.addEventListener('click', previousPage, false);

pageSelect.addEventListener('change', changePage, false);