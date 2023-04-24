const loadNews = (categoryId) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNews(data.data));
};

const displayNews = (newses) => {
  const newsContainer = document.getElementById("news-container");
  newsContainer.textContent = "";
  newses.forEach((news) => {
    console.log(news);
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("card", "mb-3");
    newsDiv.innerHTML = `
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${
                  news.image_url
                }" class="img-fluid rounded-start" alt="..." />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${news.title}</h5>
                  <p class="card-text">
                    ${news.details.slice(0, 400)}...
                  </p>
                </div>
              </div>
            </div>
    `;
    newsContainer.appendChild(newsDiv);
  });
};

// loadNews();
