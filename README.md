# Realtime Token Aggregator

A backend service that aggregates cryptocurrency token data from multiple sources and exposes it via REST APIs and real-time WebSocket updates.

This project was built as part of a backend assessment, with a focus on clarity, correctness, and real-world design decisions rather than overengineering.

---

## ✨ Features

- Aggregates token data from:
  - DexScreener
  - Jupiter
- Normalizes and merges data into a single token model
- Redis caching with TTL to reduce external API calls
- REST API for listing tokens with:
  - Sorting
  - Timeframe filtering
  - Cursor-based pagination
- WebSocket server for real-time token updates
  - Emits updates only when changes are meaningful
- Minimal unit tests for core business logic

---

## 🧠 Design Decisions

- Redis is treated as an optimization, not a dependency.  
  If Redis is unavailable, the system still works without caching.
- Cursor-based pagination was chosen over offset pagination for stability.
- WebSocket updates are diff-based, not time-based, to avoid unnecessary noise.
- Tests focus only on deterministic logic, avoiding fragile mocks of third-party APIs.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Redis (running locally or via WSL)

---

### Installation

Run the following command to install dependencies:

npm install

---

### Start the server

Run the development server using:

npm run dev

The server will start at:

http://localhost:3000

---

## 🔌 REST API

### Health Check

GET /health

---

### List Tokens

GET /tokens

#### Query Parameters

- sortBy → priceUsd | volume24hUsd | marketCapUsd
- timeframe → 1h | 24h | 7d
- limit → number of items to return
- cursor → token address for pagination

Example request:

/tokens?sortBy=priceUsd&timeframe=24h&limit=10

---

## 🔄 WebSocket

WebSocket server runs on the same port as HTTP.

Connection URL:

ws://localhost:3000

### Events

- connected  
  Sent immediately after a client connects.

- token:update  
  Emitted only when price or volume changes exceed defined thresholds.

---

## 🧪 Tests

Run unit tests using:

npm test

Tests cover:
- Sorting logic
- Timeframe filtering
- Cursor-based pagination

---

## 📌 Notes

- Token discovery is intentionally limited to a seed list for clarity.
- WebSocket updates prioritize relevance over frequency.
- The project focuses on readability and correctness over excessive features.

---

## 📹 Demo

A short demo video is included showcasing:
- REST API usage
- WebSocket real-time updates
