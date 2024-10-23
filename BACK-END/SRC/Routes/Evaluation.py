from flask import Blueprint, request, jsonify
from SRC.DB.Modelos import Exercises, exercise_schema

evaluationRoutes = Blueprint('evaluation', __name__)


@evaluationRoutes.route('/evaluation_exercise/<int:exercise_id>', methods=['POST'])
def CREATE_EVALUATION(exercise_id):
    try:
        user_result = int(request.json.get("result"))
        
        # Obtener el ejer   cicio
        exercise = Exercises.query.get(exercise_id)
        result_final = int(exercise.result)
        exercise_message = exercise.message
        exercise_message_success = exercise.message_success
        exercise_message_failure = exercise.message_failure
        
    
        
        print(f"{user_result} {result_final} {user_result == result_final}")
        
        # Verificar si el ejercicio existe
        if exercise is None:
            return jsonify({"message": "Exercise not found"}), 404
        
        if (user_result != result_final):
            return jsonify({
                "message": "Faid Exercise",
                "data": {
                    "resolved": False,
                    "message": exercise_message_failure
                }
            }), 201
        elif (user_result == result_final):
            return jsonify({
                "message": "Success exercise",
                "data": {
                    "resolved": True,
                    "message": exercise_message_success
                }
            }), 200
        else:
            return jsonify({
                "message": "Error",
                "data":{
                    "resolved": False,
                    "message": exercise_message
                }
            }), 201
    except:
        print("Error Server")