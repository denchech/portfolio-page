let disable = document.querySelector('.disable');
let contacts = document.querySelector('.contacts-container');

function showPopup() {

    if (disable.style.display === 'none') {
        disable.style.display = 'flex';
        contacts.style.display = 'flex';
    } else {
        disable.style.display = 'none';
        contacts.style.display = 'none';
    }
}

function changePhoto() {

}