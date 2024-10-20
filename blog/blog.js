document.addEventListener('DOMContentLoaded', () => {
    const articlesContainer = document.getElementById('articles');

    function renderArticles(articles) {
        articlesContainer.innerHTML = '';
        articles.forEach(article => {
            const articleElement = document.createElement('article');
            articleElement.innerHTML = `
                <div class="article-meta">
                    <time datetime="${article.date}">${article.date}</time>
                    <span class="age-range">${article.ages}</span>
                    <span class="genre">${article.genre}</span>
                    <div class="rating">${article.stars}</div>
                </div>
                <div class="article-content">
                    <h2>${article.title}</h2>
                    <img src="${article.imgSrc}" alt="${article.imgAlt}">
                    <p>${article.description} <a href="#">Read More...</a></p>
                </div>
            `;
            articlesContainer.appendChild(articleElement);
        });
    }

    renderArticles(articles);

    const filterForm = document.getElementById('filter-form');
    filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const sort = document.getElementById('sort').value;
        const age = document.getElementById('age').value;
        const genre = document.getElementById('genre').value;
        const rating = document.getElementById('rating').value;

        let filteredArticles = [...articles];

        if (age) {
            filteredArticles = filteredArticles.filter(article => article.ages === age);
        }
        if (genre) {
            filteredArticles = filteredArticles.filter(article => article.genre === genre);
        }
        if (rating) {
            filteredArticles = filteredArticles.filter(article => article.stars.length >= parseInt(rating));
        }

        if (sort === 'date') {
            filteredArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sort === 'title') {
            filteredArticles.sort((a, b) => a.title.localeCompare(b.title));
        }

        renderArticles(filteredArticles);
    });
});