// 1. Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Đóng menu trên mobile khi click vào một link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// 2. Typing Text Animation Effect
const words = ["Lập Trình Viên Web", "UI/UX Designer", "Người Sáng Tạo"];
let wordIdx = 0;
let charIdx = 0;
let isDeleting = false;

function typeAnimation() {
    const typingSpan = document.querySelector('.typing');
    if (!typingSpan) return; // Dừng nếu không tìm thấy thẻ HTML

    const currentWord = words[wordIdx];

    if (isDeleting) {
        typingSpan.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typingSpan.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
    }

    // Tốc độ gõ và xóa chữ
    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIdx === currentWord.length) {
        typeSpeed = 1500; // Dừng 1.5s khi gõ xong một từ
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        typeSpeed = 500; // Dừng 0.5s trước khi gõ từ mới
    }

    setTimeout(typeAnimation, typeSpeed);
}

// Chạy hiệu ứng gõ chữ khi trang tải xong
document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector('.typing')) {
        setTimeout(typeAnimation, 500);
    }
});

// 3. Active Link Highlight (Sáng Menu khi cuộn trang) - ĐÃ SỬA LỖI
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Bắt sự kiện khi cuộn đến 1/3 section
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        const href = a.getAttribute('href');
        // Chỉ thêm class active khi id khớp chính xác (tránh lỗi sáng tất cả menu)
        if (href === `#${current}`) {
            a.classList.add('active');
        }
    });
});

// 4. Form