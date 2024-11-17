import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

// Mock credentials
const USERNAME = "john";
const PASSWORD = "foobar123";

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === USERNAME && password === PASSWORD) {
    res.status(200).json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.post("/logout", (req, res) => {
  res.status(200).json({ success: true, message: "Logout successful" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
