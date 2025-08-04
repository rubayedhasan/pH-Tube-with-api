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
    categoryBtn.classList = "btn font-medium text-[#252525B3] bg-[#25252526]";
    categoryBtn.innerText = category.category;

    categoryMenuContainer.appendChild(categoryBtn);
  });
};

// calling the function globally
loadCategories();
