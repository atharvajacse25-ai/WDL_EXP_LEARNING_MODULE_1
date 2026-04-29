document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
    const hrs = document.querySelectorAll('hr');

    function showSection(id) {
        sections.forEach(section => {
            if (section.id === id) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
        
        // Hide all HRs in tab mode
        hrs.forEach(hr => hr.style.display = 'none');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    showSection('home');
    document.querySelector('nav ul li a[href="#home"]').classList.add('active');
});

    // Currency Converter Logic
    const currencySelect = document.getElementById('currency-select');
    const prices = {
        launchpad: 499,
        accelerator: 1499,
        velocity: 2999
    };

    async function convertPrices(targetCurrency) {
        if (targetCurrency === 'USD') {
            document.getElementById('price-launchpad').innerText = prices.launchpad;
            document.getElementById('price-accelerator').innerText = prices.accelerator;
            document.getElementById('price-velocity').innerText = prices.velocity;
            return;
        }

        try {
            const response = await fetch('https://open.er-api.com/v6/latest/USD');
            const data = await response.json();
            const rate = data.rates[targetCurrency];

            if (rate) {
                document.getElementById('price-launchpad').innerText = (prices.launchpad * rate).toFixed(2);
                document.getElementById('price-accelerator').innerText = (prices.accelerator * rate).toFixed(2);
                document.getElementById('price-velocity').innerText = (prices.velocity * rate).toFixed(2);
            } else {
                throw new Error('Rate not found');
            }
        } catch (error) {
            console.error('Conversion error:', error);
            // Fallback to basic error message without alert for better UX
            const errorMsg = document.createElement('p');
            errorMsg.style.color = 'red';
            errorMsg.innerText = 'Could not update prices. Please try again later.';
            document.getElementById('pricing').appendChild(errorMsg);
        }
    }

    currencySelect.addEventListener('change', (e) => {
        convertPrices(e.target.value);
    });
