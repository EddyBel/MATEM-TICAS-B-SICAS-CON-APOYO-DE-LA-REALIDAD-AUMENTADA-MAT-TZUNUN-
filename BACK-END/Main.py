from SRC.app import app
from SRC.app import db
from SRC.Routes.User import usersRoutes
from SRC.Routes.Exercises import exercisesRoutes
from SRC.Routes.Evaluation import evaluationRoutes
from SRC.Routes.Progress import progressRoutes
from Config import debug_mode

app.register_blueprint(exercisesRoutes, url_prefix='/api')
app.register_blueprint(usersRoutes, url_prefix='/api')
app.register_blueprint(evaluationRoutes, url_prefix='/api')
app.register_blueprint(progressRoutes, url_prefix="/api")


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=debug_mode)
