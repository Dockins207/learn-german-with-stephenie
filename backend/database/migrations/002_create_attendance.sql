-- Create attendance table
CREATE TABLE IF NOT EXISTS classroom_attendance (
    id SERIAL PRIMARY KEY,
    classroom_id INT REFERENCES classrooms(id) ON DELETE CASCADE,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    confirmed BOOLEAN DEFAULT FALSE,
    joined BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_attendance_classroom ON classroom_attendance(classroom_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON classroom_attendance(student_id);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_attendance_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_attendance_updated_at
    BEFORE UPDATE ON classroom_attendance
    FOR EACH ROW
    EXECUTE FUNCTION update_attendance_updated_at_column();
