(() => {
  "use strict";

  // --- Configuration ---
  const REDIRECT_TARGET = "/feed/subscriptions";
  const REDIRECT_PATHS = new Set(["/", "/feed/explore", "/feed/trending", "/shorts"]);

  // --- Redirect unwanted pages to subscriptions ---
  function redirectToSubscriptions() {
    const path = window.location.pathname;
    if (!REDIRECT_PATHS.has(path) && !path.startsWith("/shorts/")) return;
    if (path === REDIRECT_TARGET) return;
    window.location.replace(REDIRECT_TARGET);
  }

  // --- Force collapsed sidebar by removing persistent attribute ---
  function collapseSidebar() {
    const app = document.querySelector("ytd-app");
    if (app?.hasAttribute("guide-persistent-and-visible")) {
      app.removeAttribute("guide-persistent-and-visible");
    }
  }

  // --- Hide Shorts chip in search filter bar ---
  function hideShortsChip() {
    document.querySelectorAll("yt-chip-cloud-chip-renderer").forEach((chip) => {
      if (chip.textContent.trim().toLowerCase() === "shorts") {
        chip.style.display = "none";
      }
    });
  }

  // --- Hide "Explore more" / "People also searched for" in search ---
  function hideSearchJunk() {
    document.querySelectorAll("ytd-horizontal-card-list-renderer, ytd-shelf-renderer").forEach((el) => {
      const text = el.textContent.trim().toLowerCase();
      if (text.startsWith("explore more") || text.startsWith("people also search")) {
        el.style.display = "none";
      }
    });
  }

  // --- Remove Shorts shelves on non-search pages ---
  function removeShortsShelves() {
    if (window.location.pathname.startsWith("/results")) return;
    document.querySelectorAll(
      "ytd-rich-section-renderer, ytd-rich-shelf-renderer, ytd-reel-shelf-renderer"
    ).forEach((node) => {
      if ((node.textContent || "").toLowerCase().includes("shorts")) {
        node.remove();
      }
    });
  }

  // --- Disable autoplay ---
  function disableAutoplay() {
    const toggle = document.querySelector(".ytp-autonav-toggle-button[aria-checked='true']");
    if (toggle) toggle.click();
  }

  // --- Main cleanup (pauses observer to prevent infinite loops) ---
  let observer;

  function applyCleanup() {
    if (observer) observer.disconnect();

    collapseSidebar();
    removeShortsShelves();
    hideShortsChip();
    hideSearchJunk();
    disableAutoplay();

    if (observer) startObserver();
  }

  let scheduled = false;
  function scheduleCleanup() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      redirectToSubscriptions();
      applyCleanup();
    });
  }

  // --- Bootstrap ---
  redirectToSubscriptions();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleCleanup, { once: true });
  } else {
    scheduleCleanup();
  }

  document.addEventListener("yt-navigate-start", redirectToSubscriptions, true);
  document.addEventListener("yt-navigate-finish", () => {
    scheduleCleanup();
    setTimeout(scheduleCleanup, 250);
  }, true);

  observer = new MutationObserver(scheduleCleanup);
  function startObserver() {
    if (!document.documentElement) return;
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startObserver, { once: true });
  } else {
    startObserver();
  }
})();
