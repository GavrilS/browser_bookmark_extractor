const bookmarkDict = {};
let bookmarks = [];

// chrome.bookmarks.getTree(
//     (results) => {
//         console.log("Bookmarks:", results);
//         results.forEach((bookmark) => {
//             // console.log(bookmark);
//             extractBookmarks(bookmark);
//         });
//         console.log('Bookmarks final: ', bookmarks);
//     }
// );

function extractBookmarks(bookmark) {
    if (bookmark.children) {
        bookmark.children.forEach((bookmarkChild) => {
            extractBookmarks(bookmarkChild);
        });
    } else {
        let parent = '';
        if (bookmark.parentId) {
            parent = bookmark.parentId;
        }
        bookmrk = {
            'parent': parent,
            'id': bookmark.id,
            'title': bookmark.title,
            'url': bookmark.url ? bookmark.url : ''
        };
        bookmarks.push(bookmrk);
    }
}

const extractBtn = document.getElementById('extract-full-bookmarks');
const importBtn = document.getElementById('import-bookmarks');

extractBtn.addEventListener('click', () => {
    if (bookmarks.length > 0) {
        bookmarks = [];
    }
    chrome.bookmarks.getTree(
        (results) => {
            console.log("Bookmarks:", results);
            results.forEach((bookmark) => {
                // console.log(bookmark);
                extractBookmarks(bookmark);
            });
            console.log('Bookmarks final: ', bookmarks);
        }
    );

    console.log(bookmarks.length);
    saveBookmarks(bookmarks);
});

function saveBookmarks(bookmarkList) {
    // const blob = new Blob([bookmarkList.toString()], {
    //     type: 'text/plain;charset=utf-8',
    // });
    // saveAs(blob, 'bookmarks.txt');
    const link = document.createElement('a');
    const content = bookmarkList.toString();
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = 'bookmarks.txt';
    link.click();
    URL.revokeObjectURL(link.href);
}

importBtn.addEventListener('click', () => {
    console.log('Clicked importBtn!');
});
