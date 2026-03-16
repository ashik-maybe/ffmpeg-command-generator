import './style.css';
import { operations } from './operations.js';
import { buildCommand, getUsage } from './commands.js';

const tabs = Object.keys(operations);

const tabIcons = {
  convert: 'arrow.down.doc',
  audio: 'music.note',
  trim: 'scissors',
  filters: 'slider.horizontal.3',
  encode: 'gearshape',
  concat: 'link',
  subtitles: 'captions.bubble',
  gif: 'photo.stack',
  thumbnails: 'camera',
  merge: 'rectangle.on.rectangle',
  stream: 'antenna.radiowaves.left.and.right',
  metadata: 'tag'
};

const operationIcons = {
  convert: 'arrow.down.doc',
  audio: 'music.note',
  trim: 'scissors',
  filters: 'slider.horizontal.3',
  encode: 'gearshape',
  concat: 'link',
  subtitles: 'captions.bubble',
  gif: 'photo.stack',
  thumbnails: 'camera',
  merge: 'rectangle.on.rectangle',
  stream: 'antenna.radiowaves.left.and.right',
  metadata: 'tag'
};

const iconPaths = {
  'arrow.down.doc': 'M4 14v6h6M10 4v16M20 20l-8-8M14.5 5.5L20 12',
  'music.note': 'M9 18V5l12-2v13M9 18c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zM21 16c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z',
  'scissors': 'M6 9l6 6-6 6M14 9l-4 4 4 4M9 6v4M15 6v4M6 18v2M18 18v2',
  'slider.horizontal.3': 'M4 21v-2M4 13V7M12 21v-4M12 13V7M20 21v-6M20 13V7M2 9h4M14 9h4M18 9h2M6 15h2',
  'gearshape': 'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z',
  'link': 'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71',
  'captions.bubble': 'M4 4h16v12H5.17L4 17.17V4m4-2h12m-4-2v8m-4-6h8',
  'photo.stack': 'M4 4h3l2-2h6l2 2h3a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM8 14l2-2 2 2 2-2 2 2',
  'camera': 'M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 13a4 4 0 100-8 4 4 0 000 8z',
  'rectangle.on.rectangle': 'M4 6h16v12H4zM4 6a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2zM9 12h6',
  'antenna.radiowaves.left.and.right': 'M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01',
  'tag': 'M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01'
};

let state = {
  activeTab: 'convert',
  formData: {},
  copied: false,
  theme: 'mocha'
};

let commandUpdateTimeout = null;

