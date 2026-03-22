// Districts data for each state
const districtsData = {
    'andhra-pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Tirupati', 'Rajahmundry'],
    'arunachal-pradesh': ['Itanagar', 'Tawang', 'Bomdila', 'Pasighat', 'Ziro'],
    'assam': ['Guwahati', 'Dibrugarh', 'Jorhat', 'Silchar', 'Tezpur', 'Sivasagar'],
    'bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Purnia'],
    'chhattisgarh': ['Raipur', 'Bilaspur', 'Durg', 'Korba', 'Jagdalpur'],
    'goa': ['North Goa', 'South Goa', 'Panaji', 'Margao', 'Vasco da Gama'],
    'gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar', 'Jamnagar'],
    'haryana': ['Gurgaon', 'Faridabad', 'Panipat', 'Ambala', 'Karnal', 'Hisar'],
    'himachal-pradesh': ['Shimla', 'Manali', 'Dharamshala', 'Kullu', 'Dalhousie', 'Kasauli'],
    'jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh'],
    'karnataka': ['Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Belgaum', 'Udupi'],
    'kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Alleppey', 'Munnar'],
    'madhya-pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Khajuraho'],
    'maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Aurangabad', 'Nashik', 'Kolhapur'],
    'manipur': ['Imphal', 'Ukhrul', 'Churachandpur'],
    'meghalaya': ['Shillong', 'Cherrapunji', 'Tura'],
    'mizoram': ['Aizawl', 'Lunglei'],
    'nagaland': ['Kohima', 'Dimapur', 'Mokokchung'],
    'odisha': ['Bhubaneswar', 'Cuttack', 'Puri', 'Rourkela', 'Konark'],
    'punjab': ['Amritsar', 'Ludhiana', 'Chandigarh', 'Jalandhar', 'Patiala'],
    'rajasthan': ['Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer', 'Pushkar', 'Mount Abu'],
    'sikkim': ['Gangtok', 'Pelling', 'Lachung'],
    'tamil-nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Ooty', 'Kodaikanal'],
    'telangana': ['Hyderabad', 'Warangal', 'Karimnagar', 'Nizamabad'],
    'tripura': ['Agartala', 'Udaipur'],
    'uttar-pradesh': ['Lucknow', 'Agra', 'Varanasi', 'Allahabad', 'Mathura', 'Ayodhya'],
    'uttarakhand': ['Dehradun', 'Mussoorie', 'Nainital', 'Rishikesh', 'Haridwar', 'Almora'],
    'west-bengal': ['Kolkata', 'Darjeeling', 'Siliguri', 'Durgapur', 'Howrah'],
    'delhi': ['New Delhi', 'Central Delhi', 'North Delhi', 'South Delhi', 'East Delhi'],
    'jammu-kashmir': ['Srinagar', 'Jammu', 'Leh', 'Gulmarg', 'Pahalgam']
};

// Sample hotels data
const hotelsData = {
    'default': [
        { name: 'Grand Hotel', location: 'City Center', price: 2500, rating: 4.5, amenities: 'WiFi, AC, Pool' },
        { name: 'Comfort Inn', location: 'Near Airport', price: 1800, rating: 4.0, amenities: 'WiFi, AC, Restaurant' },
        { name: 'Budget Stay', location: 'Downtown', price: 1200, rating: 3.5, amenities: 'WiFi, AC' },
        { name: 'Luxury Resort', location: 'Beachside', price: 5000, rating: 4.8, amenities: 'WiFi, AC, Pool, Spa, Restaurant' }
    ]
};

let selectedState = '';
let selectedDistrict = '';
let currentPlan = null;

