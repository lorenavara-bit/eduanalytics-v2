# Debugging Chrome Built-in AI (Gemini Nano)

## ⚠️ EU/SPAIN WARNING (CRITICAL)
**If you are located in Spain or the EU:**
Chrome Built-in AI is currently **BLOCKED** in this region due to GDPR/DMA regulations.
Even with flags enabled, the component **will not download** from Google servers.

**SOLUTION:** Use a **Free Gemini API Key** (Cloud).
1.  Get Key: https://aistudio.google.com/app/apikey
2.  In App: Go to **Profile** -> **Enter Key**.
3.  This works instantly in Spain.

---
If the badge says **"Chrome AI: Off"** (Gray), follow these steps strictly.


## 1. Verify Browser
You must be using **Chrome Dev** or **Chrome Canary** (Version 128+).
Standard Chrome does not support this yet.

## 2. Check Flags (CRITICAL)
Copy and paste these URLs into your address bar:

## 0. Clean Slate (Recommended)
If you are stuck, start fresh:
1.  Go to `chrome://flags`.
2.  Click **"Reset all"** (top right).
3.  Proceed to Step 1.

## 1. Set Critical Flags
1.  `chrome://flags/#optimization-guide-on-device-model`
    *   Set to: **Enabled BypassPerfRequirement** (MUST be this specific option).


2.  `chrome://flags/#prompt-api-for-gemini-nano`
    *   Set to: **Enabled**.

**AFTER SETTING THESE:** You must click the **"Relaunch"** button at the bottom of the screen. Closing the window is not enough.

## 3. Check Components (Download Status)
Even with flags enabled, the browser needs to download the "Brain" (approx 1GB).

1.  Go to `chrome://components`
2.  Find **Optimization Guide On Device Model**.
    *   If you don't see it: You didn't set flag #1 correctly.
    *   If Version is `0.0.0.0`: Click **Check for update**.
    *   Status should change to "Downloading..." or "Component updated".
    *   Wait until Version is something like `2024.5.21.1` (not 0.0.0.0).

## 4. Verify in Console
Open Console (F12) and type:
`window.ai`
*   If it returns `undefined`: Formatting/Flags issue.
*   If it returns an object: You are ready!

## 5. Alternative (Instant Fix)

## 6. Advanced Troubleshooting (If Component is Missing)
If "Optimization Guide On Device Model" is NOT in the components list:

1.  **Sign In Required:** You must be signed into your Google Account in Chrome.
2.  **Language Check:** Set your browser language to **English (US)**. Restart.
3.  **Internal Internals:**
    *   Go to: `chrome://optimization-guide-internals`
    *   Look at the "On Device ModelService" tab.
    *   It should tell you **WHY** it is not downloading (e.g., "Not eligible", "Download failed").

