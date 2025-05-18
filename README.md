
# 🩸 Blood Bank Management System

A full-stack Blood Bank Management System designed to streamline the process of managing blood donations, donor information, blood inventory, and storage across multiple facilities. The system includes:

- 🔧 **Backend**: Node.js, Express, PostgreSQL
- 🌐 **Frontend**: React + Vite

---

## 🚀 Features

- 🧑 Employee and Donor Management
- 🧬 Blood Donation Tracking
- 🧊 Blood Storage & Inventory System
- 📦 Blood Requests Handling
- 🏥 Facility Registration and Management
- 👨‍👩‍👧‍👦 Next of Kin Management
- 🔐 Secure REST API Architecture

---

## 🏗️ System Architecture

- **Frontend**: React with modern UI design, interacts with the backend via RESTful APIs.
- **Backend**: Express.js server connected to a PostgreSQL database using the `pg` module and Sequelize ORM.
- **Database**: PostgreSQL with normalized schema and relational integrity.

---

## 📁 Project Structure

```
/backend
  ├── controllers/
  ├── models/
  ├── routes/
  ├── database/
  ├── app.js
/frontend
  ├── src/
    ├── components/
    ├── pages/
    ├── services/
    ├── App.js
README.md
```

---

## 🛠️ Technologies Used

| Layer        | Technology         |
| ------------ | ------------------ |
| Frontend     | React.js, Tailwind CSS |
| Backend      | Node.js, Express   |
| Database     | PostgreSQL         |
| API          | RESTful            |
| Dev Tools    | PgAdmin, Postman   |

---

## 📦 Installation Guide

### 📍 Prerequisites

- Node.js (v16+)
- PostgreSQL (v12+)
- npm or yarn

### 🔧 Backend Setup

```bash
cd backend
npm install
node app.js
```

### 🌐 Frontend Setup

```bash
cd frontend
npm install
npm start
```

Ensure your PostgreSQL DB is running and the `blood_management_db` database is set up.

---

## 👥 Contributors

> Special thanks to the team behind this project:

1. **MN Molaba** - Project Manager
2. **N Maotwe** 
3. **KE Molobela**
4. **LM Maseko**
5. **TA Sechele** 
6. **OD Monamodi**
7. **L Saohatse**
8. **M Ndlovu** 
9. **RN Madadzhe**

---

## 🔐 Security Considerations

- Passwords and sensitive data are securely stored and hashed.
- JWT-based authentication can be integrated.
- CORS policies implemented for frontend-backend communication.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📞 Contact

For feedback, support, or collaboration:  
---

---

> _"Saving lives one drop at a time."_ 💉
