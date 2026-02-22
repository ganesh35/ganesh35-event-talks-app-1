const fs = require('fs');

const talksData = [
    {
        id: 'talk-1',
        title: 'Introduction to WebAssembly',
        speakers: ['Alice Smith'],
        category: ['Web Development', 'Performance'],
        description: 'An overview of WebAssembly, its benefits, and how it\\\'s changing web development.',
        duration: 60,
    },
    {
        id: 'talk-2',
        title: 'Deep Dive into React Hooks',
        speakers: ['Bob Johnson', 'Charlie Brown'],
        category: ['Frontend', 'React', 'JavaScript'],
        description: 'Explore advanced patterns and common pitfalls when using React Hooks in complex applications.',
        duration: 60,
    },
    {
        id: 'talk-3',
        title: 'Leveraging AI in Modern Web Apps',
        speakers: ['Diana Miller'],
        category: ['AI/ML', 'Web Development'],
        description: 'How to integrate AI capabilities, such as natural language processing and image recognition, into your web applications.',
        duration: 60,
    },
    {
        id: 'talk-4',
        title: 'Building Scalable APIs with Node.js',
        speakers: ['Eve Davis'],
        category: ['Backend', 'Node.js', 'API'],
        description: 'Best practices for designing and implementing high-performance and scalable RESTful APIs using Node.js and Express.',
        duration: 60,
    },
    {
        id: 'talk-5',
        title: 'Containerization with Docker and Kubernetes',
        speakers: ['Frank White'],
        category: ['DevOps', 'Cloud', 'Containers'],
        description: 'A practical guide to deploying and managing applications using Docker containers and Kubernetes orchestration.',
        duration: 60,
    },
    {
        id: 'talk-6',
        title: 'Effective State Management in Frontend',
        speakers: ['Grace Taylor'],
        category: ['Frontend', 'Architecture'],
        description: 'Comparing different state management solutions for frontend applications and choosing the right one for your project.',
        duration: 60,
    },
];

// This function is for Node.js to calculate the initial schedule
function calculateScheduleNode(talks) {
    let currentHour = 10;
    let currentMinute = 0;
    const schedule = [];

    function addMinutes(hours, minutes, minsToAdd) {
        let totalMinutes = hours * 60 + minutes + minsToAdd;
        let newHours = Math.floor(totalMinutes / 60);
        let newMinutes = totalMinutes % 60;
        return [newHours, newMinutes];
    }

    function formatTime(hours, minutes) {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        return formattedHours + ':' + formattedMinutes + ' ' + ampm;
    }

    let talkIndex = 0;
    while (talkIndex < talks.length) {
        if (talkIndex === 3) { // After the 3rd talk, add lunch
            const lunchStartTime = formatTime(currentHour, currentMinute);
            [currentHour, currentMinute] = addMinutes(currentHour, currentMinute, 60);
            const lunchEndTime = formatTime(currentHour, currentMinute);
            schedule.push({
                type: 'break',
                title: 'Lunch Break',
                duration: 60,
                startTime: lunchStartTime,
                endTime: lunchEndTime,
            });

            // 10-minute transition after lunch break
            const transitionStartTime = formatTime(currentHour, currentMinute);
            [currentHour, currentMinute] = addMinutes(currentHour, currentMinute, 10);
            const transitionEndTime = formatTime(currentHour, currentMinute);
            schedule.push({
                type: 'break',
                title: 'Transition',
                duration: 10,
                startTime: transitionStartTime,
                endTime: transitionEndTime,
            });
        }

        const talk = talks[talkIndex];
        const talkStartTime = formatTime(currentHour, currentMinute);
        [currentHour, currentMinute] = addMinutes(currentHour, currentMinute, talk.duration);
        const talkEndTime = formatTime(currentHour, currentMinute);

        schedule.push({
            ...talk,
            type: 'talk',
            startTime: talkStartTime,
            endTime: talkEndTime,
        });

        talkIndex++;

        if (talkIndex < talks.length) {
            // 10-minute transition between talks
            const transitionStartTime = formatTime(currentHour, currentMinute);
            [currentHour, currentMinute] = addMinutes(currentHour, currentMinute, 10);
            const transitionEndTime = formatTime(currentHour, currentMinute);
            schedule.push({
                type: 'break',
                title: 'Transition',
                duration: 10,
                startTime: transitionStartTime,
                endTime: transitionEndTime,
            });
        }
    }

    return schedule;
}

