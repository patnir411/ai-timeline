// High-performance AI Timeline - optimized for maximum speed

// Immediately make all elements visible without animations
document.documentElement.style.setProperty('--transition-speed', '0s');

// Core Initialization Function - everything runs immediately with minimal effects
document.addEventListener('DOMContentLoaded', function() {
    // Show all elements immediately - no fade animations
    document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('visible');
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });

    // Core functionality only - skip all animations and decorative features
    initEraNavigation();
    initCategoryFilters();
    initSmallScreenAdaptation();
    initDarkModeToggle();
    initBasicTimelineInteraction();
    
    // Only the simplest search functionality
    if (window.innerWidth > 600) {
        initLightweightSearch();
    }
});

// Bare minimum interaction functions 

// Basic timeline interaction - simplified
function initBasicTimelineInteraction() {
    // Just add tooltips without any hover effects
    document.querySelectorAll('.timeline-item').forEach(item => {
        const year = item.querySelector('.timeline-year')?.textContent;
        if (year) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = year;
            item.appendChild(tooltip);
        }
    });
}

// Minimal era navigation - ultra fast
function initEraNavigation() {
    const eraBtns = document.querySelectorAll('.era-btn');
    const eraSections = document.querySelectorAll('.era-section');
    
    if (!eraBtns.length || !eraSections.length) return;
    
    // Precompute section lookup for maximum speed
    const sectionMap = {};
    eraSections.forEach(section => {
        sectionMap[section.id] = section;
    });
    
    // Single event listener for all buttons using event delegation
    document.querySelector('.era-nav').addEventListener('click', function(e) {
        const btn = e.target.closest('.era-btn');
        if (!btn) return;
        
        const era = btn.getAttribute('data-era');
        
        // Update active button visually
        document.querySelector('.era-btn.active')?.classList.remove('active');
        btn.classList.add('active');
        
        // Show/hide sections (optimized)
        if (era === 'all') {
            // Show all without iteration
            for (const id in sectionMap) {
                sectionMap[id].style.display = 'block';
            }
        } else {
            // Hide all sections with a single loop
            for (const id in sectionMap) {
                sectionMap[id].style.display = id === era ? 'block' : 'none';
            }
            
            // Fast jump to section (no smooth scrolling for speed)
            const targetSection = sectionMap[era];
            if (targetSection) {
                targetSection.scrollIntoView();
            }
        }
    });
}

// Fast category filters with minimal DOM operations
function initCategoryFilters() {
    const filterContainer = document.querySelector('.filter-container');
    if (!filterContainer) return;
    
    // Precompute all items by category for instant filtering
    const itemsByCategory = {};
    const allItems = [];
    
    document.querySelectorAll('#foundations .timeline-item').forEach(item => {
        const category = item.getAttribute('data-category') || 'uncategorized';
        if (!itemsByCategory[category]) {
            itemsByCategory[category] = [];
        }
        itemsByCategory[category].push(item);
        allItems.push(item);
    });
    
    // Single event listener for all filter buttons
    filterContainer.addEventListener('click', function(e) {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        
        // Update active state
        document.querySelector('.filter-btn.active')?.classList.remove('active');
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // Ultra-fast filtering
        if (filter === 'all') {
            // Show all items
            allItems.forEach(item => item.style.display = 'flex');
        } else {
            // Hide all items first
            allItems.forEach(item => item.style.display = 'none');
            
            // Show only matching items
            const itemsToShow = itemsByCategory[filter] || [];
            itemsToShow.forEach(item => item.style.display = 'flex');
        }
    });
}

// Minimal mobile adaptation - as fast as possible
function initSmallScreenAdaptation() {
    if (window.innerWidth > 768) return;
    
    const header = document.querySelector('header');
    const eraNav = document.querySelector('.era-nav');
    
    if (!header || !eraNav || document.querySelector('.mobile-nav-toggle')) return;
    
    // Create toggle button with minimum HTML
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-nav-toggle';
    mobileToggle.innerHTML = '<span></span><span></span><span></span>';
    
    // Insert at the beginning for speed
    header.querySelector('.container').insertBefore(mobileToggle, header.querySelector('.container').firstChild);
    
    // Single click handler using event delegation
    header.addEventListener('click', function(e) {
        if (e.target.closest('.mobile-nav-toggle')) {
            eraNav.classList.toggle('open');
            document.querySelector('.mobile-nav-toggle').classList.toggle('open');
        } else if (e.target.closest('.era-btn')) {
            eraNav.classList.remove('open');
            document.querySelector('.mobile-nav-toggle').classList.remove('open');
        }
    });
}

