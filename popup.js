const bookmarks = chrome.bookmarks.getTree(
    (results) => {
        console.log("Bookmarks:", results);
        // results.children.forEach((result) => {
        //     console.log(result)
        // });
    }
);

const extractBtn = document.getElementById('extract-full-bookmarks');
const importBtn = document.getElementById('import-bookmarks');

extractBtn.addEventListener('click', () => {
    console.log('Clicked extractBtn!');
});

importBtn.addEventListener('click', () => {
    console.log('Clicked importBtn!');
});
