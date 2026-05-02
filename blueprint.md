# Project Blueprint: Raonjena Reading Bank (라온제나 독서통장)

## Overview
Raonjena Reading Bank is a modern, digital reading log application designed to bridge the gap between students' reading habits and teacher guidance. It features a clean, responsive interface that allows students to track their reading progress, receive AI-driven recommendations, and allows teachers to monitor student growth through detailed statistics and logs.

## Project Outline & Features
### Core Technologies
- **HTML5**: Semantic structure.
- **Tailwind CSS (CDN)**: Utility-first styling with custom configurations.
- **JavaScript (ES Modules)**: State management and view orchestration.
- **Web Components**: Encapsulated UI elements (Student Cards, Radar Charts, Modals).
- **Google Fonts**: Noto Sans KR for high-quality Korean typography.

### Pages & Views
1. **Login Screen**: Minimalist entry point for Teachers and Students.
2. **Teacher Dashboard**: 
   - Overview of the class (Student list).
   - Student Detail View: Individual reading history, preferences, and progress.
3. **Student Dashboard**: 
   - Reading Statistics: Visualized via a Hexagonal Radar Chart.
   - AI Recommendations: Personalized book suggestions.
   - Reading Log: History of registered books.
4. **Book Registration**: Modal-based form with search simulation and detailed input.

### Design Principles
- **Aesthetics**: Vibrant colors, deep shadows (lifted cards), and subtle noise textures.
- **Interactivity**: Smooth transitions between views and modal animations.
- **Responsiveness**: Mobile-first design that scales beautifully to desktop.

## Current Implementation Plan
1. **Step 1: HTML Scaffolding** (Completed)
   - Setup `index.html` with necessary CDN links (Tailwind, Google Fonts).
   - Define a main `<app-root>` container.
2. **Step 2: Component Architecture** (Completed)
   - Created Web Components in `main.js` for `AppRoot`, `LoginView`, `TeacherDashboard`, `StudentDashboard`, `StudentDetailView`, `ReadingRadarChart`, and `BookModal`.
3. **Step 3: State & Navigation Logic** (Completed)
   - Implemented `setView` in `AppRoot` for SPA-style navigation.
4. **Step 4: Styling & Polish** (Completed)
   - Added custom animations, noise texture, and "lifted" card effects in `style.css`.
   - Implemented a custom SVG radar chart for data visualization.
5. **Step 5: Verification** (Completed)
   - Verified smooth transitions and modal functionality.
