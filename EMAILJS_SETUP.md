# EmailJS Setup Guide

## Setup EmailJS untuk Contact Form

Untuk mengaktifkan pengiriman email dari contact form, ikuti langkah-langkah berikut:

### 1. Daftar di EmailJS
1. Kunjungi [https://www.emailjs.com/](https://www.emailjs.com/)
2. Buat akun gratis
3. Verifikasi email Anda

### 2. Buat Email Service
1. Di dashboard EmailJS, klik "Add New Service"
2. Pilih email provider (Gmail, Outlook, dll.)
3. Ikuti instruksi untuk menghubungkan email Anda
4. Catat **Service ID** yang diberikan

### 3. Buat Email Template
1. Klik "Create New Template"
2. Gunakan template berikut:

```
Subject: New Contact Form Message - {{subject}}

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply directly to this email to respond to {{from_name}}.
```

3. Catat **Template ID** yang diberikan

### 4. Dapatkan Public Key
1. Di dashboard, masuk ke "Integration"
2. Catat **Public Key** Anda

### 5. Update Environment Variables
Edit file `.env.local` dengan nilai yang sebenarnya:

```env
REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

### 6. Restart Development Server
```bash
npm start
```

### 7. Test Contact Form
1. Buka halaman Contact
2. Isi form dan kirim
3. Cek email Anda untuk memastikan pesan terkirim

## Template Variables Available:
- `{{from_name}}` - Nama pengirim
- `{{from_email}}` - Email pengirim
- `{{subject}}` - Subjek pesan
- `{{message}}` - Isi pesan
- `{{to_email}}` - Email tujuan (adinatapranaja@gmail.com)

## Troubleshooting:
- Pastikan semua environment variables sudah diisi dengan benar
- Cek console browser untuk error messages
- Verifikasi email service di EmailJS dashboard
- Pastikan template ID dan variable names sudah benar

## Rate Limits:
- Free plan EmailJS: 200 emails/month
- Untuk upgrade ke plan berbayar jika dibutuhkan lebih banyak
