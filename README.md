# DocumentLibrarySearchSystem
**Signal-based Angular application within an NX monorepo for efficient document management and advanced search capabilities. 
The system supports AWS S3 uploads, document chunking, and vector embedding using OpenAI, enabling RAG vectorization-powered search. 
Implemented JWT-based authentication for secure access. The tech stack includes Angular (Signals), NX, MongoDB with Vector Index, Node.js, Express.js, Material UI, AWS S3, OpenAI, and JWT Authentication.**Document & Search Management System

A signal-based Angular application built within an NX monorepo for efficient document management and advanced search capabilities.

Features

- AWS S3 uploads for storing documents

- Document chunking for optimized processing

- Vector embedding with OpenAI for semantic search

- RAG vectorization-powered search for fast, relevant results

- JWT-based authentication for secure access

Tech Stack

- Frontend: Angular (Signals), Material UI

- Backend: Node.js, Express.js

- Database: MongoDB with Vector Index

- Cloud & AI: AWS S3, OpenAI

- Monorepo: NX



---

## ⚙️ Applications

### **Frontend: `document-library-search-system`**
- Built with **Angular**
- Provides the user interface for document management and search
- Organized into **domains** for modular feature development:
  - **Authentication** – login, signup, session handling
  - **Dashboard** – document listing, uploads, analytics
  - **Common** – shared UI components and services

### **Backend: `document-library-backend`**
- Built with **Express.js**
- Provides REST APIs for:
  - User authentication
  - Document upload and retrieval
  - Search functionality (document queries, indexing)

---

## 📦 Shared Libraries

Located in the `libs/` directory, these modules promote **reusability and clean architecture**:

- **Authentication** → Authentication flows, guards, services  
- **Common** → UI components, directives, pipes, and shared utilities  
- **Dashboard** → Features and services for dashboard functionality  

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install



Try It Out

1. Go to [the app link](https://d2ljo5appsfnc2.cloudfront.net/)  
2. Sign up for an account  
3. Upload PDF documents  
4. Perform searches from the **Search** page  
