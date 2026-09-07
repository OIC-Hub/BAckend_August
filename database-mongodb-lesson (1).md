# Databases — SQL vs NoSQL & Introduction to MongoDB

---

## 1. What is a Database?

A **database** is an organised place to store data so you can save it, find it, update it, and delete it easily.

### Real Life Analogy 🗄️
Think of a database like a **filing cabinet** in an office.

> Without a filing cabinet — papers are scattered everywhere. You cannot find anything.
>
> With a filing cabinet — everything is organised in folders and drawers. You can find any document in seconds.

In your apps so far, you stored data in arrays like this:

```js
const users = [
  { id: 1, name: "Ada", email: "ada@mail.com" },
  { id: 2, name: "Grace", email: "grace@mail.com" },
];
```

This works while the server is running — but **the moment you restart the server, all the data is gone**. A database saves data permanently to disk, so it survives restarts, crashes, and deployments.

---

## 2. Two Types of Databases

There are two main families of databases. You need to know both exist, and understand the difference.

```
Databases
├── SQL (Relational)       → MySQL, PostgreSQL, SQLite
└── NoSQL (Non-Relational) → MongoDB, Redis, Firebase
```

---

## 3. SQL Databases — The Traditional Way

SQL stands for **Structured Query Language**. SQL databases store data in **tables** — like a spreadsheet with rows and columns.

### Real Life Analogy 📊
Think of a SQL database like an **Excel spreadsheet**:

> Every table has fixed columns (Name, Email, Age)
> Every row is one record (one user, one product, one order)
> The structure is strict — every row must follow the same format

### What a SQL Table Looks Like

**Users Table:**

| id | name | email | age |
|---|---|---|---|
| 1 | Ada Lovelace | ada@mail.com | 25 |
| 2 | Grace Hopper | grace@mail.com | 30 |
| 3 | Alan Turing | alan@mail.com | 28 |

**Orders Table:**

| id | user_id | product | price |
|---|---|---|---|
| 1 | 1 | Concert Ticket | 5000 |
| 2 | 1 | VIP Pass | 15000 |
| 3 | 3 | Food Pass | 3000 |

Notice `user_id` in the Orders table **links** to the Users table — this is called a **relationship**. Ada (id: 1) has two orders.

### How You Talk to a SQL Database

SQL uses its own language — SQL queries:

```sql
-- Get all users
SELECT * FROM users;

-- Get one user
SELECT * FROM users WHERE id = 1;

-- Create a new user
INSERT INTO users (name, email, age)
VALUES ('Linus Torvalds', 'linus@mail.com', 53);

-- Update a user
UPDATE users SET age = 26 WHERE id = 1;

-- Delete a user
DELETE FROM users WHERE id = 1;

-- Join two tables — get orders WITH the user's name
SELECT users.name, orders.product, orders.price
FROM orders
JOIN users ON orders.user_id = users.id;
```

### The Rules of SQL

SQL databases are **strict**. Before saving any data, you must define the table structure first — what columns exist and what type each one is:

```sql
CREATE TABLE users (
  id    INT PRIMARY KEY AUTO_INCREMENT,
  name  VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  age   INT
);
```

If you try to add a column that does not exist, or put text where a number is expected — SQL will reject it with an error. The schema (structure) is fixed.

### Popular SQL Databases

| Database | Used by |
|---|---|
| **PostgreSQL** | Most modern startups, Supabase |
| **MySQL** | WordPress, Facebook (early), Twitter (early) |
| **SQLite** | Mobile apps, small projects |

---

## 4. NoSQL Databases — The Flexible Way

**NoSQL** (Not Only SQL) databases store data differently — not in tables with rows and columns, but in **documents** that look exactly like JavaScript objects.

### Real Life Analogy 📦
Think of a NoSQL database like a **cardboard box**:

> You can put anything inside — a book, a shoe, a laptop
> Each box can have different things inside
> No fixed shape required

MongoDB (the NoSQL database we use in this course) stores data as **JSON-like documents** inside **collections**.

### What a MongoDB Document Looks Like

```json
{
  "_id": "665f1a2b3c4d5e6f7a8b9c0d",
  "name": "Ada Lovelace",
  "email": "ada@mail.com",
  "age": 25,
  "address": {
    "city": "Lagos",
    "state": "Lagos State"
  },
  "skills": ["JavaScript", "React", "Node.js"],
  "createdAt": "2025-01-01T10:00:00.000Z"
}
```

This looks exactly like a JavaScript object — because it basically is. Nested objects, arrays, any shape — all allowed inside one document.

