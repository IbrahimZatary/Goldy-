# GoldenVault - Live Gold Tracking Platform

## Project Overview

GoldenVault is a comprehensive web application that allows users to track live gold prices, manage their gold assets, and calculate profit/loss based on real-time market data.

## Features

### Core Features
- **Live Gold Prices**: Real-time gold prices from API (ounce, gram, karats)
- **Gold Calculations**: Automatic calculation for 24K, 21K, 18K, coins, and bars
- **User Authentication**: Registration and login with session management
- **Asset Management**: Add, view, search, and filter gold assets
- **Profit/Loss Tracking**: Automatic calculation based on current prices
- **Currency Conversion**: Toggle between USD and JOD
- **Price Charts**: Historical price visualization using Chart.js
- **Gold News**: Latest gold market news feed

### Technical Implementation
- Pure JavaScript (no frameworks)
- Bootstrap 5 for responsive design
- LocalStorage for persistent data
- SessionStorage for user sessions
- REST API integration for gold prices and news
- Chart.js for data visualization

## Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Internet connection for API calls

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/gold-tracking-app.git
cd gold-tracking-app