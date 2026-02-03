from flask import Flask, request, jsonify, render_template
from logic import oda_secimi

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/uygun_odalar", methods=["POST"])
def api_uygun_odalar():
    data = request.json
    kisi_sayisi = data.get("kisi_sayisi")

    sonuc = oda_secimi(kisi_sayisi)

    return jsonify({
        "uygun": [
            {
                "oda_no": o.oda_no,
                "oda_tipi": o.oda_tipi,
                "max_kisi": o.max_kisi
            } for o in sonuc.uygun
        ],
        "uygun_degil": [o.oda_no for o in sonuc.uygun_degil]
    })

if __name__ == "__main__":
    app.run(debug=True)
