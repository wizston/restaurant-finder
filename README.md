
## Restaurant Finder Assessment

[Nest](https://github.com/nestjs/nest) framework.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


# Restaurants Finder API Documentation

## TODOs

Due to time constraints, here are some of the other optimizations and features I would have been able to implement. I would love to discuss further on this and my approach to each remaining items listed below. 

- Add other filters for already added parameters like cuisineType, priceRange, ratings
- Complete rest of unit tests to cover actual units of the project.
- Implement caching for static unchanged data and clear on new inserts
- Validate a few more endpoint data like the delete id parameter
- Add swagger documentation
- Implement Auth and logging system to track changes to database

## Overview

This API allows users to find restaurants within a specified distance from their current location in a given city. Users can also add, update, or delete restaurant information.

## Endpoints

### 1. Find Restaurants

- **Endpoint:** `/restaurants`
- **HTTP Method:** GET
- **Parameters:**
    - `city`: Name of the city (required).
    - `latitude`: User's current latitude (required).
    - `longitude`: User's current longitude (required).
    - `distance`: Maximum distance in meters from the user's location (required).
- **Response Format:** JSON
- **Success Response:**
    - **Code:** 200 OK
    - **Content:**
      ```json
      {
        "restaurants": [
          {
            "name": "Cafe Delight",
            "address": "123 Main St, New York, NY",
            "latitude": 40.7112,
            "longitude": -74.0055
          },
          {
            "name": "Pasta Paradise",
            "address": "456 Elm St, New York, NY",
            "latitude": 40.7145,
            "longitude": -74.0082
          }
        ]
      }
      ```
- **Sample Request:** `GET /restaurants?city=New%20York&latitude=40.7128&longitude=-74.0060&distance=1000`

### 2. Add a New Restaurant

- **Endpoint:** `/restaurants`
- **HTTP Method:** POST
- **Request Body:** JSON with restaurant details
- **Success Response:**
    - **Code:** 201 Created
    - **Content:**
      ```json
      {
        "name": "Cafe Delight",
        "address": "123 Main St, New York, NY",
        "latitude": 40.7112,
        "longitude": -74.0055
      }
      ```
- **Sample Request:**
  ```json
  POST /restaurants
  {
    "name": "Cafe Delight",
    "address": "123 Main St, New York, NY",
    "latitude": 40.7112,
    "longitude": -74.0055
  }
  ```

### 3. Update an Existing Restaurant

- **Endpoint:** `/restaurants/{restaurantId}`
- **HTTP Method:** PUT
- **Parameters:**
    - `restaurantId`: The ID of the restaurant to update (required).
- **Request Body:** JSON with updated restaurant details
- **Success Response:**
    - **Code:** 200 OK
    - **Content:**
      ```json
      {
        "name": "Cafe Delight",
        "address": "123 Main St, New York, NY",
        "latitude": 40.7112,
        "longitude": -74.0055
      }
      ```
- **Sample Request:**
  ```json
  PUT /restaurants/123
  {
    "name": "Cafe Delight Updated",
    "address": "123 Main St, New York, NY",
    "latitude": 40.7112,
    "longitude": -74.0055
  }
  ```

### 4. Delete an Existing Restaurant

- **Endpoint:** `/restaurants/{restaurantId}`
- **HTTP Method:** DELETE
- **Parameters:**
    - `restaurantId`: The ID of the restaurant to delete (required).
- **Success Response:**
    - **Code:** 200 OK

### Error Handling

- **404 Not Found:** If the provided city is not valid or not supported.
- **400 Bad Request:** If the user's location coordinates are missing or invalid, or if the distance is missing or negative.




## License

Nest is [MIT licensed](LICENSE).
