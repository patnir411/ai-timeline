// Optimized AI Timeline JavaScript
(function() {
  // Use requestIdleCallback for non-critical initialization
  const onReady = (callback) => {
    if (document.readyState !== 'loading') {
      window.requestIdleCallback 
        ? window.requestIdleCallback(callback) 
        : setTimeout(callback, 0);
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        window.requestIdleCallback 
          ? window.requestIdleCallback(callback) 
          : setTimeout(callback, 0);
      });
    }
  };
  
  // Add function to hide any timeline-year elements that might still be visible
  document.addEventListener('DOMContentLoaded', () => {
    // Remove all timeline-year elements to prevent the duplicate year display
    const timelineYears = document.querySelectorAll('.timeline-year');
    timelineYears.forEach(year => {
      year.remove(); // Completely remove from DOM instead of just hiding
    });
  });
  
  // Add llm-themes to era sections
  document.addEventListener('DOMContentLoaded', () => {
    const llmThemes = document.getElementById('llm-themes');
    if (llmThemes) {
      llmThemes.classList.add('era-section');
    }
  });

  // Performance optimizations
  onReady(() => {
    // Cache key DOM elements with one-time lookups
    const eraNav = document.querySelector('.era-nav');
    const eraSections = Array.from(document.querySelectorAll('.era-section'));
    // Make sure to include the llm-themes section
    const llmSection = document.getElementById('llm-themes');
    if (llmSection && !eraSections.includes(llmSection)) {
      eraSections.push(llmSection);
    }
    const filterContainer = document.querySelector('.filter-container');
    
    // Use DocumentFragment for better performance when creating elements
    const createMobileNav = () => {
      const header = document.querySelector('header');
      
      if (header && eraNav && !document.querySelector('.mobile-toggle')) {
        const fragment = document.createDocumentFragment();
        const toggle = document.createElement('button');
        toggle.className = 'mobile-toggle';
        toggle.setAttribute('aria-label', 'Toggle navigation menu');
        toggle.innerHTML = '<span></span><span></span><span></span>';
        
        fragment.appendChild(toggle);
        header.querySelector('.container').insertBefore(fragment, eraNav);
        
        toggle.addEventListener('click', () => {
          eraNav.classList.toggle('open');
          toggle.classList.toggle('open');
        });
      }
    };
    
    // Efficient lookups with Map
    const sectionMap = new Map();
    eraSections.forEach(section => sectionMap.set(section.id, section));
    
    // Era navigation with event delegation and performance optimizations
    if (eraNav) {
      // Cache the active button reference
      let activeEraBtn = eraNav.querySelector('.era-btn.active');
      
      eraNav.addEventListener('click', (e) => {
        const btn = e.target.closest('.era-btn');
        if (!btn || btn === activeEraBtn) return; // Skip if already active
        
        // Update active state
        activeEraBtn?.classList.remove('active');
        btn.classList.add('active');
        activeEraBtn = btn;
        
        const era = btn.getAttribute('data-era');
        
        // Use visibility for better performance
        // This avoids reflows that happen with display:none
        if (era === 'all') {
          eraSections.forEach(section => section.hidden = false);
        } else {
          eraSections.forEach(section => section.hidden = true);
          const selectedSection = sectionMap.get(era);
          if (selectedSection) selectedSection.hidden = false;
        }
      });
    }
    
    // Category filters with optimizations
    if (filterContainer) {
      // Pre-cache and optimize category lookups
      const foundationItems = Array.from(document.querySelectorAll('#foundations .timeline-item'));
      const itemsByCategory = new Map();
      
      // Create maps for item lookups - much faster than object property access
      foundationItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (!category) return;
        
        if (!itemsByCategory.has(category)) {
          itemsByCategory.set(category, []);
        }
        itemsByCategory.get(category).push(item);
      });
      
      // Cache the active filter button
      let activeFilterBtn = filterContainer.querySelector('.filter-btn.active');
      
      filterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn || btn === activeFilterBtn) return; // Skip if already active
        
        activeFilterBtn?.classList.remove('active');
        btn.classList.add('active');
        activeFilterBtn = btn;
        
        const filter = btn.getAttribute('data-filter');
        
        // Avoid unnecessary layout triggers by batching DOM changes
        window.requestAnimationFrame(() => {
          if (filter === 'all') {
            foundationItems.forEach(item => item.hidden = false);
          } else {
            foundationItems.forEach(item => item.hidden = true);
            
            const categoryItems = itemsByCategory.get(filter);
            if (categoryItems) {
              categoryItems.forEach(item => item.hidden = false);
            }
          }
        });
      });
    }
    
    // Use media query listener for responsive behavior
    const mobileMediaQuery = window.matchMedia('(max-width: 600px)');
    
    const handleMobileChanges = (e) => {
      if (e.matches) {
        createMobileNav();
        
        // Add mobile-specific event delegation
        if (eraNav) {
          eraNav.addEventListener('click', (e) => {
            if (e.target.closest('.era-btn')) {
              eraNav.classList.remove('open');
              document.querySelector('.mobile-toggle')?.classList.remove('open');
            }
          });
        }
      }
    };
    
    // Initialize mobile navigation if needed
    handleMobileChanges(mobileMediaQuery);
    mobileMediaQuery.addEventListener('change', handleMobileChanges);
    
    // Add passive: true to improve scroll performance
    window.addEventListener('scroll', () => {}, { passive: true });
  });
})();