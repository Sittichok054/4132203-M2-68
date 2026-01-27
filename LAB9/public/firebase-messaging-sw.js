// นำเข้า Firebase SDK สำหรับ Service Worker (Compat Version)
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// === คำเตือน: ต้องเปลี่ยนค่าด้านล่างนี้ให้ตรงกับในหน้า index.html ของคุณ ===
const firebaseConfig = {
    apiKey: "AIzaSyAfmiZXi5ZGz2NOnJ-ZtlPOhlvVTVfs-ac",
    authDomain: "palmwulin.firebaseapp.com",
    projectId: "palmwulin",
    storageBucket: "palmwulin.firebasestorage.app",
    messagingSenderId: "946634707361",
    appId: "1:946634707361:web:558b746310b5abb988fbe0"
};

// ตรวจสอบว่ามีการใส่ค่า Config หรือยัง
if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();

    // จัดการข้อความเมื่อแอปปิดอยู่ (Background)
    messaging.onBackgroundMessage((payload) => {
        console.log('[firebase-messaging-sw.js] ได้รับข้อความ Background:', payload);
        
        const notificationTitle = payload.notification.title || "มีข้อความใหม่";
        const notificationOptions = {
            body: payload.notification.body || "เนื้อหาข้อความ...",
            icon: 'https://cdn-icons-png.flaticon.com/512/732/732200.png',
            badge: 'https://cdn-icons-png.flaticon.com/512/732/732200.png'
        };

        self.registration.showNotification(notificationTitle, notificationOptions);
    });
} else {
    console.error("กรุณาตั้งค่า Firebase Config ในไฟล์ firebase-messaging-sw.js");
}