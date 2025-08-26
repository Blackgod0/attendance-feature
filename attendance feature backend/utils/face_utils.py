import face_recognition
import numpy as np
import os
from PIL import Image

def save_face_encoding(images, reg_no):
    encodings = []
    for img in images:
        image = face_recognition.load_image_file(img)
        face_enc = face_recognition.face_encodings(image)
        if face_enc:
            encodings.append(face_enc[0])
    if encodings:
        avg_encoding = np.mean(encodings, axis=0)
        path = f'encodings/{reg_no}.npy'
        np.save(path, avg_encoding)
        return path
    return None

def recognize_faces(upload_img, all_students):
    image = face_recognition.load_image_file(upload_img)        
    face_locations = face_recognition.face_locations(image)
    encodings = face_recognition.face_encodings(image, face_locations)
    
    present_reg_nos = []

    for enc in encodings:
        for student in all_students:
            known_enc = np.load(student.encoding_path)
            match = face_recognition.compare_faces([known_enc], enc, tolerance=0.45)
            if match[0]:
                present_reg_nos.append(student.reg_no)
                break
    return list(set(present_reg_nos))