// Minimal dark mode toggle - instant switch
function initDarkModeToggle() {
    // Check for dark mode preference once, at page load
    if (localStorage.getItem('darkMode') === 'true' || 
        window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }
    
    // Create a minimal toggle button
    const toggle = document.createElement('button');
    toggle.className = 'dark-mode-toggle';
    toggle.innerHTML = '<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    document.body.appendChild(toggle);
    
    // Single click handler
    toggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
}

// Ultra-lightweight search functionality
function initLightweightSearch() {
    const header = document.querySelector('header');
    if (!header) return;
    
    // Create minimal search with inline event handlers for speed
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" id="timeline-search" placeholder="Search...">
        <button id="search-btn">Search</button>
        <div id="search-results" class="search-results"></div>
    `;
    
    const eraNav = document.querySelector('.era-nav');
    if (eraNav) {
        eraNav.parentNode.insertBefore(searchContainer, eraNav.nextSibling);
        
        // Precompute searchable items for instant results
        const searchableItems = [];
        document.querySelectorAll('.timeline-item').forEach(item => {
            const year = item.querySelector('.timeline-year')?.textContent || '';
            const title = item.querySelector('.card h3')?.textContent || '';
            const text = item.querySelector('.card p')?.textContent || '';
            
            // Only add if there's content to search
            if (year || title || text) {
                searchableItems.push({
                    year,
                    title,
                    text: text.substring(0, 100),
                    element: item
                });
            }
        });
        
        // Simple search function
        const searchBtn = document.getElementById('search-btn');
        const searchInput = document.getElementById('timeline-search');
        const searchResults = document.getElementById('search-results');
        
        if (searchBtn && searchResults) {
            // Unified event handler for search functionality
            document.addEventListener('click', function(e) {
                // Search button click
                if (e.target === searchBtn) {
                    performSearch();
                }
                // Search result click
                else if (e.target.closest('.search-result-item')) {
                    const resultItem = e.target.closest('.search-result-item');
                    const itemIndex = resultItem.dataset.index;
                    if (itemIndex && searchableItems[itemIndex]) {
                        searchResults.style.display = 'none';
                        searchableItems[itemIndex].element.scrollIntoView();
                    }
                }
                // Click outside search
                else if (!e.target.closest('.search-container')) {
                    searchResults.style.display = 'none';
                }
            });
            
            // Enter key in search box
            if (searchInput) {
                searchInput.addEventListener('keyup', function(e) {
                    if (e.key === 'Enter') {
                        performSearch();
                    }
                });
            }
            
            function performSearch() {
                const query = (searchInput?.value || '').toLowerCase().trim();
                if (query.length < 2) return;
                
                searchResults.innerHTML = '';
                let resultCount = 0;
                
                // Simple linear search with limited results
                for (let i = 0; i < searchableItems.length && resultCount < 5; i++) {
                    const item = searchableItems[i];
                    if (
                        item.year.toLowerCase().includes(query) ||
                        item.title.toLowerCase().includes(query) ||
                        item.text.toLowerCase().includes(query)
                    ) {
                        const resultItem = document.createElement('div');
                        resultItem.className = 'search-result-item';
                        resultItem.dataset.index = i;
                        resultItem.innerHTML = `<b>${item.year}</b>: ${item.title}`;
                        searchResults.appendChild(resultItem);
                        resultCount++;
                    }
                }
                
                if (resultCount === 0) {
                    searchResults.innerHTML = '<div>No results</div>';
                }
                
                searchResults.style.display = 'block';
            }
        }
    }
}

// Add basic smooth scrolling for links
document.body.addEventListener('click', function(e) {
    // Handle internal link clicks
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView();
        }
    }
});