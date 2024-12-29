// Sidebar Toggle
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('main');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('translate-x-full');
    // Toggle main content margin
    mainContent.classList.toggle('sm:mr-64');
    mainContent.classList.toggle('sm:mr-0');
});

// Search functionality for tables
function setupTableSearch(inputSelector, tableSelector) {
    const searchInput = document.querySelector(inputSelector);
    const table = document.querySelector(tableSelector);
    const rows = table.querySelectorAll('tbody tr');

    if (!searchInput || !table) return;

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
}

// Setup search for both tables
setupTableSearch('input[placeholder="Search referrals..."]', '#referrals-table');
setupTableSearch('input[placeholder="Search students..."]', '#students-table');

// Toast notification function
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.remove('translate-y-full', 'opacity-0');
    
    if (type === 'success') {
        toast.classList.remove('bg-red-500');
        toast.classList.add('bg-green-500');
    } else {
        toast.classList.remove('bg-green-500');
        toast.classList.add('bg-red-500');
    }
    
    setTimeout(() => {
        toast.classList.add('translate-y-full', 'opacity-0');
    }, 3000);
}

// Example usage of toast
document.querySelectorAll('.text-blue-600').forEach(button => {
    button.addEventListener('click', () => {
        showToast('Changes saved successfully!');
    });
});

// Handle table pagination (basic example)
function setupPagination(tableSelector, itemsPerPage = 10) {
    const table = document.querySelector(tableSelector);
    const rows = table.querySelectorAll('tbody tr');
    const pageCount = Math.ceil(rows.length / itemsPerPage);
    let currentPage = 1;

    function showPage(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        rows.forEach((row, index) => {
            row.style.display = (index >= start && index < end) ? '' : 'none';
        });
    }

    // Initial display
    showPage(1);
}

// Initialize pagination for both tables
setupPagination('#referrals-table');
setupPagination('#students-table'); 