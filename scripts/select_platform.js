document.addEventListener('DOMContentLoaded', function() {
    const selectHeader = document.querySelector('.select-header');
    const dropdown = document.querySelector('.dropdown');
    const options = document.querySelectorAll('.option');
    const selectedOption = document.querySelector('.selected-option');
    const searchInput = document.querySelector('.search-input');

    // Platform reference
    const youtube_pricing_section = document.getElementById('youtube_pricing_section');
    const show_platform = document.getElementById('show_platform');

    // Toggle dropdown
    selectHeader.addEventListener('click', function(e) {
        e.stopPropagation();
        selectHeader.classList.toggle('active');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        if (dropdown.style.display === 'block') {
            searchInput.focus();
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        selectHeader.classList.remove('active');
        dropdown.style.display = 'none';
    });

    dropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Handle option selection
    options.forEach(option => {
        option.addEventListener('click', function() {
            const value = this.dataset.value;
            const text = this.querySelector('span').textContent;
            const img = this.querySelector('img').cloneNode(true);

            // Update selected option display
            selectedOption.innerHTML = '';
            selectedOption.appendChild(img);
            selectedOption.appendChild(document.createTextNode(text));

            // Update selected state
            options.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');

            // Close dropdown
            selectHeader.classList.remove('active');
            dropdown.style.display = 'none';

            // Handle platform view hide
            if (text.toLowerCase() === 'youtube') {
                youtube_pricing_section.style.display = 'block';
            } else {
                youtube_pricing_section.style.display = 'none';
            }
        });
    });

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        options.forEach(option => {
            const text = option.querySelector('span').textContent.toLowerCase();
            option.style.display = text.includes(searchTerm) ? 'flex' : 'none';
        });
    });
});