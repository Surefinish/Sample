document.addEventListener("DOMContentLoaded", function () {
    const starButtons = document.querySelectorAll('.star-button');

    // Initialize favorite images from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    updateFavoriteButtons();

    starButtons.forEach(button => {
        button.addEventListener('click', function () {
            const imageItem = this.parentElement;
            const imageId = imageItem.getAttribute('data-id');

            if (favorites.find(fav => fav.id === imageId)) {
                // Remove from favorites if already selected
                const index = favorites.findIndex(fav => fav.id === imageId);
                favorites.splice(index, 1);
            } else {
                // Add to favorites
                const imageInfo = {
                    id: imageId,
                    src: imageItem.querySelector('img').src,
                    info: imageItem.querySelector('p').textContent
                };
                favorites.push(imageInfo);
            }

            // Save to localStorage
            localStorage.setItem('favorites', JSON.stringify(favorites));

            // Update button style and favorites page
            updateFavoriteButtons();
        });
    });

    // Update buttons to reflect favorite status on homepage
    function updateFavoriteButtons() {
        starButtons.forEach(button => {
            const imageItem = button.parentElement;
            const imageId = imageItem.getAttribute('data-id');

            if (favorites.find(fav => fav.id === imageId)) {
                button.classList.add('selected');
            } else {
                button.classList.remove('selected');
            }
        });

        updateFavoritePage();
    }

    // Update favorites page
    function updateFavoritePage() {
        const favoritesContainer = document.getElementById('favorites-container');
        if (favoritesContainer) {
            favoritesContainer.innerHTML = ''; // Clear existing items
            favorites.forEach(fav => {
                const favItem = document.createElement('div');
                favItem.classList.add('image-item');
                favItem.setAttribute('data-id', fav.id);
                favItem.innerHTML = `
                    <img src="${fav.src}" alt="${fav.info}">
                    <p>${fav.info}</p>
                    <button class="star-button selected">★</button>
                `;

                // Add event listener to the star button in the favorite page
                const favButton = favItem.querySelector('.star-button');
                favButton.addEventListener('click', function () {
                    // Remove from favorites when unselected
                    const index = favorites.findIndex(f => f.id === fav.id);
                    if (index !== -1) {
                        favorites.splice(index, 1);
                    }
                    localStorage.setItem('favorites', JSON.stringify(favorites));
                    updateFavoriteButtons();
                });

                favoritesContainer.appendChild(favItem);
            });
        }
    }
});
