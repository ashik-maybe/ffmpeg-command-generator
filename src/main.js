import './style.css';
import { operations } from './operations.js';
import { buildCommand, getUsage } from './commands.js';

const tabs = Object.keys(operations);

const tabIcons = {
  convert: 'fa-file-arrow-down',
  audio: 'fa-music',
  trim: 'fa-scissors',
  filters: 'fa-sliders',
  encode: 'fa-gears',
  concat: 'fa-link',
  subtitles: 'fa-closed-captioning',
  gif: 'fa-images',
  thumbnails: 'fa-camera',
  merge: 'fa-object-group',
  stream: 'fa-satellite-dish',
  metadata: 'fa-tags'
};

const operationIcons = tabIcons;

let state = {
  activeTab: 'convert',
  formData: {},
  copied: false,
  theme: 'light'
};

let commandUpdateTimeout = null;

function getInitialTheme() {
  const saved = localStorage.getItem('ffmpeg-theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
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
      <i class="fa-solid ${tabIcons[tab]}"></i>
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
        <i class="fa-solid ${operationIcons[state.activeTab]}"></i>
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
          <i class="fa-solid fa-terminal"></i>
          Generated Command
        </h3>
        <button class="copy-btn ${state.copied ? 'copied' : ''}" id="copyBtn">
          <i class="fa-solid ${state.copied ? 'fa-check' : 'fa-copy'}"></i>
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
          <i class="fa-solid fa-lightbulb"></i>
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
  const themeIcon = document.querySelector('.theme-toggle i');
  if (themeIcon) {
    themeIcon.className = `fa-solid ${state.theme === 'dark' ? 'fa-moon' : 'fa-sun'}`;
  }
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
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
            <i class="fa-solid fa-film"></i>
          </div>
          <h1>FFmpeg Command Generator</h1>
        </div>
        <button class="theme-toggle" id="themeToggle" title="Toggle theme">
          <i class="fa-solid ${state.theme === 'dark' ? 'fa-moon' : 'fa-sun'}"></i>
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
        <i class="fa-solid fa-check"></i>
        Copied!
      `;
      copyBtn.classList.add('copied');
    }
    setTimeout(() => {
      state.copied = false;
      const btn = document.getElementById('copyBtn');
      if (btn) {
        btn.innerHTML = `
          <i class="fa-solid fa-copy"></i>
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
