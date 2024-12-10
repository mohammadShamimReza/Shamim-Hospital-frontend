# Hospital Management System

## Overview

The **Hospital Management System** is a centralized platform designed to streamline hospital operations by enabling efficient management of doctors, patients, staff, and nurses. It facilitates interactions between various roles, ensures seamless communication, and simplifies administrative tasks.

---

## Key Features

### **Doctor-Patient Interaction**
- **Appointment Management**  
  - Patients can book and cancel appointments with doctors.  
  - Doctors can view their booking schedules and manage their appointments.  
- **Prescriptions**  
  - Doctors can prescribe medications and notes for booked appointments.  

### **Management (Admin Role)**  
- **User Management**  
  - Perform Create, Read, Update, and Delete (CRUD) operations for doctors, staff, nurses, and notices.  
  - View and manage patient profiles.  
- **Room Assignments**  
  - Assign and manage staff and nurses to duty rooms.  

### **User Activities**  
- **Profile Management**  
  - All users can update their profiles and view notices.  
- **Duty Management**  
  - Nurses and staff can view their assigned duty rooms.  

### **Communication**
- **Role-Based Chat System**  
  - Patients can communicate with their appointed doctors.  
  - Doctors, nurses, and staff can communicate with the admin for support and coordination.  

---


## Credentials for Testing

Use the following credentials to log in:

```plaintext
Role: admin
Email: admin@example.com  
Password: adminPass123

```

```plaintext
Role: doctor
Email: doctor@example.com  
Password: doctorPass123

```
```plaintext
Role: patiend
Email: patient@example.com  
Password: patientPass123

```
```plaintext
Role: staff
Email: staff@example.com  
Password: staffPass123

```

## Prerequisites

### .env setup
NEXT_PUBLIC_BASE_URL="you backend setup"



Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/en/) (LTS version recommended)  
- [npm](https://www.npmjs.com/)  
- [PostgreSQL](https://www.postgresql.org/) (for the database)

---

## How to Run Locally

### **Step 1: Clone the Repository**  
```bash
git clone <repo-url>
cd <cloned-repo>
```