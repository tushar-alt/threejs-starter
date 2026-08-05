# 3D Phone Viewer

[![Vite](https://img.shields.io/badge/Vite-4.2-blueviolet?logo=vite)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.151-black?logo=three.js)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.11-green?logo=greensock)](https://greensock.com/gsap/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An interactive 3D smartphone model viewer built with Three.js and Vite. Renders a realistic Samsung Galaxy S21 Ultra model with orbit controls, dynamic lighting, and textured materials.

## Features

- **3D Model Loading** -- Loads and displays an FBX model of a Samsung Galaxy S21 Ultra
- **Orbit Controls** -- Click and drag to rotate, scroll to zoom, right-click to pan
- **Dynamic Lighting** -- Two orbiting point lights and two opposing directional lights for realistic illumination
- **PBR Materials** -- Physically-based materials with metalness, roughness, and texture maps for each component
- **Responsive Design** -- Automatically adjusts to any window size
- **Hot Module Replacement** -- Instant feedback during development via Vite HMR

## Installation

```bash
# Clone the repository
git clone https://github.com/tushar-alt/check_2.git
cd check_2

# Install dependencies
npm install
```

## Usage

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open the URL shown in the terminal (default: `http://localhost:5173`) to view the 3D model. Use the mouse to orbit, zoom, and pan around the phone.

## Project Structure

```
check_2/
├── index.html          # Entry HTML with canvas element
├── main.js             # Three.js scene setup, model loading, and render loop
├── counter.js          # Counter utility module (Vite template)
├── style.css           # Global styles
├── package.json        # Project metadata and dependencies
├── package-lock.json   # Locked dependency tree
├── javascript.svg      # JavaScript logo asset
├── .gitignore          # Git ignore rules
├── LICENSE             # MIT license
├── data/               # 3D model files and textures
│   ├── pp5.fbx         # Phone 3D model (FBX format)
│   ├── p5.fbx          # Alternative phone model
│   ├── iphone.fbx      # Alternative phone model
│   ├── iphone.gltf     # Alternative phone model (glTF format)
│   ├── noise.png       # Noise texture for back panel
│   ├── wallpaper.png   # Screen wallpaper texture
│   └── cam2.png        # Front camera texture
└── dist/               # Production build output (gitignored)
```

## Tech Stack

- [Vite](https://vitejs.dev/) -- Build tool and dev server
- [Three.js](https://threejs.org/) -- 3D rendering library
- [GSAP](https://greensock.com/gsap/) -- Animation library

## License

This project is licensed under the MIT License -- see the [LICENSE](LICENSE) file for details.
