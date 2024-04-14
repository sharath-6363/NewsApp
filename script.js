const apiKey = "f2abe70ad405f66ff33a260f9df491f9";

const blogcontainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-bar");
const searchButton = document.getElementById("search-buttons");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://gnews.io/api/v4/top-headlines?lang=en&country=in&max=10&token=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Failed to fetch random news", error);
        return [];
    }
}

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlog(articles);
        } catch (error) {
            console.error("Failed to fetch news with query", error);
        }
    }
});

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://gnews.io/api/v4/search?q=${query}&lang=en&country=in&max=10&token=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Failed to fetch news with query", error);
        return [];
    }
}

function displayBlog(articles) {
    blogcontainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        
        if (article.image) {
            const img = document.createElement("img");
            img.src = article.image;
            img.alt = article.title;
            blogCard.appendChild(img);
        }
        
        const title = document.createElement("h3");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + ". . ." : article.title;
        title.textContent = truncatedTitle;
        
        const description = document.createElement("p");
        const truncatedDesc = article.description && article.description.length > 50 ? article.description.slice(0, 50) + ". . ." : article.description;
        description.textContent = truncatedDesc;

        blogCard.appendChild(title);
        blogCard.appendChild(description);
        
        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });
        
        blogcontainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlog(articles);
    } catch (error) {
        console.error("Failed to fetch random news", error);
    }
})();
