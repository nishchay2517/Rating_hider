const style = document.createElement('style');
style.textContent = `
  /* Hide the specific contest rating li */
  .info li:has(img[src*="rating-24x24.png"]) {
    display: none !important;
  }
  
  /* Alternative selector if the above doesn't work */
  .info li:has(span[class="user-gray"]) {
    display: none !important;
  }
`;
document.head.appendChild(style);

// For older browsers that don't support :has
function hideSpecificRating() {
  const ratingElements = document.querySelectorAll('li');
  ratingElements.forEach(li => {
    if (li.querySelector('img[src*="rating-24x24.png"]') || 
        li.querySelector('span.user-gray')) {
      li.style.display = 'none';
    }
  });
  const graphElement = document.getElementById('usersRatingGraphPlaceholder');
  if (graphElement) {
    graphElement.style.display = 'none';
  }
  const mainInfoElements = document.querySelectorAll('.main-info');
  mainInfoElements.forEach(element => {
    element.style.display = 'none';
  });

  const notificationDivs = document.querySelectorAll('div[style*="background-color: #EAF4FF"]');
  notificationDivs.forEach(div => {
    div.style.display = 'none';
  });

  // Also hide by parent of rating change links
  const ratingChangeLinks = document.querySelectorAll('a[href*="/bestRatingChanges/"]');
  ratingChangeLinks.forEach(link => {
    const parentDiv = link.closest('div[style*="background-color: #EAF4FF"]');
    if (parentDiv) {
      parentDiv.style.display = 'none';
    }
  });
}


// Run immediately
hideSpecificRating();

// Run on dynamic content changes
const observer = new MutationObserver(hideSpecificRating);
observer.observe(document.body, {
  childList: true,
  subtree: true
});