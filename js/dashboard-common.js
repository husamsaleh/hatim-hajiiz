// Common dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar on mobile
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('translate-x-full');
        });
    }

    // Toast notification system
    const showToast = (message, type = 'success') => {
        const toast = document.getElementById('toast');
        if (!toast) {
            const newToast = document.createElement('div');
            newToast.id = 'toast';
            newToast.className = `fixed bottom-4 left-4 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 z-50 ${
                type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white`;
            document.body.appendChild(newToast);
        }
        
        const toastElement = document.getElementById('toast');
        toastElement.textContent = message;
        toastElement.classList.remove('translate-y-full', 'opacity-0');
        
        setTimeout(() => {
            toastElement.classList.add('translate-y-full', 'opacity-0');
        }, 3000);
    };

    // Error boundary
    window.onerror = function(msg, url, lineNo, columnNo, error) {
        console.error('Error: ', msg, url, lineNo, columnNo, error);
        showToast('حدث خطأ غير متوقع. يرجى تحديث الصفحة.', 'error');
        return false;
    };

    // Update statistics with loading state
    async function updateStats() {
        const statsContainer = document.getElementById('statistics-container');
        if (!statsContainer) return;

        try {
            statsContainer.classList.add('opacity-50');
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Update stats here
            statsContainer.classList.remove('opacity-50');
        } catch (error) {
            console.error('Error updating stats:', error);
            showToast('فشل تحديث الإحصائيات', 'error');
        }
    }

    // Handle offline/online states
    window.addEventListener('online', () => {
        showToast('تم استعادة الاتصال بالإنترنت', 'success');
        updateStats();
    });

    window.addEventListener('offline', () => {
        showToast('انقطع الاتصال بالإنترنت', 'error');
    });

    // Update every 30 seconds
    setInterval(updateStats, 30000);

    // Handle notifications
    function checkNotifications() {
        // This would be replaced with actual API calls
        console.log('Checking for new notifications...');
    }

    // Check notifications every minute
    setInterval(checkNotifications, 60000);
}); 