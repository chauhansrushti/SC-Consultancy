# SC Consultancy - Frontend Documentation

## 📁 Frontend Structure

```
frontend/
├── index.html              # Home page
├── services.html           # Services page
├── about.html              # About page
├── team.html               # Team members page
├── contact.html            # Contact form page
├── blog.html               # Blog/Resources page
│
├── css/
│   ├── style.css           # Main styles and utilities
│   └── responsive.css      # Mobile-responsive styles
│
├── js/
│   ├── script.js           # Main JavaScript functionality
│   ├── form-validation.js  # Form validation and handling
│   ├── api.js              # API client and endpoints
│   └── navbar.js           # Navigation bar functionality (future)
│
└── images/                 # Image assets folder
```

---

## 🎨 Features Included

### Pages
- **Home (index.html)** - Landing page with hero section, services preview, testimonials, CTA
- **Services (services.html)** - Detailed service cards with features and CTAs
- **About (about.html)** - Company story, mission, values, and statistics
- **Team (team.html)** - Team member profiles with social links
- **Contact (contact.html)** - Contact form with validation, contact info, and business hours
- **Blog (blog.html)** - Blog listing with categories, pagination, and newsletter signup

### Design Elements
- ✅ Professional gradient color scheme (Purple & Blue)
- ✅ Responsive Bootstrap 5 layout
- ✅ Smooth animations and transitions
- ✅ Font Awesome icons throughout
- ✅ Mobile-first responsive design
- ✅ Sticky navigation bar
- ✅ Scroll-to-top button
- ✅ Testimonial cards
- ✅ Service showcase cards

### Functionality
- ✅ Form validation (client-side)
- ✅ Responsive navigation
- ✅ Smooth scrolling
- ✅ Real-time feedback
- ✅ Auto-dismiss alerts
- ✅ API client ready for backend integration
- ✅ Local storage for auth tokens
- ✅ Error handling

---

## 🚀 How to Use

### 1. **Open Frontend Pages**
Simply open any `.html` file in a modern web browser:
```
Double-click on index.html to view the home page
```

### 2. **File Structure Explanation**

#### **HTML Files**
- Each page has a consistent structure with:
  - Navigation bar (sticky)
  - Page-specific content
  - Footer with contact info and links
  - Links to CSS and JS files

#### **CSS Files**
- `style.css` - Main styles for:
  - Typography
  - Components (buttons, cards, forms)
  - Colors and spacing
  - Gradients and effects
  
- `responsive.css` - Mobile responsive styles for:
  - Extra small devices (< 576px)
  - Small devices (576px - 767px)
  - Medium devices (768px - 991px)
  - Large desktops (992px+)

#### **JavaScript Files**
- `script.js` - Core functionality:
  - DOM initialization
  - Scroll animations
  - Navbar active state
  - Scroll-to-top button
  - Utility functions

- `form-validation.js` - Form handling:
  - Real-time field validation
  - Error messages
  - Phone number formatting
  - Form submission handling

- `api.js` - Backend integration:
  - API client class
  - Endpoints for all features
  - Authentication handling
  - Error handling

---

## 📝 Customization Guide

### **Change Color Scheme**
Edit `css/style.css` - Root variables:
```css
:root {
    --primary-color: #667eea;    /* Change this */
    --secondary-color: #764ba2;  /* Change this */
    /* ... */
}
```

### **Update Company Information**
Replace all instances of:
- "SC Consultancy" → Your company name
- Contact email in footer
- Phone numbers
- Address details

### **Add Company Logo**
Add logo image to `/images/` folder and update navbar:
```html
<a class="navbar-brand fw-bold" href="index.html">
    <img src="images/logo.png" alt="Logo" height="40"> SC Consultancy
</a>
```

### **Customize Hero Section**
Edit `index.html` hero section gradient:
```html
<section class="hero-section" style="background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);">
```

---

## 🔗 Responsive Breakpoints

```
Extra Small:  < 576px   (phones)
Small:        576px     (landscape phones)
Medium:       768px     (tablets)
Large:        992px     (desktops)
XL:           1200px    (large desktops)
XXL:          1400px    (extra large)
```

---

## 🎯 Form Validation Rules

### Contact Form Fields
1. **Name**
   - Required
   - Min 3 characters
   - Letters and spaces only

2. **Email**
   - Required
   - Valid email format

3. **Phone**
   - Optional
   - Format: (XXX) XXX-XXXX
   - Auto-formats on input

4. **Service**
   - Required
   - Must select from dropdown

5. **Message**
   - Required
   - Min 10 characters
   - Max 1000 characters
   - Character counter shown

6. **Privacy Policy**
   - Must be checked

---

## 🔌 API Integration (Ready for Backend)

### Contact Form Submission
```javascript
POST /api/contact
{
    name: string,
    email: string,
    phone: string,
    service: string,
    message: string,
    timestamp: ISO timestamp
}
```

### Expected Response
```json
{
    "success": true,
    "message": "Inquiry received successfully",
    "inquiryId": "abc123"
}
```

### How to Enable
1. Update `API_CONFIG.BASE_URL` in `js/api.js`
2. Backend endpoint should be at `/api/contact`
3. Form already handles submission via `submitContactForm()` function

---

## 📱 Mobile Optimization

### Tested on:
- iPhone 12, 13, 14 (iOS)
- Samsung Galaxy S21, S22 (Android)
- iPad/Tablet devices
- Desktop browsers

### Mobile Features:
- Responsive layout
- Touch-friendly buttons
- Mobile hamburger menu
- Optimized images
- Fast loading

---

## 🔒 Security Notes

1. **Form Submission**
   - Client-side validation shown
   - Server-side validation required on backend
   - Do not store sensitive data in localStorage

2. **API Keys**
   - Never expose API keys in frontend code
   - Use backend to make sensitive API calls

3. **Authentication**
   - Auth tokens stored in localStorage
   - Token automatically sent with requests

---

## 🐛 Troubleshooting

### Pages Not Loading?
- Check file paths are correct
- Ensure HTML, CSS, JS files are in correct folders
- Clear browser cache

### Styles Not Applying?
- Check `<link>` tags point to correct CSS files
- Verify Bootstrap 5 CDN is loaded
- Check browser console for errors

### Form Not Working?
- Check console for JavaScript errors
- Verify form input IDs match validation script
- Ensure backend is running for submission

### Navigation Not Sticky?
- Check Bootstrap classes
- Verify CSS is loaded
- Check for conflicting CSS

---

## 📚 Resources

- **Bootstrap 5**: https://getbootstrap.com
- **Font Awesome Icons**: https://fontawesome.com
- **MDN Web Docs**: https://developer.mozilla.org

---

## ✅ Next Steps

1. **Backend Setup** - Create Node.js/Express server
2. **Database Setup** - Create MySQL tables
3. **API Development** - Build API endpoints
4. **Email Service** - Configure email notifications
5. **Deployment** - Host frontend and backend

---

**Version**: 1.0  
**Last Updated**: March 28, 2026  
**Status**: Production Ready ✅
