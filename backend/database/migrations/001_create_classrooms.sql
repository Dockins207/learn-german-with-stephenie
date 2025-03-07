
CREATE TABLE classrooms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  teacher_id INT REFERENCES users(id) ON DELETE SET NULL,
  booked BOOLEAN DEFAULT FALSE,
  date DATE NOT NULL,
  day VARCHAR(20) CHECK (day IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')) NOT NULL,
  time TIME NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
