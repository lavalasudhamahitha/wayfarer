// Load hotels on page load
document.addEventListener('DOMContentLoaded', function() {
    loadHotels();
});

function loadHotels() {
    const hotelsList = document.getElementById('hotels-list');
    if (!hotelsList) return;
    
    const hotels = hotelsData['default'];
    
    hotels.forEach((hotel, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';
        col.innerHTML = `
            <div class="card h-100 shadow">
                <div class="card-body">
                    <h5 class="card-title">${hotel.name}</h5>
                    <p class="card-text"><strong>Location:</strong> ${hotel.location}</p>
                    <p class="card-text"><strong>Amenities:</strong> ${hotel.amenities}</p>
                    <p class="card-text"><strong>Rating:</strong> ${hotel.rating} ⭐</p>
                    <h4 class="text-primary">₹${hotel.price}/night</h4>
                    <a href="payment.html" class="btn btn-primary">Book Now</a>
                </div>
            </div>
        `;
        hotelsList.appendChild(col);
    });
}
