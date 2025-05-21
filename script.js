 
        const foodForm = document.getElementById('food-form');
        const foodNameInput = document.getElementById('food-name');
        const caloriesInput = document.getElementById('calories');
        const foodList = document.getElementById('food-list');
        const totalCaloriesDisplay = document.getElementById('total-calories');
        const resetBtn = document.getElementById('reset-btn');
        const emptyMessage = document.getElementById('empty-message');

      
        let foods = [];

 
        function init() {
            loadFoods();
            updateFoodList();
            updateTotalCalories();
            setupEventListeners();
        }

  
        function setupEventListeners() {
            foodForm.addEventListener('submit', function(e) {
                e.preventDefault();
                addFood();
            });
            
            resetBtn.addEventListener('click', resetFoods);
        }

        function loadFoods() {
            const savedFoods = localStorage.getItem('calorie-counter-foods');
            if (savedFoods) {
                foods = JSON.parse(savedFoods);
            }
        }


        function saveFoods() {
            localStorage.setItem('calorie-counter-foods', JSON.stringify(foods));
        }


        function addFood() {
            const name = foodNameInput.value.trim();
            const calories = parseInt(caloriesInput.value);
            
            if (!name || isNaN(calories) || calories <= 0) {
                alert('Please enter valid food name and calories');
                return;
            }
            
            const food = {
                id: Date.now(),
                name: name,
                calories: calories
            };
            
            foods.push(food);
            saveFoods();
            updateFoodList();
            updateTotalCalories();
            
            // Reset form
            foodForm.reset();
            foodNameInput.focus();
        }


        function removeFood(id) {
            foods = foods.filter(function(food) {
                return food.id !== id;
            });
            saveFoods();
            updateFoodList();
            updateTotalCalories();
        }


        function resetFoods() {
            if (confirm('Are you sure you want to reset all food items?')) {
                foods = [];
                saveFoods();
                updateFoodList();
                updateTotalCalories();
            }
        }


        function updateFoodList() {
            if (foods.length === 0) {
                emptyMessage.style.display = 'block';
                foodList.innerHTML = '';
                foodList.appendChild(emptyMessage);
                return;
            }
            
            emptyMessage.style.display = 'none';
            

            foodList.innerHTML = '';

            foods.forEach(function(food) {
                const foodItem = document.createElement('div');
                foodItem.className = 'food-item';
                foodItem.innerHTML = `
                    <div class="food-info">
                        <div class="food-name">${food.name}</div>
                        <div class="food-calories">${food.calories} calories</div>
                    </div>
                    <button class="delete-btn" onclick="removeFood(${food.id})">×</button>
                `;
                foodList.appendChild(foodItem);
            });
        }


        function updateTotalCalories() {
            const total = foods.reduce(function(sum, food) {
                return sum + food.calories;
            }, 0);
            totalCaloriesDisplay.textContent = total;
        }


        document.addEventListener('DOMContentLoaded', init);

        window.removeFood = removeFood;
    