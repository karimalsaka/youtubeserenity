# YouTube Serenity

Minimal browser extension that keeps YouTube focused on subscriptions.

What it does:

- Redirects `youtube.com/` and other discovery entry points to `/feed/subscriptions`
- Hides `Home`, `Shorts`, `Explore`, and similar discovery entries from the sidebar
- Removes recommendation panels and end-screen suggestion overlays on watch pages
- Disables autoplay when a watch page loads

Files:

- `manifest.json`: MV3 extension manifest
- `content.js`: YouTube SPA redirect and DOM cleanup logic
- `content.css`: persistent hiding rules for recommendation surfaces

Load it locally:

1. Open your browser's extensions page.
2. Enable developer mode.
3. Load this folder as an unpacked extension.
