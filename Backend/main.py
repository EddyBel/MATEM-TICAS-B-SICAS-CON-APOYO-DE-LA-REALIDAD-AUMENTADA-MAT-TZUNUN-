from src.app import app


@app.route("/")
def index():
    return "Hello World in Server!😊"


if __name__ == "__main__":
    app.run(debug=True, port=8080)
