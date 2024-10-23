from flask import Blueprint, request, jsonify
from SRC.DB.Modelos import Exercises, Progress
from SRC.Core.IA import Prediccion

evaluationRoutes = Blueprint('evaluation', __name__)
modelo = Prediccion()

@evaluationRoutes.route('/evaluation_exercise/<int:exercise_id>', methods=['POST'])
def CREATE_EVALUATION(exercise_id):
    try:
        user_result = int(request.json.get("result"))
        
        # Obtener el ejer   cicio
        exercise = Exercises.query.get(exercise_id)
        if exercise is None:
            return jsonify({"message": "Exercise not found"}), 404
        
        result_final = int(exercise.result)
        exercise_message = exercise.message
        exercise_message_success = exercise.message_success
        exercise_message_failure = exercise.message_failure
        
        print(f"{user_result} {result_final} {user_result == result_final}")
        
        # Verificar si el ejercicio existe
        if exercise is None:
            return jsonify({"message": "Exercise not found"}), 404
        
        if (user_result != result_final):
            print("Resultado incorrecto")
            return jsonify({
                "message": "Faid Exercise",
                "data": {
                    "resolved": False,
                    "message": exercise_message_failure
                }
            }), 200
        elif (user_result == result_final):
            print("Resultado correcto")
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
            }), 200
    except:
        print("Error Server")
        return jsonify({"message": "Error en el Server"}), 500

@evaluationRoutes.route("/evaluation/prediction/<int:id_user>", methods=['GET'])
def EVALUATION_PREDICTION(id_user):
   try:
        exercises = Exercises.query.all()
        progress = Progress.query.get(id_user)
        exercises_solver = progress.exercises_solved
        exercises_not_solved = len(exercises) - exercises_solver
        level_current = progress.current_level
        newTupla = (level_current, 5.2, exercises_solver, exercises_not_solved)

        predict = modelo.predecir(newTupla)
        return jsonify({
            "message": "Success",
            "data": {
                "predict": predict
            }
        })
   except Exception as e:
        print("Error Server")
        return jsonify({"message": "Error", "error": e}), 500
    