// Load districts when state is selected
function loadDistricts() {
    const stateSelect = document.getElementById('state-select');
    const districtSelect = document.getElementById('district-select');
    
    selectedState = stateSelect.value;
    districtSelect.innerHTML = '<option value="">-- Choose District --</option>';
    
    if (selectedState && districtsData[selectedState]) {
        districtsData[selectedState].forEach(district => {
            const option = document.createElement('option');
            option.value = district.toLowerCase();
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
}

// Select destination
function selectDestination() {
    const stateSelect = document.getElementById('state-select');
    const districtSelect = document.getElementById('district-select');
    
    selectedState = stateSelect.value;
    selectedDistrict = districtSelect.value;
    
    if (!selectedState || !selectedDistrict) {
        alert('Please select both state and district!');
        return;
    }
    
    const stateName = stateSelect.options[stateSelect.selectedIndex].text;
    const districtName = districtSelect.options[districtSelect.selectedIndex].text;
    
    const selectedDest = document.getElementById('selected-destination');
    selectedDest.innerHTML = `
        <h3>✓ Selected Destination: ${districtName}, ${stateName}</h3>
        <p>Now fill in your travel preferences below to generate a personalized plan!</p>
    `;
    selectedDest.classList.add('show');
    
    // Load hotels for the destination
    loadHotels();
    
    // Scroll to chatbot section
    document.getElementById('plan-trip').scrollIntoView({ behavior: 'smooth' });
}

// Load hotels
function loadHotels() {
    const hotelsList = document.getElementById('hotels-list');
    const hotelSelect = document.getElementById('hotel-select');
    
    hotelsList.innerHTML = '';
    hotelSelect.innerHTML = '<option value="">-- Select Hotel --</option>';
    
    const hotels = hotelsData['default']; // In real app, fetch based on location
    
    hotels.forEach((hotel, index) => {
        // Display hotel cards
        const hotelCard = document.createElement('div');
        hotelCard.className = 'hotel-card';
        hotelCard.innerHTML = `
            <h3>${hotel.name}</h3>
            <p><strong>Location:</strong> ${hotel.location}</p>
            <p><strong>Amenities:</strong> ${hotel.amenities}</p>
            <p><strong>Rating:</strong> ${hotel.rating} ⭐</p>
            <p class="hotel-price">₹${hotel.price}/night</p>
        `;
        hotelsList.appendChild(hotelCard);
        
        // Add to select dropdown
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${hotel.name} - ₹${hotel.price}/night`;
        hotelSelect.appendChild(option);
    });
}

// Generate travel plan
function generatePlan() {
    const days = parseInt(document.getElementById('days').value);
    const budget = parseInt(document.getElementById('budget').value);
    const interests = Array.from(document.querySelectorAll('.interests-grid input[type="checkbox"]:checked'))
        .map(cb => cb.value);
    
    if (!selectedState || !selectedDistrict) {
        alert('Please select a destination first!');
        return;
    }
    
    if (!days || days < 1) {
        alert('Please enter valid number of days!');
        return;
    }
    
    if (!budget || budget < 1000) {
        alert('Please enter a valid budget (minimum ₹1000)!');
        return;
    }
    
    if (interests.length === 0) {
        alert('Please select at least one interest!');
        return;
    }
    
    // Generate AI-powered plan
    const plan = createTravelPlan(days, budget, interests);
    currentPlan = plan;
    
    // Display plan
    displayTravelPlan(plan);
    
    // Update booking summary
    updateBookingSummary(plan);
    
    // Add bot message
    addBotMessage(`Great! I've created a ${days}-day travel plan for you based on your interests: ${interests.join(', ')}. The total estimated cost is ₹${plan.totalCost.toLocaleString()}.`);
}

// Create travel plan (AI simulation)
function createTravelPlan(days, budget, interests) {
    const dailyBudget = budget / days;
    const hotelPrice = 2000; // Average hotel price per night
    const foodBudget = dailyBudget * 0.3;
    const activityBudget = dailyBudget * 0.4;
    const transportBudget = dailyBudget * 0.2;
    const hotelBudget = hotelPrice;
    
    const plan = {
        destination: document.getElementById('district-select').options[document.getElementById('district-select').selectedIndex].text,
        state: document.getElementById('state-select').options[document.getElementById('state-select').selectedIndex].text,
        days: days,
        totalBudget: budget,
        interests: interests,
        dailyPlan: [],
        totalCost: 0
    };
    
    // Generate daily itinerary
    for (let day = 1; day <= days; day++) {
        const dayPlan = {
            day: day,
            activities: [],
            meals: [],
            accommodation: day === 1 ? 'Check-in to hotel' : (day === days ? 'Check-out from hotel' : 'Stay at hotel'),
            cost: 0
        };
        
        // Morning activity
        if (interests.includes('adventure')) {
            dayPlan.activities.push('Adventure activity (Trekking/Rock Climbing)');
            dayPlan.cost += activityBudget * 0.4;
        } else if (interests.includes('history')) {
            dayPlan.activities.push('Visit historical monuments and museums');
            dayPlan.cost += activityBudget * 0.3;
        } else if (interests.includes('beaches')) {
            dayPlan.activities.push('Beach activities and water sports');
            dayPlan.cost += activityBudget * 0.4;
        } else if (interests.includes('mountains')) {
            dayPlan.activities.push('Mountain trekking and scenic views');
            dayPlan.cost += activityBudget * 0.3;
        } else {
            dayPlan.activities.push('Explore local attractions');
            dayPlan.cost += activityBudget * 0.3;
        }
        
        // Afternoon activity
        if (interests.includes('wildlife')) {
            dayPlan.activities.push('Wildlife safari or nature walk');
            dayPlan.cost += activityBudget * 0.3;
        } else if (interests.includes('shopping')) {
            dayPlan.activities.push('Shopping at local markets');
            dayPlan.cost += activityBudget * 0.2;
        } else if (interests.includes('spiritual')) {
            dayPlan.activities.push('Visit temples and spiritual sites');
            dayPlan.cost += activityBudget * 0.2;
        } else {
            dayPlan.activities.push('Local sightseeing');
            dayPlan.cost += activityBudget * 0.2;
        }
        
        // Evening activity
        if (interests.includes('food')) {
            dayPlan.activities.push('Food tour and local cuisine experience');
            dayPlan.cost += foodBudget * 0.5;
        } else {
            dayPlan.activities.push('Evening leisure time');
            dayPlan.cost += activityBudget * 0.1;
        }
        
        // Meals
        dayPlan.meals = ['Breakfast', 'Lunch', 'Dinner'];
        dayPlan.cost += foodBudget;
        
        // Accommodation cost
        if (day < days) {
            dayPlan.cost += hotelBudget;
        }
        
        // Transport
        dayPlan.cost += transportBudget;
        
        plan.totalCost += dayPlan.cost;
        plan.dailyPlan.push(dayPlan);
    }
    
    // Adjust if over budget
    if (plan.totalCost > budget) {
        const ratio = budget / plan.totalCost;
        plan.dailyPlan.forEach(day => {
            day.cost = Math.round(day.cost * ratio);
        });
        plan.totalCost = budget;
    }
    
    return plan;
}

// Display travel plan
function displayTravelPlan(plan) {
    const planDiv = document.getElementById('travel-plan');
    let html = `
        <h3>📋 Your Personalized Travel Plan</h3>
        <p><strong>Destination:</strong> ${plan.destination}, ${plan.state}</p>
        <p><strong>Duration:</strong> ${plan.days} days</p>
        <p><strong>Total Budget:</strong> ₹${plan.totalBudget.toLocaleString()}</p>
        <p><strong>Estimated Cost:</strong> ₹${plan.totalCost.toLocaleString()}</p>
        <hr style="margin: 20px 0;">
    `;
    
    plan.dailyPlan.forEach(dayPlan => {
        html += `
            <div class="day-plan">
                <h4>Day ${dayPlan.day}</h4>
                <p><strong>Activities:</strong></p>
                <ul>
                    ${dayPlan.activities.map(act => `<li>${act}</li>`).join('')}
                </ul>
                <p><strong>Meals:</strong> ${dayPlan.meals.join(', ')}</p>
                <p><strong>Accommodation:</strong> ${dayPlan.accommodation}</p>
                <p><strong>Estimated Cost:</strong> ₹${Math.round(dayPlan.cost).toLocaleString()}</p>
            </div>
        `;
    });
    
    planDiv.innerHTML = html;
    planDiv.classList.add('show');
    
    // Scroll to plan
    planDiv.scrollIntoView({ behavior: 'smooth' });
}

// Update booking summary
function updateBookingSummary(plan) {
    const summaryContent = document.getElementById('summary-content');
    const hotelSelect = document.getElementById('hotel-select');
    const totalAmount = document.getElementById('total-amount');
    
    const selectedHotelIndex = hotelSelect.value;
    let hotelCost = 0;
    if (selectedHotelIndex !== '') {
        const hotels = hotelsData['default'];
        hotelCost = hotels[selectedHotelIndex].price * (plan.days - 1);
    }
    
    const total = plan.totalCost + hotelCost;
    
    summaryContent.innerHTML = `
        <div class="summary-item">
            <span>Destination:</span>
            <span>${plan.destination}, ${plan.state}</span>
        </div>
        <div class="summary-item">
            <span>Duration:</span>
            <span>${plan.days} days</span>
        </div>
        <div class="summary-item">
            <span>Travel Plan Cost:</span>
            <span>₹${plan.totalCost.toLocaleString()}</span>
        </div>
        <div class="summary-item">
            <span>Hotel Cost:</span>
            <span>₹${hotelCost.toLocaleString()}</span>
        </div>
        <div class="summary-total">
            <span>Total Amount:</span>
            <span>₹${total.toLocaleString()}</span>
        </div>
    `;
    
    totalAmount.value = total;
    
    // Update when hotel selection changes
    hotelSelect.onchange = function() {
        updateBookingSummary(plan);
    };
}

// Chatbot functions
function addBotMessage(text) {
    const messagesDiv = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `<p>${text}</p>`;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addUserMessage(text) {
    const messagesDiv = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `<p>${text}</p>`;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    addUserMessage(message);
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const response = generateChatbotResponse(message);
        addBotMessage(response);
    }, 1000);
}

function generateChatbotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return 'Hello! I\'m here to help you plan your trip. What would you like to know?';
    } else if (lowerMessage.includes('budget') || lowerMessage.includes('cost')) {
        return 'The budget depends on your travel duration and preferences. A typical 5-day trip can cost between ₹20,000 to ₹50,000 per person. Would you like me to create a customized plan?';
    } else if (lowerMessage.includes('hotel') || lowerMessage.includes('accommodation')) {
        return 'We have various hotels ranging from budget (₹1,200/night) to luxury (₹5,000/night). All hotels include WiFi, AC, and other amenities. Select a hotel from the Hotels section!';
    } else if (lowerMessage.includes('best') || lowerMessage.includes('recommend')) {
        return 'Based on your selected destination, I recommend visiting the popular tourist spots, trying local cuisine, and experiencing the culture. Generate a plan to see detailed recommendations!';
    } else if (lowerMessage.includes('weather') || lowerMessage.includes('climate')) {
        return 'The weather varies by destination. Generally, October to March is the best time to visit most places in India. Check local weather forecasts before your trip!';
    } else if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
        return 'You can pay using UPI, Credit/Debit Card, or Net Banking. All transactions are secure. Fill in the payment form to complete your booking!';
    } else {
        return 'That\'s interesting! For more specific information, please generate a travel plan with your preferences, or feel free to ask me anything else about your trip!';
    }
}

// Process payment
function processPayment(event) {
    event.preventDefault();
    
    const name = document.getElementById('card-name').value;
    const email = document.getElementById('card-email').value;
    const phone = document.getElementById('card-phone').value;
    const hotelIndex = document.getElementById('hotel-select').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const totalAmount = document.getElementById('total-amount').value;
    
    if (!hotelIndex) {
        alert('Please select a hotel!');
        return;
    }
    
    if (!paymentMethod) {
        alert('Please select a payment method!');
        return;
    }
    
    // Simulate payment processing
    alert(`Payment Processing...\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPayment Method: ${paymentMethod}\nAmount: ₹${parseInt(totalAmount).toLocaleString()}\n\n✅ Payment Successful!\n\nYour booking has been confirmed. You will receive a confirmation email shortly.`);
    
    // Reset form
    document.getElementById('payment-form').reset();
    addBotMessage('Great! Your payment has been processed successfully. Your booking is confirmed. Have a wonderful trip! 🎉');
}

// Allow Enter key in chatbot input
document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});