function getInitialTheme() {
  const saved = localStorage.getItem('ffmpeg-theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'latte' : 'mocha';
}

function initTheme() {
  state.theme = getInitialTheme();
  document.documentElement.setAttribute('data-theme', state.theme);
}

function initFormData() {
  const op = operations[state.activeTab];
  const defaults = {};
  op.fields.forEach(field => {
    if (field.default !== undefined) {
      defaults[field.id] = field.default;
    } else if (field.type === 'checkbox') {
      defaults[field.id] = false;
    }
  });
  state.formData = defaults;
}

function renderTabs() {
  return tabs.map(tab => `
    <button 
      class="tab-btn ${state.activeTab === tab ? 'active' : ''}" 
      data-tab="${tab}"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="${iconPaths[tabIcons[tab]]}"></path>
      </svg>
      <span>${operations[tab].name}</span>
    </button>
  `).join('');
}

function renderField(field) {
  const value = state.formData[field.id] ?? field.default ?? '';
  
  switch (field.type) {
    case 'text':
    case 'password': {
      return `
        <div class="field">
          <label for="${field.id}">${field.label}${field.required ? ' *' : ''}</label>
          <input 
            type="${field.type}" 
            id="${field.id}" 
            placeholder="${field.placeholder || ''}"
            value="${value}"
            ${field.required ? 'required' : ''}
          >
        </div>
      `;
    }
    case 'number': {
      return `
        <div class="field">
          <label for="${field.id}">${field.label}</label>
          <input 
            type="number" 
            id="${field.id}" 
            min="${field.min ?? ''}"
            max="${field.max ?? ''}"
            step="${field.step ?? 1}"
            placeholder="${field.placeholder ?? ''}"
            value="${value}"
          >
        </div>
      `;
    }
    case 'select': {
      const options = field.options.map(opt => 
        `<option value="${opt}" ${value === opt ? 'selected' : ''}>${opt}</option>`
      ).join('');
      return `
        <div class="field">
          <label for="${field.id}">${field.label}</label>
          <select id="${field.id}">${options}</select>
        </div>
      `;
    }
    case 'checkbox': {
      return `
        <div class="field checkbox-field">
          <label>
            <input 
              type="checkbox" 
              id="${field.id}" 
              ${value ? 'checked' : ''}
            >
            <span class="checkbox-custom"></span>
            ${field.label}
          </label>
        </div>
      `;
    }
    case 'textarea': {
      return `
        <div class="field">
          <label for="${field.id}">${field.label}${field.required ? ' *' : ''}</label>
          <textarea 
            id="${field.id}" 
            rows="4"
            placeholder="${field.placeholder || ''}"
          >${value}</textarea>
        </div>
      `;
    }
    default:
      return '';
  }
}

function renderForm() {
  const op = operations[state.activeTab];
  return `
    <div class="form-section">
      <div class="form-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="${iconPaths[operationIcons[state.activeTab]]}"></path>
        </svg>
        <div class="title-group">
          <h2>${op.name}</h2>
          <p>${op.description}</p>
        </div>
      </div>
      <div class="form-fields">
        ${op.fields.map(renderField).join('')}
      </div>
    </div>
  `;
}

function renderCommand() {
  const command = buildCommand(state.activeTab, state.formData);
  return `
    <div class="command-section">
      <div class="command-header">
        <h3>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19"></line>
          </svg>
          Generated Command
        </h3>
        <button class="copy-btn ${state.copied ? 'copied' : ''}" id="copyBtn">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${state.copied 
              ? '<polyline points="20 6 9 17 4 12"></polyline>' 
              : '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>'}
          </svg>
          ${state.copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div class="terminal">
        <div class="terminal-header">
          <div class="terminal-buttons">
            <button class="terminal-btn close"></button>
            <button class="terminal-btn minimize"></button>
            <button class="terminal-btn maximize"></button>
          </div>
          <span class="terminal-title">zsh</span>
          <div style="width: 46px"></div>
        </div>
        <div class="terminal-body">
          <div class="command-preview">
            <code>${escapeHtml(command)}</code>
            <span class="cursor">▌</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderUsage() {
  const usage = getUsage(state.activeTab);
  if (!usage) return '';
  return `
    <div class="usage-section">
      <details>
        <summary>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18h6M10 22h4M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z"></path>
          </svg>
          Usage Guide
        </summary>
        <p>${usage}</p>
      </details>
    </div>
  `;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function updateThemeIcon() {
  const themeIcon = document.querySelector('.theme-toggle svg');
  if (themeIcon) {
    themeIcon.innerHTML = state.theme === 'mocha' 
      ? '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>'
      : '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
  }
}

function toggleTheme() {
  state.theme = state.theme === 'mocha' ? 'latte' : 'mocha';
  document.documentElement.setAttribute('data-theme', state.theme);
  localStorage.setItem('ffmpeg-theme', state.theme);
  updateThemeIcon();
}

function render() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    <div class="app-container">
      <header class="app-header">
        <div class="logo">
          <div class="logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="2" width="20" height="20" rx="2"></rect>
              <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"></path>
            </svg>
          </div>
          <h1>FFmpeg Command Generator</h1>
        </div>
        <button class="theme-toggle" id="themeToggle" title="Toggle theme">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${state.theme === 'mocha' 
              ? '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>'
              : '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>'}
          </svg>
        </button>
      </header>
      
      <nav class="tab-nav">
        ${renderTabs()}
      </nav>
      
      <main class="app-main">
        ${renderForm()}
        ${renderCommand()}
        ${renderUsage()}
      </main>
      
      <footer class="app-footer">
        <p>Generated commands are for terminal use &bull; <a href="https://ffmpeg.org/documentation.html" target="_blank" rel="noopener">FFmpeg Docs</a></p>
      </footer>
    </div>
  `;
  
  attachEventListeners();
}

function attachEventListeners() {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  tabs.forEach(tab => {
    const btn = document.querySelector(`[data-tab="${tab}"]`);
    if (btn) {
      btn.addEventListener('click', () => {
        state.activeTab = tab;
        initFormData();
        render();
      });
    }
  });
  
  const formFields = document.querySelector('.form-fields');
  if (formFields) {
    formFields.addEventListener('input', handleFieldInput);
    formFields.addEventListener('change', handleFieldInput);
  }
  
  const copyBtn = document.getElementById('copyBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', copyCommand);
  }
}

function handleFieldInput(e) {
  const input = e.target;
  const fieldId = input.id;
  const field = operations[state.activeTab].fields.find(f => f.id === fieldId);
  if (!field) return;
  
  const value = field.type === 'checkbox' ? input.checked : input.value;
  state.formData[fieldId] = value;
  
  debouncedUpdateCommand();
}

function debouncedUpdateCommand() {
  if (commandUpdateTimeout) {
    clearTimeout(commandUpdateTimeout);
  }
  commandUpdateTimeout = setTimeout(updateCommand, 50);
}

function updateCommand() {
  const commandPreview = document.querySelector('.command-preview code');
  if (commandPreview) {
    const command = buildCommand(state.activeTab, state.formData);
    commandPreview.innerHTML = escapeHtml(command);
  }
}

function copyCommand() {
  const command = buildCommand(state.activeTab, state.formData);
  navigator.clipboard.writeText(command).then(() => {
    state.copied = true;
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
      copyBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Copied!
      `;
      copyBtn.classList.add('copied');
    }
    setTimeout(() => {
      state.copied = false;
      const btn = document.getElementById('copyBtn');
      if (btn) {
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
          </svg>
          Copy
        `;
        btn.classList.remove('copied');
      }
    }, 2000);
  });
}

initTheme();
initFormData();
render();
