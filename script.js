console.log('Script chargé');

window.addEventListener('scroll', () => {
    // Changez 0.8 en 1.5 pour que l'animation dure plus longtemps
    const scrollProgress = window.scrollY / (window.innerHeight * 1.5);
    const fleurColoree = document.querySelector('.Fleurviolette');
    
    console.log('Scroll:', scrollProgress);
    
    if (fleurColoree) {
        if (scrollProgress <= 1) {
            // Révèle progressivement la fleur colorée
            const clipValue = Math.max(0, 100 - (scrollProgress * 100));
            fleurColoree.style.clipPath = `inset(${clipValue}% 0 0 0)`;
            fleurColoree.style.opacity = Math.min(1, scrollProgress * 2);
            
            console.log('Clip:', clipValue, 'Opacity:', Math.min(1, scrollProgress * 2));
        } else {
            // Une fois complètement visible, elle reste visible
            fleurColoree.style.clipPath = `inset(0% 0 0 0)`;
            fleurColoree.style.opacity = 1;
        }
    }
});