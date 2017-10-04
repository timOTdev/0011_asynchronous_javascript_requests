window.onload = function () {        
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        var unsplashRequest = new XMLHttpRequest();
        unsplashRequest.onload = addImage;
        unsplashRequest.onerror = function (err) { console.log(err) };
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID bf0e9ebe48cbd01b383cbbb18b6f3d49d1e44613ec1ff1db48b399144e9a4239');
        unsplashRequest.send();

        function addImage() {
            let htmlContent = '';
            const data = JSON.parse(this.responseText);
            const firstImage = data.results[0];
            
            htmlContent = `<figure>
                <img src="${firstImage.urls.regular}" alt= "${searchedForText}">
                <figcaption>By <a href=${firstImage.user.links.html}>${firstImage.user.name}</a> / <a href="https://unsplash.com/">Unsplash</a></figcaption>
            </figure>`
            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }

        var nytRequest = new XMLHttpRequest();
        nytRequest.onload = addArticles;
        nytRequest.onerror = function (err) { console.log(err) };
        nytRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=62441442c2604cc69e2a2c6f8b100ac4`)
        nytRequest.send();

        function addArticles() {
            let htmlContent = '';
            const data = JSON.parse(this.responseText);

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
        }
    })
};