// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
  // 移动端菜单切换
  initMobileMenu();

  // 平滑滚动
  initSmoothScroll();

  // 表单提交处理
  initContactForm();

  // 导航栏滚动效果
  initNavScroll();
});

// 移动端菜单功能
function initMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const nav = document.querySelector('nav ul');

  if (mobileMenu) {
    mobileMenu.addEventListener('click', function () {
      nav.classList.toggle('mobile-nav-hidden');
    });
  }
}

// 平滑滚动功能
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });

        // 移动端点击后关闭菜单
        const nav = document.querySelector('nav ul');
        if (nav && !nav.classList.contains('mobile-nav-hidden')) {
          nav.classList.add('mobile-nav-hidden');
        }
      }
    });
  });
}

// 联系表单处理
function initContactForm() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // 获取表单数据
      const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
      };

      // 简单验证
      if (!formData.name || !formData.phone || !formData.message) {
        alert('请填写必填字段（姓名、电话和留言）');
        return;
      }

      // 这里可以添加AJAX提交到后端
      console.log('表单数据:', formData);

      // 显示成功消息
      alert('感谢您的咨询！我们会尽快与您联系。');

      // 重置表单
      contactForm.reset();
    });
  }
}

// 导航栏滚动效果
function initNavScroll() {
  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', function () {
    // 滚动时隐藏/显示导航栏
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScrollY = window.scrollY;

    // 添加背景色
    if (window.scrollY > 50) {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
      header.style.backgroundColor = 'white';
    }
  });
}

// 服务卡片动画效果
function animateOnScroll() {
  const cards = document.querySelectorAll('.service-card, .advantage-item, .case-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// 页面完全加载后执行动画
window.addEventListener('load', animateOnScroll);