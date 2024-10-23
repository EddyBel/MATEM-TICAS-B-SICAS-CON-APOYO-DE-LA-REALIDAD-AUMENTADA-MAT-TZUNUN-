from ..app import app, db
from flask import Blueprint, request, jsonify
from ..DB.Modelos import Progress, Exercises, progress_schema
from datetime import datetime

progressRoutes = Blueprint('progress', __name__)

@progressRoutes.route("/progress/<int:id_user>", methods=["GET"])
def GET_PROGRESS (id_user):
    progress = Progress.query.filter(Progress.user_id == id_user).first()
    new_schema = progress_schema.dump(progress)
    return {"message": "Progress user Success", "data": new_schema}

@progressRoutes.route('/progress/<int:id_user>', methods=['POST'])
def CREATE_PROGRESS(id_user):
    data = request.json
    level = data["current_level"]

    # Buscar el progreso existente
    progress = Progress.query.filter_by(user_id=id_user).first()

    # Contar los ejercicios resueltos
    exercises = Exercises.query.filter(Exercises.user_id == id_user, Exercises.resolved == True).all()
    numExercises = len(exercises)

    if progress:
        # Actualizar el registro existente
        progress.current_level = level  # Ajusta según tu lógica
        progress.exercises_solved = numExercises
        progress.last_updated = datetime.now()
    else:
        # Crear un nuevo registro
        progress = Progress(user_id=id_user, current_level=level, exercises_solved=numExercises, last_updated=datetime.now())
        db.session.add(progress)

    # Guardar cambios en la base de datos
    db.session.commit()
   
    return jsonify({"message": "Success", "data": numExercises}), 201
