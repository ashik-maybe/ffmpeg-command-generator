# FFmpeg Command Generator

<p align="center">
  <img src="https://img.shields.io/badge/Mocha-1e1e2e?style=for-the-badge&logoColor=fab387" alt="Catppuccin Mocha">
  <img src="https://img.shields.io/badge/Latte-eff1f5?style=for-the-badge&logoColor=fe640b" alt="Catppuccin Latte">
  <img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logoColor=white" alt="Bun">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logoColor=white" alt="Vite">
</p>

A beautiful, hyper-responsive webapp that lets you graphically select options and generates ready-to-use FFmpeg commands. Copy, paste, done!

![FFmpeg Command Generator](https://via.placeholder.com/800x450/1e1e2e/fab387?text=FFmpeg+Command+Generator)

---

## ✨ Features

- **12 Operations** - Everything FFmpeg can do
- **Real-time Preview** - Command updates as you type
- **One-click Copy** - Copy commands to clipboard instantly
- **Dual Themes** - Catppuccin Mocha & Latte (persists in localStorage)
- **Responsive** - Works beautifully on desktop, tablet, and mobile
- **Usage Guides** - Helpful tips for each operation

---

## 🚀 Operations

| Operation | Description |
|-----------|-------------|
| **Convert** | Convert between video formats (MP4, MKV, WebM, AVI, MOV, FLV, WMV) |
| **Audio** | Extract audio or convert audio format with bitrate, sample rate, volume control |
| **Trim** | Cut video at specific timestamps (supports `10` or `00:00:10` format) |
| **Filters** | Scale, crop, rotate, flip, speed, denoise, brightness, contrast, saturation |
| **Encode** | Advanced encoding with CRF, presets, resolution, bitrate control |
| **Concat** | Join multiple videos (demuxer & protocol methods) |
| **Subtitles** | Add or burn subtitles with font styling options |
| **GIF** | Create optimized animated GIFs with palette generation |
| **Thumbnails** | Extract frames as images (single, interval, or all frames) |
| **Merge** | Combine separate video and audio files |
| **Stream** | RTMP streaming configuration |
| **Metadata** | Edit file metadata (title, artist, album, cover art) |

---

## 🛠️ Tech Stack

- **Bun** - Fast JavaScript runtime & package manager
- **Vite** - Next-generation frontend tooling
- **Vanilla JS** - No framework, lightweight & fast
- **FontAwesome 6** - Beautiful icons
- **Catppuccin** - Soothing pastel theme

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/ashik-maybe/ffmpeg-command-generator
cd ffmpeg-commands

# Install dependencies with bun
bun install
```

---

## 🎯 Usage

```bash
# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

Then open http://localhost:5173 in your browser.

---

<p align="center">Made with ☕ and 🎬</p>
