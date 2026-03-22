// Load payment page data
document.addEventListener('DOMContentLoaded', function() {
    loadBookingSummary();
    loadHotels();
});

function loadBookingSummary() {
    const planJson = localStorage.getItem('travelPlan');
    const summaryContent = document.getElementById('summary-content');
    
    if (!summaryContent) return;
    
    if (!planJson) {
        summaryContent.innerHTML = '<p class="text-muted">Select a destination and generate a plan to see booking details.</p>';
        return;
    }
    
    try {
        const plan = JSON.parse(planJson);
        const hotelSelect = document.getElementById('hotel-select');
        const totalAmount = document.getElementById('total-amount');
        
        updateSummary(plan, hotelSelect, totalAmount, summaryContent);
        
        if (hotelSelect) {
            hotelSelect.onchange = function() {
                updateSummary(plan, hotelSelect, totalAmount, summaryContent);
            };
        }
    } catch (e) {
        summaryContent.innerHTML = '<p class="text-muted">Error loading booking details.</p>';
    }
}

function updateSummary(plan, hotelSelect, totalAmount, summaryContent) {
    // If plan already has hotel cost (new format), use it
    let hotelCost = plan.hotelCost || 0;
    let activityCost = plan.totalCost - hotelCost;
    
    // If hotel is not in plan, calculate from selected hotel
    if (!plan.hotelCost && hotelSelect && hotelSelect.value !== '') {
        const selectedHotelIndex = hotelSelect.value;
        if (hotelsData['default'][selectedHotelIndex]) {
            hotelCost = hotelsData['default'][selectedHotelIndex].price * (plan.days - 1);
            activityCost = plan.totalCost;
        }
    }
    
    const total = plan.totalCost;
    
    summaryContent.innerHTML = `
        <div class="d-flex justify-content-between mb-2">
            <span>Destination:</span>
            <span>${plan.destination}, ${plan.state}</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
            <span>Duration:</span>
            <span>${plan.days} days</span>
        </div>
        ${plan.selectedHotel ? `<div class="d-flex justify-content-between mb-2">
            <span>Hotel:</span>
            <span>${plan.selectedHotel.name}</span>
        </div>` : ''}
        <div class="d-flex justify-content-between mb-2">
            <span>Activity Cost:</span>
            <span>₹${activityCost.toLocaleString()}</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
            <span>Hotel Cost:</span>
            <span>₹${hotelCost.toLocaleString()}</span>
        </div>
        <hr>
        <div class="d-flex justify-content-between fw-bold fs-5 text-primary">
            <span>Total Amount:</span>
            <span>₹${total.toLocaleString()}</span>
        </div>
    `;
    
    if (totalAmount) {
        totalAmount.value = total;
    }
}

function loadHotels() {
    const hotelSelect = document.getElementById('hotel-select');
    if (!hotelSelect) return;
    
    hotelSelect.innerHTML = '<option value="">-- Select Hotel --</option>';
    
    hotelsData['default'].forEach((hotel, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${hotel.name} - ₹${hotel.price}/night`;
        hotelSelect.appendChild(option);
    });
}

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
    
    // Clear localStorage
    localStorage.removeItem('travelPlan');
    localStorage.removeItem('selectedState');
    localStorage.removeItem('selectedDistrict');
}
