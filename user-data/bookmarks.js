// Canonical cross-device bookmark data. Keys use YYYY-MM-DD::paperId.
window.RESEARCH_USER_BOOKMARKS = {
  "2026-07-24::workbuddy-bench": {
    "date": "2026-07-24",
    "paperId": "workbuddy-bench",
    "markedAt": "2026-07-24T09:49:50.355Z"
  },
  "2026-07-24::nvidia-oo-agents": {
    "date": "2026-07-24",
    "paperId": "nvidia-oo-agents",
    "markedAt": "2026-07-24T09:49:54.054Z"
  },
  "2026-07-27::agent-security-redefinition": {
    "date": "2026-07-27",
    "paperId": "agent-security-redefinition",
    "markedAt": "2026-07-27T07:03:11.708Z"
  },
  "2026-07-27::agent-benchmark-validity": {
    "date": "2026-07-27",
    "paperId": "agent-benchmark-validity",
    "markedAt": "2026-07-27T07:34:45.265Z"
  },
  "2026-07-28::skillware-v2": {
    "date": "2026-07-28",
    "paperId": "skillware-v2",
    "markedAt": "2026-07-28T05:46:15.127Z"
  },
  "2026-07-31::fincacheserve": {
    "date": "2026-07-31",
    "paperId": "fincacheserve",
    "markedAt": "2026-07-31T09:19:56.056Z"
  },
  "2026-07-31::v-steer": {
    "date": "2026-07-31",
    "paperId": "v-steer",
    "markedAt": "2026-07-31T09:20:43.542Z"
  }
};

// Load the optional browser-to-GitHub synchronization controls.
(() => {
  if (document.querySelector('script[data-research-github-sync]')) return;
  const script = document.createElement('script');
  script.src = 'user-data/github-sync.js';
  script.dataset.researchGithubSync = 'true';
  document.head.append(script);
})();
