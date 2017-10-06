(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        // Error handling
        function requestError(e, part) {
            console.log(e);
            responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
        }

        // Add image function and fetch request
        function addImage(data) {
            let htmlContent = '';
            const firstImage = data.results[0];
            
            if (firstImage) {
                htmlContent = `<figure>
                    <img src="${firstImage.urls.small}" alt= "${searchedForText}">
                    <figcaption>By <a href=${firstImage.user.links.html}>${firstImage.user.name}</a> / <a href="https://unsplash.com/">Unsplash</a></figcaption>
                </figure>`;
            } else {
                htmlContent = 'Unfortunately, no image was returned for your search.'
            }
            
            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        } // end of addImage()

        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
            headers: {
                Authorization: 'Client-ID bf0e9ebe48cbd01b383cbbb18b6f3d49d1e44613ec1ff1db48b399144e9a4239'
            }
        })
        .then(response => response.json())
        .then(addImage)
        .catch(err => requestError(err, 'image')); // end of add image fetch 

        // Add articles function and fetch request
        function addArticles(data) {
            let htmlContent = '';

            if (data.response && data.response.docs && data.response.docs.length > 1) {
                htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article">
                    <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                    <p>${article.snippet}</p>
                    </li>`
                ).join('') + '</ul>';
            } else {
                htmlContent = '<div class="error-no-articles">No articles available</div>';
            }

            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        } // end of addArticles()

        fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=62441442c2604cc69e2a2c6f8b100ac4`)
        .then(response => response.json())
        .then(addArticles)
        .catch(err => requestError(err, 'image')); // end of add articles fetch
    });
})();
