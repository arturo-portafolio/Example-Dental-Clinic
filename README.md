## Overview

This repository contains the **BrightSmile Dental** web app built with **React + Vite** (SPA) and deployed on **Vercel**.

## Live Demo

- https://example-dental-clinic.vercel.app/

## Why `vercel.json` was needed

Vercel can auto-detect many frameworks, but this project uses **Vite** and a **non-standard output folder** (`dist/public`) plus client-side routing (SPA).  
To prevent Vercel from serving the wrong file (which could trigger a file download) and to ensure all routes resolve to `index.html`, a `vercel.json` configuration was added to set the correct build output and routing behavior.

## Tech Stack

- React
- Vite
- Wouter (client-side routing)
- Tailwind CSS / shadcn-ui components
