// Flight tracking functionality
let flightUpdateInterval;

function initializeFlightTracking() {
    refreshFlights();
    // Update flights every 5 minutes
    flightUpdateInterval = setInterval(refreshFlights, 300000);
}

function refreshFlights() {
    // Update last refresh time
    const now = new Date();
    document.getElementById('lastUpdate').textContent = now.toLocaleTimeString('ar-SA');
    
    // Simulate flight data update
    fetchFlightData()
        .then(updateFlightCards)
        .catch(handleError);
}

function fetchFlightData() {
    // Simulate API call to flight tracking service
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    flightNumber: 'SV3421',
                    origin: 'كوالالمبور',
                    destination: 'جدة',
                    status: 'on-time',
                    expectedArrival: '14:30',
                    pilgrims: 285,
                    readiness: 'ready',
                    progress: 75,
                    airline: 'الخطوط السعودية',
                    terminal: '1',
                    gate: 'B12',
                    offices: ['مكتب الرحمة', 'مكتب النور'],
                    lastUpdate: '12:45'
                },
                {
                    flightNumber: 'MS641',
                    origin: 'القاهرة',
                    destination: 'جدة',
                    status: 'delayed',
                    expectedArrival: '15:45',
                    pilgrims: 210,
                    readiness: 'preparing',
                    progress: 30,
                    airline: 'مصر للطيران',
                    terminal: '2',
                    gate: 'C4',
                    offices: ['مكتب الأمل'],
                    lastUpdate: '12:40',
                    delay: '45 دقيقة'
                },
                {
                    flightNumber: 'PK3201',
                    origin: 'إسلام آباد',
                    destination: 'جدة',
                    status: 'landed',
                    expectedArrival: '13:15',
                    pilgrims: 320,
                    readiness: 'completed',
                    progress: 100,
                    airline: 'الخطوط الباكستانية',
                    terminal: '1',
                    gate: 'A8',
                    offices: ['مكتب السلام', 'مكتب الهدى'],
                    lastUpdate: '13:20'
                },
                {
                    flightNumber: 'TK158',
                    origin: 'إسطنبول',
                    destination: 'جدة',
                    status: 'on-time',
                    expectedArrival: '16:20',
                    pilgrims: 245,
                    readiness: 'preparing',
                    progress: 15,
                    airline: 'الخطوط التركية',
                    terminal: '2',
                    gate: 'D6',
                    offices: ['مكتب البركة'],
                    lastUpdate: '12:30'
                },
                {
                    flightNumber: 'EK3589',
                    origin: 'جاكرتا',
                    destination: 'جدة',
                    status: 'delayed',
                    expectedArrival: '17:30',
                    pilgrims: 380,
                    readiness: 'not-ready',
                    progress: 0,
                    airline: 'طيران الإمارات',
                    terminal: '1',
                    gate: 'B5',
                    offices: ['مكتب الفردوس', 'مكتب الإيمان', 'مكتب التقوى'],
                    lastUpdate: '12:15',
                    delay: '90 دقيقة'
                }
            ]);
        }, 1000);
    });
}

function updateFlightCards(flights) {
    const flightContainer = document.querySelector('.grid');
    flightContainer.innerHTML = flights.map(flight => createFlightCard(flight)).join('');
}

function createFlightCard(flight) {
    const statusClasses = {
        'on-time': 'bg-green-100 text-green-800',
        'delayed': 'bg-yellow-100 text-yellow-800',
        'landed': 'bg-blue-100 text-blue-800',
        'not-ready': 'bg-gray-100 text-gray-800',
        'cancelled': 'bg-red-100 text-red-800'
    };

    return `
        <div class="border rounded-lg p-4 relative overflow-hidden">
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h3 class="font-bold">${flight.flightNumber}</h3>
                    <div class="space-y-1">
                        <p class="text-sm text-gray-600">${flight.airline}</p>
                        <p class="text-sm text-gray-600">${flight.origin} → ${flight.destination}</p>
                        <p class="text-xs text-gray-500">بوابة ${flight.gate} • مبنى ${flight.terminal}</p>
                    </div>
                </div>
                <span class="px-3 py-1 rounded-full text-xs ${statusClasses[flight.status]}">
                    ${getStatusText(flight.status)}
                    ${flight.delay ? `<span class="block text-xs mt-1">تأخير ${flight.delay}</span>` : ''}
                </span>
            </div>
            <div class="space-y-2">
                <div class="flex justify-between text-sm">
                    <span class="text-gray-600">وقت الوصول المتوقع:</span>
                    <span class="font-medium">${flight.expectedArrival}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-600">عدد الحجاج:</span>
                    <span class="font-medium">${flight.pilgrims}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-600">المكاتب:</span>
                    <span class="font-medium">${flight.offices.join(' • ')}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-600">حالة التجهيز:</span>
                    <span class="font-medium text-blue-600">${getReadinessText(flight.readiness)}</span>
                </div>
            </div>
            <div class="mt-4">
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-green-600 h-2 rounded-full" style="width: ${flight.progress}%"></div>
                </div>
                <div class="text-xs text-gray-500 text-left mt-1">
                    آخر تحديث: ${flight.lastUpdate}
                </div>
            </div>
        </div>
    `;
}

function getStatusText(status) {
    const statusMap = {
        'on-time': 'في الوقت المحدد',
        'delayed': 'متأخرة',
        'landed': 'هبطت',
        'not-ready': 'لم تبدأ',
        'cancelled': 'ملغية'
    };
    return statusMap[status] || status;
}

function getReadinessText(readiness) {
    const readinessMap = {
        'ready': 'جاهز للاستقبال',
        'preparing': 'جاري التجهيز',
        'completed': 'تم الاستقبال',
        'not-ready': 'لم يبدأ التجهيز',
        'cancelled': 'ملغي'
    };
    return readinessMap[readiness] || readiness;
}

function handleError(error) {
    console.error('Error fetching flight data:', error);
    showToast('حدث خطأ أثناء تحديث بيانات الرحلات');
}

// Initialize flight tracking when the page loads
document.addEventListener('DOMContentLoaded', initializeFlightTracking); 