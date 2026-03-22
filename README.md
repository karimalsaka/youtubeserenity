# Serenity — YouTube without the noise

A Firefox/Zen browser extension that strips YouTube down to what matters: your subscriptions and search. No algorithmic recommendations, no Shorts, no ads.

## What it hides

### Sidebar
- Forces the collapsed (mini) sidebar on all screen sizes
- Hides the **Home** and **Shorts** buttons from the mini sidebar
- Hides the hamburger menu button and expanded sidebar drawer

### Home page
- Redirects `/` to `/feed/subscriptions` — you never see the algorithmic home feed
- Also redirects `/feed/trending`, `/feed/explore`, and `/shorts`

### Watch page
- Removes the **suggested videos sidebar** ("Up next")
- Expands the video player and comments to a comfortable width (1800px max)
- Hides **end-screen cards** and **video wall suggestions**
- Hides **autoplay overlay** and **pause overlay recommendations**
- Disables **autoplay** automatically

### Search results
- Hides the **Shorts chip/pill** from the filter bar
- Removes **Shorts shelves** from results
- Removes **"Sponsored - Suggested products"** sections
- Removes **promoted/ad video results**
- Hides **"Explore more"** and **"People also searched for"** sections

### Everywhere
- Removes **Shorts shelves** from all feeds
- Hides **recommendation chip bars** on the home page
- Removes **merch shelves**, **feed nudges**, and **banner promos**

## Install

### Temporary (for testing)
1. Open `about:debugging` in Firefox/Zen
2. Click "This Firefox" > "Load Temporary Add-on..."
3. Select `manifest.json` from this folder

### Permanent
1. Download `youtube-serenity.xpi` from [Releases](https://github.com/karimalsaka/youtubeserenity/releases)
2. In Firefox/Zen, go to `about:config` and set `xpinstall.signatures.required` to `false`
3. Go to `about:addons` > gear icon > "Install Add-on From File..."
4. Select the downloaded `.xpi` file

## Files

- `manifest.json` — MV3 extension manifest (Firefox/Gecko)
- `content.js` — Redirects, sidebar collapsing, Shorts removal, autoplay disabling
- `content.css` — Persistent hiding rules for recommendations, ads, and UI clutter
