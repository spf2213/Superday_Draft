/* ─── SCROLL ANIMATION ENGINE ─────────── */

export function initScrollAnimations() {
  // Reduced-motion check
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
    document.querySelectorAll('[data-reveal]').forEach(function(el) {
      el.classList.add('revealed');
    });
    return;
  }

  // Set up stagger children: parent[data-stagger-children] → each direct child gets data-reveal + incremental delay
  document.querySelectorAll('[data-stagger-children]').forEach(function(parent) {
    var baseDelay = parseInt(parent.getAttribute('data-stagger-children')) || 80;
    Array.from(parent.children).forEach(function(child, i) {
      if (!child.hasAttribute('data-reveal')) child.setAttribute('data-reveal', 'up');
      child.setAttribute('data-delay', String(i * baseDelay));
    });
  });

  // Apply transition-delay from data-delay attributes
  document.querySelectorAll('[data-delay]').forEach(function(el) {
    var d = parseInt(el.getAttribute('data-delay')) || 0;
    if (d > 0) el.style.transitionDelay = d + 'ms';
  });

  // Main observer
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
        // Trigger CTA glow breathing
        var cta = entry.target.closest('.cta-section');
        if (cta) cta.classList.add('cta-visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  // Observe all reveal elements
  document.querySelectorAll('[data-reveal]').forEach(function(el) {
    observer.observe(el);
  });

  // Stats band observer (enhanced with counter animation)
  var statsEl = document.getElementById('stats-inner');
  if (statsEl) {
    var statsObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          statsObs.unobserve(entry.target);
          animateCounters();
        }
      });
    }, { threshold: 0.2 });
    statsObs.observe(statsEl);
  }

  // Counter animation for stat numbers
  function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(function(el) {
      var text = el.textContent.trim();
      var match = text.match(/^[\$]?(\d+)/);
      if (!match) return;
      var target = parseInt(match[1]);
      var prefix = text.match(/^\$/) ? '$' : '';
      var suffix = text.replace(/^[\$]?\d+/, '');
      var duration = 1400;
      var start = performance.now();
      function tick(now) {
        var elapsed = now - start;
        var progress = Math.min(elapsed / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.round(target * eased);
        el.textContent = prefix + current + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  // Subtle parallax on hero glow following scroll
  var heroGlow = document.querySelector('.hero-glow');
  if (heroGlow) {
    var ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          var scrollY = window.pageYOffset || document.documentElement.scrollTop;
          if (scrollY < 900) {
            heroGlow.style.transform = 'translateX(-50%) translateY(' + (scrollY * 0.18) + 'px)';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
}

// Auto-initialize when DOM is ready
initScrollAnimations();
