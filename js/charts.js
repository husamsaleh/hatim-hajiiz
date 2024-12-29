// Initialize charts with error handling
function initializeCharts() {
    try {
        const charts = document.querySelectorAll('[data-chart]');
        
        charts.forEach(chart => {
            const type = chart.dataset.chart;
            const ctx = chart.getContext('2d');
            
            // Show loading state
            showChartLoading(chart);
            
            // Initialize chart based on type
            switch(type) {
                case 'performance':
                    initPerformanceChart(ctx);
                    break;
                case 'distribution':
                    initDistributionChart(ctx);
                    break;
                default:
                    console.warn(`Unknown chart type: ${type}`);
            }
            
            // Remove loading state
            hideChartLoading(chart);
        });
    } catch (error) {
        console.error('Error initializing charts:', error);
        showErrorMessage('عذراً، حدث خطأ في تحميل الرسوم البيانية');
    }
}

function showChartLoading(chart) {
    const wrapper = chart.parentElement;
    const loader = document.createElement('div');
    loader.className = 'absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center';
    loader.innerHTML = '<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>';
    wrapper.style.position = 'relative';
    wrapper.appendChild(loader);
}

function hideChartLoading(chart) {
    const wrapper = chart.parentElement;
    const loader = wrapper.querySelector('.absolute');
    if (loader) {
        loader.remove();
    }
}

function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded';
    errorDiv.textContent = message;
    document.querySelector('main').prepend(errorDiv);
} 