const fullScheduleInitial = calculateScheduleNode(talksData);

// This function will be embedded in the HTML's client-side script
// It needs to be self-contained and not rely on Node.js scope
const calculateScheduleClient = function(talks) {
    let currentHour = 10;
    let currentMinute = 0;
    const schedule = [];

    function addMinutes(hours, minutes, minsToAdd) {
        let totalMinutes = hours * 60 + minutes + minsToAdd;
        let newHours = Math.floor(totalMinutes / 60);
        let newMinutes = totalMinutes % 60;
        return [newHours, newMinutes];
    }

    function formatTime(hours, minutes) {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        return formattedHours + ':' + formattedMinutes + ' ' + ampm;
    }

    let talkIndex = 0;
    while (talkIndex < talks.length) {
        if (talkIndex === 3) { // After the 3rd talk, add lunch
            const lunchStartTime = formatTime(currentHour, currentMinute);
            [currentHour, currentMinute] = addMinutes(currentHour, currentMinute, 60);
            const lunchEndTime = formatTime(currentHour, currentMinute);
            schedule.push({
                type: 'break',
                title: 'Lunch Break',
                duration: 60,
                startTime: lunchStartTime,
                endTime: lunchEndTime,
            });

            // 10-minute transition after lunch break
            const transitionStartTime = formatTime(currentHour, currentMinute);
            [currentHour, currentMinute] = addMinutes(currentHour, currentMinute, 10);
            const transitionEndTime = formatTime(currentHour, currentMinute);
            schedule.push({
                type: 'break',
                title: 'Transition',
                duration: 10,
                startTime: transitionStartTime,
                endTime: transitionEndTime,
            });
        }

        const talk = talks[talkIndex];
        const talkStartTime = formatTime(currentHour, currentMinute);
        [currentHour, currentMinute] = addMinutes(currentHour, currentMinute, talk.duration);
        const talkEndTime = formatTime(currentHour, currentMinute);

        schedule.push({
            ...talk,
            type: 'talk',
            startTime: talkStartTime,
            endTime: talkEndTime,
        });

        talkIndex++;

        if (talkIndex < talks.length) {
            // 10-minute transition between talks
            const transitionStartTime = formatTime(currentHour, currentMinute);
            [currentHour, currentMinute] = addMinutes(currentHour, currentMinute, 10);
            const transitionEndTime = formatTime(currentHour, currentMinute);
            schedule.push({
                type: 'break',
                title: 'Transition',
                duration: 10,
                startTime: transitionStartTime,
                endTime: transitionEndTime,
            });
        }
    }

    return schedule;
};


