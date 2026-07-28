// Browser-to-GitHub synchronization for bookmarks and annotations.
(() => {
  'use strict';

  const REPOSITORY = 'luckyDH518/research-daily';
  const API_ROOT = `https://api.github.com/repos/${REPOSITORY}/contents/`;
  const TOKEN_KEY = 'researchDailyGitHubTokenV1';
  const MARKS_KEY = 'researchDailyMarkedPapersV2';
  const EDITS_KEY = 'researchDailyPaperEditsV2';
  const BOOKMARKS_PATH = 'user-data/bookmarks.js';
  const ANNOTATIONS_PATH = 'user-data/annotations.js';

  function loadLocal(key) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  function mergeOverlay(base, overlay) {
    const result = { ...(base || {}) };
    Object.entries(overlay || {}).forEach(([key, value]) => {
      if (value === false || value === null) delete result[key];
      else result[key] = value;
    });
    return result;
  }

  function stable(value) {
    if (!value || typeof value !== 'object') return JSON.stringify(value ?? null);
    const sorted = {};
    Object.keys(value).sort().forEach((key) => { sorted[key] = value[key]; });
    return JSON.stringify(sorted);
  }

  function pendingCount() {
    const currentBookmarks = window.RESEARCH_USER_BOOKMARKS && typeof window.RESEARCH_USER_BOOKMARKS === 'object'
      ? window.RESEARCH_USER_BOOKMARKS
      : {};
    const currentAnnotations = window.RESEARCH_USER_ANNOTATIONS && typeof window.RESEARCH_USER_ANNOTATIONS === 'object'
      ? window.RESEARCH_USER_ANNOTATIONS
      : {};
    const desiredBookmarks = mergeOverlay(currentBookmarks, loadLocal(MARKS_KEY));
    const desiredAnnotations = mergeOverlay(currentAnnotations, loadLocal(EDITS_KEY));
    let count = 0;
    new Set([...Object.keys(currentBookmarks), ...Object.keys(desiredBookmarks)]).forEach((key) => {
      if (JSON.stringify(currentBookmarks[key] ?? null) !== JSON.stringify(desiredBookmarks[key] ?? null)) count += 1;
    });
    new Set([...Object.keys(currentAnnotations), ...Object.keys(desiredAnnotations)]).forEach((key) => {
      if (JSON.stringify(currentAnnotations[key] ?? null) !== JSON.stringify(desiredAnnotations[key] ?? null)) count += 1;
    });
    return count;
  }

  function decodeBase64Utf8(value) {
    const binary = atob(String(value || '').replace(/\s/g, ''));
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  function encodeBase64Utf8(value) {
    const bytes = new TextEncoder().encode(value);
    let binary = '';
    const chunkSize = 0x8000;
    for (let index = 0; index < bytes.length; index += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
    }
    return btoa(binary);
  }

  function extractAssignedObject(source, variableName) {
    const marker = `window.${variableName}`;
    const markerIndex = source.indexOf(marker);
    const equalIndex = source.indexOf('=', markerIndex + marker.length);
    const start = source.indexOf('{', equalIndex + 1);
    if (markerIndex < 0 || equalIndex < 0 || start < 0) throw new Error(`无法解析 ${variableName}`);

    let depth = 0;
    let inString = false;
    let escaped = false;
    for (let index = start; index < source.length; index += 1) {
      const character = source[index];
      if (inString) {
        if (escaped) escaped = false;
        else if (character === '\\') escaped = true;
        else if (character === '"') inString = false;
        continue;
      }
      if (character === '"') { inString = true; continue; }
      if (character === '{') depth += 1;
      if (character === '}') {
        depth -= 1;
        if (depth === 0) return JSON.parse(source.slice(start, index + 1));
      }
    }
    throw new Error(`无法找到 ${variableName} 的结束位置`);
  }

  function bookmarksFileContent(bookmarks) {
    return `// Canonical cross-device bookmark data. Keys use YYYY-MM-DD::paperId.\nwindow.RESEARCH_USER_BOOKMARKS = ${JSON.stringify(bookmarks, null, 2)};\n\n// Load the optional browser-to-GitHub synchronization controls.\n(() => {\n  if (document.querySelector('script[data-research-github-sync]')) return;\n  const script = document.createElement('script');\n  script.src = 'user-data/github-sync.js';\n  script.dataset.researchGithubSync = 'true';\n  document.head.append(script);\n})();\n`;
  }

  function annotationsFileContent(annotations) {
    return `// Canonical cross-device annotation data. Keys use YYYY-MM-DD::paperId::field.\nwindow.RESEARCH_USER_ANNOTATIONS = ${JSON.stringify(annotations, null, 2)};\n`;
  }

  async function githubRequest(path, token, options = {}) {
    const response = await fetch(`${API_ROOT}${path}`, {
      ...options,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        ...(options.headers || {})
      }
    });
    let payload = {};
    try { payload = await response.json(); } catch (_) { payload = {}; }
    if (!response.ok) {
      const message = typeof payload.message === 'string' ? payload.message : `HTTP ${response.status}`;
      throw new Error(message);
    }
    return payload;
  }

  async function readRemoteFile(path, variableName, token) {
    const payload = await githubRequest(path, token, { method: 'GET', cache: 'no-store' });
    const source = decodeBase64Utf8(payload.content);
    return { sha: payload.sha, source, data: extractAssignedObject(source, variableName) };
  }

  async function updateRemoteFile(path, sha, content, message, token) {
    return githubRequest(path, token, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, content: encodeBase64Utf8(content), sha })
    });
  }

  function getToken() {
    const existing = sessionStorage.getItem(TOKEN_KEY);
    if (existing) return existing;
    const entered = window.prompt(
      '请输入 GitHub Fine-grained PAT。建议只授权 luckyDH518/research-daily，并仅授予 Contents 读写权限。令牌只保存在当前浏览器标签页会话中。'
    );
    if (!entered || !entered.trim()) return '';
    const token = entered.trim();
    sessionStorage.setItem(TOKEN_KEY, token);
    return token;
  }

  function setButtonState(button, message, disabled = false) {
    button.textContent = message;
    button.disabled = disabled;
  }

  async function synchronize(button, status) {
    if (pendingCount() === 0) {
      status.textContent = '当前没有需要同步到 GitHub 的本地修改。';
      return;
    }
    const token = getToken();
    if (!token) return;

    setButtonState(button, '正在同步…', true);
    status.textContent = '正在读取 GitHub 最新用户数据并合并本机修改…';

    try {
      const [remoteBookmarks, remoteAnnotations] = await Promise.all([
        readRemoteFile(BOOKMARKS_PATH, 'RESEARCH_USER_BOOKMARKS', token),
        readRemoteFile(ANNOTATIONS_PATH, 'RESEARCH_USER_ANNOTATIONS', token)
      ]);
      const desiredBookmarks = mergeOverlay(remoteBookmarks.data, loadLocal(MARKS_KEY));
      const desiredAnnotations = mergeOverlay(remoteAnnotations.data, loadLocal(EDITS_KEY));
      const updates = [];

      if (stable(remoteAnnotations.data) !== stable(desiredAnnotations)) {
        updates.push(updateRemoteFile(
          ANNOTATIONS_PATH,
          remoteAnnotations.sha,
          annotationsFileContent(desiredAnnotations),
          'Sync research daily annotations',
          token
        ));
      }
      if (stable(remoteBookmarks.data) !== stable(desiredBookmarks)) {
        updates.push(updateRemoteFile(
          BOOKMARKS_PATH,
          remoteBookmarks.sha,
          bookmarksFileContent(desiredBookmarks),
          'Sync research daily bookmarks',
          token
        ));
      }
      await Promise.all(updates);

      localStorage.removeItem(MARKS_KEY);
      localStorage.removeItem(EDITS_KEY);
      window.RESEARCH_USER_BOOKMARKS = desiredBookmarks;
      window.RESEARCH_USER_ANNOTATIONS = desiredAnnotations;
      status.textContent = `同步成功：${Object.keys(desiredBookmarks).length} 个标记、${Object.keys(desiredAnnotations).length} 条修改。页面即将刷新。`;
      setButtonState(button, '同步成功', true);
      window.setTimeout(() => window.location.reload(), 900);
    } catch (error) {
      const authenticationHint = /Bad credentials|Resource not accessible|Requires authentication|Not Found/i.test(error.message)
        ? ' 请检查令牌是否仅授权了正确仓库，并具有 Contents 读写权限。'
        : '';
      status.textContent = `GitHub 同步失败：${error.message}.${authenticationHint}`;
      setButtonState(button, '重试同步到 GitHub', false);
      if (/Bad credentials/i.test(error.message)) sessionStorage.removeItem(TOKEN_KEY);
    }
  }

  function installControls() {
    if (document.getElementById('github-sync-button')) return;
    const copyButton = document.getElementById('copy-sync-button');
    const status = document.getElementById('sync-status');
    if (!copyButton || !status) {
      window.setTimeout(installControls, 100);
      return;
    }

    const syncButton = document.createElement('button');
    syncButton.id = 'github-sync-button';
    syncButton.type = 'button';
    syncButton.className = 'sync-button';
    syncButton.style.marginTop = '7px';
    syncButton.textContent = '同步到 GitHub';
    syncButton.addEventListener('click', () => synchronize(syncButton, status));

    const forgetButton = document.createElement('button');
    forgetButton.id = 'forget-github-token-button';
    forgetButton.type = 'button';
    forgetButton.className = 'sync-button';
    forgetButton.style.marginTop = '7px';
    forgetButton.textContent = '清除本次会话凭证';
    forgetButton.addEventListener('click', () => {
      sessionStorage.removeItem(TOKEN_KEY);
      status.textContent = '已清除当前标签页保存的 GitHub 会话凭证。';
    });

    copyButton.insertAdjacentElement('afterend', syncButton);
    syncButton.insertAdjacentElement('afterend', forgetButton);
  }

  installControls();
})();
