# Projekt_Weiss_Hesse
Abgabe für das Abschlussprojekt in Geosoftware 1 SoSe 2022 von Darian Weiss und Luca Hesse

Ziel : Eine kartenbasierte Website, in der man Gebirge innerhalb Europas verwalten kann.

Funktionen dieser Seite:
      
      - Speichern, bearbeiten, hinzufügen und löschen von Gebirgen
      
                  - Gebirge werden mittels einer geojson datei als Textfeld oder per Datei
                              - Fehlerüberprüfung machen, ob diese Datei valide ist
                              - Diese Gebirge sollen dann mittels Leaflet Draw auf der Karte hinzugefügt werden (entweder Punkt oder Polygon, aber würde sagen wir nehmen Punkte)
                              
                  - Attribute sollen über ein Formular(?) angegeben werden und als Popup angezeigt werden.
                              - Die Attribute sind Name, Höhe, Wikipedia URL, Beschreibung
                                      - Die Beschreibung soll mittels Wikipedia API rausgesnipped werden. Falls es keine Beschreibung bzw. Artikel gibt: "keine Information vorhanden"
                  
                  - Gebirge in MongoDB speichern und diese sollen bearbeitbar sein
                                      
                                      
      - Infos über diese Anzeigen
      
      - Alle Gebirge als Tabelle anzeigen können
      
                  - HTML-List oder HTML-Tabelle
                  - Wenn man in der Liste/Tabelle über das Gebirge hovert, soll dieses auf der Karte hervorgehoben werden
                  
      - Route berechenen von einem Standort zum Gebirge
                  
                  - Gibt es ne API in der Aufgabe
                  - Layer benötigt
                  
      - Layout/Design
      
                  - Startseite mit Erklärung und Impressum
                  - Gut lesbar für Handys
                  
      - KP OB OPTIONAL
      
                  - Wetterverhältnisse anzeigen für Gebirge
                  - Knopf "Wetterverhältnisse anzeigen" mit OpenWeather API
