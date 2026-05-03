document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    function showSection(id) {
        sections.forEach(section => {
            if (section.id === id) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    showSection('home');

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
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    if (currencySelect) {
        currencySelect.addEventListener('change', (e) => {
            convertPrices(e.target.value);
        });
    }
});
