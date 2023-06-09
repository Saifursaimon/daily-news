const loadNews = (categoryId) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNews(data.data));
};

const displayNews = (newses) => {
  const newsQuantity = document.getElementById("news-quantity");
  newsQuantity.innerHTML = `
  <p class = "fw-bold" >${newses.length} Items Found For This Category</p>
  `;
  const newsContainer = document.getElementById("news-container");
  newsContainer.textContent = "";
  newses.forEach((news) => {
    // console.log(news);
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("card", "mb-3", "p-3");
    newsDiv.innerHTML = `
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${
                  news.thumbnail_url
                }" class="img-fluid rounded-start" alt="..." />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${news.title}</h5>
                  <p class="card-text">
                    ${news.details.slice(0, 400)}...
                  </p>
                  <div class = "d-flex align-items-center justify-content-around mt-5">
                    <div class="d-flex align-items-center gap-3">
                    <img src="${
                      news.author.img
                    }" style ="width : 40px; border-radius:50% ">
                    <h5>${news.author.name ? news.author.name : "unknown"}</h5>
                    </div>
                    <span><i class="fa-solid fa-eye"></i> ${
                      news.total_view ? news.total_view : "No view"
                    }</span>
                    <a><i onclick = "loadNewsDetails('${
                      news._id
                    }')" class="fa-solid fa-arrow-right"  data-bs-toggle="modal"
                    data-bs-target="#exampleModal"></i></a>
                  </div>
                </div>
              </div>
            </div>
    `;
    newsContainer.appendChild(newsDiv);
  });
};

const loadNewsDetails = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsDetails(data.data[0]));
};

const displayNewsDetails = (news) => {
  console.log(news);
  const modalTitle = document.getElementById("newsModal");
  modalTitle.innerText = `${news.title}`;
  const modalBody = document.getElementById("modal-details");
  modalBody.innerHTML = `
  <p>${news.details.slice(0, 1000)}....</p>
  `;
};

loadNews("05");
