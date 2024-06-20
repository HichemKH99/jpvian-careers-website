from flask import Flask, render_template
from flaskext.mysql import MySQL
from flask import jsonify, make_response, request
import json

app = Flask(__name__)

# on crée une instance du connecteur flask_mysql
mysql = MySQL()


# on précise notre configuration pour le connecteur
app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_PORT"] = 3306
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pass_root"
app.config["MYSQL_DATABASE_DB"] = "db_university"


# on intitialise notre connecteur avec la configuration de notre application flask
mysql.init_app(app)


# Affichage des données
@app.route("/")
def index():
    return render_template("index.html")


# ...


@app.route("/api/persons", methods=["GET"])
def selectPersons():
    i = request.args.get("i")
    # matricule = request.args.get("val")
    dt = request.args.get("dt")
    conn = mysql.connect()
    cursor = conn.cursor()
    # requete sql select
    cursor.execute("USE db_university")

    if i == "a":
        cursor.execute(
            "SELECT annee, matricule, nom, prenom, sexe, specialite, moyenne FROM resultats WHERE annee = %s",
            (2019,),
        )

    elif i == "b":
        cursor.execute(
            "SELECT annee, matricule, nom, prenom, sexe, specialite, moyenne FROM resultats WHERE annee = %s",
            (2020,),
        )

    elif i == "c":
        cursor.execute(
            "SELECT annee, matricule, nom, prenom, sexe, specialite, moyenne FROM resultats WHERE annee = %s",
            (2021,),
        )
    elif i == "u":
        cursor.execute(
            """
            SELECT annee, matricule, nom, prenom, sexe, specialite, moyenne
            FROM resultats
            WHERE annee = %s
            ORDER BY moyenne ASC
            """,
            (dt,),
        )
    elif i == "d":
        cursor.execute(
            """
            SELECT annee, matricule, nom, prenom, sexe, specialite, moyenne
            FROM resultats
            WHERE annee = %s
            ORDER BY moyenne DESC
            """,
            (dt,),
        )

    # else:
    #     if i == "a":
    #         cursor.execute(
    #             "SELECT annee, matricule, nom, prenom, sexe, specialite, moyenne FROM resultats WHERE annee = %s AND matricule = %s",
    #             (2019, matricule),
    #         )
    #     elif i == "b":
    #         cursor.execute(
    #             "SELECT annee, matricule, nom, prenom, sexe, specialite, moyenne FROM resultats WHERE annee = %s AND matricule = %s",
    #             (2020, matricule),
    #         )
    #     else:
    #         cursor.execute(
    #             "SELECT annee, matricule, nom, prenom, sexe, specialite, moyenne FROM resultats WHERE annee = %s AND matricule = %s",
    #             (2021, matricule),
    #         )

    # préparer le fichier JSON
    data = cursor.fetchall()
    row_headers = [x[0] for x in cursor.description]

    cursor.close()

    json_data = []
    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    # envoi des données sous format json
    return make_response(jsonify(json_data), 200)


# prs1-> rechercher
@app.route("/api/persons1", methods=["GET"])
def selectPersons1():
    i = request.args.get("i")
    matricule = request.args.get("val")

    conn = mysql.connect()
    cursor = conn.cursor()
    # requete sql select
    cursor.execute("USE db_university")

    if i == "a":
        cursor.execute(
            "SELECT annee, matricule, nom, prenom, sexe, specialite, moyenne FROM resultats WHERE annee = %s AND matricule = %s",
            (2019, matricule),
        )
    elif i == "b":
        cursor.execute(
            "SELECT annee, matricule, nom, prenom, sexe, specialite, moyenne FROM resultats WHERE annee = %s AND matricule = %s",
            (2020, matricule),
        )
    else:
        cursor.execute(
            "SELECT annee, matricule, nom, prenom, sexe, specialite, moyenne FROM resultats WHERE annee = %s AND matricule = %s",
            (2021, matricule),
        )

    # préparer le fichier JSON
    data = cursor.fetchall()
    row_headers = [x[0] for x in cursor.description]

    cursor.close()

    json_data = []
    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    # envoi des données sous format json
    return make_response(jsonify(json_data), 200)


# ========


# axe1
@app.route("/api/info1", methods=["GET"])
def info1():
    conn = mysql.connect()
    cursor = conn.cursor()
    # requete sql select
    cursor.execute("USE db_university")

    cursor.execute(
        "SELECT annee, count(*) AS nb_etudiants FROM resultats group by annee"
    )

    data = cursor.fetchall()
    row_headers = [x[0] for x in cursor.description]

    cursor.close()

    json_data = []
    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    return jsonify(json_data)


# axe2
@app.route("/api/info2", methods=["GET"])
def info2():
    conn = mysql.connect()
    cursor = conn.cursor()
    # requete sql select
    cursor.execute("USE db_university")

    data = {"annee": [], "datasets": []}

    cursor.execute("SELECT DISTINCT annee FROM resultats")

    annee_tuple = cursor.fetchall()
    annee = [item[0] for item in annee_tuple]
    data["annee"] = annee

    cursor.execute("SELECT DISTINCT specialite FROM resultats")

    specialite_tuple = cursor.fetchall()
    specialite_list = [item[0] for item in specialite_tuple]

    for specialite in specialite_list:
        cursor.execute(
            "SELECT count(*) as nb_etudiants  FROM resultats WHERE specialite='"
            + specialite
            + "' group by annee"
        )
        nb_etudiants_tuple = cursor.fetchall()
        nb_etudiants_list = [item[0] for item in nb_etudiants_tuple]
        data["datasets"].append({"label": specialite, "data": nb_etudiants_list})

    data = json.dumps(data)
    return data


# axe3
@app.route("/api/info3", methods=["GET"])
def info3():
    conn = mysql.connect()
    cursor = conn.cursor()
    # requete sql select
    cursor.execute("USE db_university")
    cursor.execute(
        "select annee, count(*) as nb_etudiants from resultats where moyenne<10 group by annee"
    )
    data = cursor.fetchall()
    row_headers = [x[0] for x in cursor.description]

    cursor.close()

    json_data = []
    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    return jsonify(json_data)


# axe4
@app.route("/api/info4", methods=["GET"])
def info4():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute(
        "select specialite, count(*) as nb_etudiants from resultats where moyenne >= 10 group by specialite"
    )

    data = cursor.fetchall()
    row_headers = [x[0] for x in cursor.description]

    cursor.close()

    json_data = []
    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    return jsonify(json_data)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
