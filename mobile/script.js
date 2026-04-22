(function() {
    'use strict';

    function initMatrixRain() {
        const canvas = document.getElementById('matrix');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -100);
        }

        function draw() {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00ff41';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] > canvas.height / fontSize && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(draw, 50);

        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-fill');
        
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            if (level) {
                bar.style.width = level + '%';
            }
        });
    }

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    function initCursorTrail() {
        if (window.innerWidth <= 768) return;
        
        const cursor = document.createElement('div');
        cursor.className = 'cursor-trail';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 255, 65, 0.6) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease-out;
        `;
        document.body.appendChild(cursor);

        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animate() {
            currentX += (mouseX - currentX) * 0.15;
            currentY += (mouseY - currentY) * 0.15;
            
            cursor.style.left = currentX + 'px';
            cursor.style.top = currentY + 'px';
            
            requestAnimationFrame(animate);
        }

        animate();
    }

    function initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'd' && e.ctrlKey) {
                e.preventDefault();
                window.location.href = 'index.html';
            }
            if (e.key === 'm' && e.ctrlKey) {
                e.preventDefault();
                window.location.href = 'mobile.html';
            }
        });
    }

    function addKeyframeStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    function init() {
        addKeyframeStyles();
        initMatrixRain();
        initSkillBars();
        initSmoothScroll();
        initCursorTrail();
        initKeyboardShortcuts();

        console.log('%c ANDREI SILENTOV ', 'background: #00ff41; color: #0a0a0a; font-size: 20px; font-weight: bold; padding: 10px;');
        console.log('%c Developer Portfolio v1.0.0 ', 'color: #00d4ff; font-size: 12px;');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();