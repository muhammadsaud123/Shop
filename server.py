# server.py (Python Flask server)

from flask import Flask, jsonify, request
import os
import random

app = Flask(__name__)

# Sample product data
products = [
    {
        'id': 1,
        'name': 'Scrub Top',
        'description': 'Comfortable and stylish scrub top',
        'price': 29.99,
        'image': 'https://example.com/scrub-top.jpg'
    },
    {
        'id': 2,
        'name': 'Scrub Pants',
        'description': 'Durable and breathable scrub pants',
        'price': 34.99,
        'image': 'https://example.com/scrub-pants.jpg'
    },
    # Add more products as needed
]

# Sample healthcare worker data
healthcare_workers = [
    {
        'name': 'Dr. Emily Johnson',
        'role': 'Pediatrician',
        'quote': 'Every child deserves the best possible care.',
        'photo': 'https://example.com/dr-johnson.jpg'
    },
    {
        'name': 'Nurse Alex Thompson',
        'role': 'Registered Nurse',
        'quote': 'Compassion and empathy are at the heart of nursing.',
        'photo': 'https://example.com/nurse-thompson.jpg'
    },
    # Add more healthcare workers as needed
]

# Sample guestbook entries
guestbook_entries = []

# API endpoints

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(products)

@app.route('/api/healthcare-workers', methods=['GET'])
def get_healthcare_workers():
    return jsonify(healthcare_workers)

@app.route('/api/guestbook', methods=['POST'])
def add_guestbook_entry():
    entry = request.get_json()
    guestbook_entries.append(entry)
    return jsonify(entry), 201

@app.route('/api/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    filename = f'{random.randint(1000, 9999)}_{file.filename}'
    file.save(os.path.join('uploads', filename))
    return jsonify({'message': 'File uploaded successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)
