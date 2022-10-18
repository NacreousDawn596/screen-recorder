import flask

app = flask.Flask(__name__, static_folder="./", template_folder="./")

@app.route("/")
def index():
    return flask.render_template("index.html")

@app.route("/<file>")
def upload(file):
    return flask.send_file(file)

app.run()
