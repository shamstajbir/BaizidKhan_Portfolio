// Debugging marquee initialization
console.log('fix-marquee.js loaded');

function initMarqueeDebug() {
  console.log('Initializing marquee with debug...');
  
  // Check if marquee elements exist
  const marquees = document.querySelectorAll('[data-marquee-scroll-direction-target]');
  console.log(`Found ${marquees.length} marquee elements`);
  
  marquees.forEach((marquee, index) => {
    console.log(`Marquee ${index + 1}:`, marquee);
    
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
      console.error('GSAP is not loaded!');
      return;
    }
    
    // Force reinitialize the marquee
    if (marquee._marqueeAnimation) {
      console.log('Clearing existing marquee animation');
      marquee._marqueeAnimation.kill();
      delete marquee._marqueeAnimation;
    }
    
    // Reinitialize the marquee
    initMarqueeScrollDirection();
    
    // Add a style to make sure the marquee is visible
    marquee.style.opacity = '1';
    marquee.style.transition = 'opacity 0.5s ease';
    
    console.log('Marquee reinitialized');
  });
}

// Run the debug initialization when the page is fully loaded
if (document.readyState === 'complete') {
  initMarqueeDebug();
} else {
  window.addEventListener('load', initMarqueeDebug);
}
