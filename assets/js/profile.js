const profileImages = document.querySelectorAll('.profile-image');

let currentIndex = 0;

function changePhoto() {
    profileImages[currentIndex].style.display = 'none';
    if (++currentIndex === profileImages.length) {
        currentIndex = 0;
    }
    profileImages[currentIndex].style.display = '';
}