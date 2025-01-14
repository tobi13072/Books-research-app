import os
from config import app, prolog
from flask import request, jsonify, send_file


@app.route("/languages", methods=["GET"])
def get_languages():
    query = "get_languages(Languages)"
    results = list(prolog.query(query))
    if results:
        languages = results[0]["Languages"]
        return jsonify(languages)
    return jsonify([])

@app.route("/categories", methods=["GET"])
def get_categories():
    query = "get_categories(Categories)"
    results = list(prolog.query(query))
    if results:
        categories = results[0]["Categories"]
        return jsonify(categories)
    return jsonify([])

@app.route("/filter", methods=["GET"])
def filter_books():
    category = request.args.get("category", "_")
    language = request.args.get("language", "_")
    max_price = request.args.get("max_price", type=float)
    max_pages = request.args.get("max_pages", type=int)
    purpose = request.args.get("purpose", "_")

    category_atom = category.strip('"\'')
    language_atom = language.strip('"\'')
    purpose_atom = purpose.strip('"\'')

    query = f"find_books({category_atom}, {language_atom}, {max_price or '1.0Inf'}, {max_pages or '1.0Inf'}, {purpose_atom}, ResultList)"
    results = list(prolog.query(query))

    if results:
        result_list = results[0]["ResultList"]
        response = [{"book": book} for book in result_list]
    else:
        response = []

    return jsonify(response)

@app.route("/book/<book_title>", methods=["GET"])
def get_book_details(book_title):
    query = f"book({book_title}, Category, Language, Price, Purpose, Pages)"
    results = list(prolog.query(query))

    if results:
        book = results[0]
        cover_path = os.path.join('covers', f'{book_title}.png')

        if os.path.exists(cover_path):
            cover_url = f'/book/{book_title}/cover'
        else:
            cover_url = None

        suggestion_query = f"suggest_next_books('{book_title}', SuggestedBooks)"
        suggestion_results = list(prolog.query(suggestion_query))
        suggested_books = []

        if suggestion_results:
            suggested_books = suggestion_results[0]["SuggestedBooks"][:3]  # Limitujemy do 3 sugestii

        return jsonify({
            "title": book_title,
            "category": book["Category"],
            "language": book["Language"],
            "price": float(book["Price"]),
            "purpose": book["Purpose"],
            "pages": int(book["Pages"]),
            "cover_url": cover_url,
            "suggested_next_books": suggested_books
        })
    else:
        return jsonify({"error": "Book not found"}), 404

@app.route("/book/<book_title>/cover", methods=["GET"])
def get_book_cover(book_title):
    cover_path = os.path.join('covers', f'{book_title}.png')
    if os.path.exists(cover_path):
        return send_file(cover_path, mimetype='image/png')
    else:
        return jsonify({"error": "Cover not found"}), 404 