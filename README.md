# Realtime Token Aggregator

This project is a backend service that aggregates **real-time cryptocurrency token data** from multiple decentralized exchange (DEX) sources and exposes it through **REST APIs** and **WebSocket-based live updates**.

The goal of this project was not just to fetch data, but to design a backend that behaves like a **real production system** — efficient, predictable, and resilient to partial failures.

---

## 🧩 Problem Statement

Cryptocurrency token data is fragmented across multiple platforms.  
Each data source exposes information in different formats, with different update frequencies and reliability.

The challenge was to build a backend that:
- Collects token data from multiple APIs
- Normalizes and merges it into a single consistent model
- Serves this data efficiently to clients
- Provides real-time updates without overwhelming users or the network

---

## 🛠️ What This Backend Does

### 1. Token Data Aggregation
- Fetches token data from:
  - **DexScreener**
  - **Jupiter**
- Normalizes all responses into a single internal token format
- Merges overlapping data using the token address as the unique identifier
- Handles missing or partial fields gracefully

This ensures that clients always receive a predictable response structure.

---

### 2. REST API

The REST API exposes aggregated token data with commonly required features:

- **Sorting**
  - By price
  - By 24h volume
  - By market capitalization
- **Timeframe-based filtering**
  - 1 hour
  - 24 hours
  - 7 days
- **Cursor-based pagination**

Cursor-based pagination was chosen instead of offset-based pagination because token data is constantly changing, and offsets can lead to skipped or duplicated results.

Example:
GET /tokens?sortBy=priceUsd&timeframe=24h&limit=10


---

### 3. Redis Caching

Redis is used as a **performance optimization**, not a hard dependency.

Design approach:
- Cached responses reduce repeated external API calls
- TTL-based expiration keeps data reasonably fresh
- If Redis is unavailable, the system continues working by fetching live data

This makes the backend more resilient and easier to operate.

---

### 4. Real-Time Updates with WebSockets

The backend also supports **real-time token updates** using WebSockets.

Key characteristics:
- Clients establish a single persistent connection
- Updates are **diff-based**, not time-based
- Events are emitted only when changes are meaningful (e.g. significant price or volume changes)

This avoids unnecessary network traffic and noisy updates.

---

## 🧪 Testing Strategy

Unit tests focus on **deterministic business logic**, including:
- Sorting logic
- Timeframe filtering
- Cursor-based pagination

External APIs and WebSocket behavior are intentionally excluded from unit tests to avoid fragile mocks and flaky test runs.

---

## 🧠 Design Philosophy

This project intentionally avoids overengineering.

The focus was on:
- **Correctness over feature count**
- **Clarity over clever abstractions**
- **Meaningful real-time updates over constant polling**

Trade-offs were made to reflect real-world backend constraints.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Redis (local or via WSL)

---

### Install dependencies
    
npm install


---

### Start the server

npm run dev


The server runs on:

http://localhost:3000


---

## 🔌 API Overview

### Health Check

GET /health


### List Tokens

GET /tokens

Query parameters:
- `sortBy` → priceUsd | volume24hUsd | marketCapUsd
- `timeframe` → 1h | 24h | 7d
- `limit` → number of items
- `cursor` → token address

---

## 🔄 WebSocket

WebSocket runs on the same port as the REST API.

Connection:
ws://localhost:3000


Events:
- `connected` – emitted on successful connection
- `token:update` – emitted when meaningful token updates occur

---

## 📹 Demo Video

A short demo video demonstrates:
- REST API usage
- WebSocket real-time updates
- Overall system behavior
