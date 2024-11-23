import axios from 'axios';

// Define the API URL
const url = 'https://jsonplaceholder.typicode.com/posts/1';

// Function to make the GET request
const fetchData = async () => {
  try {
    // Make the GET request
    const response = await axios.get(url);

    // Log the response data
    console.log('Response Data:', response.data);
  } catch (error) {
    // Log any errors
    console.error('Error fetching data:', error.message);
  }
};

// Call the function
fetchData();
