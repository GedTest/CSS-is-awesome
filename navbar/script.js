document.addEventListener('DOMContentLoaded', function () {
    var expand = document.querySelector('.nav-expand');
    var navbarContainer = document.querySelector('.nav-container');

    expand.addEventListener('click', function () {
        expand.classList.toggle('nav-collapsed');
        navbarContainer.classList.toggle('nav-collapsed');
    });

    window.addEventListener('click', (e) => {
        if(!navbarContainer.contains(e.target) && !expand.contains(e.target)) {
            expand.classList.add('nav-collapsed');
            navbarContainer.classList.add('nav-collapsed');
        }
    })
});
