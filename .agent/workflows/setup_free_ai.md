---
description: How to get a FREE Gemini API Key and enable AI in EduAnalytics
---

# 🆓 How to Get Free AI (Gemini) for Your App

You are right! You **can** use AI for free. Google offers a **Free Tier** for developers that is perfect for this app. The reason you can't just "use Google" without a key is that your app needs a secure, authorized way to talk to Google's servers.

Here is how to get your **FREE, PERMANENT API Key**:

## 1. Get the Key
1.  Go to [**Google AI Studio**](https://aistudio.google.com/app/apikey) (log in with your regular Google/Gmail account).
2.  Click **"Create API Key"**.
3.  Click **"Create API key in new project"**.
4.  Copy the code that starts with `AIza...`.

## 2. Add it to Your App
You have two options:

### Option A: The "Quick" Way (Browser Storage)
1.  Open your EduAnalytics app.
2.  Go to the **Profile** (Perfil) section.
3.  Paste the key into the "API Key" field and save. 
    *   *Note: This saves it only on your computer/browser.*

### Option B: The "Developer" Way (Permanent)
1.  Open your project folder in VS Code.
2.  Open the file named `.env`.
3.  Add this line at the bottom:
    ```env
    VITE_GEMINI_API_KEY=Paste_Your_AIza_Key_Here
    ```
4.  Restart your local server (stop it and run `npm run dev` again).

## ⚠️ Why do I need a key?
-   **Web (ChatGPT/Gemini):** Google pays for the server cost to get you to use their product.
-   **API (Your App):** You are the "developer", so Google gives you a **Free Quota** (15 requests per minute, which is huge for one person) but requires a Key to prevent abuse.

Once you add this key, the **"Smart Worksheet Generator"** will fully unlock with:
-   Intelligence (No generic questions)
-   Specific Grade Level adaptation
-   Deep Textbook Analysis (12,000 chars)

**Cost:** $0.00 / month.
