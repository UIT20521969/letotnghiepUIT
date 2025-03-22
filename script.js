document.addEventListener("scroll", function () {
    const envelope = document.getElementById("envelope");
    const wrapper = document.getElementById("wrapper");
    
    if (window.scrollY > 35) {
        envelope.classList.add("open"); // Mở bì thư
        wrapper.classList.add("scale-up"); // Phóng to toàn bộ trang
    } else {
        envelope.classList.remove("open"); // Đóng bì thư
        wrapper.classList.remove("scale-up"); // Thu nhỏ lại như cũ
    }
});
document.addEventListener("DOMContentLoaded", function () {
    function handleScroll() {
        let elements = document.querySelectorAll(".gallery-item");
        let windowHeight = window.innerHeight;

        elements.forEach(element => {
            let elementTop = element.getBoundingClientRect().top;

            // Khi ảnh vào vùng hiển thị, thêm class "show"
            if (elementTop < windowHeight - 50) {
                element.classList.add("show");
            }
        });
    }

    // Kiểm tra hiệu ứng khi cuộn trang
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Kiểm tra ngay khi tải trang
});


function createFlyingHat() {
    let hat = document.createElement("div");
    hat.innerHTML = "🎓"; // Icon mũ tốt nghiệp
    hat.classList.add("hat-icon");

    // Đặt vị trí ngẫu nhiên theo chiều ngang
    let startX = Math.random() * window.innerWidth;
    hat.style.left = `${startX}px`;

    // Tạo thời gian bay ngẫu nhiên
    let duration = Math.random() * 2 + 3; // Bay từ 2 đến 4 giây
    hat.style.animationDuration = `${duration}s`;

    document.getElementById("hat-container").appendChild(hat);

    // Xóa icon sau khi bay xong để tránh tốn bộ nhớ
    setTimeout(() => {
        hat.remove();
    }, duration * 2500);
}

// Tạo icon liên tục
setInterval(createFlyingHat, 500); // Mỗi 0.5 giây tạo 1 icon mới

document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".zoomable");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.getElementById("close-lightbox");

    // Mở lightbox khi bấm vào ảnh
    images.forEach(img => {
        img.addEventListener("click", function () {
            lightboxImg.src = this.src;
            lightbox.classList.add("show");
        });
    });

    // Đóng lightbox khi bấm vào nút đóng hoặc ra ngoài
    closeBtn.addEventListener("click", function () {
        lightbox.classList.remove("show");
    });

    lightbox.addEventListener("click", function (e) {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove("show");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    function updateCountdown() {
        // Ngày tổ chức lễ tốt nghiệp
        let eventDate = new Date("June 20, 2025 7:30:00").getTime();
        let now = new Date().getTime();
        let timeRemaining = eventDate - now;

        // Tính ngày, giờ, phút, giây còn lại
        let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Hiển thị thời gian còn lại
        if (timeRemaining > 0) {
            document.getElementById("countdown").innerHTML =
                `⏳ Còn ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
        } else {
            document.getElementById("countdown").innerHTML = "🎉 Lễ tốt nghiệp đang diễn ra!";
        }
    }

    // Cập nhật đếm ngược mỗi giây
    setInterval(updateCountdown, 1000);
    updateCountdown();
});

document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const images = document.querySelectorAll(".carousel-img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.getElementById("close-lightbox");

    let currentIndex = 2;
    let totalImages = images.length;

    function updateCarouselLayout() {
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;

        let spacingX = screenWidth * 0.14; // Khoảng cách ngang giữa các ảnh
        let curveY = screenHeight * 0.04; // Độ cong ảnh

        images.forEach((img, index) => {
            const offset = index - currentIndex;
            const angle = offset * 15; // Góc quay nhẹ hơn để cân đối
            const x = offset * spacingX; // Khoảng cách ảnh theo kích thước màn hình
            const y = Math.abs(offset) * curveY; // Độ cong theo kích thước màn hình

            img.style.transform = `translateX(${x}px) translateY(${y}px) rotateY(${angle}deg)`;
            img.classList.remove("active");

            if (index === currentIndex) {
                img.classList.add("active"); // Ảnh ở giữa sẽ to hơn
            }
        });
    }

    // Xử lý vuốt ngang
    let startX = 0;
    let isDragging = false;

    function startDrag(e) {
        isDragging = true;
        startX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    }

    function onDrag(e) {
        if (!isDragging) return;
        const currentX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
        let deltaX = currentX - startX;

        e.preventDefault();

        if (deltaX < -30) {
            currentIndex = (currentIndex + 1) % totalImages;
        } else if (deltaX > 30) {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        }

        updateCarouselLayout();
        isDragging = false;
    }

    // Mở lightbox khi bấm vào ảnh
    images.forEach(img => {
        img.addEventListener("click", function () {
            lightboxImg.src = this.src;
            lightbox.classList.add("show");
        });
    });

    // Đóng lightbox khi bấm ra ngoài hoặc nút "X"
    closeBtn.addEventListener("click", function () {
        lightbox.classList.remove("show");
    });

    lightbox.addEventListener("click", function (e) {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove("show");
        }
    });

    // Sự kiện chuột & cảm ứng
    carousel.addEventListener("mousedown", startDrag);
    carousel.addEventListener("mouseup", onDrag);
    carousel.addEventListener("mouseleave", () => (isDragging = false));

    carousel.addEventListener("touchstart", startDrag);
    carousel.addEventListener("touchend", onDrag);

    // Cập nhật layout khi thay đổi kích thước cửa sổ
    window.addEventListener("resize", updateCarouselLayout);

    // Khởi tạo layout ban đầu
    updateCarouselLayout();
});

document.addEventListener("DOMContentLoaded", function () {
    const music = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");

    // Tự động phát nhạc khi trang tải
    function playMusic() {
        music.volume = 0.5; // Giảm âm lượng ban đầu
        music.play().catch(error => console.log("Tự động phát nhạc bị chặn:", error));
    }

    // Xử lý khi nhạc bị chặn bởi trình duyệt
    document.addEventListener("click", function () {
        if (music.paused) {
            playMusic();
        }
    }, { once: true }); // Chỉ chạy 1 lần khi người dùng tương tác

    // Toggle bật/tắt nhạc khi bấm nút
    musicToggle.addEventListener("click", function () {
        if (music.paused) {
            music.play();
            musicToggle.innerHTML = "🎵"; // Đổi icon khi phát nhạc
        } else {
            music.pause();
            musicToggle.innerHTML = "🔇"; // Đổi icon khi tắt nhạc
        }
    });

    playMusic(); // Gọi phát nhạc ngay khi tải trang
});


document.addEventListener("DOMContentLoaded", function () {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzVZVM-YBm4qV62RYV8QF_8r73Jytm3Qzx4T3ZyrmIOsSObbOg8R5DDgyfLVinQWK-y/exec';
    const form = document.getElementById("confirmation-form"); // Lấy form bằng ID
    const successMessage = document.getElementById("success-message");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Ngăn trang tải lại

        let formData = new FormData(form);

        fetch(scriptURL, { method: "POST", body: formData })
            .then(response => response.text()) // Chuyển phản hồi thành text để debug
            .then(data => {
                console.log("Phản hồi từ Google Apps Script:", data); // Kiểm tra phản hồi
                successMessage.style.display = "block"; // Hiển thị thông báo thành công
                form.reset(); // Reset form sau khi gửi thành công
            })
            .catch(error => {
                alert("Có lỗi xảy ra! Kiểm tra kết nối mạng hoặc thử lại sau.");
                console.error("Lỗi:", error);
            });
    });
});
