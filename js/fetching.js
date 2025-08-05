// function:: fetching the data for categories
const loadCategories = async () => {
  const requestForCategoriesData = await fetch(
    "https://openapi.programming-hero.com/api/phero-tube/categories"
  );

  const categoriesData = await requestForCategoriesData.json();
  displayCategoriesAsBtn(categoriesData?.categories);
};

// function::display the categories dynamically
const displayCategoriesAsBtn = (categories) => {
  const categoryMenuContainer = document.querySelector("#categories");

  categories.forEach((category) => {
    const categoryBtn = document.createElement("button");
    categoryBtn.id = `btn-${category.category_id}`;
    categoryBtn.classList =
      "btn font-medium text-[#252525B3] bg-[#25252526] common-category-btn";
    categoryBtn.innerText = category.category;

    categoryMenuContainer.appendChild(categoryBtn);

    // event handler for categorize data
    categoryBtn.onclick = () => {
      loadVideoCategorize(category.category_id);

      // deactives buttons
      deactiveButtons();

      // active the button on clicked
      categoryBtn.classList.add("active");
    };
  });
};

// reset all button active state
const deactiveButtons = () => {
  // reset all button active state
  const allCategoryBtn = document.getElementsByClassName("common-category-btn");
  for (const btn of allCategoryBtn) {
    btn.classList.remove("active");
  }
};

// function:: fetching data categorizes
const loadVideoCategorize = async (categoryId) => {
  const responseForCategorizeData = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/category/${categoryId}`
  );
  const categorizeData = await responseForCategorizeData.json();

  // display categorize video in cards
  displayAllVideos(categorizeData.category);
};

// function:: fetching all data for videos from server
const loadAllVideos = async () => {
  const responseForVideos = await fetch(
    "https://openapi.programming-hero.com/api/phero-tube/videos"
  );
  const dataOfVideos = await responseForVideos.json();

  displayAllVideos(dataOfVideos.videos);
};

// function:: display all video cards
const displayAllVideos = (videos) => {
  const videoCardsContainer = document.querySelector("#video-cards-container");
  //  validate: no data found
  if (videos.length === 0) {
    videoCardsContainer.classList.add("hidden");
    document
      .getElementById("no-video-found")
      .classList.replace("hidden", "flex");

    return;
  } else {
    videoCardsContainer.classList.remove("hidden");
    document
      .getElementById("no-video-found")
      .classList.replace("flex", "hidden");
  }

  // clear old result
  videoCardsContainer.innerHTML = "";

  videos.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.classList = "card w-full";
    videoCard.innerHTML = `
    <figure>
    <img
      src="${video?.thumbnail}"
      alt="${video?.title}"
      class="object-cover h-[200px] w-full rounded" />
  </figure>
  <div class="flex items-start gap-5 pt-5">
    <figure>
    <img
      src="${video?.authors[0]?.profile_picture}"
      alt="${video?.authors[0]?.profile_name}"
      class="w-10 h-10 rounded-full" />
    </figure>
    <div class="space-y-2">
    <h5 class="font-bold text-[#171717] leading-6">${video?.title}</h5>
    <p class="text-sm text-[#171717B3]">${video?.authors[0]?.profile_name} ${
      video?.authors[0]?.verified
        ? `<span><img
      src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"
      alt="verified badge" class="w-5 h-5 inline-block" /></span>`
        : ""
    }</p>
    <p class="text-sm text-[#171717B3]">${video?.others?.views}</p>
    </div>
  </div>
    `;

    videoCardsContainer.appendChild(videoCard);
  });
};

// event handler:: for search box to find video by search
const searchBox = document.getElementById("search-input-field");
searchBox.addEventListener("keyup", (event) => {
  // deactive buttons active state
  deactiveButtons();

  // loadvideos
  loadVideosBySearch(searchBox.value);
});

// function:: for load all video on searching
const loadVideosBySearch = async (searchItem) => {
  const responseVideosOnSearch = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchItem}`
  );
  const dataBySearch = await responseVideosOnSearch.json();

  // display videos by searched data
  displayAllVideos(dataBySearch.videos);
};

// event handler for all button
const btnAllVideos = document.querySelector("#btn-all");
btnAllVideos.addEventListener("click", () => {
  // deactive buttons active state
  deactiveButtons();

  btnAllVideos.classList.add("active");

  // for all videos
  loadAllVideos();
});

// calling the function globally
loadCategories();
loadAllVideos();
