let toggleMenu = document.getElementById('toggleMenu');
let toggleDialogBox = document.getElementById('toggleDialogBox');

toggleMenu.addEventListener('click', () => {
    toggleDialogBox.classList.toggle("hide");
})

document.addEventListener('click', (event) => {
    const targetElement = event.target;

    if (!toggleDialogBox.contains(targetElement) && !toggleMenu.contains(targetElement)) {
        toggleDialogBox.classList.add('hide');
    }
})

let logoutButton = document.getElementById('logoutButton')
logoutButton.addEventListener('click', () => {
    window.location.href = '/'
})

let attendanceBtn = document.getElementById('attendanceBtn')
attendanceBtn.addEventListener('click', () => {
    window.location.href = '/attendance'
})

let registerStudentsBtn = document.getElementById('registerStudentsBtn')
registerStudentsBtn.addEventListener('click', () => {
    window.location.href = '/register-students'
})