# Documentation

# DB 
Diese Datenbank besteht aus zwei Hauptobjekten, nämlich "Class" und "Student". Sie wird verwendet, um eine Schulverwaltung zu implementieren.

Die "Class" Kollektion repräsentiert eine Klasse in der Schule. Jede Klasse hat einen Namen, einen Raum, einen Standort und eine Klassenstufe. Zudem gibt es eine Liste von Schüler*innen, die zur jeweiligen Klasse gehören. Die Schüler*innen werden als Objekt-IDs (aus der "Student" Kollektion) in einem Array gespeichert. Dies erzeugt eine 1-zu-n-Beziehung zwischen der "Class" und "Student", da eine Klasse viele Schüler*innen haben kann.

Die "Student" Kollektion repräsentiert einen Schüler oder eine Schülerin. Jeder Schüler hat einen Namen, einen Zweitnamen, ein Geburtsdatum, eine Adresse, eine Nationalität und einen rechtlichen Vormund. Zusätzlich ist auch die Klassen-ID (aus der "Class" Kollektion) als Attribut gespeichert. Dies stellt die Beziehung zwischen dem Schüler und der Klasse dar, in der er/sie eingeschrieben ist.

Wenn ein Schüler oder eine Klasse gelöscht wird, wird auch der entsprechende Verweis in der jeweils anderen Kollektion entfernt. Dies stellt sicher, dass die Datenintegrität zwischen den beiden Kollektionen aufrechterhalten bleibt.

Mit Hilfe dieser Beziehungen kann die Datenbank effektiv Klassen und Schüler*innen verwalten, indem sie Operationen wie das Erstellen, Aktualisieren, Abrufen und Löschen von Klassen und Schüler*innen unterstützt. Darüber hinaus ermöglicht sie das Abrufen aller Schüler*innen in einer bestimmten Klasse, was für die Schulverwaltung von großer Bedeutung ist.


https://gibbch-my.sharepoint.com/:w:/r/personal/ibi135182_stud_gibb_ch/_layouts/15/Doc.aspx?sourcedoc=%7B836DD260-5609-4C60-B07F-A4F16C7733EE%7D&file=ClassmanagemendDocumentation.docx&action=default&mobileredirect=true