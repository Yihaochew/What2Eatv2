// Hardcoded recipe data
const recipes = [
    {
        name: "Pasta Carbonara",
        ingredients: ["pasta", "bacon", "eggs", "parmesan cheese", "black pepper"],
        method: "Boil pasta. Fry bacon until crispy. Whisk eggs with parmesan cheese. Toss cooked pasta with egg mixture and bacon. Serve hot with black pepper."
    },
    // Add more recipes as needed
];

// Function to generate recipe based on user selections
function generateRecipe(selectedIngredients, selectedAppliances, selectedMethods) {
    // Filter recipes based on user selections
    const filteredRecipes = recipes.filter(recipe => 
        selectedIngredients.every(ingredient => recipe.ingredients.includes(ingredient)) &&
        selectedAppliances.every(appliance => recipe.method.includes(appliance)) &&
        selectedMethods.every(method => recipe.method.includes(method))
    );

    // Randomly select a recipe from filtered options
    const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
    const selectedRecipe = filteredRecipes[randomIndex];

    // Display the selected recipe to the user (e.g., in a modal)
    console.log(selectedRecipe);
}

// Event listener for search button
document.getElementById('searchButton').addEventListener('click', function() {
    // Get selected ingredients, appliances, and methods from user input
    const selectedIngredients = Array.from(document.querySelectorAll('input[name="ingredient"]:checked')).map(cb => cb.value);
    const selectedAppliances = Array.from(document.querySelectorAll('input[name="appliance"]:checked')).map(cb => cb.value);
    const selectedMethods = Array.from(document.querySelectorAll('input[name="method"]:checked')).map(cb => cb.value);

    // Generate and display recipe based on user selections
    generateRecipe(selectedIngredients, selectedAppliances, selectedMethods);
});
