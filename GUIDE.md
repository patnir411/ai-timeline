# AI Timeline User Guide

This document provides detailed instructions on using the AI Timeline visualization and explains its interactive features.

## Getting Started

### Opening the Timeline

1. Navigate to the project directory (`ai-timeline`)
2. Double-click on `index.html` to open it in your default web browser
   - Alternatively, right-click and select "Open with" to choose a specific browser
   - You can also use a local server if you prefer (e.g., `python -m http.server`)

### Initial View

When you first open the timeline, you'll see:

1. A header with the title and introduction
2. Navigation buttons for different eras
3. The complete timeline with all eras displayed

### Basic Navigation

- **Scrolling**: Use your mouse wheel or trackpad to scroll through the timeline vertically
- **Era Navigation**: Click on any of the era buttons at the top to jump to a specific period
- **Filter Buttons**: In the Mathematical Foundations section, use the category filters to show specific types of developments

## Interactive Features

### Era Navigation

The era buttons at the top allow you to filter the timeline to show only events from a specific period:

- **All Eras**: Shows the complete timeline
- **Mathematical Foundations**: Pre-20th century mathematical concepts
- **Birth of Computation**: Early-Mid 20th century formalization of computation
- **Birth of AI**: 1950s-1960s emergence of AI as a field
- **AI Winters & Revival**: 1960s-1980s challenges and rebounds
- **Neural Renaissance**: 1980s-1990s revival of neural networks
- **Data & Hardware**: 1990s-2010s enabling factors
- **NLP Revolution**: 1990s-2010s advances in language processing
- **Transformer Era**: Mid 2010s-Present modern LLMs

Clicking an era button:
1. Highlights the selected button
2. Shows only events from that era
3. Scrolls to that section of the timeline

### Event Details

Each event on the timeline is presented as a card containing:

- **Year**: The date of the event
- **Title**: Name of the achievement or breakthrough
- **Description**: Brief explanation of the event
- **Key Figures**: Important people involved
- **Significance**: Why this event matters in AI's development

Interactive elements:
- **Hover Effects**: Cards and timeline dots expand slightly when you hover over them
- **Timeline Dots**: Pulse effects indicate clickable elements

### Advanced Features

After the page fully loads, additional interactive elements appear:

#### Search Functionality

1. Look for the search bar that appears below the era navigation
2. Type keywords to find specific events, people, or technologies
3. Click on search results to jump directly to that event
4. The found item will be highlighted temporarily

#### Historical Connections

1. Click the "Show Historical Connections" button
2. Visual lines will appear connecting related developments
3. These connections show the influence between different breakthroughs
4. Click the button again to hide connections

#### Dark Mode Toggle

1. Look for the circular button in the bottom-right corner
2. Click to toggle between light and dark modes
3. Your preference will be saved for future visits

#### Interactive Statistics

As you scroll down the page, you'll encounter an animated statistics section showing:
- Years of AI Evolution
- Major Breakthroughs
- Key Contributors
- Paradigm Shifts

The numbers animate upward when they come into view.

## Mobile Experience

On smaller screens:

1. The timeline adjusts to a single-column format
2. Era navigation collapses into a mobile-friendly menu
3. Touch and swipe gestures replace hover effects
4. Some advanced features may be simplified

Access the mobile menu by tapping the hamburger icon that appears at the top.

## Troubleshooting

If the timeline doesn't display properly:

1. **Empty Screen**: Make sure all files (index.html, styles.css, script.js) are in the same directory
2. **Missing Styles**: Check if styles.css is properly linked
3. **No Interactivity**: Verify that script.js is loading correctly
4. **Performance Issues**: Try a different browser (Chrome or Firefox recommended)

## Keyboard Navigation

For accessibility:

- Use **Tab** to navigate between interactive elements
- Press **Enter** to activate buttons
- Use **Arrow Keys** after focusing on era navigation to move between options

## Technical Information

The timeline is built with:
- HTML5 for structure
- CSS3 for styling and animations
- JavaScript for interactivity

No external libraries or dependencies are required to run the timeline.

---

We hope you enjoy exploring the rich history of artificial intelligence through this interactive timeline!