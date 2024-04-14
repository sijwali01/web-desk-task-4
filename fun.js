let right_container = document.getElementById("right-container");
let video_tag = document.getElementById("videoTag");
let video_title = document.getElementById("videoTitle");
let author_name = document.getElementById("author");
let descri = document.getElementById("des");
const searchBox = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const searchContainer = document.querySelector(".search-container");
const container = document.querySelector("#container");
let allVideosData = []; // To store all videos data

let fetchData = async () => {
  let response = await fetch(
    `https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json`
  );
  allVideosData = await response.json();
  displayData(allVideosData);
};

function displayData(data) {
  right_container.innerHTML = ""; // Clear previous search results

  data.forEach((obj) => {
    let { thumbnailUrl, title, author, uploadTime, videoUrl, description } =
      obj;

    let thumbnail_container = document.createElement("article");
    thumbnail_container.setAttribute("class", "thumbnail-container");

    let thumbnail = document.createElement("aside");
    thumbnail.setAttribute("class", "thumbnail");

    let content = document.createElement("aside");
    content.setAttribute("class", "content");

    let image = document.createElement("img");
    image.setAttribute("src", thumbnailUrl);
    thumbnail.append(image);

    let contentTitle = document.createElement("h4");
    contentTitle.innerText = title;

    let contentAuthor = document.createElement("p");
    contentAuthor.innerText = author;

    let contentViews = document.createElement("p");
    contentViews.innerHTML = uploadTime;

    content.append(contentTitle, contentAuthor, contentViews);
    thumbnail_container.append(thumbnail, content);
    right_container.append(thumbnail_container);

    thumbnail_container.addEventListener("click", () => {
      video_tag.setAttribute("src", videoUrl);
      video_tag.setAttribute("autoplay", true);
      video_title.innerText = title;
      author_name.innerText = `Uploaded By - ${author}`;
      descri.innerText = description;
    });
  });
}

// Call fetchData when the page loads
window.addEventListener("load", fetchData);

// Event listener for search button
searchBtn.addEventListener("click", () => {
  const searchInput = searchBox.value.trim();
  if (searchInput !== "") {
    const filteredData = allVideosData.filter((video) =>
      video.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      video.author.toLowerCase().includes(searchInput.toLowerCase())
    );
    displayData(filteredData);
  }
});

// Hide search container on load
searchContainer.style.display = "none";

// Show search container after data is loaded
window.addEventListener("load", () => {
  searchContainer.style.display = "block";
});
