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

extractBtn.addEventListener('click', async () => {
    if (bookmarks.length > 0) {
        bookmarks = [];
    }
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
    const results = await chrome.bookmarks.getTree();
    console.log('Promise results: ', results);
    results.forEach((bookmark) => {
        extractBookmarks(bookmark);
    });
    console.log(bookmarks.length);
    console.log('Final bookmarks: ', bookmarks);
    saveBookmarks(bookmarks);
});

function saveBookmarks(bookmarkList) {
    const link = document.createElement('a');
    const file = new Blob([JSON.stringify(bookmarkList)], { type: 'application/json' });
    link.href = URL.createObjectURL(file);
    link.download = 'bookmarks.json';
    link.click();
    URL.revokeObjectURL(link.href);
}

importBtn.addEventListener('click', () => {
    console.log('Clicked importBtn!');
});
