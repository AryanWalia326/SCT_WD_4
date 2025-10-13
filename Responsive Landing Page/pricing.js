// Pricing page toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const billingToggle = document.getElementById('billing-toggle');
    const amounts = document.querySelectorAll('.pricing-price .amount');
    const billingNotes = document.querySelectorAll('.billing-note');
    
    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            const isAnnual = this.checked;
            
            amounts.forEach(amount => {
                if (!amount.classList.contains('custom')) {
                    const monthly = amount.getAttribute('data-monthly');
                    const annual = amount.getAttribute('data-annual');
                    
                    if (monthly && annual) {
                        amount.textContent = isAnnual ? annual : monthly;
                    }
                }
            });
            
            billingNotes.forEach(note => {
                if (!note.textContent.includes('Contact')) {
                    note.textContent = isAnnual ? 'Billed annually' : 'Billed monthly';
                }
            });
        });
    }
});
