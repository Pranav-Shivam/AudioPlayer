# 🎵 Modern Audio Player

A sophisticated, modern audio player built with React that provides a premium music listening experience with drag-and-drop file upload, advanced controls, and beautiful UI/UX design.

![Audio Player Demo](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge)

## ✨ Features

### 🎨 **Modern Design**
- **Sophisticated Dark Theme**: Professional dark interface with purple/indigo gradients
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Micro-interactions and hover effects throughout
- **Typography**: Clean Inter font family for professional appearance

### 🚀 **Advanced Audio Controls**
- **Play/Pause**: Intuitive play/pause button with loading states
- **Progress Bar**: Click-to-seek with hover tooltips and visual feedback
- **Volume Control**: Mute/unmute functionality with volume memory
- **Playback Speed**: 0.5x to 2x speed control with descriptions
- **Time Display**: Hours:minutes:seconds format for long tracks

### 📁 **File Management**
- **Drag & Drop Upload**: Intuitive file upload with visual feedback
- **Multiple File Support**: Upload and manage multiple audio tracks
- **File Validation**: Automatic audio file filtering (MP3, WAV, FLAC, etc.)
- **Track Management**: Remove individual tracks or clear all at once
- **Track Information**: Display track numbers and file names

### ♿ **Accessibility**
- **ARIA Support**: Comprehensive screen reader compatibility
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Clear focus indicators and states
- **High Contrast**: Respects user accessibility preferences

### 🎯 **User Experience**
- **Loading States**: Visual feedback during file loading and processing
- **Error Handling**: Graceful error recovery with user-friendly messages
- **State Management**: Proper loading, ready, and error states
- **Memory Management**: Automatic cleanup of object URLs

## 🛠️ Technology Stack

- **React 19.1.0**: Latest React with hooks and modern patterns
- **CSS3**: Custom properties, Grid, Flexbox, and modern styling
- **HTML5 Audio API**: Native browser audio capabilities
- **Google Fonts**: Inter font family for typography
- **ES6+**: Modern JavaScript features and syntax

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Audio-Player
   ```

2. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 🚀 Usage

### Uploading Audio Files

1. **Drag & Drop**: Simply drag audio files onto the upload area
2. **Click to Browse**: Click the upload area to select files from your computer
3. **Multiple Files**: Select multiple files at once for batch upload

### Audio Player Controls

- **Play/Pause**: Click the play button to start/stop playback
- **Seek**: Click anywhere on the progress bar to jump to that time
- **Volume**: Use the volume slider or click the mute button
- **Speed**: Select playback speed from the dropdown (0.5x to 2x)

### Track Management

- **Remove Track**: Click the × button on any track card
- **Clear All**: Use the "Clear All" button to remove all tracks
- **Track Info**: View track numbers and file names

## 🏗️ Project Structure

```
frontend/
├── public/
│   ├── index.html          # Main HTML file
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── PlayPauseButton.js
│   │   ├── ProgressBar.js
│   │   ├── VolumeControl.js
│   │   └── PlaybackSpeedControl.js
│   ├── player/
│   │   └── WorldClassAudioPlayer.js  # Main audio player component
│   ├── styles/
│   │   ├── App.css        # Main application styles
│   │   └── AudioPlayer.css # Audio player specific styles
│   ├── App.js             # Main application component
│   └── index.js           # Application entry point
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#8b5cf6` (Purple)
- **Background**: `#0f172a` (Dark Blue)
- **Surface**: `#1e293b` (Lighter Dark)
- **Text**: `#f8fafc` (Light Gray)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive**: Scales appropriately on all devices

### Spacing & Layout
- **CSS Custom Properties**: Consistent spacing system
- **Grid & Flexbox**: Modern layout techniques
- **Responsive Breakpoints**: Mobile-first approach

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App
npm run eject
```

### Building for Production

```bash
cd frontend
npm run build
```

The build artifacts will be stored in the `frontend/build/` directory.

## 🌟 Key Features Explained

### Drag & Drop Upload
- Visual feedback during drag operations
- Automatic file type validation
- Support for multiple file selection
- Memory-efficient file handling

### Advanced Audio Controls
- **Progress Bar**: Interactive seeking with hover tooltips
- **Volume Control**: Mute functionality with volume memory
- **Speed Control**: Custom dropdown with keyboard navigation
- **Loading States**: Visual feedback during audio loading

### Responsive Design
- **Mobile-First**: Optimized for touch devices
- **Flexible Layout**: Adapts to all screen sizes
- **Touch-Friendly**: Large touch targets and gestures

## 🐛 Troubleshooting

### Common Issues

1. **"react-scripts is not recognized"**
   ```bash
   cd frontend
   npm install --force
   ```

2. **Audio files not playing**
   - Ensure files are valid audio formats (MP3, WAV, FLAC, etc.)
   - Check browser console for error messages
   - Verify file permissions

3. **Build errors**
   ```bash
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

## 📱 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team**: For the amazing framework
- **Google Fonts**: For the Inter font family
- **CSS Working Group**: For modern CSS features
- **Web Audio API**: For browser audio capabilities

---

**Built with ❤️ using React and modern web technologies**

*For questions or support, please open an issue in the repository.* 
