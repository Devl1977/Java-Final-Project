Project description:
I am trying to work on a movie database where the main feature (which is being asked in this class) 
Is to show a client and serverside communication.  That being said i want to try doing something where a
consumer can click on "add to watch list" on certain movies, and when the costomer clicks on "watch list"
It will pull the data according to that list.  basically only showing what they're watching.

Project Overview and description:

I am trying to work on a movie database where the main feature (which is being asked in this class) Is to show a client and server-side communication. I want to try doing something where a consumer can click on "add to watch list" on certain movies, and when the customer clicks on "watch list" It will pull the data according to that list.  Basically, only showing what they're watching.
Currently the work on this project is not complete.  I incorporated the movie database into my design.  What I need to work with currently is the call to action from the client (being a button or a clickable item on the index) and then having the server or the movie database present the data pertaining to that request. 
As it stands right now the information is fed to the page automatically.  I wanted to get a fleshed out look before digging further into the behavior of the watch-list.


1. Current System Architecture (subject to change)
This project has a three-layer architecture involving:
•	Presentation Layer (index.html & Movies.css): This layer structures and styles the user interface. HTML defines the page structure, while CSS styles the navigation, buttons, and movie display elements.
•	Business Logic Layer (Movies.js): JavaScript manages data fetching, UI updates, and interactions. The script fetches data from the movie database API, processes it, and dynamically updates the page content.
•	Data Layer: The data comes from an external API (themoviedb.org) and includes information on movie genres, types, and individual movie details. Data is not stored locally; instead, it’s fetched on demand.





2. Data Dictionary (also subject to change)
Key elements handled by the JavaScript file (Movies.js) and represented in the HTML include:
Name	Type	Description
genres	Array	Holds movie genres retrieved from the API, each item containing id and name of genres.
popularMovies	Array	Contains popular movies data, each item including title, poster_path, overview, etc.
upcomingMovies	Array	Contains upcoming movies data, structured similarly to popularMovies.
topRatedMovies	Array	Contains top-rated movies data, with a similar structure to popularMovies.
movieLayer	HTMLElement	Dynamic HTML element that represents each movie.
bannerElement	HTMLElement	The banner section element updated to display selected movie details or background images.
3. Data Design (also subject to change)
•	Data Flow: Data flows from the API to the UI through the JavaScript code. Functions like fetchGenres and fetchData retrieve data, which is then used to create dynamic content blocks for movies.
•	Data Structure:
o	Movies are represented as objects within arrays (popularMovies, upcomingMovies, etc.) and contain properties like title, poster_path, genre_ids, release_date, and overview.
o	Genres are stored as objects with id and name, facilitating genre lookup for movies.
•	Dynamic DOM Elements: Elements like .grid-container and .movie are dynamically populated based on API data, creating a responsive and interactive UI.


User Interface (UI) Design: 
The focus is on a clean, structured, and user-centered approach to allow users to easily explore and search for movies. But, as part of this project, you wanted us to focus on the client-server relationship, thus the watch-list feature (which will be included).   Here’s a breakdown of the UI components and their design aspects:
1. Navigation Bar
•	Position: A fixed navigation bar at the top provides quick access to different sections (Movies, TV Shows, People, More).
•	Structure: Uses a horizontal menu with links styled as buttons, aligning with a familiar website navigation layout.
•	Design Elements: The navigation bar has a dark background color with white text for high contrast. Hover effects change the background of inactive items to a darker shade, enhancing user feedback on interaction.
2. Banner Section
•	Purpose: Acts as a welcoming visual with a brief introduction and search functionality.
•	Design:
o	Features a background image that reflects the movie theme, styled to be full-width and centered for aesthetic appeal.
o	Text overlays, such as the greeting and call-to-action, are white to contrast against the image, ensuring readability.
o	The banner is the focal point upon landing, encouraging users to start exploring right away by searching for a movie.
3. Search Functionality
•	Search Box: Positioned within the banner with a prominent input field for movie searches. It has rounded corners and a subtle gray background, adding a modern look.
•	Search Button: Styled in green with white text, making it stand out and inviting user interaction. This clear color choice guides users towards the primary action of searching for a movie.

4. Movie Categories Buttons
•	Location: Positioned directly below the banner.
•	Design: Three main buttons (Upcoming Movies, Popular Movies, Top Rated Movies) are styled similarly to the search button, creating a cohesive and consistent look across interactive elements.
•	Functionality: Each button, when clicked, filters the displayed movie list and updates the headline to reflect the selected category, enhancing the interactive aspect and making it easy to explore different sets of movies.
5. Movie Display (Grid View)
•	Layout: A responsive grid design (grid-container) displays movies in card-like formats, adapting to different screen sizes. For example, on larger screens, the grid shows up to five columns, while on smaller screens, it adjusts to fewer columns.
•	Movie Card Components:
o	Movie Poster: Each movie is represented with a poster image as the main visual, set as a background image on hover-able movie-image elements.
o	Overlay Text: When hovering, a translucent overlay with the movie's description appears, giving users a quick synopsis.
o	Additional Info: Below the image, details like title, release year, and genres appear in a structured format.
•	Visual Design: The movie cards use minimal borders and rounded corners, providing a modern and appealing look that aligns with current web design standards.
6. Responsiveness
•	Media Queries: The CSS includes media queries to adjust the grid layout based on the screen size, ensuring that the UI remains accessible and visually pleasing on various devices (e.g., tablets, desktops, and phones).
7. User Feedback and Interaction
•	Interactive Hover Effects: Navigation links, buttons, and movie cards feature hover effects, giving users visual feedback when interacting with elements.
•	Dynamic Content Updates: JavaScript enables real-time updates of the movie display based on user actions, like filtering by popular, upcoming, or top-rated movies.
Summary
This UI design emphasizes clarity, ease of navigation, visual appeal, and responsive adaptability. These choices make the application intuitive for users to explore and find movies in an engaging way. Let me know if you’d like guidance on enhancing any specific part!


This architecture and design approach provides a user-friendly experience with real-time data updates, leveraging a well-organized combination of HTML, CSS, and JavaScrip, however, this may change once the introduction of the watch-list functionality is added.  This functionality would be located on a user profile section where they would normally see all their details pertaining to their account.  Or it could be in a drop down under their profile Icon/Name.  I’m still working with that idea.  



