document.addEventListener('keydown', function(event) {
    if (event.key === '/') {
        event.preventDefault();
        const searchBox = document.getElementById('search-box');
        if (document.activeElement === searchBox) {
            searchBox.blur();
        } else {
            searchBox.focus();
        }
    }
});
