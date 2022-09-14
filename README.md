# Projekt_Weiss_Hesse
Abgabe für das Abschlussprojekt in Geosoftware 1 SoSe 2022 von Darian Weiss und Luca Hesse

Ziel : Eine kartenbasierte Website, in der man Gebirge innerhalb Europas verwalten kann.

Server starten:
- npm install 
- npm start
- MongoDB starten

Das Bearbeiten und Löschen von Einträgen in der Datenbank funktioniert leider nicht (Versuche sind im Code zu erkennen).
Die Wikipedia-API ist nicht richtig eingebunden, die BEschreibung wird nicht automatisch angepasst (Versuche sind im Code zu erkennen).
Die Mapbox Directions API ist auf der "Route Berechnen" Seite eingebunden, aber nicht angepasst.

Das Hinzufügen von Einträgen in die Datenbank funktioniert sowohl per Textfeld als auch per Upload.
Das Anzeigen aller Einträge funktioniert als Tabellenform und mit Popups auf der Karte.
Durch Klicken auf eine Zeile in der Tabelle wird der Kartenausschnitt auf den entsprechenden Bereich gezoomed.
Das  Navigieren zwischen verschiedenen Seiten funktioniert übder die Buttons unten.

Ohne Docker funktioniert die Anwendung. Wenn man die Webseite per Docker startet, sind nicht alle Funktionen und Seiten aufrufbar.
            wir vermuten es liegt an den async await functions