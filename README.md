# 🛡️ Spring Security with JWT and Google OAuth2

This Spring Boot application demonstrates a hybrid authentication setup:

- **JWT authentication** for form login
- **Google OAuth2 login** using Spring Security
- **Custom logout** that clears session, authentication, and cookie

---

## 🚀 Features

- Stateless JWT login for custom form-based users
- OAuth2 login using Google with session-based persistence
- Logout endpoint (`/logout`) clears session and authentication
- Secure REST API endpoint (`/api/auth/hello`)
- Uses Spring Security Filter Chain configuration

---

##  🧪 Testing
1. JWT Login (Custom Form)
POST /api/auth/login with username/password

Get Authorization: Bearer <token> from response

Use it in headers for secured requests

2. Google OAuth2 Login
Access /api/auth/hello from browser

Redirects to Google login if not authenticated

On success, uses session authentication

3. Logout
- GET /logout

Clears:
- SecurityContext
- Session
- JSESSIONID cookie

---

## 🛠️ Notes
OAuth2 works with session-based auth

JWT works with stateless auth

Use .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) to support both