---

## 5. SQL vs NoSQL — Side by Side

| | SQL | NoSQL (MongoDB) |
|---|---|---|
| Stores data as | Tables (rows & columns) | Documents (JSON objects) |
| Structure | Fixed — schema defined first | Flexible — any shape |
| Language | SQL queries | JavaScript methods |
| Relationships | Tables linked by foreign keys | Reference IDs or embed documents |
| Best for | Structured, relational data | Flexible, document-based data |
| Examples | MySQL, PostgreSQL | MongoDB, Firebase |
| Used by | Banks, ERPs, traditional apps | Startups, modern web apps |

### Same Data — Two Different Ways to Store It

**SQL (table):**

| id | name | city | skill1 | skill2 |
|---|---|---|---|---|
| 1 | Ada | Lagos | JavaScript | React |

**MongoDB (document):**

```json
{
  "_id": "665f...",
  "name": "Ada",
  "city": "Lagos",
  "skills": ["JavaScript", "React"]
}
```

In SQL, storing an array of skills needs an extra table (UserSkills). In MongoDB, you just put the array directly inside the document. Much simpler for this kind of data.

---

## 6. Which One Should You Learn?

**Short answer — both, eventually.** But here is a practical guide:

```
Learn MongoDB first if:
✅ You already know JavaScript (MongoDB uses JS)
✅ You are building modern web apps
✅ Your data structure might change often
✅ You want to move fast

Learn SQL too because:
✅ Many companies still use it
✅ It is better for data that has clear relationships
✅ It teaches you to think about data structure carefully
✅ PostgreSQL is extremely powerful
```

> **For this course, we use MongoDB** — because you already know JavaScript, and MongoDB lets you move fast without learning a completely new language first. But do not ignore SQL — it is equally important in the industry.

---

## 7. Introduction to MongoDB

**MongoDB** is a **NoSQL database** that stores data as documents. It is one of the most popular databases in the world for Node.js applications.

### Key MongoDB Vocabulary

| MongoDB Term | What It Means | SQL Equivalent |
|---|---|---|
| **Database** | The whole database (e.g. `ticketng`) | Database |
| **Collection** | A group of related documents | Table |
| **Document** | One single record | Row |
| **Field** | One key-value pair inside a document | Column |
| **`_id`** | Auto-generated unique ID for every document | Primary Key |

### Visualised

```
MongoDB Database: ticketng
├── Collection: users
│   ├── Document: { _id: "...", name: "Ada", email: "ada@mail.com" }
│   ├── Document: { _id: "...", name: "Grace", email: "grace@mail.com" }
│   └── Document: { _id: "...", name: "Alan", email: "alan@mail.com" }
│
├── Collection: events
│   ├── Document: { _id: "...", name: "Afrobeats Night", price: 5000 }
│   └── Document: { _id: "...", name: "Tech Summit", price: 10000 }
│
└── Collection: bookings
    ├── Document: { _id: "...", userId: "...", eventId: "...", quantity: 2 }
    └── Document: { _id: "...", userId: "...", eventId: "...", quantity: 1 }
```

---

## 8. Setting Up MongoDB Atlas (Free Cloud Database)

You do not need to install MongoDB on your computer. **MongoDB Atlas** gives you a free cloud database you can connect to from anywhere.

### Step 1 — Create an Account

