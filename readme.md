# 🔄 Smart Auto Refresh - Chrome Extension

A sleek, reliable Chrome extension for automatically refreshing your tabs with style! ✨

## 🌟 Features

- ⚡ Smart tab-specific refresh intervals
- 🎯 Precise timing from 5 seconds to 2 hours
- 🎨 Modern, user-friendly interface
- 📊 Real-time countdown display
- 💾 Persistent settings across browser sessions
- 🛡️ Built-in safety features and validation
- 🌈 Visual status indicators
- ⚙️ Flexible units (seconds/minutes)

## 🚀 Installation

1. Download or clone this repository 📥
2. Open Chrome and navigate to `chrome://extensions/` 🔍
3. Enable "Developer mode" in the top right corner 🛠️
4. Click "Load unpacked" and select the extension directory 📁

## 💡 How to Use

1. Click the extension icon in your Chrome toolbar 🖱️
2. Enter your desired refresh interval (minimum 5 seconds) ⏰
3. Select the time unit (seconds or minutes) ⌛
4. Click "Start Auto-Refresh" to begin ▶️
5. Watch the countdown timer for next refresh ⏱️
6. Click "Stop Auto-Refresh" to halt at any time ⏹️

## ⚠️ Important Notes

- Minimum refresh interval: 5 seconds ⏰
- Maximum refresh interval: 2 hours 📅
- Settings are saved per tab 📑
- Auto-refresh stops when you close the tab 🚪
- Status indicator shows active/inactive state 🟢/⚪

## 🛠️ Technical Details

### File Structure

```
extension/
│
├── 📄 manifest.json
├── 📄 popup.html
├── 📄 popup.js
├── 📄 background.js
└── 📁 icons/
    ├── 🖼️ icon16.png
    ├── 🖼️ icon32.png
    ├── 🖼️ icon48.png
    └── 🖼️ icon128.png
```

### 🔧 Requirements

- Chrome Browser (Version 88 or higher)
- Manifest V3 compatible

## 🐛 Troubleshooting

1. **Extension not working?**

   - Check if it's enabled in chrome://extensions/ 🔍
   - Ensure the tab has fully loaded 📃
   - Try reloading the extension 🔄

2. **Refresh not happening?**
   - Verify the interval is at least 5 seconds ⏰
   - Check if the status shows as active 🟢
   - Make sure the tab is active and focused 👁️

## 🤝 Contributing

Feel free to contribute to this project! Here's how:

1. Fork the repository 🍴
2. Create your feature branch (`git checkout -b feature/AmazingFeature`) 🌿
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`) 💾
4. Push to the branch (`git push origin feature/AmazingFeature`) 🚀
5. Open a Pull Request 📫

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details 📜

## 📧 Contact

Got questions? Found a bug? Feel free to open an issue! 🐞

---

Made with ❤️ for productive browsing
