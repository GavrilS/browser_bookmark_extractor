const bookmarkDict = {};
const bookmarks = [];

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
    // console.log('Clicked extractBtn!');

});

importBtn.addEventListener('click', () => {
    console.log('Clicked importBtn!');
});