Go to [mongodb.com/atlas](https://mongodb.com/atlas) and sign up for free.

### Step 2 — Create a Free Cluster

- Click **"Build a Database"**
- Choose **M0 Free** tier
- Pick any cloud provider and region (choose one close to you)
- Click **"Create"**

### Step 3 — Create a Database User

- Go to **Database Access** → **Add New Database User**
- Set a username and password (save these — you will need them)
- Set role to **"Read and Write to Any Database"**

### Step 4 — Allow Your IP Address

- Go to **Network Access** → **Add IP Address**
- Click **"Allow Access From Anywhere"** (for development)
- In production, you would restrict this to your server's IP

### Step 5 — Get Your Connection String

- Go to **Database** → **Connect** → **Drivers**
- Copy the connection string — it looks like this:

```
mongodb+srv://yourUsername:yourPassword@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

Save this in your `.env` file:

```
MONGO_URI=mongodb+srv://yourUsername:yourPassword@cluster0.abc123.mongodb.net/ticketng
```

> The `/ticketng` at the end is the database name — MongoDB creates it automatically when you first save data.

---

## 9. Install MongoDB Compass (Visual Tool)

**MongoDB Compass** is a free desktop app that lets you see your database visually — like a GUI for your database. You can browse documents, insert data manually, and run queries.

Download from: [mongodb.com/products/compass](https://www.mongodb.com/products/compass)

To connect — paste your connection string and click **Connect**. You will see all your databases and collections visually.

---

## 10. Connecting MongoDB to Your Express App

Install the tools:

```bash
npm install mongoose dotenv
```

We use **Mongoose** — a library that makes working with MongoDB in Node.js much easier. Think of it as the translator between your Node code and MongoDB.

```js
// config/db.js
const mongoose = require("mongoose");

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Connection Error: ${error.message}`);
    process.exit(1); // stop the server if DB fails
  }
}

module.exports = connectDB;
```

```js
// server.js
const express   = require("express");
const dotenv    = require("dotenv");
const connectDB = require("./config/db");

dotenv.config(); // load .env file
connectDB();     // connect to MongoDB

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API running ✅" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

Run:

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0.abc123.mongodb.net
Server running on port 3000
```

---

## 11. Your First Schema and Model

A **Schema** is the blueprint — it defines what a document looks like.
A **Model** is the tool you use to create, read, update, and delete documents.

```js
// models/User.js
const mongoose = require("mongoose");

// 1. Define the schema — the shape of your data
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    age: {
      type: Number,
    },
    city: {
      type: String,
      default: "Lagos",
    },
  },
  { timestamps: true } // auto adds createdAt and updatedAt
);

// 2. Create the model from the schema
const User = mongoose.model("User", userSchema);
//                            ↑
//          Collection name becomes "users" automatically (pluralised)

module.exports = User;
```

---

## 12. CRUD with Mongoose — The Basics

Now let us use the model to interact with the database.

### Create — Save a New Document

```js
const User = require("./models/User");

// Method 1 — create() shorthand
const newUser = await User.create({
  name: "Ada Lovelace",
  email: "ada@mail.com",
  age: 25,
});

console.log(newUser);
// { _id: "665f...", name: "Ada Lovelace", email: "ada@mail.com", ... }
```

### Read — Find Documents

```js
// Find ALL users
const users = await User.find();

// Find with a filter — all users from Lagos
const lagosUsers = await User.find({ city: "Lagos" });

// Find ONE user by a field
const user = await User.findOne({ email: "ada@mail.com" });

// Find by MongoDB ID
const user = await User.findById("665f1a2b3c4d5e6f7a8b9c0d");
```

### Update — Change a Document

```js
// Find by ID and update — { new: true } returns the UPDATED version
const updated = await User.findByIdAndUpdate(
  "665f1a2b3c4d5e6f7a8b9c0d",
  { age: 26 },
  { new: true }
);
```

### Delete — Remove a Document

```js
await User.findByIdAndDelete("665f1a2b3c4d5e6f7a8b9c0d");
```

---

## 13. Full CRUD in Express Routes

```js
// routes/userRoutes.js
const express = require("express");
const User    = require("../models/User");
const router  = express.Router();

// GET all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json({ count: users.length, data: users });
});

// GET one user
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// POST create user
router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ message: "User created", user });
});

// PUT update user
router.put("/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User updated", user });
});

// DELETE user
router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted" });
});

module.exports = router;
```

Mount in `server.js`:

```js
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);
```

### Test in Postman

| Method | URL | What it does |
|---|---|---|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get one user |
| POST | `/api/users` | Create a user |
| PUT | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

---

## ✅ Checklist
- [ ] Can explain what a database is and why we need one
- [ ] Know what SQL is and how tables, rows, and columns work
- [ ] Know what NoSQL is and how documents and collections work
- [ ] Can explain the difference between SQL and MongoDB simply
- [ ] Set up a free MongoDB Atlas cluster
- [ ] Have MongoDB Compass installed and connected
- [ ] Connected MongoDB to an Express app using Mongoose
- [ ] Can create a Schema and Model
- [ ] Can perform basic CRUD — create, read, update, delete

## 💡 Practice Exercises

1. Create an `Event` model with these fields: `name` (required string), `category` (string), `date` (date), `price` (number, default 0), `location` (string). Add `timestamps: true`.
2. Build 5 routes for the Event model — GET all, GET one, POST, PUT, DELETE. Test all in Postman.
3. Add a filter to your `GET /api/events` route — if `?category=Tech` is in the query, return only Tech events.
4. **Bonus:** Try to save an event without a name (leave the required field empty). What error does MongoDB send back? Handle it properly with a try/catch and return a clean 400 error message.
