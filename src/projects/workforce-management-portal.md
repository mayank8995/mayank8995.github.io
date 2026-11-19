---
title: Workforce Management Portal
description: Full-stack admin portal for managing employees, projects and analytics, with real-time sync, role-based access, audit logs and a built-in AI project assistant.
tags: [React, TypeScript, TanStack Query, Node.js, MongoDB, Socket.IO]
role: Full-stack build
year: 2026
impact:
  [
    { value: "Live", label: "real-time sync across sessions" },
    { value: "RBAC", label: "role-based access + audit logs" },
  ]
live: ""
code: https://github.com/mayank8995/workforce-management-portal
image: ""
featured: true
order: 0
---

## Overview

A production-style admin portal for running a workforce: employees, projects, users and the analytics around them. I built it to show how I structure a data-heavy React app so it stays fast and maintainable as it grows.

## What it does

- **Dashboard** with key metrics and charts, plus a live activity feed
- **Employee and user management** with dynamic search, filtering and server-side pagination
- **Reusable data table** with configurable columns, row selection, bulk actions and bulk export
- **Promotions and history**: promote someone in a couple of clicks and keep a full timeline per person
- **Real-time updates**: employee changes, dashboard numbers and the activity feed sync live across every open session
- **Role-based access control** and **audit logs** for every change
- **AI project assistant** that answers questions about what the portal does and how it was built
- Responsive tables, cards and dialogs, with light and dark themes

## How it's built

**Frontend:** React and TypeScript with React Router. TanStack Query handles server state, caching and loading, error and empty states. Tailwind CSS does the styling and Recharts draws the charts. Socket.IO client receives live updates.

**Backend** ([repo](https://github.com/mayank8995/workforce-management-portal-BE)): Node.js and Express REST API on MongoDB with Mongoose. JWT auth in HTTP-only cookies with bcrypt password hashing, rate limiting, input validation, Socket.IO for real-time events and Winston for structured logging.

## What I focused on

- Reusable UI components and one table that serves every list in the app
- Keeping server state out of the global store, so caching and refetching come from TanStack Query
- Handling errors in one place, and giving every screen a proper loading, error and empty state
