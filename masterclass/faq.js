// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.mc-faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.mc-faq-question');

        question.addEventListener('click', () => {
            // Toggle active class
            item.classList.toggle('active');

            // Optional: Close other FAQs when one is opened (accordion behavior)
            // Uncomment the following lines if you want only one FAQ open at a time:
            /*
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            */
        });
    });
});