const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Technical Talks Event Schedule</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f7f6;
            color: #333;
            line-height: 1.6;
        }
        .container {
            max-width: 960px;
            margin: 20px auto;
            background: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1, h2 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 20px;
        }
        .search-container {
            display: flex;
            justify-content: center;
            margin-bottom: 30px;
            gap: 10px;
        }
        .search-container input[type="text"] {
            padding: 10px 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            width: 70%;
            max-width: 400px;
            font-size: 16px;
        }
        .search-container button {
            padding: 10px 20px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }
        .search-container button:hover {
            background-color: #2980b9;
        }
        .schedule-item {
            background: #ecf0f1;
            border-left: 5px solid #3498db;
            margin-bottom: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            transition: transform 0.2s ease-in-out;
        }
        .schedule-item.talk {
            border-color: #27ae60; /* Green for talks */
        }
        .schedule-item.break {
            background: #fdf6e3;
            border-color: #f39c12; /* Orange for breaks */
            text-align: center;
            font-weight: bold;
        }
        .schedule-item:hover {
            transform: translateY(-3px);
        }
        .schedule-item h3 {
            margin-top: 0;
            color: #27ae60;
            font-size: 20px;
        }
        .schedule-item.break h3 {
             color: #f39c12;
        }
        .schedule-item p {
            margin: 5px 0;
        }
        .schedule-item .time {
            font-weight: bold;
            color: #34495e;
            font-size: 1.1em;
            margin-bottom: 10px;
            display: block;
        }
        .schedule-item .speakers {
            font-style: italic;
            color: #7f8c8d;
        }
        .schedule-item .category {
            background-color: #bdc3c7;
            color: #34495e;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 0.85em;
            margin-right: 5px;
            display: inline-block;
            margin-top: 5px;
        }
        .schedule-item .description {
            margin-top: 10px;
            font-size: 0.95em;
        }
        #no-results {
            text-align: center;
            font-style: italic;
            color: #7f8c8d;
            margin-top: 30px;
            display: none; /* Hidden by default */
        }
        #clear-search {
            display: none; /* Hidden by default */
            margin-top: 20px;
            text-align: center;
        }
        #clear-search button {
            background-color: #e74c3c;
        }
        #clear-search button:hover {
            background-color: #c0392b;
        }
        footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #7f8c8d;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Technical Talks Event Schedule</h1>
        <h2>A Day of Innovation</h2>

        <div class="search-container">
            <input type="text" id="category-search" placeholder="Search by category (e.g., JavaScript, AI/ML)">
            <button onclick="filterSchedule()">Search</button>
        </div>
        <div id="clear-search">
            <button onclick="clearSearch()">Show All Talks</button>
        </div>

        <div id="schedule-container">
            <!-- Schedule items will be dynamically inserted here -->
        </div>

        <p id="no-results">No talks found matching your criteria.</p>

        <footer>
            <p>&copy; 2026 Technical Talks Event. All rights reserved.</p>
        </footer>
    </div>

    <script>
        const allTalksData = ${JSON.stringify(talksData, null, 4)};
        
        // --- calculateSchedule function (client-side) ---
        ${calculateScheduleClient.toString()}
        // --- End calculateSchedule function ---

        const fullSchedule = calculateScheduleClient(allTalksData);

        function renderSchedule(scheduleToRender) {
            const container = document.getElementById('schedule-container');
            container.innerHTML = ''; // Clear previous content
            const noResults = document.getElementById('no-results');
            
            if (scheduleToRender.length === 0) {
                noResults.style.display = 'block';
                return;
            } else {
                noResults.style.display = 'none';
            }

            scheduleToRender.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('schedule-item', item.type);

                if (item.type === 'talk') {
                    itemDiv.innerHTML = 
                        '<span class="time">' + item.startTime + ' - ' + item.endTime + '</span>' +
                        '<h3>' + item.title + '</h3>' +
                        '<p class="speakers">Speaker(s): ' + item.speakers.join(', ') + '</p>' +
                        '<p>' + item.category.map(cat => '<span class="category">' + cat + '</span>').join('') + '</p>' +
                        '<p class="description">' + item.description + '</p>';
                } else if (item.type === 'break') {
                    itemDiv.innerHTML = 
                        '<span class="time">' + item.startTime + ' - ' + item.endTime + '</span>' +
                        '<h3>' + item.title + '</h3>';
                }
                container.appendChild(itemDiv);
            });
        }

        function filterSchedule() {
            const searchTerm = document.getElementById('category-search').value.toLowerCase();
            const clearSearchBtn = document.getElementById('clear-search');

            if (!searchTerm) {
                renderSchedule(fullSchedule);
                clearSearchBtn.style.display = 'none';
                return;
            }

            // Filter only the 'talk' items by category
            const filteredTalks = allTalksData.filter(talk => 
                talk.category.some(cat => cat.toLowerCase().includes(searchTerm))
            );

            // Re-calculate the schedule for filtered talks
            const newSchedule = calculateScheduleClient(filteredTalks);

            renderSchedule(newSchedule);
            clearSearchBtn.style.display = 'block';
        }

        function clearSearch() {
            document.getElementById('category-search').value = '';
            renderSchedule(fullSchedule);
            document.getElementById('clear-search').style.display = 'none';
        }

        // Initial render
        document.addEventListener('DOMContentLoaded', () => {
            renderSchedule(fullSchedule);
        });
    </script>
</body>
</html>
