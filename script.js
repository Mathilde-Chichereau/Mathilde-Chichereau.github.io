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







// portfolio-navigation.js
// À inclure dans chaque page de projet

class PortfolioNavigation {
  constructor() {
    // Liste de tous vos projets dans l'ordre d'affichage
    this.projects = [
      { url: 'Pagesportfolio/Draw-006_Zoo.html', title: 'Chiens des buissons' },
      { url: 'Pagesportfolio/Draw-005_Pareil.html', title: 'Pareil-Pas pareil' },
      { url: 'Pagesportfolio/Draw-004_Modele.html', title: 'Modèle vivant' },
      { url: 'Pagesportfolio/Draw-003_Observation.html', title: 'Dessin d\'observation' },
      { url: 'Pagesportfolio/Draw-002_Perspective.html', title: 'Perspective' },
      { url: 'Pagesportfolio/Draw-001_Ceramique.html', title: 'Céramiques' },
      // Ajoutez les projets medium quand leurs pages seront créées
      // { url: 'Pagesportfolio/Medium-002_Coffret.html', title: 'Coffret d\'artiste' },
      { url: 'Pagesportfolio/Medium-001_Vaches.html', title: 'Série "les vaches"' },
      // etc.
    ];
    
    this.init();
  }

  init() {
    // Déterminer la page actuelle
    const currentPath = window.location.pathname;
    const currentIndex = this.projects.findIndex(project => 
      currentPath.includes(project.url.split('/').pop())
    );

    if (currentIndex === -1) return;

    // Créer la barre de navigation
    this.createNavigationBar(currentIndex);
    
    // Sauvegarder la position de scroll de la page portfolio
    this.savePortfolioScroll();
  }

  createNavigationBar(currentIndex) {
    const nav = document.createElement('nav');
    nav.className = 'project-navigation';
    nav.innerHTML = `
      <button class="nav-btn nav-home">
        <span class="material-symbols-outlined">close</span>
        <span class="nav-text">Retour</span>
      </button>

    <div class="nav-group"> 
      <button class="nav-btn nav-prev" ${currentIndex === 0 ? 'disabled' : ''}>
        <span class="material-symbols-outlined">arrow_back</span>
        <span class="nav-text">Projet précédent</span>
      </button>
      
      <button class="nav-btn nav-next" ${currentIndex === this.projects.length - 1 ? 'disabled' : ''}>
        <span class="nav-text">Projet suivant</span>
        <span class="material-symbols-outlined">arrow_forward</span>
      </button>
    </div>
    `;

    // Ajouter les événements
    const prevBtn = nav.querySelector('.nav-prev');
    const nextBtn = nav.querySelector('.nav-next');
    const homeBtn = nav.querySelector('.nav-home');

    if (currentIndex > 0) {
      prevBtn.addEventListener('click', () => {
        window.location.href = '../' + this.projects[currentIndex - 1].url;
      });
    }

    if (currentIndex < this.projects.length - 1) {
      nextBtn.addEventListener('click', () => {
        window.location.href = '../' + this.projects[currentIndex + 1].url;
      });
    }

    homeBtn.addEventListener('click', () => {
      window.location.href = '../portfolio.html' + this.getScrollHash();
    });

    // Ajouter la navigation après le header
    const header = document.querySelector('.header');
    if (header) {
      header.after(nav);
    } else {
      document.body.insertBefore(nav, document.body.firstChild);
    }

    // Navigation au clavier
    this.addKeyboardNavigation(currentIndex);
    this.handleScrollVisibility(nav);
    }
  savePortfolioScroll() {
    // Sauvegarder la position quand on quitte la page portfolio
    if (window.location.pathname.includes('portfolio.html')) {
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('portfolioScroll', window.scrollY);
      });
    }
  }

  getScrollHash() {
    const scroll = sessionStorage.getItem('portfolioScroll');
    return scroll ? `#scroll=${scroll}` : '';
  }

  addKeyboardNavigation(currentIndex) {
    document.addEventListener('keydown', (e) => {
      // Flèche gauche = projet précédent
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        window.location.href = '../' + this.projects[currentIndex - 1].url;
      }
      // Flèche droite = projet suivant
      if (e.key === 'ArrowRight' && currentIndex < this.projects.length - 1) {
        window.location.href = '../' + this.projects[currentIndex + 1].url;
      }
      // Escape = retour portfolio
      if (e.key === 'Escape') {
        window.location.href = '../portfolio.html' + this.getScrollHash();
      }
    });
  }

  // 👇 AJOUTEZ TOUTE CETTE FONCTION ICI
  handleScrollVisibility(nav) {
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Si on scroll vers le bas et qu'on a dépassé 80px
          if (currentScrollY > lastScrollY && currentScrollY > 80) {
            nav.style.transform = 'translateY(-200%)';
          } 
          // Si on scroll vers le haut
          else if (currentScrollY < lastScrollY) {
            nav.style.transform = 'translateY(0)';
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        
        ticking = true;
      }
    });
  }
}  // 👈 Fin de la classe PortfolioNavigation

// Initialiser la navigation
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioNavigation();
  
  // Restaurer le scroll sur portfolio.html
  if (window.location.pathname.includes('portfolio.html')) {
    const hash = window.location.hash;
    if (hash.startsWith('#scroll=')) {
      const scrollPos = parseInt(hash.split('=')[1]);
      window.scrollTo(0, scrollPos);
    }
  }
});