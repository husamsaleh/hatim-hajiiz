// Image preview functionality
function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.querySelector('#imagePreview img').src = e.target.result;
            document.querySelector('#imagePreview').classList.remove('hidden');
            document.querySelector('#uploadInterface').classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }
}

function removeImage() {
    document.querySelector('#file-upload').value = '';
    document.querySelector('#imagePreview').classList.add('hidden');
    document.querySelector('#uploadInterface').classList.remove('hidden');
}

// Modal functionality
function openModal(modalId, passportData = null) {
    const modal = document.getElementById(modalId);
    if (passportData) {
        // Fill modal with passport data
        document.getElementById('modal-flight-number').value = passportData.flightNumber;
        document.getElementById('modal-passport-number').value = passportData.passportNumber;
        document.getElementById('modal-nationality').value = passportData.nationality;
        document.getElementById('modal-registration-date').value = passportData.registrationDate;
        if (passportData.photoUrl) {
            document.getElementById('modal-pilgrim-photo').src = passportData.photoUrl;
        }
    }
    modal.classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// Toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('translate-y-full', 'opacity-0');
    
    setTimeout(() => {
        toast.classList.add('translate-y-full', 'opacity-0');
    }, 3000);
}

// Form submission
document.querySelector('.hajj-passport-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    showToast('تم حفظ بيانات الجواز بنجاح!');
});

// Handle modal form submission
document.querySelector('#passportDetailsModal form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your update logic here
    showToast('تم تحديث بيانات الجواز بنجاح!');
    closeModal('passportDetailsModal');
}); 