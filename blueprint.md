# Project Blueprint: Raonjena Reading Bank (라온제나 독서통장)

## Overview
Raonjena Reading Bank is a modern, digital reading log application designed to bridge the gap between students' reading habits and teacher guidance. It features a clean, responsive interface that allows students to track their reading progress, receive AI-driven recommendations, and allows teachers to monitor student growth through detailed statistics and logs.

## Project Outline & Features
### Core Technologies
- **HTML5**: Semantic structure.
- **Tailwind CSS (CDN)**: Utility-first styling.
- **JavaScript (ES Modules)**: State management and view orchestration.
- **Web Components**: Encapsulated UI elements.
- **Gemini API**: AI-powered chatbot (via Vercel Serverless Functions).
- **Vercel**: Deployment platform for frontend and backend assets.

### Pages & Views
1. **Login Screen**: Minimalist entry point for Teachers and Students.
2. **Teacher Dashboard**: 
   - Overview of the class (Student list).
   - Student Detail View: Individual reading history, preferences, and progress.
3. **Student Dashboard**: 
   - Reading Statistics: Visualized via a Hexagonal Radar Chart.
   - AI Recommendations: Personalized book suggestions.
   - Reading Log: History of registered books.
4. **Book Registration**: Modal-based form with search and star ratings.
5. **AI Chatbot**: Floating helper widget for reading guidance.

### Design Principles
- **Aesthetics**: Vibrant colors, deep shadows (lifted cards), and subtle noise textures.
- **Interactivity**: Smooth transitions between views and modal animations.
- **Responsiveness**: Mobile-first design that scales beautifully to desktop.

## Current Implementation Plan
1. **Step 1: HTML Scaffolding** (Completed)
2. **Step 2: Component Architecture** (Completed)
3. **Step 3: State & Navigation Logic** (Completed)
4. **Step 4: Styling & Polish** (Completed)
5. **Step 5: AI Integration** (Completed)
   - Created `api/chat.js` for secure Gemini API calls.
   - Implemented `chatbot-widget` in the frontend.
6. **Step 6: Vercel Restructuring** (Completed)
   - Moved static files to `public/`.
   - Setup `package.json` and serverless API.
