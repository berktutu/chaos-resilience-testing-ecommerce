# Chaos Experiment – Catalog Service Down

## Goal

Understand how the system behaves when the **catalog service** is unavailable, while the **web service** is still running.

Goals to achieve:

- What does the user see?
- Does the web service crash?
- What's the state of status panel?
- What HTTP status codes are returned?

## Related Components

- `web` service (port 3000)
  - `/api/products`
  - `/api/products/:id`
  - `/api/status`
- `catalog` service (port 4000)
  - `/products`
  - `/products/:id`
  - `/health`

## Preconditions

- Both services are running:
  - **catalog** on port 4000
  - **web** on port 3000

## Healthy State

1. Open http://localhost:3000
2. Confirm **System status**:

- Web: Up
- Catalog: Up

3. Click **Load Products**

- Products are loaded

4. Click one of the products

- Product details are shown

## Catalog Down

1. Open http://localhost:3000
2. **System status**:

- Web: Up
- Catalog: Down

3. Click **Load Products**

- Status text: "Failed to load products (server error)"
- No products are displayed

4. If list was already loaded click on a product

- Product details text: "Catalog service unavailable"

## API behaviour

- `/api/status`

  - Returns 200 with JSON indicating:
    - `web.status = "up"`
    - `catalog.status = "down"`

- `/api/products`

  - Returns `503 Service Unavailable`

- `/api/products/:id`
  - Returns `503 Service Unavailable` when catalog is down

## Service stability

- Web service **does not crash**
