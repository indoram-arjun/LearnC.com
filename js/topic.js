(function () {
    const topics = [
        { title: 'Introduction', url: 'Intro.html', icon: 'bi-play-circle', desc: 'History, structure, and first program' },
        { title: 'Variables', url: 'Variable.html', icon: 'bi-box-seam', desc: 'Declare, store, and print values' },
        { title: 'Operators', url: 'Operator.html', icon: 'bi-plus-slash-minus', desc: 'Arithmetic, relational, and logical operators' },
        { title: 'Data Types', url: 'Datatype.html', icon: 'bi-diagram-3', desc: 'int, float, char, double, and modifiers' },
        { title: 'Conditionals', url: 'Conditional.html', icon: 'bi-signpost-split', desc: 'if, if-else, ladder, nested if, and switch' },
        { title: 'Control Statements', url: 'ControlStatement.html', icon: 'bi-arrow-repeat', desc: 'break, continue, and goto' },
        { title: 'Loops', url: 'Loop.html', icon: 'bi-arrow-clockwise', desc: 'for, while, and do-while loops' },
        { title: 'Arrays', url: 'array.html', icon: 'bi-grid-3x3-gap', desc: '1D arrays, 2D arrays, search, and sort' },
        { title: 'Strings', url: 'String.html', icon: 'bi-type', desc: 'Character arrays and string functions' },
        { title: 'Functions', url: 'Function.html', icon: 'bi-braces-asterisk', desc: 'Reusable blocks of code' },
        { title: 'Structures', url: 'Structure.html', icon: 'bi-building', desc: 'Group related data using struct' },
        { title: 'FAQ', url: 'faq.html', icon: 'bi-question-circle', desc: 'Common beginner questions' },
        { title: 'Quiz', url: 'index.html#quiz', icon: 'bi-patch-question', desc: 'Test your C knowledge' },
        { title: 'Code Runner', url: 'index.html#runner', icon: 'bi-play-circle', desc: 'Try simple C output examples' }
    ];

    function onReady(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('learncTheme', theme);
    }

    function setupTheme() {
        const saved = localStorage.getItem('learncTheme') || 'light';
        applyTheme(saved);

        document.querySelectorAll('#themeBtn, #themeToggle, .theme-btn, .theme-toggle').forEach((btn) => {
            btn.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme') || 'light';
                applyTheme(current === 'dark' ? 'light' : 'dark');
            });
        });
    }

    function setupMobileMenu() {
        const ham = document.getElementById('hamBtn');
        const menu = document.getElementById('mobileMenu');
        if (!ham || !menu) return;

        ham.addEventListener('click', () => menu.classList.toggle('show'));
        menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => menu.classList.remove('show'));
        });
    }

    function setupScrollTop() {
        const btn = document.getElementById('goTop') || document.getElementById('scrollTop');
        if (!btn) return;

        const toggle = () => btn.classList.toggle('show', window.scrollY > 350);
        window.addEventListener('scroll', toggle, { passive: true });
        toggle();
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    function setupSearch() {
        const input = document.getElementById('sInput');
        const drop = document.getElementById('sDrop');
        if (!input || !drop) return;

        input.addEventListener('input', () => {
            const q = input.value.trim().toLowerCase();
            if (!q) {
                drop.style.display = 'none';
                drop.innerHTML = '';
                return;
            }

            const found = topics.filter((topic) => {
                return topic.title.toLowerCase().includes(q) || topic.desc.toLowerCase().includes(q);
            });

            if (!found.length) {
                drop.innerHTML = '<div class="search-empty">No topic found</div>';
                drop.style.display = 'block';
                return;
            }

            drop.innerHTML = found.map((topic) => `
                <a href="${topic.url}">
                    <i class="bi ${topic.icon}"></i>
                    <span><strong>${topic.title}</strong><small>${topic.desc}</small></span>
                </a>
            `).join('');
            drop.style.display = 'block';
        });

        document.addEventListener('click', (event) => {
            if (!event.target.closest('.nav-search')) drop.style.display = 'none';
        });
    }

    function setupCopyButtons() {
        document.querySelectorAll('.copy-btn').forEach((btn) => {
            btn.addEventListener('click', async () => {
                const block = btn.closest('.code-block') || btn.closest('.concept-box') || document;
                const code = block.querySelector('pre code');
                if (!code) return;

                const text = code.innerText;
                try {
                    if (navigator.clipboard && window.isSecureContext) {
                        await navigator.clipboard.writeText(text);
                    } else {
                        const area = document.createElement('textarea');
                        area.value = text;
                        area.style.position = 'fixed';
                        area.style.opacity = '0';
                        document.body.appendChild(area);
                        area.focus();
                        area.select();
                        document.execCommand('copy');
                        area.remove();
                    }
                    const oldText = btn.textContent;
                    btn.textContent = 'Copied';
                    btn.classList.add('copied');
                    setTimeout(() => {
                        btn.textContent = oldText;
                        btn.classList.remove('copied');
                    }, 1200);
                } catch (error) {
                    btn.textContent = 'Copy failed';
                    setTimeout(() => { btn.textContent = 'Copy'; }, 1200);
                }
            });
        });
    }

    function setupDetails() {
        document.querySelectorAll('.faq-details').forEach((details) => {
            details.addEventListener('toggle', () => {
                if (!details.open) return;
                document.querySelectorAll('.faq-details[open]').forEach((other) => {
                    if (other !== details) other.removeAttribute('open');
                });
            });
        });
    }

    function markActiveLinks() {
        const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
        document.querySelectorAll('.lc-nav a[href], .mobile-menu a[href]').forEach((link) => {
            const href = link.getAttribute('href').split('#')[0].toLowerCase();
            if (href && href === page) link.classList.add('active-link');
        });
    }

    onReady(() => {
        setupTheme();
        setupMobileMenu();
        setupScrollTop();
        setupSearch();
        setupCopyButtons();
        setupDetails();
        markActiveLinks();

        if (window.hljs) {
            window.hljs.highlightAll();
        }
    });
}());
