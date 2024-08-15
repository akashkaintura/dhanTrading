# React Trading Dashboard

## Overview

This project is a React-based trading dashboard that includes features for analyzing trade history and visualizing profit and loss. It integrates with the [Dhan API](https://api.dhan.co) to fetch trading data and provides a user-friendly interface to display and analyze this data.

## Features

- **Trade History Analyzer**: View and paginate through your trade history based on a specified date range.
- **Profit and Loss Analyzer**: Visualize profit and loss over time using a line chart.
- **Responsive Design**: The application is designed to work well on both desktop and mobile devices.

## Technologies Used

- React
- Axios for API requests
- Chart.js for data visualization
- Netlify for deployment

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. **Clone the Repository**

   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd <YOUR_PROJECT_NAME>

2. **Installation and Start**
    ```
    npm install && npm start 
    ```
3. **Configuration**
    ```
    REACT_APP_API_BASE_URL=https://api.dhan.co
    REACT_APP_ACCESS_TOKEN=your_access_token_here
    ```
