# LittleTiers App

This is a simple web application built with Express.js and lowdb to manage user data. It includes features to add users and view user data using an HTML frontend. The application also utilizes the "faker" package to generate mock user data for testing purposes.

## Getting Started

1. Clone the repository to your local machine:

   ```sh
   git clone https://github.com/liamkande/3tierAppwithExpress.git
   
2. Navigate to the project directory:

    ```sh
    cd littletiers  

3. Install the "chalk" package globally for console styling:

    ```sh
   npm install -g chalk
   
4. Run the application:
    ```sh
   node http_server.js

5. Open your web browser and go to http://localhost:3000 to access the application.

## Features

- Adding users with various details such as name, date of birth, email, etc. The "faker" package is used to generate mock data.
- Listing all users in a formatted card layout.
- Viewing raw user data.

## Project Structure

- `public/`: Static files (HTML, CSS, etc.).
- `db.json`: JSON database for storing user data.
- `http_server.js`: Main server file.
- `styles.css`: Custom CSS styles for the frontend.
- `README.md`: Project documentation.

## Dependencies

- `Express.js`: Web application framework.
- `lowdb`: Lightweight JSON database.
- `superagent`: HTTP client for making API requests.
- `chalk`: Console styling for debugging.
- `faker`: Generate realistic mock data for testing.

## Contributing

Contributions are welcome! If you find a bug or have a suggestion, please open an issue or create a pull request.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
