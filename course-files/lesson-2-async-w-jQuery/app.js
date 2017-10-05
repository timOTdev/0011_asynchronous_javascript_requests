/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        // Add image function and ajax request
        function addImage(data) {
            let htmlContent = '';
            const firstImage = data.results[0];

            responseContainer.insertAdjacentHTML('afterbegin', `<figure>
                <img src="${firstImage.urls.small}" alt= "${searchedForText}">
                <figcaption>By <a href=${firstImage.user.links.html}>${firstImage.user.name}</a> / <a href="https://unsplash.com/">Unsplash</a></figcaption>
            </figure>`
            );
        } // end of addImage()

        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                Authorization: 'Client-ID bf0e9ebe48cbd01b383cbbb18b6f3d49d1e44613ec1ff1db48b399144e9a4239'
            }
        }).done(addImage)
        .fail(function (err) {
            requestError(err, 'image');
        }); // end of add image ajax request

        // Add articles function and ajax request
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

        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=62441442c2604cc69e2a2c6f8b100ac4`
        }).done(addArticles)
        .fail(function (err) {
            requestError(err, 'image');
        }); // end of add articles ajax request
    }); // end of form.addEventListener
})(); // end of function()