// State
let currentStructure = 'stack';
let stackItems = [];
let queueItems = [];

// DOM Elements
const structureBtns = document.querySelectorAll('.structure-btn');
const elementInput = document.getElementById('element-input');
const addBtn = document.getElementById('add-btn');
const removeBtn = document.getElementById('remove-btn');
const peekBtn = document.getElementById('peek-btn');
const clearBtn = document.getElementById('clear-btn');
const peekValue = document.getElementById('peek-value');
const sizeValue = document.getElementById('size-value');
const statusValue = document.getElementById('status-value');
const visualizationContainer = document.getElementById('visualization-container');

// Labels that change based on structure
const addLabel = document.getElementById('add-label');
const removeLabel = document.getElementById('remove-label');
const peekLabel = document.getElementById('peek-label');
const removeText = document.getElementById('remove-text');
const peekText = document.getElementById('peek-text');
const clearText = document.getElementById('clear-text');
const vizTitle = document.getElementById('viz-title');
const vizSubtitle = document.getElementById('viz-subtitle');
const complexity1Label = document.getElementById('complexity-1-label');
const complexity2Label = document.getElementById('complexity-2-label');
const complexity3Label = document.getElementById('complexity-3-label');
const operationsTitle = document.querySelector('.operations-title');

// Event Listeners
structureBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const structure = btn.dataset.structure;
        switchStructure(structure);
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
function switchStructure(structure) {
    currentStructure = structure;
    
    // Update active button
    structureBtns.forEach(btn => {
        if (btn.dataset.structure === structure) {
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
    sizeValue.textContent = count;
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

function renderStack(items) {
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

function renderQueue(items) {
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
