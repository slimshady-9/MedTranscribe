from flask import Flask, jsonify
import pandas as pd
import os
from flask_cors import CORS


app = Flask(__name__)
CORS(app, origins=['http://localhost:4200'])

excel_file_path = './assets/MOCK_DATA1.xlsx'
df = pd.read_excel(excel_file_path)


@app.route('/get_excel_data')
def get_excel_data():
    # Read data from Excel (you may want to filter or process data here)
    excel_data = df.to_dict(orient='records')
    return jsonify(excel_data)


@app.route('/get_single_patient/<int:id>')
def get_single_patient(id):
    # Read data from Excel (you may want to filter or process data here)
    patient_data = df[df['id']==id].to_dict(orient='records')
    return jsonify(patient_data)



@app.route('/admitcount')
def get_admitcount():
    # Replace with the actual path
    patientsData = pd.read_excel(r'Backend\assets\MOCK_DATA1.xlsx')

    patientsData['Category'] = pd.cut(patientsData['symptoms_days'], bins=[0, 5, 10, float('inf')],
                                      labels=['Normal', 'Elective', 'Emergency'], right=False)

    category_counts = patientsData['Category'].value_counts().to_dict()

    result = {
        'Normal': str(category_counts.get('Normal', 0)),
        'Elective': str(category_counts.get('Elective', 0)),
        'Emergency': str(category_counts.get('Emergency', 0))
    }

    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
