---
description: How to enable experimental built-in AI (Gemini Nano) in Chrome
---

# 🚀 Enabling Chrome Built-in AI (Gemini Nano)

You can run AI **locally** in your browser without any API key or internet limits. This uses your computer's power (GPU).

## 1. Requirements
-   **Browser:** Chrome (Version 128+ recommended, ideally Chrome Dev or Canary).
-   **Hardware:** Recent computer with a decent GPU/NPU.
-   **OS:** Windows 10/11, macOS, or Linux.

## 2. Enable Flags (The "Secret" Settings)
1.  Open `chrome://flags` in your address bar.
2.  Search for **"Prompt API"** (`#prompt-api-for-gemini-nano`).
    -   Set it to **"Enabled"**.
3.  Search for **"Optimization Guide On Device Model"** (`#optimization-guide-on-device-model`).
    -   Set it to **"Enabled BypassPerfRequirement"**.
4.  Restart Chrome.

## 3. Download the Model
1.  After restarting, go to any webpage.
2.  Open DevTools (`F12`) -> Console.
3.  Type `await window.ai.languageModel.create()` and hit Enter.
4.  Chrome might start downloading the model (can take a few minutes).
5.  If you see an error, check `chrome://components` and look for "Optimization Guide On Device Model" to check download status.

## 4. Verify
Once installed, EduAnalytics will automatically detect `window.ai` and use it as your **Unlimited Free Engine**.

**Note:** The model is smaller ("Nano"), so answers might be shorter, but it is perfect for basic worksheet generation.
