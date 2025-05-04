# AI Timeline Customization Guide

This document explains how to modify, extend, and customize the AI Timeline visualization for your own purposes.

## Basic Structure

The timeline is built using these main components:

1. **HTML**: Structure and content (index.html)
2. **CSS**: Styling and animations (styles.css + embedded styles)
3. **JavaScript**: Interactive functionality (script.js)

## Adding New Timeline Events

### Step 1: Identify the Appropriate Era

First, locate the era section where your new event belongs:

```html
<section id="foundations" class="era-section fade-in">
  <!-- Mathematical Foundations events go here -->
</section>

<section id="computation" class="era-section fade-in">
  <!-- Computation Theory events go here -->
</section>

<!-- and so on for other eras -->
```

### Step 2: Create a New Timeline Item

Copy and adapt the following template within the appropriate era section:

```html
<div class="timeline-item fade-in" data-category="your-category">
    <div class="timeline-dot"></div>
    <span class="timeline-year">YYYY</span>
    <div class="timeline-content">
        <span class="date">YYYY</span>
        <div class="card">
            <h3>Event Title</h3>
            <p>Description of the event and its details.</p>
            <p class="key-figures">Key Figures: Names of important people</p>
            <p class="significance">Significance: Why this event matters in AI's development</p>
        </div>
    </div>
</div>
```

### Step 3: Fill in Event Details

Replace placeholders with your event information:

- `data-category`: For filtering (e.g., "logic", "probability", etc.)
- `timeline-year` and `date`: Year of the event
- Event title, description, key figures, and significance

### Step 4: Ensure Chronological Order

Place your new timeline item in chronological order within its section. Items should be arranged by year from oldest to newest.

## Adding a New Era

To add an entirely new era to the timeline:

### Step 1: Add Era Navigation Button

Add a new button to the era navigation in the header:

```html
<button class="era-btn" data-era="your-era-id">Your Era Name</button>
```

### Step 2: Create the Era Section

Add a new section with the corresponding ID:

```html
<section id="your-era-id" class="era-section fade-in">
    <h2 class="era-title">Your Era Title</h2>
    <p class="era-description">Description of this era and its significance in AI history.</p>
    
    <div class="timeline-container">
        <!-- Timeline items go here -->
    </div>
</section>
```

### Step 3: Update JavaScript (Optional)

If your era needs special handling, update the JavaScript accordingly in script.js.

## Customizing the Visual Style

### Color Scheme

The main color scheme is defined by CSS variables in the `:root` selector at the top of the style section:

```css
:root {
    --primary-color: #3a1c71;
    --secondary-color: #d76d77;
    --tertiary-color: #ffaf7b;
    /* other variables */
}
```

Modify these values to change the color scheme throughout the timeline.

### Timeline Appearance

To change the appearance of the timeline itself:

- **Timeline line**: Modify `.timeline-container::before` in the CSS
- **Timeline dots**: Modify `.timeline-dot` properties
- **Cards**: Adjust the `.card` styling

### Responsive Breakpoints

The responsive design uses media queries at specific breakpoints:

```css
@media (max-width: 992px) { /* Styles for devices < 992px */ }
@media (max-width: 768px) { /* Styles for devices < 768px */ }
@media (max-width: 576px) { /* Styles for devices < 576px */ }
```

Adjust these values and the contained styles to change how the timeline behaves on different screen sizes.

## Adding New Interactive Features

### Step 1: Add HTML Elements

Add any necessary HTML elements to the page structure.

### Step 2: Add CSS Styling

Create styles for your new elements in styles.css.

### Step 3: Implement JavaScript Functionality

Add your JavaScript functionality in script.js, either by:
- Adding code to existing functions
- Creating new functions and calling them from the main initialization

Example:

```javascript
function initMyNewFeature() {
    // Your code here
}

document.addEventListener('DOMContentLoaded', function() {
    // ... existing code
    initMyNewFeature();
});
```

## Adding Historical Connections

Historical connections between events are defined in the JavaScript:

```javascript
// Define connections
const connections = [
    { from: 'Event Title A', to: 'Event Title B' },
    // Add more connections here
];
```

To add new connections:
1. Find the connections array in script.js (in the `addHistoricalConnections` function)
2. Add a new object with `from` and `to` properties matching the exact titles of events you want to connect

## Modifying Particle Background

The particle background is created in the `initParticles` function in script.js:

```javascript
function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-background';
    document.body.prepend(particlesContainer);
    
    const particleCount = window.innerWidth < 768 ? 30 : 70;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}
```

You can:
- Change the number of particles by adjusting `particleCount`
- Modify particle appearance in the `createParticle` function
- Change animation properties by modifying the `@keyframes float` definition

## Advanced: Adding New Category Filters

If you want to add new category filters for a section:

1. Add new filter buttons to the appropriate filter container:

```html
<div class="filter-container">
    <button class="filter-btn active" data-filter="all">All</button>
    <button class="filter-btn" data-filter="your-new-category">Your Category</button>
    <!-- more filter buttons -->
</div>
```

2. Assign the corresponding data-category to relevant timeline items:

```html
<div class="timeline-item fade-in" data-category="your-new-category">
    <!-- item content -->
</div>
```

3. The filtering functionality is already implemented in the JavaScript, so no additional code is needed.

## Performance Optimization

If the timeline becomes slow with many events:

1. **Lazy Loading**: Consider implementing lazy loading for timeline items
2. **Image Optimization**: If you add images, compress them appropriately
3. **Animation Throttling**: Reduce animations on mobile devices by adding conditional checks

## Browser Compatibility

The timeline uses modern CSS and JavaScript features. If you need to support older browsers:

1. Add appropriate polyfills for ES6+ features
2. Add fallbacks for CSS features like CSS Grid and Custom Properties
3. Consider using a tool like Autoprefixer for vendor prefixes

---

This guide covers the basics of customizing the AI Timeline. The modular nature of the code makes it highly extensible, so feel free to experiment with new features and designs!