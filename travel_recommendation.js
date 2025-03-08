const btnSearch = document.getElementById('btnSearch');
const keyword = document.getElementById('keyword');
const result = document.getElementById('result');
const country_names = ["australia", "japan", "brazil"]
function search_destination(){
    const input = keyword.value.toLowerCase();
    console.log("input: ", input);
    result.innerHTML = ''; 
    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        let destination;
        let bool_country = false;
        if (country_names.includes(input)){
            destination = data.countries.find(item => input.includes(item.name.toLowerCase()));
            bool_country = true;
        } else{
            const temple_var = ['temple', 'temples']
            const beach_var = ['beach', 'beaches']
            if (temple_var.includes(input.toLowerCase())){
                destination = data.temples;
                destination['name'] = 'Temples';
            } else if (beach_var.includes(input.toLowerCase())){
                destination = data.beaches;
                destination['name'] = 'Beaches';
            }
        }
        if (destination && bool_country) {
            const city_one = destination.cities[0]; 
            const city_two = destination.cities[1];
            
            // Format options for time display
            const timeOptions = { 
                timeZone: '', 
                hour12: true, 
                hour: 'numeric', 
                minute: 'numeric',
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            };
            
            let display_time = '';
            if (destination.name === 'Australia') {
                timeOptions.timeZone = 'Australia/Sydney';
                display_time = new Date().toLocaleString('en-US', timeOptions);
            } else if (destination.name === 'Japan') {
                timeOptions.timeZone = 'Asia/Tokyo';
                display_time = new Date().toLocaleString('en-US', timeOptions);
            } else if (destination.name === 'Brazil') {
                timeOptions.timeZone = 'America/Sao_Paulo';
                display_time = new Date().toLocaleString('en-US', timeOptions);
            }
            
            result.innerHTML += `<div class="destination-container">
                <h2 class="country-title">${destination.name}</h2>
                <div class="time-display">
                    <span class="time-icon">🕒</span>
                    <span class="current-time">Current local time: ${display_time}</span>
                </div>
                <div class="destination-grid">
                    <div class="destination-card">
                        <h3>${city_one.name}</h3>
                        <div class="image-container">
                            <img src="${city_one.imageUrl}" alt="${city_one.name}">
                        </div>
                        <p>${city_one.description}</p>
                    </div>
                    <div class="destination-card">
                        <h3>${city_two.name}</h3>
                        <div class="image-container">
                            <img src="${city_two.imageUrl}" alt="${city_two.name}">
                        </div>
                        <p>${city_two.description}</p>
                    </div>
                </div>
            </div>`;
        } else if (destination && !bool_country) {
            const part_one = destination[0];
            const part_two = destination[1];
            result.innerHTML += `<div class="destination-container">
                <h2 class="category-title">${destination.name}</h2>
                <div class="destination-grid">
                    <div class="destination-card">
                        <h3>${part_one.name}</h3>
                        <div class="image-container">
                            <img src="${part_one.imageUrl}" alt="${part_one.name}">
                        </div>
                        <p>${part_one.description}</p>
                    </div>
                    <div class="destination-card">
                        <h3>${part_two.name}</h3>
                        <div class="image-container">
                            <img src="${part_two.imageUrl}" alt="${part_two.name}">
                        </div>
                        <p>${part_two.description}</p>
                    </div>
                </div>
            </div>`;
        } else {
            result.innerHTML = `<p class="no-results">No destination found</p>`;
        }
    }).catch(error => {
        console.error('Error fetching data:', error);
        result.innerHTML = `<p>An error occurred while fetching data</p>`;
    });
}
function reset_search(){
    keyword.value = '';
    result.innerHTML = '';
}

// Add event listener for the Enter key
keyword.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission if within a form
        search_destination();
    }
});

btnSearch.addEventListener('click', search_destination);
btnReset.addEventListener('click', reset_search);