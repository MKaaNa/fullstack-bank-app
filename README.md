

# 🏦 Fullstack Bank Application

A fullstack **banking web application** built with **Spring Boot**, **Angular**, and **PostgreSQL**.
This project simulates a simple online banking platform where users can manage their accounts and transactions securely.

---

## 🚀 Features

* 🔐 Secure login & registration with **JWT authentication**
* 👤 User account management (profile, multiple accounts)
* 💰 Check balances and view transaction history
* 💸 Transfer money between accounts
* 📊 Admin role for managing users and accounts
* 📱 Responsive web interface built with Angular

---

## 🛠 Tech Stack

* **Frontend:** Angular, Angular Material, TypeScript
* **Backend:** Java, Spring Boot, Spring Security, Spring Data JPA (Hibernate)
* **Database:** PostgreSQL
* **Authentication:** JWT

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/MKaaNa/fullstack-bank-app.git
cd fullstack-bank-app
```

### 2️⃣ Database (PostgreSQL via Docker)

```bash
docker run --name bankdb -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=bank -p 5432:5432 -d postgres:14
```

### 3️⃣ Backend Setup

Edit `backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/bank
    username: postgres
    password: postgres
  jpa:
    hibernate:
      ddl-auto: update

jwt:
  secret: change-me
```

Run backend:

```bash
cd backend
./mvnw spring-boot:run
```

### 4️⃣ Frontend Setup

Set API URL in `frontend/src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080/api'
};
```

Run frontend:

```bash
cd ../frontend
npm install
ng serve --open
```

---

## ▶️ Usage

1. **Register** a new user or **sign in**.
2. **Create accounts** and check balances.
3. **Transfer money** between accounts.
4. **View transaction history**.
5. **Admins** can manage users and accounts.

---

## 📄 License

MIT License

---

## ✍️ Author

Developed by **[MKaaNa](https://github.com/MKaaNa)**

---

