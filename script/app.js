// Pre-built news data for each category
const preBuiltNews = {
    breaking: [
      {
        title: "Breaking News: AI Takes Over the World",
        description: "Artificial Intelligence has made significant strides in recent years...",
        content: "Artificial Intelligence (AI) is transforming industries worldwide. From healthcare to finance, AI-powered systems are automating tasks, improving efficiency, and enabling new capabilities...",
        urlToImage: "https://via.placeholder.com/300x200"
      },
      {
        title: "Global Economy Faces Challenges",
        description: "The global economy is facing unprecedented challenges due to geopolitical tensions and inflation...",
        content: "Economists predict that the global economy will face significant challenges in the coming years...",
        urlToImage: "https://via.placeholder.com/300x200"
      }
    ],
    technology: [
      {
        title: "Top 10 Tech Trends in 2023",
        description: "From quantum computing to blockchain, here are the top trends shaping the future...",
        content: "Quantum computing, blockchain, and AI are revolutionizing industries. These technologies are driving innovation and creating new opportunities...",
        urlToImage: "https://via.placeholder.com/300x200"
      }
    ],
    sports: [
      {
        title: "The Rise of Remote Work",
        description: "Remote work is here to stay, transforming industries worldwide...",
        content: "Remote work has become a permanent fixture in many industries. Companies are adopting hybrid models, allowing employees to work from home or the office...",
        urlToImage: "https://via.placeholder.com/300x200"
      }
    ]
  };
  
  const API_KEY = '906f33ef46644b2dbe752031cd7ffcf6';
  const BASE_URL = 'https://newsapi.org/v2/everything';
  
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const newsContainer = document.getElementById('news-container');
  const categoryTabs = document.querySelectorAll('.category-tab');
  const slidesContainer = document.querySelector('.slides');
  
  let currentCategory = 'breaking'; // Default category
  
  // Fetch news from API based on category
  async function fetchNews(category) {
    try {
      const response = await fetch(`${BASE_URL}?q=${category}&apiKey=${API_KEY}`);
      const data = await response.json();
  
      if (data.articles && data.articles.length > 0) {
        renderNews(data.articles);
        renderBreakingNewsSlider(data.articles); // Update breaking news slider
      } else {
        console.warn('No articles found from API. Falling back to pre-built news.');
        renderPreBuiltNews(category); // Fallback to pre-built news
        renderBreakingNewsSlider(preBuiltNews[category]); // Update breaking news slider
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      renderPreBuiltNews(category); // Fallback to pre-built news
      renderBreakingNewsSlider(preBuiltNews[category]); // Update breaking news slider
    }
  }
  
  // Render pre-built news for a specific category
  function renderPreBuiltNews(category) {
    const articles = preBuiltNews[category] || [];
    renderNews(articles);
  }
  
  // Render news cards
  function renderNews(articles) {
    newsContainer.innerHTML = ''; // Clear previous results
  
    if (articles.length === 0) {
      newsContainer.innerHTML = '<p>No news available for this category.</p>';
      return;
    }
  
    articles.forEach(article => {
      const { title, description, content, urlToImage } = article;
  
      const card = document.createElement('div');
      card.classList.add('news-card');
  
      const image = urlToImage
        ? `<img src="${urlToImage}" alt="${title}">`
        : '<div class="no-image">No Image Available</div>';
  
      card.innerHTML = `
        ${image}
        <div class="content">
          <h2>${title || 'No Title'}</h2>
          <p>${description || 'No description available.'}</p>
        </div>
      `;
  
      // Add event listener to open full article view
      card.addEventListener('click', () => {
        localStorage.setItem('selectedArticle', JSON.stringify(article)); // Save article to localStorage
        window.location.href = 'read.html'; // Navigate to read page
      });
  
      newsContainer.appendChild(card);
    });
  }
  
  // Render breaking news slider
  function renderBreakingNewsSlider(articles) {
    slidesContainer.innerHTML = ''; // Clear previous slides
  
    if (articles.length === 0) {
      slidesContainer.innerHTML = '<p>No breaking news available.</p>';
      return;
    }
  
    articles.forEach(article => {
      const { title, description, urlToImage } = article;
  
      const slide = document.createElement('div');
      slide.classList.add('slide');
  
      const image = urlToImage
        ? `<img src="${urlToImage}" alt="${title}">`
        : '<div class="no-image">No Image Available</div>';
  
      slide.innerHTML = `
        ${image}
        <h2>${title || 'No Title'}</h2>
        <p>${description || 'No description available.'}</p>
      `;
  
      // Add event listener to open full article view
      slide.addEventListener('click', () => {
        localStorage.setItem('selectedArticle', JSON.stringify(article)); // Save article to localStorage
        window.location.href = 'read.html'; // Navigate to read page
      });
  
      slidesContainer.appendChild(slide);
    });
  }
  
  // Event listeners for category tabs
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      categoryTabs.forEach(t => t.classList.remove('active'));
  
      // Add active class to clicked tab
      tab.classList.add('active');
  
      // Fetch news for the selected category
      currentCategory = tab.dataset.category;
      fetchNews(currentCategory);
    });
  });
  
  // Event listener for search button
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      fetchNews(query);
    } else {
      alert('Please enter a search term.');
    }
  });
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
  });
  
  // Load default category (Breaking News) on page load
  fetchNews(currentCategory);