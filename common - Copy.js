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

// Popular places data for districts with images
const placesData = {
    'visakhapatnam': [
        {name: 'RK Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'},
        {name: 'Borra Caves', image: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=400'},
        {name: 'Araku Valley', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'},
        {name: 'Kailasagiri', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'},
        {name: 'Submarine Museum', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'}
    ],
    'vijayawada': [
        {name: 'Kanaka Durga Temple', image: 'https://images.unsplash.com/photo-1580327332889-6a85819e01e0?w=400'},
        {name: 'Prakasam Barrage', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Undavalli Caves', image: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=400'},
        {name: 'Bhavani Island', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'}
    ],
    'tirupati': [
        {name: 'Tirumala Temple', image: 'https://images.unsplash.com/photo-1580327332889-6a85819e01e0?w=400'},
        {name: 'Sri Venkateswara Museum', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Talakona Falls', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'},
        {name: 'Chandragiri Fort', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'}
    ],
    'shimla': [
        {name: 'The Ridge', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'},
        {name: 'Jakhu Temple', image: 'https://images.unsplash.com/photo-1580327332889-6a85819e01e0?w=400'},
        {name: 'Mall Road', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400'},
        {name: 'Kufri', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'},
        {name: 'Christ Church', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400'}
    ],
    'manali': [
        {name: 'Solang Valley', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'},
        {name: 'Hadimba Temple', image: 'https://images.unsplash.com/photo-1580327332889-6a85819e01e0?w=400'},
        {name: 'Rohtang Pass', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'},
        {name: 'Manu Temple', image: 'https://images.unsplash.com/photo-1580327332889-6a85819e01e0?w=400'},
        {name: 'Old Manali', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'}
    ],
    'mumbai': [
        {name: 'Gateway of India', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Marine Drive', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'},
        {name: 'Elephanta Caves', image: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=400'},
        {name: 'Juhu Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'},
        {name: 'Siddhivinayak Temple', image: 'https://images.unsplash.com/photo-1580327332889-6a85819e01e0?w=400'}
    ],
    'pune': [
        {name: 'Shaniwar Wada', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'},
        {name: 'Aga Khan Palace', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Sinhagad Fort', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'},
        {name: 'Dagdusheth Temple', image: 'https://images.unsplash.com/photo-1580327332889-6a85819e01e0?w=400'},
        {name: 'Koregaon Park', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'}
    ],
    'bangalore': [
        {name: 'Cubbon Park', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'},
        {name: 'Lalbagh Botanical Garden', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'},
        {name: 'Bangalore Palace', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'ISKCON Temple', image: 'https://images.unsplash.com/photo-1580327332889-6a85819e01e0?w=400'},
        {name: 'UB City', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400'}
    ],
    'mysore': [
        {name: 'Mysore Palace', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Chamundi Hills', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'},
        {name: 'Brindavan Gardens', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'},
        {name: 'St. Philomena Church', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400'},
        {name: 'Zoo', image: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=400'}
    ],
    'kochi': [
        {name: 'Fort Kochi', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'},
        {name: 'Chinese Fishing Nets', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'},
        {name: 'Mattancherry Palace', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Jewish Synagogue', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400'},
        {name: 'Marine Drive', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'}
    ],
    'munnar': [
        {name: 'Tea Plantations', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'},
        {name: 'Eravikulam National Park', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'},
        {name: 'Mattupetty Dam', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'},
        {name: 'Anamudi Peak', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'},
        {name: 'Top Station', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'}
    ],
    'jaipur': [
        {name: 'Hawa Mahal', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Amber Fort', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'},
        {name: 'City Palace', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Jantar Mantar', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Nahargarh Fort', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'}
    ],
    'udaipur': [
        {name: 'City Palace', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Lake Pichola', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'},
        {name: 'Jag Mandir', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Saheliyon Ki Bari', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'},
        {name: 'Fateh Sagar Lake', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'}
    ],
    'jodhpur': [
        {name: 'Mehrangarh Fort', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'},
        {name: 'Jaswant Thada', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Umaid Bhawan Palace', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Mandore Gardens', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'},
        {name: 'Clock Tower', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'}
    ],
    'agra': [
        {name: 'Taj Mahal', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Agra Fort', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'},
        {name: 'Fatehpur Sikri', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'},
        {name: 'Itmad-ud-Daulah', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Mehtab Bagh', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'}
    ],
    'varanasi': [
        {name: 'Ganges Ghats', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'},
        {name: 'Kashi Vishwanath Temple', image: 'https://images.unsplash.com/photo-1580327332889-6a85819e01e0?w=400'},
        {name: 'Sarnath', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Dashashwamedh Ghat', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'},
        {name: 'Manikarnika Ghat', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'}
    ],
    'delhi': [
        {name: 'Red Fort', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'},
        {name: 'India Gate', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Qutub Minar', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Lotus Temple', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400'},
        {name: 'Akshardham Temple', image: 'https://images.unsplash.com/photo-1580327332889-6a85819e01e0?w=400'}
    ],
    'hyderabad': [
        {name: 'Charminar', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Golconda Fort', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'},
        {name: 'Hussain Sagar', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'},
        {name: 'Ramoji Film City', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Salar Jung Museum', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'}
    ],
    'kolkata': [
        {name: 'Victoria Memorial', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Howrah Bridge', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Dakshineswar Temple', image: 'https://images.unsplash.com/photo-1580327332889-6a85819e01e0?w=400'},
        {name: 'Park Street', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400'},
        {name: 'Indian Museum', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'}
    ],
    'darjeeling': [
        {name: 'Tiger Hill', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'},
        {name: 'Batasia Loop', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'},
        {name: 'Darjeeling Himalayan Railway', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'},
        {name: 'Peace Pagoda', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400'},
        {name: 'Tea Gardens', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'}
    ],
    'ooty': [
        {name: 'Ooty Lake', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'},
        {name: 'Botanical Gardens', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'},
        {name: 'Doddabetta Peak', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'},
        {name: 'Rose Garden', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'},
        {name: 'Nilgiri Mountain Railway', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'}
    ],
    'kodaikanal': [
        {name: 'Kodaikanal Lake', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'},
        {name: 'Coaker\'s Walk', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'},
        {name: 'Pillar Rocks', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'},
        {name: 'Bryant Park', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'},
        {name: 'Bear Shola Falls', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'}
    ],
    'goa': [
        {name: 'Calangute Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'},
        {name: 'Baga Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'},
        {name: 'Fort Aguada', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'},
        {name: 'Basilica of Bom Jesus', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400'},
        {name: 'Dudhsagar Falls', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'}
    ],
    'rishikesh': [
        {name: 'Laxman Jhula', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Ram Jhula', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Triveni Ghat', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'},
        {name: 'Neelkanth Mahadev Temple', image: 'https://images.unsplash.com/photo-1580327332889-6a85819e01e0?w=400'},
        {name: 'Beatles Ashram', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'}
    ],
    'haridwar': [
        {name: 'Har Ki Pauri', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'},
        {name: 'Mansa Devi Temple', image: 'https://images.unsplash.com/photo-1580327332889-6a85819e01e0?w=400'},
        {name: 'Chandi Devi Temple', image: 'https://images.unsplash.com/photo-1580327332889-6a85819e01e0?w=400'},
        {name: 'Ganga Aarti', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'},
        {name: 'Shanti Kunj', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'}
    ],
    'nainital': [
        {name: 'Naini Lake', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'},
        {name: 'Naina Devi Temple', image: 'https://images.unsplash.com/photo-1580327332889-6a85819e01e0?w=400'},
        {name: 'Tiffin Top', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'},
        {name: 'Snow View Point', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'},
        {name: 'Eco Cave Gardens', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'}
    ],
    'mussoorie': [
        {name: 'Lal Tibba', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'},
        {name: 'Kempty Falls', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'},
        {name: 'Gun Hill', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'},
        {name: 'Camel\'s Back Road', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'},
        {name: 'Mussoorie Lake', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'}
    ],
    'default': [
        {name: 'Local Markets', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400'},
        {name: 'Historical Monuments', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Temples', image: 'https://images.unsplash.com/photo-1580327332889-6a85819e01e0?w=400'},
        {name: 'Parks', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'},
        {name: 'Museums', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400'},
        {name: 'Viewpoints', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'}
    ]
};

// Get places array (for backward compatibility)
function getPlacesArrayForDistrict(district) {
    const districtKey = district.toLowerCase();
    const places = placesData[districtKey] || placesData['default'];
    return places.map(p => typeof p === 'string' ? p : p.name);
}

// Get places with images
function getPlacesForDistrict(district) {
    const districtKey = district.toLowerCase();
    return placesData[districtKey] || placesData['default'];
}

// Hotels data
const hotelsData = {
    'default': [
        { name: 'Grand Hotel', location: 'City Center', price: 2500, rating: 4.5, amenities: 'WiFi, AC, Pool' },
        { name: 'Comfort Inn', location: 'Near Airport', price: 1800, rating: 4.0, amenities: 'WiFi, AC, Restaurant' },
        { name: 'Budget Stay', location: 'Downtown', price: 1200, rating: 3.5, amenities: 'WiFi, AC' },
        { name: 'Luxury Resort', location: 'Beachside', price: 5000, rating: 4.8, amenities: 'WiFi, AC, Pool, Spa, Restaurant' }
    ]
};

// Store selected destination in localStorage
function saveDestination(state, district) {
    localStorage.setItem('selectedState', state);
    localStorage.setItem('selectedDistrict', district);
}

function getDestination() {
    return {
        state: localStorage.getItem('selectedState') || '',
        district: localStorage.getItem('selectedDistrict') || ''
    };
}

// Load districts when state is selected
function loadDistricts() {
    const stateSelect = document.getElementById('state-select');
    const districtSelect = document.getElementById('district-select');
    
    if (!stateSelect || !districtSelect) return;
    
    const selectedState = stateSelect.value;
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

// Save selected places to trip
function saveSelectedPlaces(places) {
    localStorage.setItem('selectedPlaces', JSON.stringify(places));
}

function getSelectedPlaces() {
    const placesJson = localStorage.getItem('selectedPlaces');
    return placesJson ? JSON.parse(placesJson) : [];
}

function clearSelectedPlaces() {
    localStorage.removeItem('selectedPlaces');
}
