# System Overview

## Services

- **web service**

  - Port: 3000
  - ## Duties:
    - Serve the UI
    - Provide `/api/products` endpoint for the frontend
    - Provide `/api/products/:id` for product details
    - Provide `/api/status` to report health of web + catalog
    - Handle failures

- **catalog service**
  - Port: 4000
  - Responsibilities:
    - Provide `/products` endpoint with the product list
    - Provide `/products/:id` endpoint for product details
    - Provide `/health` endpoint to indicate its own status

## Data Model

- `Product`
  - `id` (number)
  - `name` (string)
  - `price` (number)

Products are hard-coded.

## User Flow (Happy)

1. User opens the page
2. Clicks on the Load products button
3. Web service is calling for catalog
4. UI shows status and the products
5. User clicks on one of the products
6. Web calls catalog id of the clicked product
7. Product details are shown on UI
