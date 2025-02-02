// Retrieve the selected article from localStorage
const selectedArticle = JSON.parse(localStorage.getItem('selectedArticle'));

// DOM elements
const articleTitle = document.getElementById('article-title');
const articleImage = document.getElementById('article-image');
const shortContent = document.getElementById('short-content');
const fullContent = document.getElementById('full-content');
const readMoreBtn = document.getElementById('read-more-btn');
const backToFeedBtn = document.getElementById('back-to-feed-btn');
const readOriginalBtn = document.getElementById('read-original-btn');

// Populate the article view
if (selectedArticle) {
  articleTitle.textContent = selectedArticle.title || 'No Title';
  articleImage.src = selectedArticle.urlToImage || 'https://via.placeholder.com/300x200';

  const content = selectedArticle.content || '<p>No content available.</p>';
  const url = selectedArticle.url || '#'; // Fallback URL

  // Display the first 200 characters as a preview
  shortContent.innerHTML = content.slice(0, 200) + '...';

  // Store the full content in a hidden div
  fullContent.innerHTML = content;

  // Set the "Read Original Article" link
  readOriginalBtn.href = url;

  // Add event listener to the "Read More" button
  readMoreBtn.addEventListener('click', () => {
    // Update the <p> tag content with the maintenance message
    shortContent.innerHTML =
      "Sorry, we are working for this News App. You can read the original news by clicking the 'Read Original Article' button.";
    
    // Hide the "Read More" button after updating the content
    readMoreBtn.classList.add('hidden');
  });

  // Add event listener to the "Back to News Feed" button
  backToFeedBtn.addEventListener('click', () => {
    window.location.href = 'index.html'; // Redirect to the main news feed
  });
} else {
  articleTitle.textContent = 'Article Not Found';
  articleImage.src = 'https://via.placeholder.com/300x200';
  shortContent.innerHTML = '<p>The requested article could not be found.</p>';
  readMoreBtn.classList.add('hidden'); // Hide the "Read More" button
  readOriginalBtn.classList.add('hidden'); // Hide the "Read Original Article" button
}