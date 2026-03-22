// Store selected hotel index
let selectedHotelIndex = null;

// Load destination info on page load
document.addEventListener('DOMContentLoaded', function() {
    const dest = getDestination();
    if (dest.state && dest.district) {
        const destInfo = document.getElementById('destination-info');
        const destName = document.getElementById('dest-name');
        if (destInfo && destName) {
            destName.textContent = `${dest.district}, ${dest.state}`;
            destInfo.style.display = 'block';
        }
    } else {
        alert('Please select a destination from the home page first!');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
});

// Open hotel selection modal
function openHotelSelectionModal() {
    const modal = new bootstrap.Modal(document.getElementById('hotelSelectionModal'));
    const hotelsGrid = document.getElementById('hotels-grid-modal');
    
    if (!hotelsGrid) return;
    
    hotelsGrid.innerHTML = '';
    
    hotelsData['default'].forEach((hotel, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-6';
        col.innerHTML = `
            <div class="card h-100 shadow-sm hotel-card-modal ${selectedHotelIndex == index ? 'border-success border-3' : ''}" 
                 onclick="selectHotel(${index})" style="cursor: pointer;">
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" 
                     class="card-img-top" alt="${hotel.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${hotel.name}</h5>
                    <p class="card-text"><strong>Location:</strong> ${hotel.location}</p>
                    <p class="card-text"><strong>Amenities:</strong> ${hotel.amenities}</p>
                    <p class="card-text">
                        <strong>Rating:</strong> 
                        ${'⭐'.repeat(Math.floor(hotel.rating))} ${hotel.rating}
                    </p>
                    <h4 class="text-primary mb-0">₹${hotel.price}/night</h4>
                    ${selectedHotelIndex == index ? '<p class="text-success mt-2"><strong>✓ Selected</strong></p>' : ''}
                </div>
            </div>
        `;
        hotelsGrid.appendChild(col);
    });
    
    modal.show();
}

// Select hotel
function selectHotel(index) {
    selectedHotelIndex = index;
    const selectedHotel = hotelsData['default'][index];
    
    // Update display
    const selectedHotelDisplay = document.getElementById('selected-hotel-display');
    const selectedHotelName = document.getElementById('selected-hotel-name');
    
    if (selectedHotelDisplay && selectedHotelName) {
        selectedHotelName.textContent = `${selectedHotel.name} - ₹${selectedHotel.price}/night`;
        selectedHotelDisplay.style.display = 'block';
    }
    
    // Refresh modal to show selected state
    const hotelsGrid = document.getElementById('hotels-grid-modal');
    if (hotelsGrid) {
        hotelsGrid.innerHTML = '';
        
        hotelsData['default'].forEach((hotel, idx) => {
            const col = document.createElement('div');
            col.className = 'col-md-6';
            col.innerHTML = `
                <div class="card h-100 shadow-sm hotel-card-modal ${selectedHotelIndex == idx ? 'border-success border-3' : ''}" 
                     onclick="selectHotel(${idx})" style="cursor: pointer;">
                    <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" 
                         class="card-img-top" alt="${hotel.name}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${hotel.name}</h5>
                        <p class="card-text"><strong>Location:</strong> ${hotel.location}</p>
                        <p class="card-text"><strong>Amenities:</strong> ${hotel.amenities}</p>
                        <p class="card-text">
                            <strong>Rating:</strong> 
                            ${'⭐'.repeat(Math.floor(hotel.rating))} ${hotel.rating}
                        </p>
                        <h4 class="text-primary mb-0">₹${hotel.price}/night</h4>
                        ${selectedHotelIndex == idx ? '<p class="text-success mt-2"><strong>✓ Selected</strong></p>' : ''}
                    </div>
                </div>
            `;
            hotelsGrid.appendChild(col);
        });
    }
}

// Generate day-by-day plan
function generateDayByDayPlan() {
    const days = parseInt(document.getElementById('days').value);
    const budget = parseInt(document.getElementById('budget').value);
    
    const dest = getDestination();
    if (!dest.state || !dest.district) {
        alert('Please select a destination from the home page first!');
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
    
    if (selectedHotelIndex === null || selectedHotelIndex === undefined) {
        alert('Please select a hotel by clicking "View & Select Hotels"!');
        return;
    }
    
    // Get hotel details
    const selectedHotel = hotelsData['default'][selectedHotelIndex];
    const hotelPrice = selectedHotel.price;
    const hotelCost = hotelPrice * (days - 1);
    
    // Generate plan (budget should exclude hotel cost for activities)
    const activityBudget = budget - hotelCost;
    if (activityBudget < 1000) {
        alert('Budget is too low after hotel cost. Please increase your budget!');
        return;
    }
    
    // Generate plan
    const plan = createDayByDayPlan(days, activityBudget, dest.district, selectedHotelIndex, hotelCost);
    
    // Save plan to localStorage
    localStorage.setItem('travelPlan', JSON.stringify(plan));
    
    // Display plan
    displayDayByDaySchedule(plan);
}

// Create day-by-day plan
function createDayByDayPlan(days, activityBudget, district, hotelIndex, hotelCost) {
    const dailyBudget = activityBudget / days;
    const foodBudget = dailyBudget * 0.3;
    const activityBudgetPerDay = dailyBudget * 0.4;
    const transportBudget = dailyBudget * 0.2;
    
    // Get selected hotel
    const selectedHotel = hotelsData['default'][hotelIndex];
    
    // Get selected places or default places
    let selectedPlaces = getSelectedPlaces();
    if (selectedPlaces.length === 0) {
        const placesArray = getPlacesArrayForDistrict(district);
        selectedPlaces = placesArray.map(name => ({ name, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' }));
    }
    
    const plan = {
        destination: district,
        state: getDestination().state,
        days: days,
        activityBudget: activityBudget,
        hotelCost: hotelCost,
        totalBudget: activityBudget + hotelCost,
        selectedHotel: selectedHotel,
        selectedPlaces: selectedPlaces,
        dailyPlan: [],
        totalCost: 0
    };
    
    // Generate daily itinerary
    for (let day = 1; day <= days; day++) {
        const dayPlan = {
            day: day,
            morning: '',
            afternoon: '',
            evening: '',
            meals: ['Breakfast', 'Lunch', 'Dinner'],
            accommodation: day === 1 ? 'Check-in to hotel' : (day === days ? 'Check-out from hotel' : 'Stay at hotel'),
            places: [],
            cost: 0
        };
        
        // Use selected places
        const places = selectedPlaces.map(p => p.name);
        
        // Select places for the day (distribute selected places across days)
        const placesPerDay = Math.ceil(places.length / days);
        const startIndex = (day - 1) * placesPerDay;
        const endIndex = Math.min(startIndex + placesPerDay, places.length);
        const dayPlaces = places.slice(startIndex, endIndex);
        
        // Morning activity
        if (dayPlaces.length > 0) {
            dayPlan.morning = `Visit ${dayPlaces[0]}`;
            dayPlan.places.push(dayPlaces[0]);
        } else {
            dayPlan.morning = `Explore local attractions`;
        }
        
        // Afternoon activity
        if (dayPlaces.length > 1) {
            dayPlan.afternoon = `Visit ${dayPlaces[1]}`;
            dayPlan.places.push(dayPlaces[1]);
        } else {
            dayPlan.afternoon = `Local sightseeing`;
        }
        
        // Evening activity
        if (dayPlaces.length > 2) {
            dayPlan.evening = `Evening at ${dayPlaces[2]}`;
            dayPlan.places.push(dayPlaces[2]);
        } else {
            dayPlan.evening = `Evening leisure time`;
        }
        
        // Add cost for visiting places and activities
        dayPlan.cost += dayPlaces.length * (activityBudgetPerDay * 0.3);
        dayPlan.cost += activityBudgetPerDay * 0.5;
        
        // Meals
        dayPlan.cost += foodBudget;
        
        // Accommodation cost
        if (day < days) {
            dayPlan.cost += hotelPrice;
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

// Display day-by-day schedule
function displayDayByDaySchedule(plan) {
    const scheduleContainer = document.getElementById('schedule-container');
    const scheduleDays = document.getElementById('schedule-days');
    
    if (!scheduleContainer || !scheduleDays) return;
    
    scheduleDays.innerHTML = '';
    
    // Show selected places summary
    if (plan.selectedPlaces && plan.selectedPlaces.length > 0) {
        const placesCol = document.createElement('div');
        placesCol.className = 'col-12 mb-3';
        placesCol.innerHTML = `
            <div class="card border-info">
                <div class="card-header bg-info text-white">
                    <h5 class="mb-0">📍 Selected Places for Your Trip</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        ${plan.selectedPlaces.map(place => `
                            <div class="col-md-3 col-sm-6 mb-2">
                                <span class="badge bg-primary">${typeof place === 'string' ? place : place.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        scheduleDays.appendChild(placesCol);
    }
    
    plan.dailyPlan.forEach(dayPlan => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';
        col.innerHTML = `
            <div class="card h-100 shadow">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">Day ${dayPlan.day}</h5>
                </div>
                <div class="card-body">
                    <p><strong>Morning:</strong> ${dayPlan.morning}</p>
                    <p><strong>Afternoon:</strong> ${dayPlan.afternoon}</p>
                    <p><strong>Evening:</strong> ${dayPlan.evening}</p>
                    ${dayPlan.places && dayPlan.places.length > 0 ? `<p><strong>Places:</strong> ${dayPlan.places.join(', ')}</p>` : ''}
                    <hr>
                    <p><strong>Meals:</strong> ${dayPlan.meals.join(', ')}</p>
                    <p><strong>Accommodation:</strong> ${dayPlan.accommodation}</p>
                    <p class="text-primary"><strong>Cost: ₹${Math.round(dayPlan.cost).toLocaleString()}</strong></p>
                </div>
            </div>
        `;
        scheduleDays.appendChild(col);
    });
    
    // Add summary card
    const summaryCol = document.createElement('div');
    summaryCol.className = 'col-12';
    const activityCost = plan.totalCost - plan.hotelCost;
    summaryCol.innerHTML = `
        <div class="card shadow-lg border-success">
            <div class="card-header bg-success text-white">
                <h4 class="mb-0">Trip Summary</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <p><strong>Destination:</strong> ${plan.destination}, ${plan.state}</p>
                        <p><strong>Duration:</strong> ${plan.days} days</p>
                        <p><strong>Hotel:</strong> ${plan.selectedHotel.name} (₹${plan.selectedHotel.price}/night)</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Activity Cost:</strong> ₹${activityCost.toLocaleString()}</p>
                        <p><strong>Hotel Cost:</strong> ₹${plan.hotelCost.toLocaleString()}</p>
                        <p><strong>Total Budget:</strong> ₹${plan.totalBudget.toLocaleString()}</p>
                        <p class="fs-5 text-primary"><strong>Total Estimated Cost:</strong> ₹${plan.totalCost.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    scheduleDays.appendChild(summaryCol);
    
    scheduleContainer.style.display = 'block';
    
    // Show payment section
    showPaymentSection(plan);
    
    scheduleContainer.scrollIntoView({ behavior: 'smooth' });
}

// Show payment section
function showPaymentSection(plan) {
    const paymentSection = document.getElementById('payment-section');
    const bookingSummary = document.getElementById('booking-summary-content');
    const totalAmount = document.getElementById('total-amount');
    
    if (!paymentSection || !bookingSummary) return;
    
    const activityCost = plan.totalCost - plan.hotelCost;
    
    bookingSummary.innerHTML = `
        <div class="d-flex justify-content-between mb-2">
            <span>Destination:</span>
            <span>${plan.destination}, ${plan.state}</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
            <span>Duration:</span>
            <span>${plan.days} days</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
            <span>Hotel:</span>
            <span>${plan.selectedHotel.name}</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
            <span>Activity Cost:</span>
            <span>₹${activityCost.toLocaleString()}</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
            <span>Hotel Cost:</span>
            <span>₹${plan.hotelCost.toLocaleString()}</span>
        </div>
        <hr>
        <div class="d-flex justify-content-between fw-bold fs-5 text-primary">
            <span>Total Amount:</span>
            <span>₹${plan.totalCost.toLocaleString()}</span>
        </div>
    `;
    
    if (totalAmount) {
        totalAmount.value = plan.totalCost;
    }
    
    paymentSection.style.display = 'block';
}

// Process payment
function processPayment(event) {
    event.preventDefault();
    
    const name = document.getElementById('card-name').value;
    const email = document.getElementById('card-email').value;
    const phone = document.getElementById('card-phone').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const totalAmount = document.getElementById('total-amount').value;
    
    if (!paymentMethod) {
        alert('Please select a payment method!');
        return;
    }
    
    // Simulate payment processing
    alert(`Payment Processing...\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPayment Method: ${paymentMethod}\nAmount: ₹${parseInt(totalAmount).toLocaleString()}\n\n✅ Payment Successful!\n\nYour booking has been confirmed. You will receive a confirmation email shortly.`);
    
    // Reset form
    document.getElementById('payment-form').reset();
    
    // Clear localStorage
    localStorage.removeItem('travelPlan');
    localStorage.removeItem('selectedState');
    localStorage.removeItem('selectedDistrict');
    localStorage.removeItem('selectedPlaces');
    
    // Redirect to home
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Go to chatbot page
function goToChatbot() {
    window.location.href = 'chatbot.html';
}
