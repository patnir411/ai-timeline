// Optimized AI Timeline JavaScript with Mobile Enhancements
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

  // Check if mobile viewport
  const isMobile = () => window.innerWidth <= 600;
  
  // Add function to hide any timeline-year elements that might still be visible
  document.addEventListener('DOMContentLoaded', () => {
    // Remove all timeline-year elements to prevent the duplicate year display
    const timelineYears = document.querySelectorAll('.timeline-year');
    timelineYears.forEach(year => {
      year.remove(); // Completely remove from DOM instead of just hiding
    });
    
    // Add animation order to timeline items for staggered animation
    const sections = document.querySelectorAll('.era-section');
    sections.forEach(section => {
      const items = section.querySelectorAll('.timeline-item');
      items.forEach((item, index) => {
        item.style.setProperty('--animation-order', index);
      });
    });
    
    // Add intersection observer for revealing timeline items when they come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });
    
    document.querySelectorAll('.timeline-item').forEach(item => {
      observer.observe(item);
    });
  });
  
  // Performance optimizations
  onReady(() => {
    // Cache key DOM elements with one-time lookups
    const eraNav = document.querySelector('.era-nav');
    const eraSections = Array.from(document.querySelectorAll('.era-section'));
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

    // Mobile-specific enhancements
    initMobileEnhancements();
  });

  // Mobile enhancements function
  function initMobileEnhancements() {
    if (!isMobile()) {
      // Add resize listener to initialize when viewport becomes mobile
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (isMobile() && !document.querySelector('.floating-nav-hub')) {
            initMobileEnhancements();
          }
        }, 250);
      });
      return;
    }

    // 1. Create floating navigation hub
    createFloatingNavHub();

    // 2. Create sticky era indicator
    createStickyEraIndicator();

    // 3. Initialize progressive disclosure for cards
    initProgressiveDisclosure();

    // 4. Update scroll tracking
    initScrollTracking();

    // 5. Add smooth scroll for era navigation
    enhanceEraNavigation();
  }

  function createFloatingNavHub() {
    if (document.querySelector('.floating-nav-hub')) return;

    const hub = document.createElement('div');
    hub.className = 'floating-nav-hub';
    hub.innerHTML = `
      <button class="nav-hub-button" aria-label="Open navigation menu">
        <span class="progress-ring"></span>
        ☰
      </button>
      <div class="nav-hub-menu">
        <button data-action="scroll-top">⬆️ Back to Top</button>
        <div class="divider"></div>
        <button data-era="foundations">📐 Foundations</button>
        <button data-era="computation">💻 Computation</button>
        <button data-era="early-ai">🤖 Early AI</button>
        <button data-era="ai-winters">❄️ AI Winters</button>
        <button data-era="neural">🧠 Neural Nets</button>
        <button data-era="data-hardware">⚡ Data/Hardware</button>
        <button data-era="nlp">💬 NLP</button>
        <button data-era="transformers">🚀 Transformers</button>
      </div>
    `;

    document.body.appendChild(hub);

    // Toggle menu
    const button = hub.querySelector('.nav-hub-button');
    const menu = hub.querySelector('.nav-hub-menu');

    button.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hub.contains(e.target)) {
        menu.classList.remove('active');
      }
    });

    // Handle menu actions
    menu.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;

      const action = btn.getAttribute('data-action');
      const era = btn.getAttribute('data-era');

      if (action === 'scroll-top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (era) {
        const section = document.getElementById(era);
        if (section) {
          const yOffset = -80;
          const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }

      menu.classList.remove('active');
    });
  }

  function createStickyEraIndicator() {
    if (document.querySelector('.sticky-era-indicator')) return;

    const indicator = document.createElement('div');
    indicator.className = 'sticky-era-indicator';
    indicator.textContent = 'Loading...';
    document.body.appendChild(indicator);
  }

  function initProgressiveDisclosure() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
      // Skip if already processed
      if (card.querySelector('.card-expand-btn')) return;

      // Extract first paragraph as summary
      const paragraphs = card.querySelectorAll('p:not(.key-figures):not(.significance)');
      if (paragraphs.length === 0) return;

      const firstPara = paragraphs[0];
      const summaryText = firstPara.textContent.substring(0, 150) + '...';

      // Create summary element
      const summary = document.createElement('div');
      summary.className = 'card-summary';
      summary.textContent = summaryText;

      // Wrap existing content in details container
      const details = document.createElement('div');
      details.className = 'card-details';

      // Move all paragraphs and key figures/significance into details
      const contentToMove = Array.from(card.children).filter(child =>
        child.tagName === 'P' || child.classList.contains('key-figures') || child.classList.contains('significance')
      );

      contentToMove.forEach(element => details.appendChild(element));

      // Create expand button
      const expandBtn = document.createElement('button');
      expandBtn.className = 'card-expand-btn';
      expandBtn.textContent = 'Read More';

      // Add elements to card
      card.appendChild(summary);
      card.appendChild(details);
      card.appendChild(expandBtn);

      // Set initial collapsed state
      card.classList.add('collapsed');

      // Handle expand/collapse
      expandBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.toggle('collapsed');
        expandBtn.textContent = card.classList.contains('collapsed') ? 'Read More' : 'Read Less';
      });
    });
  }

  function initScrollTracking() {
    const eraSections = document.querySelectorAll('.era-section');
    const indicator = document.querySelector('.sticky-era-indicator');
    const progressRing = document.querySelector('.progress-ring');

    if (!indicator) return;

    let lastScrollTop = 0;
    let ticking = false;

    const updateIndicator = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      // Update progress ring rotation
      if (progressRing) {
        progressRing.style.transform = `rotate(${scrollPercent * 3.6}deg)`;
      }

      // Find current era
      let currentEra = 'Timeline';
      eraSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          const title = section.querySelector('.era-title');
          if (title) {
            currentEra = title.textContent;
          }
        }
      });

      indicator.textContent = currentEra;

      // Show/hide indicator based on scroll position
      if (scrollTop > 200) {
        indicator.classList.add('visible');
      } else {
        indicator.classList.remove('visible');
      }

      lastScrollTop = scrollTop;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateIndicator);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    updateIndicator(); // Initial call
  }

  function enhanceEraNavigation() {
    const eraNav = document.querySelector('.era-nav');
    if (!eraNav) return;

    const buttons = eraNav.querySelectorAll('.era-btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Scroll active button into view in the horizontal scroller
        setTimeout(() => {
          const activeBtn = eraNav.querySelector('.era-btn.active');
          if (activeBtn) {
            activeBtn.scrollIntoView({
              behavior: 'smooth',
              inline: 'center',
              block: 'nearest'
            });
          }
        }, 100);
      });
    });
  }
})();