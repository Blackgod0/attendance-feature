import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import date
from models import Student, Attendance
from database import db
from utils.face_utils import save_face_encoding, recognize_faces

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///smart_classroom.db'
app.config['UPLOAD_FOLDER'] = 'uploads'

db.init_app(app)

with app.app_context():
    db.create_all()


@app.route('/')
def index():
    return "Flask backend is running."

# Register student
@app.route('/register', methods=['POST'])
def register_student():
    name = request.form['name']
    reg_no = request.form['reg_no']
    images = request.files.getlist('images')

    img_paths = []
    for idx, img in enumerate(images):
        path = os.path.join(app.config['UPLOAD_FOLDER'], f"{reg_no}_{idx}.jpg")
        img.save(path)
        img_paths.append(path)

    enc_path = save_face_encoding(img_paths, reg_no)
    if not enc_path:
        return jsonify({"error": "Face not detected in any image"}), 400

    student = Student(name=name, reg_no=reg_no, encoding_path=enc_path)
    db.session.add(student)
    db.session.commit()
    return jsonify({"message": "Student registered successfully"})

# Upload class image to mark attendance
@app.route('/upload_attendance', methods=['POST'])
def upload_attendance():
    image = request.files['image']
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
    image.save(image_path)

    students = Student.query.all()
    present_regs = recognize_faces(image_path, students)

    today = date.today()
    for student in students:
        status = "Present" if student.reg_no in present_regs else "Absent"
        existing = Attendance.query.filter_by(student_id=student.id, date=today).first()
        if not existing:
            record = Attendance(student_id=student.id, date=today, status=status)
            db.session.add(record)
    db.session.commit()
    return jsonify({
        "present": present_regs,
        "attendance_date": str(today)
    })

# Get all students
@app.route('/students', methods=['GET'])
def get_students():
    students = Student.query.all()
    return jsonify([{"name": s.name, "reg_no": s.reg_no} for s in students])

# Attendance report
@app.route('/attendance', methods=['GET'])
def attendance_report():
    records = Attendance.query.all()
    output = []
    for r in records:
        student = Student.query.get(r.student_id)
        output.append({
            "name": student.name,
            "reg_no": student.reg_no,
            "date": r.date.strftime("%Y-%m-%d"),
            "status": r.status
        })
    return jsonify(output)

if __name__ == "__main__":
    app.run(debug=True)
