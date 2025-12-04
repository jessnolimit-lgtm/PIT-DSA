import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    // State
    let currentStructure = 'stack';
    let stackItems: string[] = [];
    let queueItems: string[] = [];

    // DOM Elements
    const structureBtns = document.querySelectorAll('.structure-btn');
    const elementInput = document.getElementById('element-input') as HTMLInputElement;
    const addBtn = document.getElementById('add-btn') as HTMLButtonElement;
    const removeBtn = document.getElementById('remove-btn') as HTMLButtonElement;
    const peekBtn = document.getElementById('peek-btn') as HTMLButtonElement;
    const clearBtn = document.getElementById('clear-btn') as HTMLButtonElement;
    const peekValue = document.getElementById('peek-value') as HTMLDivElement;
    const sizeValue = document.getElementById('size-value') as HTMLSpanElement;
    const statusValue = document.getElementById('status-value') as HTMLSpanElement;
    const visualizationContainer = document.getElementById('visualization-container') as HTMLDivElement;

    // Labels that change based on structure
    const addLabel = document.getElementById('add-label') as HTMLLabelElement;
    const removeLabel = document.getElementById('remove-label') as HTMLLabelElement;
    const peekLabel = document.getElementById('peek-label') as HTMLLabelElement;
    const removeText = document.getElementById('remove-text') as HTMLSpanElement;
    const peekText = document.getElementById('peek-text') as HTMLSpanElement;
    const clearText = document.getElementById('clear-text') as HTMLSpanElement;
    const vizTitle = document.getElementById('viz-title') as HTMLHeadingElement;
    const vizSubtitle = document.getElementById('viz-subtitle') as HTMLParagraphElement;
    const complexity1Label = document.getElementById('complexity-1-label') as HTMLDivElement;
    const complexity2Label = document.getElementById('complexity-2-label') as HTMLDivElement;
    const operationsTitle = document.querySelector('.operations-title') as HTMLHeadingElement;

    // Event Listeners
    structureBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const structure = (btn as HTMLButtonElement).dataset.structure;
        switchStructure(structure!);
      });
    });

    addBtn.addEventListener('click', handleAdd);
    removeBtn.addEventListener('click', handleRemove);
    peekBtn.addEventListener('click', handlePeek);
    clearBtn.addEventListener('click', handleClear);

    elementInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleAdd();
      }
    });

    elementInput.addEventListener('input', () => {
      addBtn.disabled = !elementInput.value.trim();
    });

    // Functions
    function switchStructure(structure: string) {
      currentStructure = structure;
      
      // Update active button
      structureBtns.forEach(btn => {
        if ((btn as HTMLButtonElement).dataset.structure === structure) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
      
      // Update labels and text
      if (structure === 'stack') {
        addLabel.textContent = 'Push Element';
        removeLabel.textContent = 'Pop Element';
        peekLabel.textContent = 'Peek (Top)';
        removeText.textContent = 'Pop';
        peekText.textContent = 'View Top';
        clearText.textContent = 'Clear Stack';
        vizTitle.textContent = 'STACK VISUALIZATION';
        vizSubtitle.textContent = 'Last In, First Out (LIFO)';
        complexity1Label.textContent = 'Push';
        complexity2Label.textContent = 'Pop';
        operationsTitle.textContent = 'STACK OPERATIONS';
      } else {
        addLabel.textContent = 'Enqueue Element';
        removeLabel.textContent = 'Dequeue Element';
        peekLabel.textContent = 'Peek (Front)';
        removeText.textContent = 'Dequeue';
        peekText.textContent = 'View Front';
        clearText.textContent = 'Clear Queue';
        vizTitle.textContent = 'QUEUE VISUALIZATION';
        vizSubtitle.textContent = 'First In, First Out (FIFO)';
        complexity1Label.textContent = 'Enqueue';
        complexity2Label.textContent = 'Dequeue';
        operationsTitle.textContent = 'QUEUE OPERATIONS';
      }
      
      updateUI();
    }

    function handleAdd() {
      const value = elementInput.value.trim();
      if (!value) return;
      
      if (currentStructure === 'stack') {
        stackItems.push(value);
      } else {
        queueItems.push(value);
      }
      
      elementInput.value = '';
      addBtn.disabled = true;
      updateUI();
    }

    function handleRemove() {
      if (currentStructure === 'stack') {
        if (stackItems.length === 0) return;
        
        // Add removing animation
        const items = visualizationContainer.querySelectorAll('.stack-item');
        const lastItem = items[items.length - 1];
        if (lastItem) {
          lastItem.classList.add('removing');
          setTimeout(() => {
            stackItems.pop();
            updateUI();
          }, 200);
        }
      } else {
        if (queueItems.length === 0) return;
        
        // Add removing animation
        const items = visualizationContainer.querySelectorAll('.queue-item');
        const firstItem = items[0];
        if (firstItem) {
          firstItem.classList.add('removing');
          setTimeout(() => {
            queueItems.shift();
            updateUI();
          }, 200);
        }
      }
    }

    function handlePeek() {
      let value;
      if (currentStructure === 'stack') {
        value = stackItems[stackItems.length - 1];
      } else {
        value = queueItems[0];
      }
      
      if (value) {
        peekValue.textContent = value;
        peekValue.classList.add('show');
        setTimeout(() => {
          peekValue.classList.remove('show');
        }, 2000);
      }
    }

    function handleClear() {
      if (currentStructure === 'stack') {
        stackItems = [];
      } else {
        queueItems = [];
      }
      updateUI();
    }

    function updateUI() {
      const items = currentStructure === 'stack' ? stackItems : queueItems;
      const count = items.length;
      
      // Update info panel
      sizeValue.textContent = count.toString();
      statusValue.textContent = count === 0 ? 'Empty' : 'Active';
      statusValue.className = count === 0 ? 'info-status' : 'info-status active';
      
      // Update button states
      removeBtn.disabled = count === 0;
      peekBtn.disabled = count === 0;
      clearBtn.disabled = count === 0;
      
      // Update visualization
      renderVisualization();
    }

    function renderVisualization() {
      const items = currentStructure === 'stack' ? stackItems : queueItems;
      
      if (items.length === 0) {
        visualizationContainer.innerHTML = `
          <div class="empty-state">
            <div class="empty-box">Empty ${currentStructure === 'stack' ? 'Stack' : 'Queue'}</div>
            <p class="empty-text">${currentStructure === 'stack' ? 'Push' : 'Enqueue'} elements to get started</p>
          </div>
        `;
        return;
      }
      
      if (currentStructure === 'stack') {
        renderStack(items);
      } else {
        renderQueue(items);
      }
    }

    function renderStack(items: string[]) {
      const html = `
        <div class="stack-container">
          ${items.map((item, index) => `
            <div class="stack-item ${index === items.length - 1 ? 'top' : ''}">
              <span class="index">[${index}]</span>
              ${item}
              ${index === items.length - 1 ? '<span class="indicator">← Top</span>' : ''}
            </div>
          `).join('')}
          <div class="stack-base"></div>
          <div class="stack-base-label">Base</div>
        </div>
      `;
      visualizationContainer.innerHTML = html;
    }

    function renderQueue(items: string[]) {
      const html = `
        <div class="queue-container">
          <div class="queue-label front">Front →</div>
          ${items.map((item, index) => `
            <div class="queue-item ${index === 0 ? 'front' : ''}">
              <span>${item}</span>
              <span class="index">[${index}]</span>
            </div>
          `).join('')}
          <div class="queue-label rear">← Rear</div>
        </div>
      `;
      visualizationContainer.innerHTML = html;
    }

    // Initialize
    updateUI();
  }, []);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          background: #1e1e1e;
          color: #cccccc;
          overflow: hidden;
        }

        .app {
          display: flex;
          height: 100vh;
        }

        /* Sidebar */
        .sidebar {
          width: 320px;
          background: #252526;
          border-right: 1px solid #3e3e42;
          display: flex;
          flex-direction: column;
        }

        .sidebar-header {
          padding: 16px;
          border-bottom: 1px solid #3e3e42;
        }

        .sidebar-header h2 {
          font-size: 11px;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        /* Structure Selection */
        .structure-selection {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .structure-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          background: transparent;
          border: none;
          border-radius: 4px;
          color: #cccccc;
          cursor: pointer;
          transition: background-color 0.15s;
          font-size: 13px;
        }

        .structure-btn:hover {
          background: #2a2d2e;
        }

        .structure-btn.active {
          background: #37373d;
          color: white;
        }

        .structure-btn .icon {
          flex-shrink: 0;
        }

        .structure-btn span {
          flex: 1;
          text-align: left;
        }

        .structure-btn .chevron {
          opacity: 0;
          flex-shrink: 0;
        }

        .structure-btn.active .chevron {
          opacity: 1;
        }

        .separator {
          height: 1px;
          background: #3e3e42;
        }

        /* Operations Panel */
        .operations-panel {
          flex: 1;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          overflow-y: auto;
        }

        .operations-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .operations-title {
          font-size: 11px;
          letter-spacing: 0.5px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .operation-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .label {
          font-size: 13px;
          color: #cccccc;
        }

        .input-group {
          display: flex;
          gap: 8px;
        }

        .input {
          flex: 1;
          padding: 8px 12px;
          background: #3c3c3c;
          border: 1px solid #3e3e42;
          border-radius: 4px;
          color: white;
          font-size: 13px;
          outline: none;
        }

        .input::placeholder {
          color: #858585;
        }

        .input:focus {
          border-color: #007acc;
          box-shadow: 0 0 0 1px #007acc;
        }

        .btn {
          padding: 8px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.15s;
          outline: none;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-primary {
          background: #0e639c;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: #1177bb;
        }

        .btn-secondary {
          background: #3c3c3c;
          color: white;
          border: 1px solid #3e3e42;
        }

        .btn-secondary:hover:not(:disabled) {
          background: #505050;
        }

        .btn-danger {
          background: #3c3c3c;
          color: #f48771;
          border: 1px solid #3e3e42;
        }

        .btn-danger:hover:not(:disabled) {
          background: #5a1d1d;
        }

        .w-full {
          width: 100%;
        }

        .peek-value {
          padding: 8px;
          background: #1e1e1e;
          border: 1px solid #007acc;
          border-radius: 4px;
          color: #4ec9b0;
          text-align: center;
          font-size: 13px;
          display: none;
        }

        .peek-value.show {
          display: block;
          animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Info Panel */
        .info-panel {
          padding: 12px;
          background: #1e1e1e;
          border: 1px solid #3e3e42;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }

        .info-label {
          color: #858585;
        }

        .info-value {
          color: #4ec9b0;
        }

        .info-status {
          color: #858585;
        }

        .info-status.active {
          color: #4fc1ff;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          background: #1e1e1e;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px;
          overflow: hidden;
        }

        .visualization-header {
          margin-bottom: 32px;
          text-align: center;
        }

        .visualization-header h2 {
          font-size: 11px;
          letter-spacing: 0.5px;
          font-weight: 600;
          color: #cccccc;
        }

        .visualization-header p {
          font-size: 13px;
          color: #858585;
          margin-top: 4px;
        }

        .visualization-container {
          position: relative;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
        }

        .empty-box {
          width: 192px;
          height: 192px;
          border: 2px dashed #3e3e42;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          color: #858585;
          font-size: 14px;
        }

        .empty-text {
          color: #858585;
          font-size: 13px;
        }

        /* Stack Visualization */
        .stack-container {
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          gap: 8px;
          min-height: 400px;
          justify-content: flex-end;
        }

        .stack-item {
          position: relative;
          width: 256px;
          height: 64px;
          border-radius: 4px;
          border: 2px solid #3e3e42;
          background: #2d2d30;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #cccccc;
          font-size: 14px;
          animation: stackPush 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .stack-item.removing {
          animation: stackPop 0.2s ease-out forwards;
        }

        .stack-item.top {
          background: #0e639c;
          border-color: #1177bb;
          color: white;
          box-shadow: 0 4px 20px rgba(14, 99, 156, 0.2);
        }

        .stack-item .index {
          position: absolute;
          left: -48px;
          color: #858585;
          font-size: 13px;
        }

        .stack-item .indicator {
          position: absolute;
          right: -80px;
          color: #4fc1ff;
          font-size: 13px;
          animation: fadeIn 0.3s;
        }

        .stack-base {
          width: 256px;
          height: 4px;
          background: #3e3e42;
          margin-top: 8px;
        }

        .stack-base-label {
          color: #858585;
          font-size: 13px;
          margin-top: 4px;
        }

        @keyframes stackPush {
          from {
            opacity: 0;
            transform: translateY(-50px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes stackPop {
          to {
            opacity: 0;
            transform: translateY(-50px) scale(0.8);
          }
        }

        /* Queue Visualization */
        .queue-container {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 600px;
          justify-content: center;
          position: relative;
        }

        .queue-item {
          width: 128px;
          height: 96px;
          border-radius: 4px;
          border: 2px solid #3e3e42;
          background: #2d2d30;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #cccccc;
          font-size: 14px;
          animation: queueEnqueue 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .queue-item.removing {
          animation: queueDequeue 0.2s ease-out forwards;
        }

        .queue-item.front {
          background: #0e639c;
          border-color: #1177bb;
          color: white;
          box-shadow: 0 4px 20px rgba(14, 99, 156, 0.2);
        }

        .queue-item .index {
          color: #858585;
          font-size: 12px;
          margin-top: 4px;
        }

        .queue-label {
          position: absolute;
          font-size: 13px;
          white-space: nowrap;
        }

        .queue-label.front {
          left: -64px;
          color: #4fc1ff;
        }

        .queue-label.rear {
          right: -64px;
          color: #858585;
        }

        @keyframes queueEnqueue {
          from {
            opacity: 0;
            transform: translateX(100px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes queueDequeue {
          to {
            opacity: 0;
            transform: translateX(-100px) scale(0.8);
          }
        }

        /* Complexity Panel */
        .complexity-panel {
          margin-top: 48px;
          padding: 16px;
          background: #252526;
          border: 1px solid #3e3e42;
          border-radius: 4px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .complexity-item {
          text-align: center;
        }

        .complexity-label {
          font-size: 13px;
          color: #858585;
          margin-bottom: 4px;
        }

        .complexity-value {
          font-size: 14px;
          color: #4ec9b0;
        }

        /* Scrollbar */
        .operations-panel::-webkit-scrollbar {
          width: 8px;
        }

        .operations-panel::-webkit-scrollbar-track {
          background: transparent;
        }

        .operations-panel::-webkit-scrollbar-thumb {
          background: #424242;
          border-radius: 4px;
        }

        .operations-panel::-webkit-scrollbar-thumb:hover {
          background: #4e4e4e;
        }
      `}</style>

      <div className="app">
        {/* Sidebar */}
        <aside className="sidebar">
          {/* Header */}
          <div className="sidebar-header">
            <h2>DATA STRUCTURES</h2>
          </div>

          {/* Structure Selection */}
          <div className="structure-selection">
            <button className="structure-btn active" data-structure="stack">
              <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12.83 2.18v19.64M3.6 6.06l8.4 2.4 8.4-2.4M3.6 12l8.4 2.4 8.4-2.4m-16.8 5.94l8.4 2.4 8.4-2.4"/>
              </svg>
              <span>Stack</span>
              <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
            <button className="structure-btn" data-structure="queue">
              <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 12H3m8-4H3m10 8H3m18-8v8a2 2 0 0 1-2 2h-1"/>
                <circle cx="17" cy="10" r="1"/>
                <circle cx="17" cy="14" r="1"/>
              </svg>
              <span>Queue</span>
              <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>

          <div className="separator"></div>

          {/* Operations Panel */}
          <div className="operations-panel">
            <div className="operations-content">
              <h3 className="operations-title">STACK OPERATIONS</h3>
              
              {/* Add Element */}
              <div className="operation-section">
                <label className="label" id="add-label">Push Element</label>
                <div className="input-group">
                  <input 
                    type="text" 
                    id="element-input" 
                    className="input" 
                    placeholder="Enter value..."
                  />
                  <button className="btn btn-primary" id="add-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14m-7-7v14"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="separator"></div>

              {/* Remove Element */}
              <div className="operation-section">
                <label className="label" id="remove-label">Pop Element</label>
                <button className="btn btn-secondary w-full" id="remove-btn" disabled>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14"/>
                  </svg>
                  <span id="remove-text">Pop</span>
                </button>
              </div>

              <div className="separator"></div>

              {/* Peek */}
              <div className="operation-section">
                <label className="label" id="peek-label">Peek (Top)</label>
                <button className="btn btn-secondary w-full" id="peek-btn" disabled>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <span id="peek-text">View Top</span>
                </button>
                <div className="peek-value" id="peek-value"></div>
              </div>

              <div className="separator"></div>

              {/* Clear */}
              <div className="operation-section">
                <label className="label">Clear All</label>
                <button className="btn btn-danger w-full" id="clear-btn" disabled>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                  </svg>
                  <span id="clear-text">Clear Stack</span>
                </button>
              </div>
            </div>

            {/* Info Panel */}
            <div className="info-panel">
              <div className="info-row">
                <span className="info-label">Size:</span>
                <span className="info-value" id="size-value">0</span>
              </div>
              <div className="info-row">
                <span className="info-label">Status:</span>
                <span className="info-status" id="status-value">Empty</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="visualization-header">
            <h2 id="viz-title">STACK VISUALIZATION</h2>
            <p id="viz-subtitle">Last In, First Out (LIFO)</p>
          </div>

          <div className="visualization-container" id="visualization-container">
            {/* Visualization will be rendered here */}
          </div>

          {/* Complexity Info */}
          <div className="complexity-panel">
            <div className="complexity-item">
              <div className="complexity-label" id="complexity-1-label">Push</div>
              <div className="complexity-value">O(1)</div>
            </div>
            <div className="complexity-item">
              <div className="complexity-label" id="complexity-2-label">Pop</div>
              <div className="complexity-value">O(1)</div>
            </div>
            <div className="complexity-item">
              <div className="complexity-label" id="complexity-3-label">Peek</div>
              <div className="complexity-value">O(1)</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
