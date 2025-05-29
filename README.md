# 🌿Greenhouse Plant Monitoring System

This project is an IoT-based system that monitors plant health, controls watering, and provides both real-time and historical data through a modern web interface. It brings together hardware, backend services, and a responsive frontend.

---

## 📦 Overview

The system is divided into **three main parts**:

### 🔌 IoT Layer
- Runs on an **ATMega2560 microcontroller** (programmed in C)
- Sends **sensor data over TCP**
- A **C# server** translates TCP messages and exposes a **gRPC interface**

### 🖥️ Backend Layer
- Built using **C# and .NET**
- Connects to a database via **Entity Framework Core**
- Uses **gRPC** to communicate with the IoT server
- Includes a **Python microservice** (using Flask) for machine learning, which exposes a **REST API**

### 🖼️ Frontend Layer
- Built with **React**, **TypeScript**, and **Vite**
- Uses **Axios** and **React Query** to fetch and display data
- Includes features such as **JWT authentication**, **dashboards**, and **ML insights**

---

## 🔧 Technologies Used

| Layer         | Technologies                                   |
|---------------|------------------------------------------------|
| **IoT**       | C, ATMega2560, TCP, C# .NET, gRPC              |
| **Backend**   | .NET, C#, Entity Framework, gRPC, JWT          |
| **ML Server** | Python, Flask, pyodbc, REST API                |
| **Frontend**  | React, Vite, TypeScript, CSS, Axios            |
| **Testing**   | Unity (C), Vitest, React Testing Library       |
| **CI/CD**     | GitHub Actions, Azure, DigitalOcean            |

---
