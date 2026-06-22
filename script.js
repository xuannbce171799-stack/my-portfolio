document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Handler (Sửa lỗi hoàn toàn)
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Typing Effect Chuẩn Cao Cấp
    const words = ["Frontend Developer", "UI/UX Designer", "Software Engineer"];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeAnimation() {
        const typingSpan = document.querySelector('.typing');
        if (!typingSpan) return;

        const currentWord = words[wordIdx];

        if (isDeleting) {
            typingSpan.textContent = currentWord.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typingSpan.textContent = currentWord.substring(0, charIdx + 1);
            charIdx++;
        }

        let typeSpeed = isDeleting ? 40 : 80; // Tốc độ gõ chữ mượt hơn

        if (!isDeleting && charIdx === currentWord.length) {
            typeSpeed = 2000; // Nghỉ dài khi hoàn thành từ
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            typeSpeed = 400;
        }

        setTimeout(typeAnimation, typeSpeed);
    }

    if(document.querySelector('.typing')) {
        setTimeout(typeAnimation, 800);
    }

    // 3. Scroll Spy (Tự động cập nhật menu sáng theo vị trí cuộn cực chuẩn)
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 200; // Thêm offset để bắt chuẩn xác hơn

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // 4. Click To Change Preview Avatar
    const avatarZone = document.getElementById('avatar-zone');
    const avatarInput = document.getElementById('avatar-input');
    const avatarImg = document.getElementById('avatar-img');

    if (avatarZone && avatarInput && avatarImg) {
        avatarZone.addEventListener('click', () => avatarInput.click());

        avatarInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    avatarImg.setAttribute('src', e.target.result);
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // 5. Contact Form Handler với hiệu ứng UX tốt hơn
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            alert(`Xin chào ${name}! Cảm ơn bạn đã để lại lời nhắn. Hệ thống demo đã ghi nhận thành công.`);
            contactForm.reset();
        });
    }
});