const form = document.getElementById('bookmarkForm');
const tableBody = document.getElementById('bookmarkTableBody');

var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

const urlRegex = /^(https?:\/\/|www\.)/;

function renderTable() {
    tableBody.innerHTML = '';
    bookmarks.forEach((bookmark, index) => {
        const row = document.createElement('tr');

        const indexCell = document.createElement('td');
        indexCell.textContent = index + 1;

        const nameCell = document.createElement('td');
        nameCell.textContent = bookmark.name;

        const visitCell = document.createElement('td');
        
        const visitButton = document.createElement('button');
        visitButton.textContent = 'Visit';
        visitButton.className = 'btn btn-success btn-sm';
        visitButton.onclick = () => window.open(bookmark.url, '_blank');
        
        visitCell.appendChild(visitButton);

        const deleteCell = document.createElement('td');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.onclick = () => {
            bookmarks.splice(index, 1);
            saveBookmarks();
            renderTable();
        };

        deleteCell.appendChild(deleteButton);

        row.appendChild(indexCell);
        row.appendChild(nameCell);
        row.appendChild(visitCell);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    });
}

function saveBookmarks() {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const url = document.getElementById('url').value.trim();

    if (name && urlRegex.test(url)) {
        bookmarks.push({ name, url });
        saveBookmarks();
        renderTable();
        form.reset();
    } else {
        alert('Please enter a valid URL starting with http://, https://, or www.');
    }
});

renderTable();
