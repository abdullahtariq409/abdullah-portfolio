function setupCategoryFilters() {
    if (!DOM.blogCategoryButtons || !DOM.blogPosts) return;

    DOM.blogCategoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover active de todos los botones
            DOM.blogCategoryButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });

            // Activar el botón clickeado
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');

            const category = btn.dataset.category;
            const searchTerm = DOM.searchInput ? DOM.searchInput.value.toLowerCase().trim() : '';

            filterAndDisplayPosts(searchTerm, category);
        });
    });
}

function filterAndDisplayPosts(searchTerm = '', category = 'all') {
    DOM.blogPosts.forEach(card => {
        const postId = parseInt(card.dataset.postId);
        const post = blogPosts.find(p => p.id === postId);
        if (!post) return;

        const matchesSearch = post.title.toLowerCase().includes(searchTerm) || post.excerpt.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || post.category === category;

        if (matchesSearch && matchesCategory) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}
