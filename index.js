// Clear selected places on page load
document.addEventListener('DOMContentLoaded', function() {
    clearSelectedPlaces();
    // Reset all "Add to Trip" buttons
    const buttons = document.querySelectorAll('.add-to-trip-btn');
    buttons.forEach(btn => {
        btn.classList.remove('btn-success');
        btn.classList.add('btn-primary');
        btn.disabled = false;
        const btnText = btn.querySelector('.btn-text');
        if (btnText) {
            btnText.textContent = 'Add to Trip';
        }
    });
});

// Select destination and show suggested places
function selectDestination() {
    const stateSelect = document.getElementById('state-select');
    const districtSelect = document.getElementById('district-select');
    
    if (!stateSelect || !districtSelect) return;
    
    const selectedState = stateSelect.value;
    const selectedDistrict = districtSelect.value;
    
    if (!selectedState || !selectedDistrict) {
        alert('Please select both state and district!');
        return;
    }
    
    const stateName = stateSelect.options[stateSelect.selectedIndex].text;
    const districtName = districtSelect.options[districtSelect.selectedIndex].text;
    
    // Save to localStorage
    saveDestination(stateName, districtName);
    
    // Show selected destination
    const selectedDest = document.getElementById('selected-destination');
    selectedDest.innerHTML = `
        <div class="alert alert-success">
            <h4>✓ Selected Destination: ${districtName}, ${stateName}</h4>
            <p class="mb-0">Check out the suggested places below and then proceed to plan your trip!</p>
        </div>
    `;
    selectedDest.style.display = 'block';
    
    // Show suggested places
    showSuggestedPlaces(districtName);
}

// Show suggested places with images and Add to Trip button
function showSuggestedPlaces(districtName) {
    const places = getPlacesForDistrict(districtName);
    const placesGrid = document.getElementById('places-grid');
    const suggestedPlacesDiv = document.getElementById('suggested-places');
    
    if (!placesGrid || !suggestedPlacesDiv) return;
    
    placesGrid.innerHTML = '';
    
    places.forEach((place, index) => {
        const placeName = typeof place === 'string' ? place : place.name;
        const placeImage = typeof place === 'string' ? 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' : place.image;
        
        const col = document.createElement('div');
        col.className = 'col-md-4 col-sm-6 mb-4';
        col.innerHTML = `
            <div class="card h-100 shadow-sm place-card" data-place-name="${placeName}">
                <img src="${placeImage}" class="card-img-top" alt="${placeName}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">📍 ${placeName}</h5>
                    <p class="card-text text-muted flex-grow-1">Popular tourist attraction</p>
                    <button class="btn btn-primary btn-sm add-to-trip-btn" onclick="addPlaceToTrip('${placeName}', '${placeImage}')">
                        <span class="btn-text">Add to Trip</span>
                    </button>
                </div>
            </div>
        `;
        placesGrid.appendChild(col);
    });
    
    suggestedPlacesDiv.style.display = 'block';
    
    // Add button to view selected places
    const viewSelectedBtn = document.createElement('div');
    viewSelectedBtn.className = 'text-center mt-4';
    viewSelectedBtn.innerHTML = `
        <button class="btn btn-success btn-lg" onclick="viewSelectedPlaces()">View Selected Places & Plan Trip</button>
    `;
    suggestedPlacesDiv.appendChild(viewSelectedBtn);
    
    // Scroll to places
    suggestedPlacesDiv.scrollIntoView({ behavior: 'smooth' });
}

// Add place to trip
function addPlaceToTrip(placeName, placeImage) {
    let selectedPlaces = getSelectedPlaces();
    
    // Check if already added
    if (selectedPlaces.find(p => p.name === placeName)) {
        alert(`${placeName} is already added to your trip!`);
        return;
    }
    
    selectedPlaces.push({ name: placeName, image: placeImage });
    saveSelectedPlaces(selectedPlaces);
    
    // Update button
    const buttons = document.querySelectorAll(`.add-to-trip-btn`);
    buttons.forEach(btn => {
        if (btn.getAttribute('onclick').includes(placeName)) {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-success');
            btn.innerHTML = '<span class="btn-text">✓ Added</span>';
            btn.disabled = true;
        }
    });
    
    // Show notification
    showNotification(`${placeName} added to your trip!`);
}

// View selected places
function viewSelectedPlaces() {
    const selectedPlaces = getSelectedPlaces();
    if (selectedPlaces.length === 0) {
        alert('Please add at least one place to your trip!');
        return;
    }
    
    // Save destination info
    const dest = getDestination();
    if (!dest.state || !dest.district) {
        alert('Please select a destination first!');
        return;
    }
    
    // Redirect to plan trip page
    window.location.href = 'plan-trip.html';
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3';
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
