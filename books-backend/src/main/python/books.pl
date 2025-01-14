book(kamien_filozoficzny, fantasy, polish, 39.99, entertainment, 320).
book(the_fellowship_of_the_ring, fantasy, english, 59.99, entertainment, 423).
book(pan_tadeusz, classic, polish, 24.99, education, 340).
book(nineteen_eighty_four, dystopia, english, 29.99, education, 328).
book(the_jungle_book, adventure, english, 19.99, entertainment, 220).
book(prestuplenie_i_nakazanie, classic, russian, 34.99, education, 671).
book(krzyzacy, classic, polish, 29.99, education, 640).
book(dziady_czesc_ii, drama, polish, 14.99, education, 80).
book(a_game_of_thrones, fantasy, english, 49.99, entertainment, 835).
book(the_adventures_of_sherlock_holmes, crime, english, 24.99, entertainment, 307).
book(the_da_vinci_code, thriller, english, 39.99, entertainment, 489).
book(o_alquimista, philosophy, portuguese, 24.99, education, 208).
book(le_petit_prince, fairy_tale, french, 19.99, education, 96).
book(krew_elfow, fantasy, polish, 34.99, entertainment, 384).
book(ogniem_i_mieczem, historical, polish, 44.99, education, 700).
book(the_hobbit, fantasy, english, 29.99, entertainment, 300).
book(sapiens_a_brief_history_of_humankind, science, english, 49.99, education, 412).
book(faust_eine_tragodie, drama, german, 19.99, education, 464).
book(gone_with_the_wind, romance, english, 39.99, entertainment, 1024).
book(unbroken, biography, english, 34.99, inspiration, 528).
book(zen_and_the_art_of_motorcycle_maintenance, philosophy, english, 29.99, inspiration, 352).
book(rozmowy_z_bogiem, religion, polish, 44.99, reflection, 400).
book(anna_karenina, classic, russian, 39.99, drama, 864).
book(dragonslayer, fantasy, english, 24.99, entertainment, 320).
book(the_stand, horror, english, 49.99, entertainment, 1200).
book(niebo_na_ziemi, romance, polish, 19.99, entertainment, 240).
book(el_silencio_de_la_ciudad_blanca, crime, spanish, 34.99, entertainment, 448).
book(fahrenheit_451, dystopia, english, 29.99, education, 256).
book(jugend_ohne_gott, drama, german, 19.99, reflection, 200).
book(between_worlds, reportage, english, 39.99, reflection, 350).
book(droga_krzyzowa, religion, polish, 24.99, reflection, 180).
book(zly, crime, polish, 29.99, entertainment, 504).
book(the_world_will_end, sci_fi, english, 44.99, reflection, 432).
book(the_chronicles_of_narnia, fantasy, english, 34.99, entertainment, 768).

find_books(Category, Language, MaxPrice, MaxPages, Purpose, ResultList) :-
    findall(
        Book,
        (book(Book, FilteredCategory, FilteredLanguage, Price, FilteredPurpose, Pages),
         (Category == '_' -> true ; FilteredCategory = Category),
         (Language == '_' -> true ; FilteredLanguage = Language),
         (var(MaxPrice) ; Price =< MaxPrice),
         (var(MaxPages) ; Pages =< MaxPages),
         (Purpose == '_' -> true ; FilteredPurpose = Purpose)),
        ResultList
    ).

get_languages(Languages) :-
    findall(Language, book(_, _, Language, _, _, _), AllLanguages),
    sort(AllLanguages, Languages).

get_categories(Categories) :-
    findall(Category, book(_, Category, _, _, _, _), AllCategories),
    sort(AllCategories, Categories).

suggest_next_books(CurrentTitle, SuggestedBooks) :-
    findall(
        Book,
        (
            (
                book(CurrentTitle, Category, Language, _, Purpose, _),
                book(Book, Category, Language, _, Purpose, _)
            ;
                book(CurrentTitle, Category, _, _, Purpose, _),
                book(Book, Category, _, _, Purpose, _)
            ;
                book(CurrentTitle, Category, _, _, _, _),
                book(Book, Category, _, _, _, _)
            ),
            CurrentTitle \= Book
        ),
        AllBooks
    ),
    sort(AllBooks, SuggestedBooks).
