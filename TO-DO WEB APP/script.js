// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clearCompleted');
const currentDateEl = document.getElementById('currentDate');

// Stats elements
const totalTasksEl = document.getElementById('totalTasks');
const activeTasksEl = document.getElementById('activeTasks');
const completedTasksEl = document.getElementById('completedTasks');

// State
let tasks = [];
let currentFilter = 'all';

// Initialize app
function init() {
    loadTasks();
    displayCurrentDate();
    renderTasks();
    updateStats();
}

// Display current date
function displayCurrentDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    currentDateEl.textContent = today.toLocaleDateString('en-US', options);
}

// Load tasks from localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        taskInput.focus();
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.unshift(newTask);
    taskInput.value = '';
    saveTasks();
    renderTasks();
    updateStats();
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
    updateStats();
}

// Toggle task completion
function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// Edit task
function editTask(id) {
    const taskItem = document.querySelector(`[data-id="${id}"]`);
    const taskTextEl = taskItem.querySelector('.task-text');
    const task = tasks.find(t => t.id === id);
    
    if (!task) return;

    // Create edit input
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input';
    editInput.value = task.text;
    
    // Create save button
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-btn';
    saveBtn.innerHTML = '<i class="fas fa-check"></i>';
    saveBtn.onclick = () => saveEdit(id, editInput.value);
    
    // Create cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancel-btn';
    cancelBtn.innerHTML = '<i class="fas fa-times"></i>';
    cancelBtn.onclick = () => renderTasks();
    
    // Replace task text with edit input
    taskItem.classList.add('editing');
    taskItem.appendChild(editInput);
    taskItem.appendChild(saveBtn);
    taskItem.appendChild(cancelBtn);
    
    editInput.focus();
    editInput.select();
    
    // Save on Enter key
    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveEdit(id, editInput.value);
        }
    });
}

// Save edited task
function saveEdit(id, newText) {
    const trimmedText = newText.trim();
    
    if (trimmedText === '') {
        renderTasks();
        return;
    }
    
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.text = trimmedText;
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// Clear completed tasks
function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
    updateStats();
}

// Filter tasks
function setFilter(filter) {
    currentFilter = filter;
    
    // Update active filter button
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    
    renderTasks();
}

// Get filtered tasks
function getFilteredTasks() {
    switch (currentFilter) {
        case 'active':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        default:
            return tasks;
    }
}

// Render tasks
function renderTasks() {
    const filteredTasks = getFilteredTasks();
    
    // Show/hide empty state
    if (filteredTasks.length === 0) {
        emptyState.classList.remove('hidden');
        taskList.innerHTML = '';
        return;
    } else {
        emptyState.classList.add('hidden');
    }
    
    // Render task items
    taskList.innerHTML = filteredTasks.map(task => `
        <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <div class="checkbox-wrapper">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                    onchange="toggleTask(${task.id})"
                >
            </div>
            <span class="task-text">${escapeHtml(task.text)}</span>
            <div class="task-actions">
                <button class="edit-btn" onclick="editTask(${task.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </li>
    `).join('');
}

// Update statistics
function updateStats() {
    const total = tasks.length;
    const active = tasks.filter(task => !task.completed).length;
    const completed = tasks.filter(task => task.completed).length;
    
    totalTasksEl.textContent = total;
    activeTasksEl.textContent = active;
    completedTasksEl.textContent = completed;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Event listeners
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setFilter(btn.dataset.filter);
    });
});

clearCompletedBtn.addEventListener('click', clearCompleted);

// Initialize app on load
init();
