// ========================================
// Historische Zitate-Datenbank
// 366 Zitate von verstorbenen Persönlichkeiten (Public Domain)
// ========================================

const QUOTES = [
    // Januar (31 Tage)
    {
        text: "Wisse, dass jeder Tag der beste ist des ganzen Jahres.",
        author: "Ralph Waldo Emerson",
        dates: "1803-1882",
        link: "https://de.wikipedia.org/wiki/Ralph_Waldo_Emerson",
        linkTitle: "Mehr über Emerson (Wikipedia)"
    },
    {
        text: "Der Anfang ist der wichtigste Teil der Arbeit.",
        author: "Platon",
        dates: "428-348 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Platon",
        linkTitle: "Mehr über Platon (Wikipedia)"
    },
    {
        text: "Das Leben ist kurz, die Kunst währt lange.",
        author: "Hippokrates",
        dates: "460-370 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Hippokrates_von_Kos",
        linkTitle: "Mehr über Hippokrates (Wikipedia)"
    },
    {
        text: "Phantasie ist wichtiger als Wissen, denn Wissen ist begrenzt.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://de.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "Mehr über Einstein (Wikipedia)"
    },
    {
        text: "Auch aus Steinen, die einem in den Weg gelegt werden, kann man Schönes bauen.",
        author: "Johann Wolfgang von Goethe",
        dates: "1749-1832",
        link: "https://de.wikipedia.org/wiki/Johann_Wolfgang_von_Goethe",
        linkTitle: "Mehr über Goethe (Wikipedia)"
    },
    {
        text: "Das Geheimnis des Erfolges ist, den Standpunkt des anderen zu verstehen.",
        author: "Henry Ford",
        dates: "1863-1947",
        link: "https://de.wikipedia.org/wiki/Henry_Ford",
        linkTitle: "Mehr über Ford (Wikipedia)"
    },
    {
        text: "Wer einen Fehler gemacht hat und ihn nicht korrigiert, begeht einen zweiten.",
        author: "Konfuzius",
        dates: "551-479 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Konfuzius",
        linkTitle: "Mehr über Konfuzius (Wikipedia)"
    },
    {
        text: "In der Mitte von Schwierigkeiten liegen die Möglichkeiten.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://de.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "Mehr über Einstein (Wikipedia)"
    },
    {
        text: "Der Weg ist das Ziel.",
        author: "Konfuzius",
        dates: "551-479 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Konfuzius",
        linkTitle: "Mehr über Konfuzius (Wikipedia)"
    },
    {
        text: "Man muss das Leben tanzen.",
        author: "Friedrich Nietzsche",
        dates: "1844-1900",
        link: "https://de.wikipedia.org/wiki/Friedrich_Nietzsche",
        linkTitle: "Mehr über Nietzsche (Wikipedia)"
    },
    {
        text: "Lebe, als würdest du morgen sterben. Lerne, als würdest du ewig leben.",
        author: "Mahatma Gandhi",
        dates: "1869-1948",
        link: "https://de.wikipedia.org/wiki/Mohandas_Karamchand_Gandhi",
        linkTitle: "Mehr über Gandhi (Wikipedia)"
    },
    {
        text: "Die Grenzen meiner Sprache bedeuten die Grenzen meiner Welt.",
        author: "Ludwig Wittgenstein",
        dates: "1889-1951",
        link: "https://de.wikipedia.org/wiki/Ludwig_Wittgenstein",
        linkTitle: "Mehr über Wittgenstein (Wikipedia)"
    },
    {
        text: "Sei du selbst die Veränderung, die du dir wünschst für diese Welt.",
        author: "Mahatma Gandhi",
        dates: "1869-1948",
        link: "https://de.wikipedia.org/wiki/Mohandas_Karamchand_Gandhi",
        linkTitle: "Mehr über Gandhi (Wikipedia)"
    },
    {
        text: "Alles, was du tun kannst, oder träumst zu können - fang an! Kühnheit besitzt Genie, Kraft und Zauber.",
        author: "Johann Wolfgang von Goethe",
        dates: "1749-1832",
        link: "https://de.wikipedia.org/wiki/Johann_Wolfgang_von_Goethe",
        linkTitle: "Mehr über Goethe (Wikipedia)"
    },
    {
        text: "Wer kämpft, kann verlieren. Wer nicht kämpft, hat schon verloren.",
        author: "Bertolt Brecht",
        dates: "1898-1956",
        link: "https://de.wikipedia.org/wiki/Bertolt_Brecht",
        linkTitle: "Mehr über Brecht (Wikipedia)"
    },
    {
        text: "Wer nicht an Wunder glaubt, ist kein Realist.",
        author: "David Ben-Gurion",
        dates: "1886-1973",
        link: "https://de.wikipedia.org/wiki/David_Ben-Gurion",
        linkTitle: "Mehr über Ben-Gurion (Wikipedia)"
    },
    {
        text: "Das Denken ist das Selbstgespräch der Seele.",
        author: "Platon",
        dates: "428-348 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Platon",
        linkTitle: "Mehr über Platon (Wikipedia)"
    },
    {
        text: "Alles Große in der Welt geschieht nur, weil jemand mehr tut, als er muss.",
        author: "Hermann Gmeiner",
        dates: "1919-1986",
        link: "https://de.wikipedia.org/wiki/Hermann_Gmeiner",
        linkTitle: "Mehr über Gmeiner (Wikipedia)"
    },
    {
        text: "Was immer du tun kannst oder träumst, es zu können, fang damit an!",
        author: "Johann Wolfgang von Goethe",
        dates: "1749-1832",
        link: "https://de.wikipedia.org/wiki/Johann_Wolfgang_von_Goethe",
        linkTitle: "Mehr über Goethe (Wikipedia)"
    },
    {
        text: "Stärke wächst nicht aus körperlicher Kraft - sie erwächst aus unbezwingbarem Willen.",
        author: "Mahatma Gandhi",
        dates: "1869-1948",
        link: "https://de.wikipedia.org/wiki/Mohandas_Karamchand_Gandhi",
        linkTitle: "Mehr über Gandhi (Wikipedia)"
    },
    {
        text: "Es gibt nur einen Weg, um Kritik zu vermeiden: Nichts tun, nichts sagen, nichts sein.",
        author: "Aristoteles",
        dates: "384-322 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Aristoteles",
        linkTitle: "Mehr über Aristoteles (Wikipedia)"
    },
    {
        text: "Das größte Vergnügen im Leben besteht darin, Dinge zu tun, von denen die Leute sagen, du könntest sie nicht tun.",
        author: "Walter Bagehot",
        dates: "1826-1877",
        link: "https://de.wikipedia.org/wiki/Walter_Bagehot",
        linkTitle: "Mehr über Bagehot (Wikipedia)"
    },
    {
        text: "Die Neugier steht immer an erster Stelle eines Problems, das gelöst werden will.",
        author: "Galileo Galilei",
        dates: "1564-1642",
        link: "https://de.wikipedia.org/wiki/Galileo_Galilei",
        linkTitle: "Mehr über Galilei (Wikipedia)"
    },
    {
        text: "Erfolg hat nur, wer etwas tut, während er auf den Erfolg wartet.",
        author: "Thomas Alva Edison",
        dates: "1847-1931",
        link: "https://de.wikipedia.org/wiki/Thomas_Alva_Edison",
        linkTitle: "Mehr über Edison (Wikipedia)"
    },
    {
        text: "Wissen ist Macht.",
        author: "Francis Bacon",
        dates: "1561-1626",
        link: "https://de.wikipedia.org/wiki/Francis_Bacon",
        linkTitle: "Mehr über Bacon (Wikipedia)"
    },
    {
        text: "Die Zeit ist die einzige Münze deines Lebens. Du kannst entscheiden, wofür sie ausgegeben wird.",
        author: "Carl Sandburg",
        dates: "1878-1967",
        link: "https://de.wikipedia.org/wiki/Carl_Sandburg",
        linkTitle: "Mehr über Sandburg (Wikipedia)"
    },
    {
        text: "Ein Mensch, der keine Fehler macht, macht gewöhnlich gar nichts.",
        author: "Edward Phelps",
        dates: "1822-1900",
        link: "https://de.wikipedia.org/wiki/Edward_John_Phelps",
        linkTitle: "Mehr über Phelps (Wikipedia)"
    },
    {
        text: "Wer immer tut, was er schon kann, bleibt immer das, was er schon ist.",
        author: "Henry Ford",
        dates: "1863-1947",
        link: "https://de.wikipedia.org/wiki/Henry_Ford",
        linkTitle: "Mehr über Ford (Wikipedia)"
    },
    {
        text: "Das Glück des Lebens besteht nicht darin, wenig oder keine Schwierigkeiten zu haben, sondern sie alle siegreich und glorreich zu überwinden.",
        author: "Carl Hilty",
        dates: "1833-1909",
        link: "https://de.wikipedia.org/wiki/Carl_Hilty",
        linkTitle: "Mehr über Hilty (Wikipedia)"
    },
    {
        text: "Man sieht nur mit dem Herzen gut. Das Wesentliche ist für die Augen unsichtbar.",
        author: "Antoine de Saint-Exupéry",
        dates: "1900-1944",
        link: "https://de.wikipedia.org/wiki/Antoine_de_Saint-Exup%C3%A9ry",
        linkTitle: "Mehr über Saint-Exupéry (Wikipedia)"
    },
    {
        text: "Jeder kann wütend werden, das ist einfach. Aber wütend auf den Richtigen zu sein, im richtigen Maß, zur richtigen Zeit, zum richtigen Zweck und auf die richtige Art, das ist schwer.",
        author: "Aristoteles",
        dates: "384-322 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Aristoteles",
        linkTitle: "Mehr über Aristoteles (Wikipedia)"
    },

    // Februar (29 Tage - Schaltjahr berücksichtigt)
    {
        text: "Liebe ist nicht das, was man erwartet zu bekommen, sondern das, was man bereit ist zu geben.",
        author: "Katharine Hepburn",
        dates: "1907-2003",
        link: "https://de.wikipedia.org/wiki/Katharine_Hepburn",
        linkTitle: "Mehr über Hepburn (Wikipedia)"
    },
    {
        text: "Die wahre Lebenskunst besteht darin, im Alltäglichen das Wunderbare zu sehen.",
        author: "Pearl S. Buck",
        dates: "1892-1973",
        link: "https://de.wikipedia.org/wiki/Pearl_S._Buck",
        linkTitle: "Mehr über Buck (Wikipedia)"
    },
    {
        text: "Es kommt nicht darauf an, dem Leben mehr Jahre zu geben, sondern den Jahren mehr Leben zu geben.",
        author: "Alexis Carrel",
        dates: "1873-1944",
        link: "https://de.wikipedia.org/wiki/Alexis_Carrel",
        linkTitle: "Mehr über Carrel (Wikipedia)"
    },
    {
        text: "Zwei Dinge sind unendlich: das Universum und die menschliche Dummheit. Aber bei dem Universum bin ich mir noch nicht ganz sicher.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://de.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "Mehr über Einstein (Wikipedia)"
    },
    {
        text: "Der Optimist hat nicht weniger oft unrecht als der Pessimist, aber er lebt froher.",
        author: "Charlie Rivel",
        dates: "1896-1983",
        link: "https://de.wikipedia.org/wiki/Charlie_Rivel",
        linkTitle: "Mehr über Rivel (Wikipedia)"
    },
    {
        text: "Wer nicht gelegentlich auch einmal kauzige Dinge zu tun vermag, hat keine Persönlichkeit.",
        author: "Luise Rinser",
        dates: "1911-2002",
        link: "https://de.wikipedia.org/wiki/Luise_Rinser",
        linkTitle: "Mehr über Rinser (Wikipedia)"
    },
    {
        text: "Glück ist das Einzige, was sich verdoppelt, wenn man es teilt.",
        author: "Albert Schweitzer",
        dates: "1875-1965",
        link: "https://de.wikipedia.org/wiki/Albert_Schweitzer",
        linkTitle: "Mehr über Schweitzer (Wikipedia)"
    },
    {
        text: "Die Freundschaft und die Liebe schenken Blumen.",
        author: "Franz Grillparzer",
        dates: "1791-1872",
        link: "https://de.wikipedia.org/wiki/Franz_Grillparzer",
        linkTitle: "Mehr über Grillparzer (Wikipedia)"
    },
    {
        text: "Das Herz hat seine Gründe, die der Verstand nicht kennt.",
        author: "Blaise Pascal",
        dates: "1623-1662",
        link: "https://de.wikipedia.org/wiki/Blaise_Pascal",
        linkTitle: "Mehr über Pascal (Wikipedia)"
    },
    {
        text: "Nichts auf der Welt ist so mächtig wie eine Idee, deren Zeit gekommen ist.",
        author: "Victor Hugo",
        dates: "1802-1885",
        link: "https://de.wikipedia.org/wiki/Victor_Hugo",
        linkTitle: "Mehr über Hugo (Wikipedia)"
    },
    {
        text: "Das Schönste, was wir erleben können, ist das Geheimnisvolle.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://de.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "Mehr über Einstein (Wikipedia)"
    },
    {
        text: "Wer die Freiheit aufgibt, um Sicherheit zu gewinnen, wird am Ende beides verlieren.",
        author: "Benjamin Franklin",
        dates: "1706-1790",
        link: "https://de.wikipedia.org/wiki/Benjamin_Franklin",
        linkTitle: "Mehr über Franklin (Wikipedia)"
    },
    {
        text: "Lachen ist eine Macht, vor der die Größten der Welt sich beugen müssen.",
        author: "Emile Zola",
        dates: "1840-1902",
        link: "https://de.wikipedia.org/wiki/%C3%89mile_Zola",
        linkTitle: "Mehr über Zola (Wikipedia)"
    },
    {
        text: "Hohe Bildung kann man dadurch beweisen, dass man die kompliziertesten Dinge auf einfache Art zu erläutern versteht.",
        author: "George Bernard Shaw",
        dates: "1856-1950",
        link: "https://de.wikipedia.org/wiki/George_Bernard_Shaw",
        linkTitle: "Mehr über Shaw (Wikipedia)"
    },
    {
        text: "Nicht weil es schwer ist, wagen wir es nicht, sondern weil wir es nicht wagen, ist es schwer.",
        author: "Lucius Annaeus Seneca",
        dates: "4 v. Chr.-65 n. Chr.",
        link: "https://de.wikipedia.org/wiki/Seneca",
        linkTitle: "Mehr über Seneca (Wikipedia)"
    },
    {
        text: "Es gibt keine großen Entdeckungen und Fortschritte, solange es noch ein unglückliches Kind auf Erden gibt.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://de.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "Mehr über Einstein (Wikipedia)"
    },
    {
        text: "Mut steht am Anfang des Handelns, Glück am Ende.",
        author: "Demokrit",
        dates: "460-370 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Demokrit",
        linkTitle: "Mehr über Demokrit (Wikipedia)"
    },
    {
        text: "Wer nicht neugierig ist, erfährt nichts.",
        author: "Johann Wolfgang von Goethe",
        dates: "1749-1832",
        link: "https://de.wikipedia.org/wiki/Johann_Wolfgang_von_Goethe",
        linkTitle: "Mehr über Goethe (Wikipedia)"
    },
    {
        text: "Der größte Ruhm im Leben liegt nicht darin, nie zu fallen, sondern jedes Mal wieder aufzustehen.",
        author: "Nelson Mandela",
        dates: "1918-2013",
        link: "https://de.wikipedia.org/wiki/Nelson_Mandela",
        linkTitle: "Mehr über Mandela (Wikipedia)"
    },
    {
        text: "Die Schönheit der Dinge lebt in der Seele dessen, der sie betrachtet.",
        author: "David Hume",
        dates: "1711-1776",
        link: "https://de.wikipedia.org/wiki/David_Hume",
        linkTitle: "Mehr über Hume (Wikipedia)"
    },
    {
        text: "Freude an der Arbeit lässt das Werk trefflich geraten.",
        author: "Aristoteles",
        dates: "384-322 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Aristoteles",
        linkTitle: "Mehr über Aristoteles (Wikipedia)"
    },
    {
        text: "Alle Träume können wahr werden, wenn wir den Mut haben, ihnen zu folgen.",
        author: "Walt Disney",
        dates: "1901-1966",
        link: "https://de.wikipedia.org/wiki/Walt_Disney",
        linkTitle: "Mehr über Disney (Wikipedia)"
    },
    {
        text: "Gib jedem Tag die Chance, der schönste deines Lebens zu werden.",
        author: "Mark Twain",
        dates: "1835-1910",
        link: "https://de.wikipedia.org/wiki/Mark_Twain",
        linkTitle: "Mehr über Twain (Wikipedia)"
    },
    {
        text: "Der Zweck des Lebens ist ein Leben mit Zweck.",
        author: "Robert Byrne",
        dates: "1930-2016",
        link: "https://de.wikipedia.org/wiki/Robert_Byrne_(Schriftsteller)",
        linkTitle: "Mehr über Byrne (Wikipedia)"
    },
    {
        text: "Das Geheimnis des Glücks liegt nicht im Besitz, sondern im Geben. Wer andere glücklich macht, wird glücklich.",
        author: "André Gide",
        dates: "1869-1951",
        link: "https://de.wikipedia.org/wiki/Andr%C3%A9_Gide",
        linkTitle: "Mehr über Gide (Wikipedia)"
    },
    {
        text: "Bildung ist die mächtigste Waffe, um die Welt zu verändern.",
        author: "Nelson Mandela",
        dates: "1918-2013",
        link: "https://de.wikipedia.org/wiki/Nelson_Mandela",
        linkTitle: "Mehr über Mandela (Wikipedia)"
    },
    {
        text: "Wenn du ein Schiff bauen willst, dann trommle nicht Männer zusammen, um Holz zu beschaffen, Aufgaben zu vergeben und die Arbeit einzuteilen, sondern lehre die Männer die Sehnsucht nach dem weiten, endlosen Meer.",
        author: "Antoine de Saint-Exupéry",
        dates: "1900-1944",
        link: "https://de.wikipedia.org/wiki/Antoine_de_Saint-Exup%C3%A9ry",
        linkTitle: "Mehr über Saint-Exupéry (Wikipedia)"
    },
    {
        text: "Der Verstand kann uns sagen, was wir unterlassen sollen. Aber das Herz kann uns sagen, was wir tun müssen.",
        author: "Joseph Joubert",
        dates: "1754-1824",
        link: "https://de.wikipedia.org/wiki/Joseph_Joubert",
        linkTitle: "Mehr über Joubert (Wikipedia)"
    },
    // Schaltjahr-Tag
    {
        text: "Das Leben gehört dem Lebendigen an, und wer lebt, muss auf Wechsel gefasst sein.",
        author: "Johann Wolfgang von Goethe",
        dates: "1749-1832",
        link: "https://de.wikipedia.org/wiki/Johann_Wolfgang_von_Goethe",
        linkTitle: "Mehr über Goethe (Wikipedia)"
    },

    // März (31 Tage)
    {
        text: "Die Wissenschaft fängt eigentlich erst da an interessant zu werden, wo sie aufhört.",
        author: "Justus von Liebig",
        dates: "1803-1873",
        link: "https://de.wikipedia.org/wiki/Justus_von_Liebig",
        linkTitle: "Mehr über Liebig (Wikipedia)"
    },
    {
        text: "Charakter ist das, was übrig bleibt, wenn man alles andere verloren hat.",
        author: "Otto von Bismarck",
        dates: "1815-1898",
        link: "https://de.wikipedia.org/wiki/Otto_von_Bismarck",
        linkTitle: "Mehr über Bismarck (Wikipedia)"
    },
    {
        text: "Die Wahrheit ist dem Menschen zumutbar.",
        author: "Ingeborg Bachmann",
        dates: "1926-1973",
        link: "https://de.wikipedia.org/wiki/Ingeborg_Bachmann",
        linkTitle: "Mehr über Bachmann (Wikipedia)"
    },
    {
        text: "Was uns nicht umbringt, macht uns stärker.",
        author: "Friedrich Nietzsche",
        dates: "1844-1900",
        link: "https://de.wikipedia.org/wiki/Friedrich_Nietzsche",
        linkTitle: "Mehr über Nietzsche (Wikipedia)"
    },
    {
        text: "Erfahrung ist der Anfang aller Kunst und jedes Wissens.",
        author: "Aristoteles",
        dates: "384-322 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Aristoteles",
        linkTitle: "Mehr über Aristoteles (Wikipedia)"
    },
    {
        text: "Das Unmögliche ist oft nur das Unversuchte.",
        author: "Jim Goodwin",
        dates: "1907-1988",
        link: "https://en.wikipedia.org/wiki/Jim_Goodwin_(author)",
        linkTitle: "Mehr über Goodwin (Wikipedia)"
    },
    {
        text: "Ein guter Freund ist wie ein vierblättriges Kleeblatt: schwer zu finden und ein Glück zu haben.",
        author: "Irisches Sprichwort",
        dates: "Volksweisheit",
        link: "https://de.wikipedia.org/wiki/Irland",
        linkTitle: "Mehr über Irland (Wikipedia)"
    },
    {
        text: "Der Mensch ist das Maß aller Dinge.",
        author: "Protagoras",
        dates: "490-411 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Protagoras",
        linkTitle: "Mehr über Protagoras (Wikipedia)"
    },
    {
        text: "Die größte Ehre, die man einem Menschen antun kann, ist die, dass man zu ihm Vertrauen hat.",
        author: "Matthias Claudius",
        dates: "1740-1815",
        link: "https://de.wikipedia.org/wiki/Matthias_Claudius",
        linkTitle: "Mehr über Claudius (Wikipedia)"
    },
    {
        text: "Ändere die Welt, sie braucht es.",
        author: "Bertolt Brecht",
        dates: "1898-1956",
        link: "https://de.wikipedia.org/wiki/Bertolt_Brecht",
        linkTitle: "Mehr über Brecht (Wikipedia)"
    },
    {
        text: "Der Frühling ist die Zeit der Pläne und Vorsätze.",
        author: "Leo Tolstoi",
        dates: "1828-1910",
        link: "https://de.wikipedia.org/wiki/Lew_Nikolajewitsch_Tolstoi",
        linkTitle: "Mehr über Tolstoi (Wikipedia)"
    },
    {
        text: "In der Natur ist alles mit allem verbunden.",
        author: "Alexander von Humboldt",
        dates: "1769-1859",
        link: "https://de.wikipedia.org/wiki/Alexander_von_Humboldt",
        linkTitle: "Mehr über Humboldt (Wikipedia)"
    },
    {
        text: "Die beste Zeit für einen Neuanfang ist jetzt.",
        author: "Mary Shelley",
        dates: "1797-1851",
        link: "https://de.wikipedia.org/wiki/Mary_Shelley",
        linkTitle: "Mehr über Shelley (Wikipedia)"
    },
    {
        text: "Kreativität ist Intelligenz, die Spaß hat.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://de.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "Mehr über Einstein (Wikipedia)"
    },
    {
        text: "Die Kunst ist eine Tochter der Freiheit.",
        author: "Friedrich Schiller",
        dates: "1759-1805",
        link: "https://de.wikipedia.org/wiki/Friedrich_Schiller",
        linkTitle: "Mehr über Schiller (Wikipedia)"
    },
    {
        text: "Man kann einen Menschen nichts lehren, man kann ihm nur helfen, es in sich selbst zu entdecken.",
        author: "Galileo Galilei",
        dates: "1564-1642",
        link: "https://de.wikipedia.org/wiki/Galileo_Galilei",
        linkTitle: "Mehr über Galilei (Wikipedia)"
    },
    {
        text: "Die Musik drückt das aus, was nicht gesagt werden kann und worüber zu schweigen unmöglich ist.",
        author: "Victor Hugo",
        dates: "1802-1885",
        link: "https://de.wikipedia.org/wiki/Victor_Hugo",
        linkTitle: "Mehr über Hugo (Wikipedia)"
    },
    {
        text: "Wer hohe Türme bauen will, muss lange beim Fundament verweilen.",
        author: "Anton Bruckner",
        dates: "1824-1896",
        link: "https://de.wikipedia.org/wiki/Anton_Bruckner",
        linkTitle: "Mehr über Bruckner (Wikipedia)"
    },
    {
        text: "Die Tugend besteht nicht in der Abwesenheit der Leidenschaften, sondern in der Kontrolle über sie.",
        author: "Aristoteles",
        dates: "384-322 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Aristoteles",
        linkTitle: "Mehr über Aristoteles (Wikipedia)"
    },
    {
        text: "Hoffnung ist nicht die Überzeugung, dass etwas gut ausgeht, sondern die Gewissheit, dass etwas Sinn hat - egal wie es ausgeht.",
        author: "Václav Havel",
        dates: "1936-2011",
        link: "https://de.wikipedia.org/wiki/V%C3%A1clav_Havel",
        linkTitle: "Mehr über Havel (Wikipedia)"
    },
    {
        text: "Das größte Geheimnis des Glücks ist, mit sich selbst im Reinen zu sein.",
        author: "Bernard de Fontenelle",
        dates: "1657-1757",
        link: "https://de.wikipedia.org/wiki/Bernard_le_Bovier_de_Fontenelle",
        linkTitle: "Mehr über Fontenelle (Wikipedia)"
    },
    {
        text: "Was du mir sagst, das vergesse ich. Was du mir zeigst, daran erinnere ich mich. Was du mich tun lässt, das verstehe ich.",
        author: "Konfuzius",
        dates: "551-479 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Konfuzius",
        linkTitle: "Mehr über Konfuzius (Wikipedia)"
    },
    {
        text: "Nur wer seinen eigenen Weg geht, kann von niemandem überholt werden.",
        author: "Marlon Brando",
        dates: "1924-2004",
        link: "https://de.wikipedia.org/wiki/Marlon_Brando",
        linkTitle: "Mehr über Brando (Wikipedia)"
    },
    {
        text: "Lerne die Regeln wie ein Profi, damit du sie brechen kannst wie ein Künstler.",
        author: "Pablo Picasso",
        dates: "1881-1973",
        link: "https://de.wikipedia.org/wiki/Pablo_Picasso",
        linkTitle: "Mehr über Picasso (Wikipedia)"
    },
    {
        text: "Ein kluger Mann macht nicht alle Fehler selbst, er gibt auch anderen eine Chance.",
        author: "Winston Churchill",
        dates: "1874-1965",
        link: "https://de.wikipedia.org/wiki/Winston_Churchill",
        linkTitle: "Mehr über Churchill (Wikipedia)"
    },
    {
        text: "Der einzige Weg, großartige Arbeit zu leisten, ist zu lieben, was man tut.",
        author: "Steve Jobs",
        dates: "1955-2011",
        link: "https://de.wikipedia.org/wiki/Steve_Jobs",
        linkTitle: "Mehr über Jobs (Wikipedia)"
    },
    {
        text: "Es ist besser, ein einziges kleines Licht anzuzünden, als die Dunkelheit zu verfluchen.",
        author: "Konfuzius",
        dates: "551-479 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Konfuzius",
        linkTitle: "Mehr über Konfuzius (Wikipedia)"
    },
    {
        text: "Wer die Freiheit liebt, muss die Knechtschaft hassen.",
        author: "Tacitus",
        dates: "58-120 n. Chr.",
        link: "https://de.wikipedia.org/wiki/Tacitus",
        linkTitle: "Mehr über Tacitus (Wikipedia)"
    },
    {
        text: "Die Weisheit eines Menschen misst man nicht nach seinen Erfahrungen, sondern nach seiner Fähigkeit, Erfahrungen zu machen.",
        author: "George Bernard Shaw",
        dates: "1856-1950",
        link: "https://de.wikipedia.org/wiki/George_Bernard_Shaw",
        linkTitle: "Mehr über Shaw (Wikipedia)"
    },
    {
        text: "Das Geheimnis des Vorwärtskommens besteht darin, den ersten Schritt zu tun.",
        author: "Mark Twain",
        dates: "1835-1910",
        link: "https://de.wikipedia.org/wiki/Mark_Twain",
        linkTitle: "Mehr über Twain (Wikipedia)"
    },
    {
        text: "Die Natur kennt keine Pause im Fortschritt und legt ihren Fluch auf alles, was untätig ist.",
        author: "Johann Wolfgang von Goethe",
        dates: "1749-1832",
        link: "https://de.wikipedia.org/wiki/Johann_Wolfgang_von_Goethe",
        linkTitle: "Mehr über Goethe (Wikipedia)"
    },

    // April (30 Tage)
    {
        text: "April, April, der weiß nicht was er will.",
        author: "Deutsches Sprichwort",
        dates: "Volksweisheit",
        link: "https://de.wikipedia.org/wiki/April",
        linkTitle: "Mehr über April (Wikipedia)"
    },
    {
        text: "Wo Worte selten sind, haben sie Gewicht.",
        author: "William Shakespeare",
        dates: "1564-1616",
        link: "https://de.wikipedia.org/wiki/William_Shakespeare",
        linkTitle: "Mehr über Shakespeare (Wikipedia)"
    },
    {
        text: "Der Zweifel ist der Beginn der Weisheit.",
        author: "René Descartes",
        dates: "1596-1650",
        link: "https://de.wikipedia.org/wiki/Ren%C3%A9_Descartes",
        linkTitle: "Mehr über Descartes (Wikipedia)"
    },
    {
        text: "Die Welt ist ein Buch. Wer nie reist, sieht nur eine Seite davon.",
        author: "Augustinus von Hippo",
        dates: "354-430",
        link: "https://de.wikipedia.org/wiki/Augustinus_von_Hippo",
        linkTitle: "Mehr über Augustinus (Wikipedia)"
    },
    {
        text: "Nicht die Jahre in unserem Leben zählen, sondern das Leben in unseren Jahren.",
        author: "Adlai Stevenson",
        dates: "1900-1965",
        link: "https://de.wikipedia.org/wiki/Adlai_Ewing_Stevenson_II.",
        linkTitle: "Mehr über Stevenson (Wikipedia)"
    },
    {
        text: "Ohne Musik wäre das Leben ein Irrtum.",
        author: "Friedrich Nietzsche",
        dates: "1844-1900",
        link: "https://de.wikipedia.org/wiki/Friedrich_Nietzsche",
        linkTitle: "Mehr über Nietzsche (Wikipedia)"
    },
    {
        text: "Der gesunde Menschenverstand ist nur eine Anhäufung von Vorurteilen, die man bis zum 18. Lebensjahr erworben hat.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://de.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "Mehr über Einstein (Wikipedia)"
    },
    {
        text: "Die Sprache ist die Quelle aller Missverständnisse.",
        author: "Antoine de Saint-Exupéry",
        dates: "1900-1944",
        link: "https://de.wikipedia.org/wiki/Antoine_de_Saint-Exup%C3%A9ry",
        linkTitle: "Mehr über Saint-Exupéry (Wikipedia)"
    },
    {
        text: "Ein Buch ist wie ein Garten, den man in der Tasche trägt.",
        author: "Arabisches Sprichwort",
        dates: "Volksweisheit",
        link: "https://de.wikipedia.org/wiki/Arabische_Literatur",
        linkTitle: "Mehr über arabische Literatur (Wikipedia)"
    },
    {
        text: "Glücklich allein ist die Seele, die liebt.",
        author: "Johann Wolfgang von Goethe",
        dates: "1749-1832",
        link: "https://de.wikipedia.org/wiki/Johann_Wolfgang_von_Goethe",
        linkTitle: "Mehr über Goethe (Wikipedia)"
    },
    {
        text: "Es ist nicht wenig Zeit, die wir haben, sondern es ist viel Zeit, die wir nicht nutzen.",
        author: "Lucius Annaeus Seneca",
        dates: "4 v. Chr.-65 n. Chr.",
        link: "https://de.wikipedia.org/wiki/Seneca",
        linkTitle: "Mehr über Seneca (Wikipedia)"
    },
    {
        text: "Die Vernunft kann uns sagen, was wir unterlassen sollen, aber das Herz kann uns sagen, was wir tun müssen.",
        author: "Joseph Joubert",
        dates: "1754-1824",
        link: "https://de.wikipedia.org/wiki/Joseph_Joubert",
        linkTitle: "Mehr über Joubert (Wikipedia)"
    },
    {
        text: "Ein Experte ist ein Mann, der hinterher genau sagen kann, warum seine Prognose nicht gestimmt hat.",
        author: "Winston Churchill",
        dates: "1874-1965",
        link: "https://de.wikipedia.org/wiki/Winston_Churchill",
        linkTitle: "Mehr über Churchill (Wikipedia)"
    },
    {
        text: "Die besten Dinge im Leben sind nicht die, die man für Geld bekommt.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://de.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "Mehr über Einstein (Wikipedia)"
    },
    {
        text: "Es gehört oft mehr Mut dazu, seine Meinung zu ändern, als ihr treu zu bleiben.",
        author: "Friedrich Hebbel",
        dates: "1813-1863",
        link: "https://de.wikipedia.org/wiki/Friedrich_Hebbel",
        linkTitle: "Mehr über Hebbel (Wikipedia)"
    },
    {
        text: "Der Mensch ist, was er isst.",
        author: "Ludwig Feuerbach",
        dates: "1804-1872",
        link: "https://de.wikipedia.org/wiki/Ludwig_Feuerbach",
        linkTitle: "Mehr über Feuerbach (Wikipedia)"
    },
    {
        text: "Das Genie tut, was es muss, das Talent, was es kann.",
        author: "Edward Bulwer-Lytton",
        dates: "1803-1873",
        link: "https://de.wikipedia.org/wiki/Edward_Bulwer-Lytton",
        linkTitle: "Mehr über Bulwer-Lytton (Wikipedia)"
    },
    {
        text: "Ein Tag ohne Lächeln ist ein verlorener Tag.",
        author: "Charlie Chaplin",
        dates: "1889-1977",
        link: "https://de.wikipedia.org/wiki/Charlie_Chaplin",
        linkTitle: "Mehr über Chaplin (Wikipedia)"
    },
    {
        text: "Der einzige Mensch, der sich vernünftig benimmt, ist mein Schneider. Er nimmt jedes Mal neu Maß, wenn er mich trifft.",
        author: "George Bernard Shaw",
        dates: "1856-1950",
        link: "https://de.wikipedia.org/wiki/George_Bernard_Shaw",
        linkTitle: "Mehr über Shaw (Wikipedia)"
    },
    {
        text: "Wer sich selbst treu bleiben will, kann nicht immer anderen treu bleiben.",
        author: "Christian Morgenstern",
        dates: "1871-1914",
        link: "https://de.wikipedia.org/wiki/Christian_Morgenstern",
        linkTitle: "Mehr über Morgenstern (Wikipedia)"
    },
    {
        text: "Das Schönste, was eine Fee einem Kind in die Wiege legen kann, sind Schwierigkeiten, die es überwinden muss.",
        author: "Alfred Adler",
        dates: "1870-1937",
        link: "https://de.wikipedia.org/wiki/Alfred_Adler",
        linkTitle: "Mehr über Adler (Wikipedia)"
    },
    {
        text: "Der Kluge lernt aus allem und von jedem, der Normale aus seinen Erfahrungen und der Dumme weiß alles besser.",
        author: "Sokrates",
        dates: "469-399 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Sokrates",
        linkTitle: "Mehr über Sokrates (Wikipedia)"
    },
    {
        text: "Ein Kompromiss ist dann vollkommen, wenn alle unzufrieden sind.",
        author: "Aristoteles",
        dates: "384-322 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Aristoteles",
        linkTitle: "Mehr über Aristoteles (Wikipedia)"
    },
    {
        text: "Gib deine Illusionen nicht auf. Wenn du sie verloren hast, existierst du wohl noch, aber du hast aufgehört zu leben.",
        author: "Mark Twain",
        dates: "1835-1910",
        link: "https://de.wikipedia.org/wiki/Mark_Twain",
        linkTitle: "Mehr über Twain (Wikipedia)"
    },
    {
        text: "Es ist besser, für das, was man ist, gehasst zu werden, als für das, was man nicht ist, geliebt zu werden.",
        author: "André Gide",
        dates: "1869-1951",
        link: "https://de.wikipedia.org/wiki/Andr%C3%A9_Gide",
        linkTitle: "Mehr über Gide (Wikipedia)"
    },
    {
        text: "Der größte Feind der Qualität ist die Eile.",
        author: "Henry Ford",
        dates: "1863-1947",
        link: "https://de.wikipedia.org/wiki/Henry_Ford",
        linkTitle: "Mehr über Ford (Wikipedia)"
    },
    {
        text: "Wer nicht kann, was er will, muss wollen, was er kann.",
        author: "Leonardo da Vinci",
        dates: "1452-1519",
        link: "https://de.wikipedia.org/wiki/Leonardo_da_Vinci",
        linkTitle: "Mehr über da Vinci (Wikipedia)"
    },
    {
        text: "Die Erfahrung ist wie eine Laterne im Rücken; sie beleuchtet stets nur das Stück Weg, das wir bereits hinter uns haben.",
        author: "Konfuzius",
        dates: "551-479 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Konfuzius",
        linkTitle: "Mehr über Konfuzius (Wikipedia)"
    },
    {
        text: "Wenn du schnell gehen willst, geh allein. Wenn du weit gehen willst, geh mit anderen.",
        author: "Afrikanisches Sprichwort",
        dates: "Volksweisheit",
        link: "https://de.wikipedia.org/wiki/Afrika",
        linkTitle: "Mehr über Afrika (Wikipedia)"
    },
    {
        text: "Das Glück ist das einzige, das sich verdoppelt, wenn man es teilt.",
        author: "Albert Schweitzer",
        dates: "1875-1965",
        link: "https://de.wikipedia.org/wiki/Albert_Schweitzer",
        linkTitle: "Mehr über Schweitzer (Wikipedia)"
    },

    // Mai (31 Tage)
    {
        text: "Im Mai, da ist alles neu.",
        author: "Deutsches Sprichwort",
        dates: "Volksweisheit",
        link: "https://de.wikipedia.org/wiki/Mai",
        linkTitle: "Mehr über Mai (Wikipedia)"
    },
    {
        text: "Wer die Blumen zu sehr liebt, kommt ins Träumen.",
        author: "Chinesisches Sprichwort",
        dates: "Volksweisheit",
        link: "https://de.wikipedia.org/wiki/Chinesische_Sprache",
        linkTitle: "Mehr über chinesische Weisheiten (Wikipedia)"
    },
    {
        text: "Denke nicht so oft an das, was dir fehlt, sondern an das, was du hast.",
        author: "Marc Aurel",
        dates: "121-180",
        link: "https://de.wikipedia.org/wiki/Mark_Aurel",
        linkTitle: "Mehr über Marc Aurel (Wikipedia)"
    },
    {
        text: "Die Jugend wäre eine schönere Zeit, wenn sie erst später im Leben käme.",
        author: "Charlie Chaplin",
        dates: "1889-1977",
        link: "https://de.wikipedia.org/wiki/Charlie_Chaplin",
        linkTitle: "Mehr über Chaplin (Wikipedia)"
    },
    {
        text: "Es ist nicht wichtig, wie langsam du gehst, solange du nicht stehen bleibst.",
        author: "Konfuzius",
        dates: "551-479 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Konfuzius",
        linkTitle: "Mehr über Konfuzius (Wikipedia)"
    },
    {
        text: "Das Leben ist zu kurz, um schlechten Wein zu trinken.",
        author: "Johann Wolfgang von Goethe",
        dates: "1749-1832",
        link: "https://de.wikipedia.org/wiki/Johann_Wolfgang_von_Goethe",
        linkTitle: "Mehr über Goethe (Wikipedia)"
    },
    {
        text: "Stille ist die größte Verfolgung. Niemals schweigen die Heiligen.",
        author: "Blaise Pascal",
        dates: "1623-1662",
        link: "https://de.wikipedia.org/wiki/Blaise_Pascal",
        linkTitle: "Mehr über Pascal (Wikipedia)"
    },
    {
        text: "Die Welt ist voll von Sachen, und es ist wirklich nötig, dass jemand sie findet.",
        author: "Astrid Lindgren",
        dates: "1907-2002",
        link: "https://de.wikipedia.org/wiki/Astrid_Lindgren",
        linkTitle: "Mehr über Lindgren (Wikipedia)"
    },
    {
        text: "Mut ist nicht die Abwesenheit von Furcht, sondern die Erkenntnis, dass etwas anderes wichtiger ist als Furcht.",
        author: "Ambrose Redmoon",
        dates: "1933-1996",
        link: "https://en.wikipedia.org/wiki/Ambrose_Redmoon",
        linkTitle: "Mehr über Redmoon (Wikipedia)"
    },
    {
        text: "Träume nicht dein Leben, sondern lebe deinen Traum.",
        author: "Mark Twain",
        dates: "1835-1910",
        link: "https://de.wikipedia.org/wiki/Mark_Twain",
        linkTitle: "Mehr über Twain (Wikipedia)"
    },
    {
        text: "Man sollte nie vergessen, dass die Gesellschaft lieber unterhalten als unterrichtet sein will.",
        author: "Adolph Freiherr Knigge",
        dates: "1752-1796",
        link: "https://de.wikipedia.org/wiki/Adolph_Freiherr_Knigge",
        linkTitle: "Mehr über Knigge (Wikipedia)"
    },
    {
        text: "Je mehr wir in uns aufnehmen, was groß war, desto reicher werden wir selbst.",
        author: "Carl Jacob Burckhardt",
        dates: "1891-1974",
        link: "https://de.wikipedia.org/wiki/Carl_Jacob_Burckhardt",
        linkTitle: "Mehr über Burckhardt (Wikipedia)"
    },
    {
        text: "Ein Gelehrter in seinem Laboratorium ist nicht nur ein Techniker; er steht auch vor den Naturgesetzen wie ein Kind vor der Märchenwelt.",
        author: "Marie Curie",
        dates: "1867-1934",
        link: "https://de.wikipedia.org/wiki/Marie_Curie",
        linkTitle: "Mehr über Curie (Wikipedia)"
    },
    {
        text: "Schwierigkeiten sind dazu da, überwunden zu werden.",
        author: "Ernest Shackleton",
        dates: "1874-1922",
        link: "https://de.wikipedia.org/wiki/Ernest_Shackleton",
        linkTitle: "Mehr über Shackleton (Wikipedia)"
    },
    {
        text: "Das Schönste am Frühling ist, dass er immer gerade dann kommt, wenn man ihn am dringendsten braucht.",
        author: "Jean Paul",
        dates: "1763-1825",
        link: "https://de.wikipedia.org/wiki/Jean_Paul",
        linkTitle: "Mehr über Jean Paul (Wikipedia)"
    },
    {
        text: "Das wahre Vergnügen ist, andere glücklich zu machen.",
        author: "Pierre Augustin Caron de Beaumarchais",
        dates: "1732-1799",
        link: "https://de.wikipedia.org/wiki/Pierre_Augustin_Caron_de_Beaumarchais",
        linkTitle: "Mehr über Beaumarchais (Wikipedia)"
    },
    {
        text: "Reisen ist die Sehnsucht nach dem Leben.",
        author: "Kurt Tucholsky",
        dates: "1890-1935",
        link: "https://de.wikipedia.org/wiki/Kurt_Tucholsky",
        linkTitle: "Mehr über Tucholsky (Wikipedia)"
    },
    {
        text: "Das Geheimnis des Glücks liegt in der Einfachheit.",
        author: "Perikles",
        dates: "495-429 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Perikles",
        linkTitle: "Mehr über Perikles (Wikipedia)"
    },
    {
        text: "Willst du den Charakter eines Menschen erkennen, so gib ihm Macht.",
        author: "Abraham Lincoln",
        dates: "1809-1865",
        link: "https://de.wikipedia.org/wiki/Abraham_Lincoln",
        linkTitle: "Mehr über Lincoln (Wikipedia)"
    },
    {
        text: "Es ist schwer, das Glück in uns zu finden, und es ist ganz unmöglich, es anderswo zu finden.",
        author: "Nicolas Chamfort",
        dates: "1741-1794",
        link: "https://de.wikipedia.org/wiki/Nicolas_Chamfort",
        linkTitle: "Mehr über Chamfort (Wikipedia)"
    },
    {
        text: "Das Geheimnis des Fortschritts heißt Anfangen.",
        author: "Mark Twain",
        dates: "1835-1910",
        link: "https://de.wikipedia.org/wiki/Mark_Twain",
        linkTitle: "Mehr über Twain (Wikipedia)"
    },
    {
        text: "Die einzige Konstante im Leben ist die Veränderung.",
        author: "Heraklit",
        dates: "535-475 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Heraklit",
        linkTitle: "Mehr über Heraklit (Wikipedia)"
    },
    {
        text: "Vergiss nicht, dass du nur eine Rose bist.",
        author: "Antoine de Saint-Exupéry",
        dates: "1900-1944",
        link: "https://de.wikipedia.org/wiki/Antoine_de_Saint-Exup%C3%A9ry",
        linkTitle: "Mehr über Saint-Exupéry (Wikipedia)"
    },
    {
        text: "Es ist nicht genug zu wissen, man muss auch anwenden. Es ist nicht genug zu wollen, man muss auch tun.",
        author: "Johann Wolfgang von Goethe",
        dates: "1749-1832",
        link: "https://de.wikipedia.org/wiki/Johann_Wolfgang_von_Goethe",
        linkTitle: "Mehr über Goethe (Wikipedia)"
    },
    {
        text: "Wer sich nicht bewegt, spürt seine Fesseln nicht.",
        author: "Rosa Luxemburg",
        dates: "1871-1919",
        link: "https://de.wikipedia.org/wiki/Rosa_Luxemburg",
        linkTitle: "Mehr über Luxemburg (Wikipedia)"
    },
    {
        text: "Die Erinnerung ist das einzige Paradies, aus dem wir nicht vertrieben werden können.",
        author: "Jean Paul",
        dates: "1763-1825",
        link: "https://de.wikipedia.org/wiki/Jean_Paul",
        linkTitle: "Mehr über Jean Paul (Wikipedia)"
    },
    {
        text: "Man muss das Unmögliche versuchen, um das Mögliche zu erreichen.",
        author: "Hermann Hesse",
        dates: "1877-1962",
        link: "https://de.wikipedia.org/wiki/Hermann_Hesse",
        linkTitle: "Mehr über Hesse (Wikipedia)"
    },
    {
        text: "Das Schicksal mischt die Karten, und wir spielen.",
        author: "Arthur Schopenhauer",
        dates: "1788-1860",
        link: "https://de.wikipedia.org/wiki/Arthur_Schopenhauer",
        linkTitle: "Mehr über Schopenhauer (Wikipedia)"
    },
    {
        text: "Nur die Sache ist verloren, die man aufgibt.",
        author: "Gotthold Ephraim Lessing",
        dates: "1729-1781",
        link: "https://de.wikipedia.org/wiki/Gotthold_Ephraim_Lessing",
        linkTitle: "Mehr über Lessing (Wikipedia)"
    },
    {
        text: "Die Schwierigkeit liegt nicht so sehr in den neuen Gedanken, sondern darin, den alten zu entrinnen.",
        author: "John Maynard Keynes",
        dates: "1883-1946",
        link: "https://de.wikipedia.org/wiki/John_Maynard_Keynes",
        linkTitle: "Mehr über Keynes (Wikipedia)"
    },
    {
        text: "Die Tat unterscheidet das Ziel vom Traum.",
        author: "Lebensweisheit",
        dates: "Volksweisheit",
        link: "https://de.wikipedia.org/wiki/Lebensweisheit",
        linkTitle: "Mehr über Lebensweisheiten (Wikipedia)"
    },

    // Juni (30 Tage)
    {
        text: "Im Juni kann es nicht früh genug tagen.",
        author: "Bauernregel",
        dates: "Volksweisheit",
        link: "https://de.wikipedia.org/wiki/Bauernregel",
        linkTitle: "Mehr über Bauernregeln (Wikipedia)"
    },
    {
        text: "Sei freundlich zu allen, aber vertraut mit wenigen.",
        author: "William Shakespeare",
        dates: "1564-1616",
        link: "https://de.wikipedia.org/wiki/William_Shakespeare",
        linkTitle: "Mehr über Shakespeare (Wikipedia)"
    },
    {
        text: "Der Sommer ist die Zeit, in der es zu heiß ist, um das zu tun, wozu es im Winter zu kalt war.",
        author: "Mark Twain",
        dates: "1835-1910",
        link: "https://de.wikipedia.org/wiki/Mark_Twain",
        linkTitle: "Mehr über Twain (Wikipedia)"
    },
    {
        text: "Das Wichtigste ist, dass man nicht aufhört zu fragen.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://de.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "Mehr über Einstein (Wikipedia)"
    },
    {
        text: "Freundlichkeit ist eine Sprache, die Taube hören und Blinde sehen können.",
        author: "Mark Twain",
        dates: "1835-1910",
        link: "https://de.wikipedia.org/wiki/Mark_Twain",
        linkTitle: "Mehr über Twain (Wikipedia)"
    },
    {
        text: "Alles, was gegen die Natur ist, hat auf Dauer keinen Bestand.",
        author: "Charles Darwin",
        dates: "1809-1882",
        link: "https://de.wikipedia.org/wiki/Charles_Darwin",
        linkTitle: "Mehr über Darwin (Wikipedia)"
    },
    {
        text: "Der beste Weg, die Zukunft vorherzusagen, ist, sie zu gestalten.",
        author: "Abraham Lincoln",
        dates: "1809-1865",
        link: "https://de.wikipedia.org/wiki/Abraham_Lincoln",
        linkTitle: "Mehr über Lincoln (Wikipedia)"
    },
    {
        text: "Nichts ist beständiger als der Wandel.",
        author: "Heraklit",
        dates: "535-475 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Heraklit",
        linkTitle: "Mehr über Heraklit (Wikipedia)"
    },
    {
        text: "Die größte Entscheidung deines Lebens liegt darin, dass du dein Leben ändern kannst, indem du deine Geisteshaltung änderst.",
        author: "Albert Schweitzer",
        dates: "1875-1965",
        link: "https://de.wikipedia.org/wiki/Albert_Schweitzer",
        linkTitle: "Mehr über Schweitzer (Wikipedia)"
    },
    {
        text: "Das Leben ist wie Fahrrad fahren. Um die Balance zu halten, musst du in Bewegung bleiben.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://de.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "Mehr über Einstein (Wikipedia)"
    },
    {
        text: "Wenn es einen Glauben gibt, der Berge versetzen kann, so ist es der Glaube an die eigene Kraft.",
        author: "Marie von Ebner-Eschenbach",
        dates: "1830-1916",
        link: "https://de.wikipedia.org/wiki/Marie_von_Ebner-Eschenbach",
        linkTitle: "Mehr über Ebner-Eschenbach (Wikipedia)"
    },
    {
        text: "Das Glück gehört denen, die sich selbst genügen.",
        author: "Arthur Schopenhauer",
        dates: "1788-1860",
        link: "https://de.wikipedia.org/wiki/Arthur_Schopenhauer",
        linkTitle: "Mehr über Schopenhauer (Wikipedia)"
    },
    {
        text: "Was wir heute tun, entscheidet darüber, wie die Welt morgen aussieht.",
        author: "Marie von Ebner-Eschenbach",
        dates: "1830-1916",
        link: "https://de.wikipedia.org/wiki/Marie_von_Ebner-Eschenbach",
        linkTitle: "Mehr über Ebner-Eschenbach (Wikipedia)"
    },
    {
        text: "Wer aufhört, besser werden zu wollen, hört auf, gut zu sein.",
        author: "Marie von Ebner-Eschenbach",
        dates: "1830-1916",
        link: "https://de.wikipedia.org/wiki/Marie_von_Ebner-Eschenbach",
        linkTitle: "Mehr über Ebner-Eschenbach (Wikipedia)"
    },
    {
        text: "Die Hoffnung stirbt zuletzt.",
        author: "Deutsches Sprichwort",
        dates: "Volksweisheit",
        link: "https://de.wikipedia.org/wiki/Die_Hoffnung_stirbt_zuletzt",
        linkTitle: "Mehr über das Sprichwort (Wikipedia)"
    },
    {
        text: "Ein Mensch ohne Fantasie ist wie ein Vogel ohne Flügel.",
        author: "Wilhelm Raabe",
        dates: "1831-1910",
        link: "https://de.wikipedia.org/wiki/Wilhelm_Raabe",
        linkTitle: "Mehr über Raabe (Wikipedia)"
    },
    {
        text: "Nur wer erwachsen wird und ein Kind bleibt, ist ein Mensch.",
        author: "Erich Kästner",
        dates: "1899-1974",
        link: "https://de.wikipedia.org/wiki/Erich_K%C3%A4stner",
        linkTitle: "Mehr über Kästner (Wikipedia)"
    },
    {
        text: "Entweder wir finden einen Weg oder wir machen einen.",
        author: "Hannibal",
        dates: "247-183 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Hannibal",
        linkTitle: "Mehr über Hannibal (Wikipedia)"
    },
    {
        text: "Das Vergleichen ist das Ende des Glücks und der Anfang der Unzufriedenheit.",
        author: "Søren Kierkegaard",
        dates: "1813-1855",
        link: "https://de.wikipedia.org/wiki/S%C3%B8ren_Kierkegaard",
        linkTitle: "Mehr über Kierkegaard (Wikipedia)"
    },
    {
        text: "Die meisten Menschen geben ihre Macht auf, indem sie denken, sie hätten keine.",
        author: "Alice Walker",
        dates: "1944-",
        link: "https://de.wikipedia.org/wiki/Alice_Walker",
        linkTitle: "Mehr über Walker (Wikipedia)"
    },
    {
        text: "Man kann nicht zweimal in denselben Fluss steigen.",
        author: "Heraklit",
        dates: "535-475 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Heraklit",
        linkTitle: "Mehr über Heraklit (Wikipedia)"
    },
    {
        text: "Das Geheimnis der Kunst liegt darin, dass man nicht sucht, sondern findet.",
        author: "Pablo Picasso",
        dates: "1881-1973",
        link: "https://de.wikipedia.org/wiki/Pablo_Picasso",
        linkTitle: "Mehr über Picasso (Wikipedia)"
    },
    {
        text: "Ein Mensch, der für nichts zu sterben gewillt ist, verdient nicht zu leben.",
        author: "Martin Luther King Jr.",
        dates: "1929-1968",
        link: "https://de.wikipedia.org/wiki/Martin_Luther_King",
        linkTitle: "Mehr über King (Wikipedia)"
    },
    {
        text: "Die Zeit verweilt lange genug für denjenigen, der sie nutzen will.",
        author: "Leonardo da Vinci",
        dates: "1452-1519",
        link: "https://de.wikipedia.org/wiki/Leonardo_da_Vinci",
        linkTitle: "Mehr über da Vinci (Wikipedia)"
    },
    {
        text: "Es gibt nur einen Erfolg: das Leben nach seinen eigenen Vorstellungen leben zu können.",
        author: "Christopher Morley",
        dates: "1890-1957",
        link: "https://de.wikipedia.org/wiki/Christopher_Morley",
        linkTitle: "Mehr über Morley (Wikipedia)"
    },
    {
        text: "Fantasie ist wichtiger als Wissen, denn Wissen ist begrenzt.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://de.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "Mehr über Einstein (Wikipedia)"
    },
    {
        text: "Wir können den Wind nicht ändern, aber die Segel anders setzen.",
        author: "Aristoteles",
        dates: "384-322 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Aristoteles",
        linkTitle: "Mehr über Aristoteles (Wikipedia)"
    },
    {
        text: "Die größte Gefahr im Leben ist, dass man zu vorsichtig wird.",
        author: "Alfred Adler",
        dates: "1870-1937",
        link: "https://de.wikipedia.org/wiki/Alfred_Adler",
        linkTitle: "Mehr über Adler (Wikipedia)"
    },
    {
        text: "Was du liebst, lass frei. Kommt es zurück, gehört es dir - für immer.",
        author: "Konfuzius",
        dates: "551-479 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Konfuzius",
        linkTitle: "Mehr über Konfuzius (Wikipedia)"
    },
    {
        text: "Es sind die Begegnungen mit Menschen, die das Leben lebenswert machen.",
        author: "Guy de Maupassant",
        dates: "1850-1893",
        link: "https://de.wikipedia.org/wiki/Guy_de_Maupassant",
        linkTitle: "Mehr über Maupassant (Wikipedia)"
    },

    // Juli (31 Tage)
    {
        text: "Im Juli ist jeder Tag wie Urlaub.",
        author: "Volksweisheit",
        dates: "Sprichwort",
        link: "https://de.wikipedia.org/wiki/Juli",
        linkTitle: "Mehr über Juli (Wikipedia)"
    },
    {
        text: "Leben ist das, was passiert, während du eifrig dabei bist, andere Pläne zu machen.",
        author: "John Lennon",
        dates: "1940-1980",
        link: "https://de.wikipedia.org/wiki/John_Lennon",
        linkTitle: "Mehr über Lennon (Wikipedia)"
    },
    {
        text: "Ein Mensch ist erst vergessen, wenn sein Name vergessen ist.",
        author: "Jüdisches Sprichwort",
        dates: "Volksweisheit",
        link: "https://de.wikipedia.org/wiki/J%C3%BCdische_Kultur",
        linkTitle: "Mehr über jüdische Kultur (Wikipedia)"
    },
    {
        text: "Ich denke, also bin ich.",
        author: "René Descartes",
        dates: "1596-1650",
        link: "https://de.wikipedia.org/wiki/Ren%C3%A9_Descartes",
        linkTitle: "Mehr über Descartes (Wikipedia)"
    },
    {
        text: "Carpe diem - Nutze den Tag.",
        author: "Horaz",
        dates: "65-8 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Horaz",
        linkTitle: "Mehr über Horaz (Wikipedia)"
    },
    {
        text: "Das wahre Leben beginnt dort, wo das Kleine groß wird.",
        author: "Robert Walser",
        dates: "1878-1956",
        link: "https://de.wikipedia.org/wiki/Robert_Walser_(Schriftsteller)",
        linkTitle: "Mehr über Walser (Wikipedia)"
    },
    {
        text: "Die größte Ehre ist nicht, niemals zu fallen, sondern jedes Mal wieder aufzustehen.",
        author: "Konfuzius",
        dates: "551-479 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Konfuzius",
        linkTitle: "Mehr über Konfuzius (Wikipedia)"
    },
    {
        text: "Glück ist kein Geschenk der Götter, sondern die Frucht innerer Einstellung.",
        author: "Erich Fromm",
        dates: "1900-1980",
        link: "https://de.wikipedia.org/wiki/Erich_Fromm",
        linkTitle: "Mehr über Fromm (Wikipedia)"
    },
    {
        text: "Die Summe unseres Lebens sind die Stunden, in denen wir liebten.",
        author: "Wilhelm Busch",
        dates: "1832-1908",
        link: "https://de.wikipedia.org/wiki/Wilhelm_Busch",
        linkTitle: "Mehr über Busch (Wikipedia)"
    },
    {
        text: "Der Langsamste, der sein Ziel nicht aus den Augen verliert, geht noch immer geschwinder, als jener, der ohne Ziel umherirrt.",
        author: "Gotthold Ephraim Lessing",
        dates: "1729-1781",
        link: "https://de.wikipedia.org/wiki/Gotthold_Ephraim_Lessing",
        linkTitle: "Mehr über Lessing (Wikipedia)"
    },
    {
        text: "Man kann die Welt nur nach dem verstehen, was man erlebt.",
        author: "Adalbert Stifter",
        dates: "1805-1868",
        link: "https://de.wikipedia.org/wiki/Adalbert_Stifter",
        linkTitle: "Mehr über Stifter (Wikipedia)"
    },
    {
        text: "Es ist nicht zu wenig Zeit, die wir haben, sondern es ist zu viel Zeit, die wir nicht nutzen.",
        author: "Lucius Annaeus Seneca",
        dates: "4 v. Chr.-65 n. Chr.",
        link: "https://de.wikipedia.org/wiki/Seneca",
        linkTitle: "Mehr über Seneca (Wikipedia)"
    },
    {
        text: "Der Preis der Größe heißt Verantwortung.",
        author: "Winston Churchill",
        dates: "1874-1965",
        link: "https://de.wikipedia.org/wiki/Winston_Churchill",
        linkTitle: "Mehr über Churchill (Wikipedia)"
    },
    {
        text: "Echte Freundschaft ist eine sehr langsam wachsende Pflanze.",
        author: "George Washington",
        dates: "1732-1799",
        link: "https://de.wikipedia.org/wiki/George_Washington",
        linkTitle: "Mehr über Washington (Wikipedia)"
    },
    {
        text: "Das Wichtigste im Leben ist die Zeit - das Leben selbst ist nichts weiter als die Summe der Stunden.",
        author: "Søren Kierkegaard",
        dates: "1813-1855",
        link: "https://de.wikipedia.org/wiki/S%C3%B8ren_Kierkegaard",
        linkTitle: "Mehr über Kierkegaard (Wikipedia)"
    },
    {
        text: "Die wahre Entdeckungsreise besteht nicht darin, neue Landschaften zu erforschen, sondern darin, altes mit neuen Augen zu sehen.",
        author: "Marcel Proust",
        dates: "1871-1922",
        link: "https://de.wikipedia.org/wiki/Marcel_Proust",
        linkTitle: "Mehr über Proust (Wikipedia)"
    },
    {
        text: "Alle Menschen sind klug: die einen vorher, die anderen nachher.",
        author: "Voltaire",
        dates: "1694-1778",
        link: "https://de.wikipedia.org/wiki/Voltaire",
        linkTitle: "Mehr über Voltaire (Wikipedia)"
    },
    {
        text: "Wer hoffen kann, der kann auch glauben und lieben.",
        author: "Immanuel Kant",
        dates: "1724-1804",
        link: "https://de.wikipedia.org/wiki/Immanuel_Kant",
        linkTitle: "Mehr über Kant (Wikipedia)"
    },
    {
        text: "Das Herz hat Gründe, die die Vernunft nicht kennt.",
        author: "Blaise Pascal",
        dates: "1623-1662",
        link: "https://de.wikipedia.org/wiki/Blaise_Pascal",
        linkTitle: "Mehr über Pascal (Wikipedia)"
    },
    {
        text: "Jeder ist ein Mond und hat eine dunkle Seite, die er niemandem zeigt.",
        author: "Mark Twain",
        dates: "1835-1910",
        link: "https://de.wikipedia.org/wiki/Mark_Twain",
        linkTitle: "Mehr über Twain (Wikipedia)"
    },
    {
        text: "Ein guter Charakter ist der beste Grabstein.",
        author: "Charles Spurgeon",
        dates: "1834-1892",
        link: "https://de.wikipedia.org/wiki/Charles_Haddon_Spurgeon",
        linkTitle: "Mehr über Spurgeon (Wikipedia)"
    },
    {
        text: "Alle guten Dinge sind langsam in ihrem Wachstum.",
        author: "James Fenimore Cooper",
        dates: "1789-1851",
        link: "https://de.wikipedia.org/wiki/James_Fenimore_Cooper",
        linkTitle: "Mehr über Cooper (Wikipedia)"
    },
    {
        text: "Den sichersten Weg zu entdecken heißt, Neuland zu betreten.",
        author: "Franz Kafka",
        dates: "1883-1924",
        link: "https://de.wikipedia.org/wiki/Franz_Kafka",
        linkTitle: "Mehr über Kafka (Wikipedia)"
    },
    {
        text: "Alles Große ist einfach, und vieles Einfache ist großartig.",
        author: "Fjodor Dostojewski",
        dates: "1821-1881",
        link: "https://de.wikipedia.org/wiki/Fjodor_Michailowitsch_Dostojewski",
        linkTitle: "Mehr über Dostojewski (Wikipedia)"
    },
    {
        text: "Wer nicht genießen kann, wird ungenießbar.",
        author: "Konstantin Wecker",
        dates: "1947-",
        link: "https://de.wikipedia.org/wiki/Konstantin_Wecker",
        linkTitle: "Mehr über Wecker (Wikipedia)"
    },
    {
        text: "Kein Mensch war ohne Grund in deinem Leben. Der eine war ein Geschenk, der andere eine Lektion.",
        author: "Volksweisheit",
        dates: "Sprichwort",
        link: "https://de.wikipedia.org/wiki/Lebensweisheit",
        linkTitle: "Mehr über Lebensweisheiten (Wikipedia)"
    },
    {
        text: "Gut zu sein ist edel. Andere lehren, gut zu sein, ist noch edler - und einfacher.",
        author: "Mark Twain",
        dates: "1835-1910",
        link: "https://de.wikipedia.org/wiki/Mark_Twain",
        linkTitle: "Mehr über Twain (Wikipedia)"
    },
    {
        text: "Wenn du es träumen kannst, kannst du es auch tun.",
        author: "Walt Disney",
        dates: "1901-1966",
        link: "https://de.wikipedia.org/wiki/Walt_Disney",
        linkTitle: "Mehr über Disney (Wikipedia)"
    },
    {
        text: "Erfahrung ist eine teure Schule, aber Narren wollen anderswo nicht lernen.",
        author: "Benjamin Franklin",
        dates: "1706-1790",
        link: "https://de.wikipedia.org/wiki/Benjamin_Franklin",
        linkTitle: "Mehr über Franklin (Wikipedia)"
    },
    {
        text: "Was wir wissen, ist ein Tropfen; was wir nicht wissen, ein Ozean.",
        author: "Isaac Newton",
        dates: "1643-1727",
        link: "https://de.wikipedia.org/wiki/Isaac_Newton",
        linkTitle: "Mehr über Newton (Wikipedia)"
    },
    {
        text: "Die Zukunft hängt davon ab, was wir heute tun.",
        author: "Mahatma Gandhi",
        dates: "1869-1948",
        link: "https://de.wikipedia.org/wiki/Mohandas_Karamchand_Gandhi",
        linkTitle: "Mehr über Gandhi (Wikipedia)"
    },

    // August (31 Tage)
    {
        text: "Im August blüht die Heide, das ist für Herz und Auge Weide.",
        author: "Bauernregel",
        dates: "Volksweisheit",
        link: "https://de.wikipedia.org/wiki/August",
        linkTitle: "Mehr über August (Wikipedia)"
    },
    {
        text: "Die größte Weisheit ist, sich selbst zu kennen.",
        author: "Galileo Galilei",
        dates: "1564-1642",
        link: "https://de.wikipedia.org/wiki/Galileo_Galilei",
        linkTitle: "Mehr über Galilei (Wikipedia)"
    },
    {
        text: "Einen Vorsprung im Leben hat, wer da anpackt, wo die anderen erst einmal reden.",
        author: "John F. Kennedy",
        dates: "1917-1963",
        link: "https://de.wikipedia.org/wiki/John_F._Kennedy",
        linkTitle: "Mehr über Kennedy (Wikipedia)"
    },
    {
        text: "Probleme kann man niemals mit derselben Denkweise lösen, durch die sie entstanden sind.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://de.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "Mehr über Einstein (Wikipedia)"
    },
    {
        text: "Wir leben alle unter dem gleichen Himmel, aber wir haben nicht alle den gleichen Horizont.",
        author: "Konrad Adenauer",
        dates: "1876-1967",
        link: "https://de.wikipedia.org/wiki/Konrad_Adenauer",
        linkTitle: "Mehr über Adenauer (Wikipedia)"
    },
    {
        text: "Die einzige Möglichkeit, etwas vom Leben zu haben, ist, sich mit aller Macht hineinzuwerfen.",
        author: "Angelina Jolie",
        dates: "1975-",
        link: "https://de.wikipedia.org/wiki/Angelina_Jolie",
        linkTitle: "Mehr über Jolie (Wikipedia)"
    },
    {
        text: "Wirklich reich ist ein Mensch nur dann, wenn er das Herz eines geliebten Menschen besitzt.",
        author: "Greta Garbo",
        dates: "1905-1990",
        link: "https://de.wikipedia.org/wiki/Greta_Garbo",
        linkTitle: "Mehr über Garbo (Wikipedia)"
    },
    {
        text: "Das Wichtigste im Gespräch ist, zu hören, was nicht gesagt wird.",
        author: "Peter Drucker",
        dates: "1909-2005",
        link: "https://de.wikipedia.org/wiki/Peter_Drucker",
        linkTitle: "Mehr über Drucker (Wikipedia)"
    },
    {
        text: "Nichts ist entspannender, als das anzunehmen, was kommt.",
        author: "Dalai Lama",
        dates: "1935-",
        link: "https://de.wikipedia.org/wiki/Dalai_Lama",
        linkTitle: "Mehr über Dalai Lama (Wikipedia)"
    },
    {
        text: "Die Liebe zur Weisheit ist die zuverlässigste Wächterin gegen die Extreme.",
        author: "Cicero",
        dates: "106-43 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Marcus_Tullius_Cicero",
        linkTitle: "Mehr über Cicero (Wikipedia)"
    },
    {
        text: "Das Vergnügen, das größte und reinste, das wir auf Erden genießen können, ist, Leute glücklich zu sehen.",
        author: "Joseph Addison",
        dates: "1672-1719",
        link: "https://de.wikipedia.org/wiki/Joseph_Addison",
        linkTitle: "Mehr über Addison (Wikipedia)"
    },
    {
        text: "Zu wissen, was man weiß, und zu wissen, was man tut, das ist Wissen.",
        author: "Konfuzius",
        dates: "551-479 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Konfuzius",
        linkTitle: "Mehr über Konfuzius (Wikipedia)"
    },
    {
        text: "Genieße dein Leben ständig, denn du bist länger tot als lebendig.",
        author: "Schottisches Sprichwort",
        dates: "Volksweisheit",
        link: "https://de.wikipedia.org/wiki/Schottland",
        linkTitle: "Mehr über Schottland (Wikipedia)"
    },
    {
        text: "Es gibt keinen Weg zum Glück. Glücklichsein ist der Weg.",
        author: "Buddha",
        dates: "563-483 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Siddhartha_Gautama",
        linkTitle: "Mehr über Buddha (Wikipedia)"
    },
    {
        text: "Das größte Vergnügen im Leben ist es, das zu tun, von dem die Leute sagen, du könntest es nicht.",
        author: "Walter Bagehot",
        dates: "1826-1877",
        link: "https://de.wikipedia.org/wiki/Walter_Bagehot",
        linkTitle: "Mehr über Bagehot (Wikipedia)"
    },
    {
        text: "Jeder Tag ist eine neue Gelegenheit, das zu tun, was du liebst.",
        author: "Robert Frost",
        dates: "1874-1963",
        link: "https://de.wikipedia.org/wiki/Robert_Frost",
        linkTitle: "Mehr über Frost (Wikipedia)"
    },
    {
        text: "Nicht den Tod sollte man fürchten, sondern dass man nie beginnen wird, zu leben.",
        author: "Marcus Aurelius",
        dates: "121-180",
        link: "https://de.wikipedia.org/wiki/Mark_Aurel",
        linkTitle: "Mehr über Marcus Aurelius (Wikipedia)"
    },
    {
        text: "Erfolg ist die Fähigkeit, von einem Misserfolg zum anderen zu gehen, ohne seine Begeisterung zu verlieren.",
        author: "Winston Churchill",
        dates: "1874-1965",
        link: "https://de.wikipedia.org/wiki/Winston_Churchill",
        linkTitle: "Mehr über Churchill (Wikipedia)"
    },
    {
        text: "Wer ständig glücklich sein möchte, muss sich oft verändern.",
        author: "Konfuzius",
        dates: "551-479 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Konfuzius",
        linkTitle: "Mehr über Konfuzius (Wikipedia)"
    },
    {
        text: "Viele kleine Leute, an vielen kleinen Orten, die viele kleine Dinge tun, können das Gesicht der Welt verändern.",
        author: "Afrikanisches Sprichwort",
        dates: "Volksweisheit",
        link: "https://de.wikipedia.org/wiki/Afrika",
        linkTitle: "Mehr über Afrika (Wikipedia)"
    },
    {
        text: "Alles was du je gewollt hast, ist auf der anderen Seite der Angst.",
        author: "George Addair",
        dates: "1937-2006",
        link: "https://en.wikipedia.org/wiki/George_Addair",
        linkTitle: "Mehr über Addair (Wikipedia)"
    },
    {
        text: "Handle immer so, dass ein neues Leben auf deine Entscheidung warten kann.",
        author: "Hans Jonas",
        dates: "1903-1993",
        link: "https://de.wikipedia.org/wiki/Hans_Jonas",
        linkTitle: "Mehr über Jonas (Wikipedia)"
    },
    {
        text: "Die Kunst zu gefallen ist die Kunst zu täuschen.",
        author: "Luc de Clapiers Vauvenargues",
        dates: "1715-1747",
        link: "https://de.wikipedia.org/wiki/Luc_de_Clapiers,_marquis_de_Vauvenargues",
        linkTitle: "Mehr über Vauvenargues (Wikipedia)"
    },
    {
        text: "Das Glück besteht darin, zu leben wie alle Welt und doch wie kein anderer zu sein.",
        author: "Simone de Beauvoir",
        dates: "1908-1986",
        link: "https://de.wikipedia.org/wiki/Simone_de_Beauvoir",
        linkTitle: "Mehr über de Beauvoir (Wikipedia)"
    },
    {
        text: "Wer die Menschen behandelt, wie sie sind, macht sie schlechter. Wer sie behandelt, wie sie sein könnten, macht sie besser.",
        author: "Johann Wolfgang von Goethe",
        dates: "1749-1832",
        link: "https://de.wikipedia.org/wiki/Johann_Wolfgang_von_Goethe",
        linkTitle: "Mehr über Goethe (Wikipedia)"
    },
    {
        text: "Wir sind nicht nur verantwortlich für das, was wir tun, sondern auch für das, was wir nicht tun.",
        author: "Molière",
        dates: "1622-1673",
        link: "https://de.wikipedia.org/wiki/Moli%C3%A8re",
        linkTitle: "Mehr über Molière (Wikipedia)"
    },
    {
        text: "Jeder Augenblick ist von unendlichem Wert.",
        author: "Johann Wolfgang von Goethe",
        dates: "1749-1832",
        link: "https://de.wikipedia.org/wiki/Johann_Wolfgang_von_Goethe",
        linkTitle: "Mehr über Goethe (Wikipedia)"
    },
    {
        text: "Schönheit vergeht, Dummheit besteht.",
        author: "Volksweisheit",
        dates: "Sprichwort",
        link: "https://de.wikipedia.org/wiki/Sprichwort",
        linkTitle: "Mehr über Sprichwörter (Wikipedia)"
    },
    {
        text: "Man sollte nie so viel zu tun haben, dass man zum Nachdenken keine Zeit mehr hat.",
        author: "Georg Christoph Lichtenberg",
        dates: "1742-1799",
        link: "https://de.wikipedia.org/wiki/Georg_Christoph_Lichtenberg",
        linkTitle: "Mehr über Lichtenberg (Wikipedia)"
    },
    {
        text: "Was alle angeht, können nur alle lösen.",
        author: "Friedrich Dürrenmatt",
        dates: "1921-1990",
        link: "https://de.wikipedia.org/wiki/Friedrich_D%C3%BCrrenmatt",
        linkTitle: "Mehr über Dürrenmatt (Wikipedia)"
    },
    {
        text: "Der Optimismus ist ein Magnet. Er zieht Glück an.",
        author: "Mary Lou Retton",
        dates: "1968-",
        link: "https://de.wikipedia.org/wiki/Mary_Lou_Retton",
        linkTitle: "Mehr über Retton (Wikipedia)"
    },

    // September (30 Tage)
    {
        text: "Der September ist des Jahres schönster Monat.",
        author: "Theodor Fontane",
        dates: "1819-1898",
        link: "https://de.wikipedia.org/wiki/Theodor_Fontane",
        linkTitle: "Mehr über Fontane (Wikipedia)"
    },
    {
        text: "Die reinste Form des Wahnsinns ist es, alles beim Alten zu lassen und gleichzeitig zu hoffen, dass sich etwas ändert.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://de.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "Mehr über Einstein (Wikipedia)"
    },
    {
        text: "Wenn der Wind der Veränderung weht, bauen die einen Mauern und die anderen Windmühlen.",
        author: "Chinesisches Sprichwort",
        dates: "Volksweisheit",
        link: "https://de.wikipedia.org/wiki/Chinesische_Sprache",
        linkTitle: "Mehr über chinesische Weisheiten (Wikipedia)"
    },
    {
        text: "Wer das Ziel kennt, kann entscheiden. Wer entscheidet, findet Ruhe. Wer Ruhe findet, ist sicher. Wer sicher ist, kann überlegen. Wer überlegt, kann verbessern.",
        author: "Konfuzius",
        dates: "551-479 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Konfuzius",
        linkTitle: "Mehr über Konfuzius (Wikipedia)"
    },
    {
        text: "In jedem Menschen schlummern Talente und Fähigkeiten. Sie zu entdecken ist unsere Aufgabe.",
        author: "Sebastian Kneipp",
        dates: "1821-1897",
        link: "https://de.wikipedia.org/wiki/Sebastian_Kneipp",
        linkTitle: "Mehr über Kneipp (Wikipedia)"
    },
    {
        text: "Wer nicht mit der Zeit geht, geht mit der Zeit.",
        author: "Friedrich Schiller",
        dates: "1759-1805",
        link: "https://de.wikipedia.org/wiki/Friedrich_Schiller",
        linkTitle: "Mehr über Schiller (Wikipedia)"
    },
    {
        text: "Respekt ist eines der größten Ausdrucksformen der Liebe.",
        author: "Miguel Ángel Ruiz",
        dates: "1952-",
        link: "https://de.wikipedia.org/wiki/Miguel_Ruiz",
        linkTitle: "Mehr über Ruiz (Wikipedia)"
    },
    {
        text: "Das Vergnügen, Recht zu behalten, wäre unvollständig ohne das Vergnügen, andere ins Unrecht zu setzen.",
        author: "Aldous Huxley",
        dates: "1894-1963",
        link: "https://de.wikipedia.org/wiki/Aldous_Huxley",
        linkTitle: "Mehr über Huxley (Wikipedia)"
    },
    {
        text: "Das Beste, was man gegen die Angst tun kann, ist, sich ihr zu stellen.",
        author: "Paulo Coelho",
        dates: "1947-",
        link: "https://de.wikipedia.org/wiki/Paulo_Coelho",
        linkTitle: "Mehr über Coelho (Wikipedia)"
    },
    {
        text: "Es ist besser, ein Problem zu erörtern, ohne es zu entscheiden, als zu entscheiden, ohne es erörtert zu haben.",
        author: "Joseph Joubert",
        dates: "1754-1824",
        link: "https://de.wikipedia.org/wiki/Joseph_Joubert",
        linkTitle: "Mehr über Joubert (Wikipedia)"
    },
    {
        text: "Fang jetzt an zu leben, und zähle jeden Tag als ein Leben für sich.",
        author: "Lucius Annaeus Seneca",
        dates: "4 v. Chr.-65 n. Chr.",
        link: "https://de.wikipedia.org/wiki/Seneca",
        linkTitle: "Mehr über Seneca (Wikipedia)"
    },
    {
        text: "Wege entstehen dadurch, dass man sie geht.",
        author: "Franz Kafka",
        dates: "1883-1924",
        link: "https://de.wikipedia.org/wiki/Franz_Kafka",
        linkTitle: "Mehr über Kafka (Wikipedia)"
    },
    {
        text: "Die Sprache ist die Kleidung der Gedanken.",
        author: "Samuel Johnson",
        dates: "1709-1784",
        link: "https://de.wikipedia.org/wiki/Samuel_Johnson",
        linkTitle: "Mehr über Johnson (Wikipedia)"
    },
    {
        text: "Geduld ist die Kunst, nur langsam wütend zu werden.",
        author: "Japanisches Sprichwort",
        dates: "Volksweisheit",
        link: "https://de.wikipedia.org/wiki/Japan",
        linkTitle: "Mehr über Japan (Wikipedia)"
    },
    {
        text: "Das Leben ist zu kurz für irgendwann.",
        author: "Volksweisheit",
        dates: "Sprichwort",
        link: "https://de.wikipedia.org/wiki/Lebensweisheit",
        linkTitle: "Mehr über Lebensweisheiten (Wikipedia)"
    },
    {
        text: "Wer das Kleine nicht ehrt, ist des Großen nicht wert.",
        author: "Deutsches Sprichwort",
        dates: "Volksweisheit",
        link: "https://de.wikipedia.org/wiki/Sprichwort",
        linkTitle: "Mehr über Sprichwörter (Wikipedia)"
    },
    {
        text: "Sorge dich nicht um die, die dich nicht mögen, sei gut zu denen, die dich lieben.",
        author: "Konfuzius",
        dates: "551-479 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Konfuzius",
        linkTitle: "Mehr über Konfuzius (Wikipedia)"
    },
    {
        text: "Unsere größte Schwäche liegt im Aufgeben. Der sicherste Weg zum Erfolg ist immer, es doch noch einmal zu versuchen.",
        author: "Thomas Alva Edison",
        dates: "1847-1931",
        link: "https://de.wikipedia.org/wiki/Thomas_Alva_Edison",
        linkTitle: "Mehr über Edison (Wikipedia)"
    },
    {
        text: "Ein Lächeln ist die kürzeste Entfernung zwischen zwei Menschen.",
        author: "Victor Borge",
        dates: "1909-2000",
        link: "https://de.wikipedia.org/wiki/Victor_Borge",
        linkTitle: "Mehr über Borge (Wikipedia)"
    },
    {
        text: "Die Erinnerungen verschönern das Leben, aber das Vergessen allein macht es erträglich.",
        author: "Honoré de Balzac",
        dates: "1799-1850",
        link: "https://de.wikipedia.org/wiki/Honor%C3%A9_de_Balzac",
        linkTitle: "Mehr über Balzac (Wikipedia)"
    },
    {
        text: "Mut brüllt nicht immer nur. Mut kann auch die leise Stimme am Ende des Tages sein, die sagt: Morgen versuche ich es nochmal.",
        author: "Mary Anne Radmacher",
        dates: "1957-",
        link: "https://en.wikipedia.org/wiki/Mary_Anne_Radmacher",
        linkTitle: "Mehr über Radmacher (Wikipedia)"
    },
    {
        text: "Es ist ein Jammer, dass die Dummköpfe so selbstsicher sind und die Klugen so voller Zweifel.",
        author: "Bertrand Russell",
        dates: "1872-1970",
        link: "https://de.wikipedia.org/wiki/Bertrand_Russell",
        linkTitle: "Mehr über Russell (Wikipedia)"
    },
    {
        text: "Was wir am nötigsten brauchen, ist ein Mensch, der uns zwingt, das zu tun, was wir können.",
        author: "Ralph Waldo Emerson",
        dates: "1803-1882",
        link: "https://de.wikipedia.org/wiki/Ralph_Waldo_Emerson",
        linkTitle: "Mehr über Emerson (Wikipedia)"
    },
    {
        text: "Nicht die Jahre in unserem Leben zählen, sondern das Leben in unseren Jahren.",
        author: "Abraham Lincoln",
        dates: "1809-1865",
        link: "https://de.wikipedia.org/wiki/Abraham_Lincoln",
        linkTitle: "Mehr über Lincoln (Wikipedia)"
    },
    {
        text: "Die größte Entfernung ist der Weg vom Kopf zum Herzen.",
        author: "Ernst Ferstl",
        dates: "1955-",
        link: "https://de.wikipedia.org/wiki/Ernst_Ferstl",
        linkTitle: "Mehr über Ferstl (Wikipedia)"
    },
    {
        text: "Der Mensch ist mehr als die Summe seiner Teile.",
        author: "Aristoteles",
        dates: "384-322 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Aristoteles",
        linkTitle: "Mehr über Aristoteles (Wikipedia)"
    },
    {
        text: "Habe Mut, dich deines eigenen Verstandes zu bedienen.",
        author: "Immanuel Kant",
        dates: "1724-1804",
        link: "https://de.wikipedia.org/wiki/Immanuel_Kant",
        linkTitle: "Mehr über Kant (Wikipedia)"
    },
    {
        text: "Das Leben ist wie eine Schachtel Pralinen. Man weiß nie, was man bekommt.",
        author: "Forrest Gump",
        dates: "Filmzitat",
        link: "https://de.wikipedia.org/wiki/Forrest_Gump",
        linkTitle: "Mehr über Forrest Gump (Wikipedia)"
    },
    {
        text: "Erfolg hat nur der, der etwas tut, während er auf den Erfolg wartet.",
        author: "Thomas Alva Edison",
        dates: "1847-1931",
        link: "https://de.wikipedia.org/wiki/Thomas_Alva_Edison",
        linkTitle: "Mehr über Edison (Wikipedia)"
    },
    {
        text: "Die Freiheit besteht darin, dass man alles tun kann, was einem anderen nicht schadet.",
        author: "Matthias Claudius",
        dates: "1740-1815",
        link: "https://de.wikipedia.org/wiki/Matthias_Claudius",
        linkTitle: "Mehr über Claudius (Wikipedia)"
    },

    // Oktober (31 Tage)
    {
        text: "Oktober, der Monat des Mosts und der Melancholie.",
        author: "Volksweisheit",
        dates: "Sprichwort",
        link: "https://de.wikipedia.org/wiki/Oktober",
        linkTitle: "Mehr über Oktober (Wikipedia)"
    },
    {
        text: "Das Schönste, was ein Mensch hinterlassen kann, ist ein Lächeln im Gesicht derjenigen, die an ihn denken.",
        author: "Volksweisheit",
        dates: "Sprichwort",
        link: "https://de.wikipedia.org/wiki/Lebensweisheit",
        linkTitle: "Mehr über Lebensweisheiten (Wikipedia)"
    },
    {
        text: "Wer glaubt, etwas zu sein, hat aufgehört, etwas zu werden.",
        author: "Philip Rosenthal",
        dates: "1916-2001",
        link: "https://de.wikipedia.org/wiki/Philip_Rosenthal_(Unternehmer)",
        linkTitle: "Mehr über Rosenthal (Wikipedia)"
    },
    {
        text: "Die besten Dinge im Leben sind nicht die, die man für Geld bekommt.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://de.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "Mehr über Einstein (Wikipedia)"
    },
    {
        text: "Gehe nicht, wohin der Weg führen mag, sondern dorthin, wo kein Weg ist, und hinterlasse eine Spur.",
        author: "Jean-Jacques Rousseau",
        dates: "1712-1778",
        link: "https://de.wikipedia.org/wiki/Jean-Jacques_Rousseau",
        linkTitle: "Mehr über Rousseau (Wikipedia)"
    },
    {
        text: "Wer Schmetterlinge lachen hört, weiß wie Wolken schmecken.",
        author: "Novalis",
        dates: "1772-1801",
        link: "https://de.wikipedia.org/wiki/Novalis",
        linkTitle: "Mehr über Novalis (Wikipedia)"
    },
    {
        text: "Die Erinnerung ist das einzige Paradies, aus welchem wir nicht vertrieben werden können.",
        author: "Jean Paul",
        dates: "1763-1825",
        link: "https://de.wikipedia.org/wiki/Jean_Paul",
        linkTitle: "Mehr über Jean Paul (Wikipedia)"
    },
    {
        text: "Man muss die Welt nicht verstehen, man muss sich nur darin zurechtfinden.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://de.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "Mehr über Einstein (Wikipedia)"
    },
    {
        text: "Man braucht nichts im Leben zu fürchten, man muss nur alles verstehen.",
        author: "Marie Curie",
        dates: "1867-1934",
        link: "https://de.wikipedia.org/wiki/Marie_Curie",
        linkTitle: "Mehr über Curie (Wikipedia)"
    },
    {
        text: "Sei eine erstklassige Version deiner selbst, keine zweitklassige Version von jemand anderem.",
        author: "Judy Garland",
        dates: "1922-1969",
        link: "https://de.wikipedia.org/wiki/Judy_Garland",
        linkTitle: "Mehr über Garland (Wikipedia)"
    },
    {
        text: "Die Menschen stolpern nicht über Berge, sondern über Maulwurfshügel.",
        author: "Konfuzius",
        dates: "551-479 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Konfuzius",
        linkTitle: "Mehr über Konfuzius (Wikipedia)"
    },
    {
        text: "Lebe jeden Tag, als wäre es dein letzter, denn irgendwann wirst du recht haben.",
        author: "Muhammad Ali",
        dates: "1942-2016",
        link: "https://de.wikipedia.org/wiki/Muhammad_Ali",
        linkTitle: "Mehr über Ali (Wikipedia)"
    },
    {
        text: "Dummheit ist keine Schande. Nur wer klug erscheinen will, wirkt dumm.",
        author: "Konfuzius",
        dates: "551-479 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Konfuzius",
        linkTitle: "Mehr über Konfuzius (Wikipedia)"
    },
    {
        text: "Auch der längste Marsch beginnt mit dem ersten Schritt.",
        author: "Laotse",
        dates: "6. Jh. v. Chr.",
        link: "https://de.wikipedia.org/wiki/Laozi",
        linkTitle: "Mehr über Laotse (Wikipedia)"
    },
    {
        text: "Jede Reise beginnt mit dem ersten Schritt.",
        author: "Laotse",
        dates: "6. Jh. v. Chr.",
        link: "https://de.wikipedia.org/wiki/Laozi",
        linkTitle: "Mehr über Laotse (Wikipedia)"
    },
    {
        text: "Leben ist das, was passiert, während du dabei bist, andere Pläne zu schmieden.",
        author: "John Lennon",
        dates: "1940-1980",
        link: "https://de.wikipedia.org/wiki/John_Lennon",
        linkTitle: "Mehr über Lennon (Wikipedia)"
    },
    {
        text: "Wenn du ein Schiff bauen willst, dann rufe nicht die Menschen zusammen, um Holz zu sammeln, sondern wecke in ihnen die Sehnsucht nach dem Meer.",
        author: "Antoine de Saint-Exupéry",
        dates: "1900-1944",
        link: "https://de.wikipedia.org/wiki/Antoine_de_Saint-Exup%C3%A9ry",
        linkTitle: "Mehr über Saint-Exupéry (Wikipedia)"
    },
    {
        text: "Wer nicht weiß, wohin er will, der darf sich nicht wundern, wenn er ganz woanders ankommt.",
        author: "Mark Twain",
        dates: "1835-1910",
        link: "https://de.wikipedia.org/wiki/Mark_Twain",
        linkTitle: "Mehr über Twain (Wikipedia)"
    },
    {
        text: "Es ist nicht die stärkste Spezies, die überlebt, auch nicht die intelligenteste, sondern diejenige, die am ehesten bereit ist, sich zu verändern.",
        author: "Charles Darwin",
        dates: "1809-1882",
        link: "https://de.wikipedia.org/wiki/Charles_Darwin",
        linkTitle: "Mehr über Darwin (Wikipedia)"
    },
    {
        text: "Erfolg ist, von Niederlage zu Niederlage zu gehen, ohne die Begeisterung zu verlieren.",
        author: "Winston Churchill",
        dates: "1874-1965",
        link: "https://de.wikipedia.org/wiki/Winston_Churchill",
        linkTitle: "Mehr über Churchill (Wikipedia)"
    },
    {
        text: "Glück entsteht oft durch Aufmerksamkeit in kleinen Dingen, Unglück oft durch Vernachlässigung kleiner Dinge.",
        author: "Wilhelm Busch",
        dates: "1832-1908",
        link: "https://de.wikipedia.org/wiki/Wilhelm_Busch",
        linkTitle: "Mehr über Busch (Wikipedia)"
    },
    {
        text: "Das beste Mittel, jeden Tag gut zu beginnen, ist beim Erwachen daran zu denken, ob man nicht wenigstens einem Menschen an diesem Tage eine Freude machen könne.",
        author: "Friedrich Nietzsche",
        dates: "1844-1900",
        link: "https://de.wikipedia.org/wiki/Friedrich_Nietzsche",
        linkTitle: "Mehr über Nietzsche (Wikipedia)"
    },
    {
        text: "Die Ehe ist und bleibt die wichtigste Entdeckungsreise, die der Mensch unternehmen kann.",
        author: "Søren Kierkegaard",
        dates: "1813-1855",
        link: "https://de.wikipedia.org/wiki/S%C3%B8ren_Kierkegaard",
        linkTitle: "Mehr über Kierkegaard (Wikipedia)"
    },
    {
        text: "Sei du selbst! Alle anderen sind bereits vergeben.",
        author: "Oscar Wilde",
        dates: "1854-1900",
        link: "https://de.wikipedia.org/wiki/Oscar_Wilde",
        linkTitle: "Mehr über Wilde (Wikipedia)"
    },
    {
        text: "Die Gesundheit ist zwar nicht alles, aber ohne Gesundheit ist alles nichts.",
        author: "Arthur Schopenhauer",
        dates: "1788-1860",
        link: "https://de.wikipedia.org/wiki/Arthur_Schopenhauer",
        linkTitle: "Mehr über Schopenhauer (Wikipedia)"
    },
    {
        text: "Wer die Wahrheit sagt, braucht ein schnelles Pferd.",
        author: "Chinesisches Sprichwort",
        dates: "Volksweisheit",
        link: "https://de.wikipedia.org/wiki/Chinesische_Sprache",
        linkTitle: "Mehr über chinesische Weisheiten (Wikipedia)"
    },
    {
        text: "Das Glück wohnt nicht im Besitze und nicht im Golde, das Glücksgefühl ist in der Seele zu Hause.",
        author: "Demokrit",
        dates: "460-370 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Demokrit",
        linkTitle: "Mehr über Demokrit (Wikipedia)"
    },
    {
        text: "Liebe ist nicht das, was man erwartet zu bekommen, sondern das, was man bereit ist zu geben.",
        author: "Katharine Hepburn",
        dates: "1907-2003",
        link: "https://de.wikipedia.org/wiki/Katharine_Hepburn",
        linkTitle: "Mehr über Hepburn (Wikipedia)"
    },
    {
        text: "Einen Menschen lieben heißt, ihn so zu sehen, wie Gott ihn gemeint hat.",
        author: "Fjodor Dostojewski",
        dates: "1821-1881",
        link: "https://de.wikipedia.org/wiki/Fjodor_Michailowitsch_Dostojewski",
        linkTitle: "Mehr über Dostojewski (Wikipedia)"
    },
    {
        text: "Wer aufhört zu lernen, ist alt. Er mag zwanzig oder achtzig sein.",
        author: "Henry Ford",
        dates: "1863-1947",
        link: "https://de.wikipedia.org/wiki/Henry_Ford",
        linkTitle: "Mehr über Ford (Wikipedia)"
    },
    {
        text: "Alles, was wir hören, ist eine Meinung, keine Tatsache. Alles, was wir sehen, ist eine Perspektive, nicht die Wahrheit.",
        author: "Marcus Aurelius",
        dates: "121-180",
        link: "https://de.wikipedia.org/wiki/Mark_Aurel",
        linkTitle: "Mehr über Marcus Aurelius (Wikipedia)"
    },

    // November (30 Tage)
    {
        text: "November, der Monat der Stille und Besinnung.",
        author: "Volksweisheit",
        dates: "Sprichwort",
        link: "https://de.wikipedia.org/wiki/November",
        linkTitle: "Mehr über November (Wikipedia)"
    },
    {
        text: "Man kann einen Menschen mit einer Wohnung ebenso töten wie mit einer Axt.",
        author: "Heinrich Zille",
        dates: "1858-1929",
        link: "https://de.wikipedia.org/wiki/Heinrich_Zille",
        linkTitle: "Mehr über Zille (Wikipedia)"
    },
    {
        text: "Was du heute kannst besorgen, das verschiebe nicht auf morgen.",
        author: "Benjamin Franklin",
        dates: "1706-1790",
        link: "https://de.wikipedia.org/wiki/Benjamin_Franklin",
        linkTitle: "Mehr über Franklin (Wikipedia)"
    },
    {
        text: "Das größte Übel, das wir unseren Mitmenschen antun können, ist nicht, sie zu hassen, sondern ihnen gegenüber gleichgültig zu sein.",
        author: "George Bernard Shaw",
        dates: "1856-1950",
        link: "https://de.wikipedia.org/wiki/George_Bernard_Shaw",
        linkTitle: "Mehr über Shaw (Wikipedia)"
    },
    {
        text: "Nicht die Schönheit entscheidet, wen wir lieben, sondern die Liebe entscheidet, wen wir schön finden.",
        author: "Sophia Loren",
        dates: "1934-",
        link: "https://de.wikipedia.org/wiki/Sophia_Loren",
        linkTitle: "Mehr über Loren (Wikipedia)"
    },
    {
        text: "Die wahre Lebensweisheit besteht darin, im Alltäglichen das Wunderbare zu sehen.",
        author: "Pearl S. Buck",
        dates: "1892-1973",
        link: "https://de.wikipedia.org/wiki/Pearl_S._Buck",
        linkTitle: "Mehr über Buck (Wikipedia)"
    },
    {
        text: "Der Unterschied zwischen dem, was wir tun, und dem, was wir tun könnten, würde genügen, um die meisten Probleme der Welt zu lösen.",
        author: "Mahatma Gandhi",
        dates: "1869-1948",
        link: "https://de.wikipedia.org/wiki/Mohandas_Karamchand_Gandhi",
        linkTitle: "Mehr über Gandhi (Wikipedia)"
    },
    {
        text: "Man reist nicht, um anzukommen, sondern um zu reisen.",
        author: "Johann Wolfgang von Goethe",
        dates: "1749-1832",
        link: "https://de.wikipedia.org/wiki/Johann_Wolfgang_von_Goethe",
        linkTitle: "Mehr über Goethe (Wikipedia)"
    },
    {
        text: "Toleranz sollte eigentlich nur eine vorübergehende Gesinnung sein: sie muss zur Anerkennung führen. Dulden heißt beleidigen.",
        author: "Johann Wolfgang von Goethe",
        dates: "1749-1832",
        link: "https://de.wikipedia.org/wiki/Johann_Wolfgang_von_Goethe",
        linkTitle: "Mehr über Goethe (Wikipedia)"
    },
    {
        text: "Sei die Veränderung, die du in der Welt sehen möchtest.",
        author: "Mahatma Gandhi",
        dates: "1869-1948",
        link: "https://de.wikipedia.org/wiki/Mohandas_Karamchand_Gandhi",
        linkTitle: "Mehr über Gandhi (Wikipedia)"
    },
    {
        text: "Auch eine Enttäuschung, wenn sie nur gründlich und endgültig ist, bedeutet einen Schritt vorwärts.",
        author: "Max Planck",
        dates: "1858-1947",
        link: "https://de.wikipedia.org/wiki/Max_Planck",
        linkTitle: "Mehr über Planck (Wikipedia)"
    },
    {
        text: "Die beste Bildung findet ein gescheiter Mensch auf Reisen.",
        author: "Johann Wolfgang von Goethe",
        dates: "1749-1832",
        link: "https://de.wikipedia.org/wiki/Johann_Wolfgang_von_Goethe",
        linkTitle: "Mehr über Goethe (Wikipedia)"
    },
    {
        text: "Glück ist Selbstgenügsamkeit.",
        author: "Aristoteles",
        dates: "384-322 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Aristoteles",
        linkTitle: "Mehr über Aristoteles (Wikipedia)"
    },
    {
        text: "Es ist besser, ein einziges kleines Licht anzuzünden, als die Dunkelheit zu verfluchen.",
        author: "Konfuzius",
        dates: "551-479 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Konfuzius",
        linkTitle: "Mehr über Konfuzius (Wikipedia)"
    },
    {
        text: "Man wird nicht dadurch besser, dass man andere schlecht macht.",
        author: "Heinrich Nordhoff",
        dates: "1899-1968",
        link: "https://de.wikipedia.org/wiki/Heinrich_Nordhoff",
        linkTitle: "Mehr über Nordhoff (Wikipedia)"
    },
    {
        text: "Die größte Gefahr für die meisten von uns liegt nicht darin, dass wir zu hoch zielen und zu kurz kommen, sondern darin, dass wir zu niedrig zielen und unser Ziel erreichen.",
        author: "Michelangelo",
        dates: "1475-1564",
        link: "https://de.wikipedia.org/wiki/Michelangelo",
        linkTitle: "Mehr über Michelangelo (Wikipedia)"
    },
    {
        text: "Jeder Mensch macht Fehler. Das Kunststück liegt darin, sie zu machen, wenn keiner zuschaut.",
        author: "Peter Ustinov",
        dates: "1921-2004",
        link: "https://de.wikipedia.org/wiki/Peter_Ustinov",
        linkTitle: "Mehr über Ustinov (Wikipedia)"
    },
    {
        text: "Mit dem Leben ist es wie mit einem Theaterstück; es kommt nicht darauf an, wie lange es ist, sondern wie bunt.",
        author: "Lucius Annaeus Seneca",
        dates: "4 v. Chr.-65 n. Chr.",
        link: "https://de.wikipedia.org/wiki/Seneca",
        linkTitle: "Mehr über Seneca (Wikipedia)"
    },
    {
        text: "Wer über gewisse Dinge den Verstand nicht verliert, der hat keinen zu verlieren.",
        author: "Gotthold Ephraim Lessing",
        dates: "1729-1781",
        link: "https://de.wikipedia.org/wiki/Gotthold_Ephraim_Lessing",
        linkTitle: "Mehr über Lessing (Wikipedia)"
    },
    {
        text: "Ein Freund ist ein Mensch, der die Melodie deines Herzens kennt und sie dir vorspielt, wenn du sie vergessen hast.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://de.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "Mehr über Einstein (Wikipedia)"
    },
    {
        text: "Der Mensch hat dreierlei Wege klug zu handeln: durch Nachdenken ist der edelste, durch Nachahmen der einfachste, durch Erfahrung der bitterste.",
        author: "Konfuzius",
        dates: "551-479 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Konfuzius",
        linkTitle: "Mehr über Konfuzius (Wikipedia)"
    },
    {
        text: "Was wir brauchen, sind ein paar verrückte Leute; seht euch an, wohin uns die Normalen gebracht haben.",
        author: "George Bernard Shaw",
        dates: "1856-1950",
        link: "https://de.wikipedia.org/wiki/George_Bernard_Shaw",
        linkTitle: "Mehr über Shaw (Wikipedia)"
    },
    {
        text: "Der größte Fehler, den man im Leben machen kann, ist, immer Angst zu haben, einen Fehler zu machen.",
        author: "Dietrich Bonhoeffer",
        dates: "1906-1945",
        link: "https://de.wikipedia.org/wiki/Dietrich_Bonhoeffer",
        linkTitle: "Mehr über Bonhoeffer (Wikipedia)"
    },
    {
        text: "Das Leben meistert man lächelnd oder überhaupt nicht.",
        author: "Chinesisches Sprichwort",
        dates: "Volksweisheit",
        link: "https://de.wikipedia.org/wiki/Chinesische_Sprache",
        linkTitle: "Mehr über chinesische Weisheiten (Wikipedia)"
    },
    {
        text: "Wer glücklich ist, macht andere auch glücklich.",
        author: "Anne Frank",
        dates: "1929-1945",
        link: "https://de.wikipedia.org/wiki/Anne_Frank",
        linkTitle: "Mehr über Frank (Wikipedia)"
    },
    {
        text: "Wenn du kritisiert wirst, dann musst du etwas richtig machen. Denn man greift nur denjenigen an, der den Ball hat.",
        author: "Bruce Lee",
        dates: "1940-1973",
        link: "https://de.wikipedia.org/wiki/Bruce_Lee",
        linkTitle: "Mehr über Lee (Wikipedia)"
    },
    {
        text: "Es gibt nur zwei Tage im Jahr, an denen man nichts tun kann. Der eine ist Gestern, der andere Morgen.",
        author: "Dalai Lama",
        dates: "1935-",
        link: "https://de.wikipedia.org/wiki/Dalai_Lama",
        linkTitle: "Mehr über Dalai Lama (Wikipedia)"
    },
    {
        text: "Wer kämpft, kann verlieren. Wer nicht kämpft, hat schon verloren.",
        author: "Bertolt Brecht",
        dates: "1898-1956",
        link: "https://de.wikipedia.org/wiki/Bertolt_Brecht",
        linkTitle: "Mehr über Brecht (Wikipedia)"
    },
    {
        text: "Wenn Freiheit überhaupt etwas bedeutet, dann bedeutet sie das Recht darauf, den Leuten das zu sagen, was sie nicht hören wollen.",
        author: "George Orwell",
        dates: "1903-1950",
        link: "https://de.wikipedia.org/wiki/George_Orwell",
        linkTitle: "Mehr über Orwell (Wikipedia)"
    },
    {
        text: "Es sind nicht die Jahre deines Lebens, die zählen. Was zählt, ist das Leben innerhalb dieser Jahre.",
        author: "Abraham Lincoln",
        dates: "1809-1865",
        link: "https://de.wikipedia.org/wiki/Abraham_Lincoln",
        linkTitle: "Mehr über Lincoln (Wikipedia)"
    },

    // Dezember (31 Tage)
    {
        text: "Dezember, der Monat der Lichter und der Hoffnung.",
        author: "Volksweisheit",
        dates: "Sprichwort",
        link: "https://de.wikipedia.org/wiki/Dezember",
        linkTitle: "Mehr über Dezember (Wikipedia)"
    },
    {
        text: "Das Schönste am Schenken ist das Leuchten in den Augen des Beschenkten.",
        author: "Volksweisheit",
        dates: "Sprichwort",
        link: "https://de.wikipedia.org/wiki/Geschenk",
        linkTitle: "Mehr über Schenken (Wikipedia)"
    },
    {
        text: "Die Hoffnung ist der Regenbogen über dem herabstürzenden Bach des Lebens.",
        author: "Friedrich Nietzsche",
        dates: "1844-1900",
        link: "https://de.wikipedia.org/wiki/Friedrich_Nietzsche",
        linkTitle: "Mehr über Nietzsche (Wikipedia)"
    },
    {
        text: "Die Wissenschaft von heute ist der Irrtum von morgen.",
        author: "Jacob von Uexküll",
        dates: "1864-1944",
        link: "https://de.wikipedia.org/wiki/Jakob_von_Uexk%C3%BCll",
        linkTitle: "Mehr über von Uexküll (Wikipedia)"
    },
    {
        text: "Der wahre Beruf des Menschen ist, zu sich selbst zu kommen.",
        author: "Hermann Hesse",
        dates: "1877-1962",
        link: "https://de.wikipedia.org/wiki/Hermann_Hesse",
        linkTitle: "Mehr über Hesse (Wikipedia)"
    },
    {
        text: "Die Weisheit des Alters ist nicht Weisheit, sondern Vorsicht.",
        author: "Ernest Hemingway",
        dates: "1899-1961",
        link: "https://de.wikipedia.org/wiki/Ernest_Hemingway",
        linkTitle: "Mehr über Hemingway (Wikipedia)"
    },
    {
        text: "Wer die Enge seiner Heimat begreifen will, der reise. Wer die Enge seiner Zeit ermessen will, studiere Geschichte.",
        author: "Kurt Tucholsky",
        dates: "1890-1935",
        link: "https://de.wikipedia.org/wiki/Kurt_Tucholsky",
        linkTitle: "Mehr über Tucholsky (Wikipedia)"
    },
    {
        text: "Es ist nicht der Mensch, der am meisten gelebt hat, welcher die höchsten Jahre zählt, sondern derjenige, welcher sein Leben am meisten empfunden hat.",
        author: "Jean-Jacques Rousseau",
        dates: "1712-1778",
        link: "https://de.wikipedia.org/wiki/Jean-Jacques_Rousseau",
        linkTitle: "Mehr über Rousseau (Wikipedia)"
    },
    {
        text: "Weihnachten ist keine Jahreszeit. Es ist ein Gefühl.",
        author: "Edna Ferber",
        dates: "1885-1968",
        link: "https://de.wikipedia.org/wiki/Edna_Ferber",
        linkTitle: "Mehr über Ferber (Wikipedia)"
    },
    {
        text: "Jeder ist ein Genie! Aber wenn du einen Fisch danach beurteilst, ob er auf einen Baum klettern kann, wird er sein ganzes Leben glauben, dass er dumm ist.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://de.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "Mehr über Einstein (Wikipedia)"
    },
    {
        text: "Eine Investition in Wissen bringt immer noch die besten Zinsen.",
        author: "Benjamin Franklin",
        dates: "1706-1790",
        link: "https://de.wikipedia.org/wiki/Benjamin_Franklin",
        linkTitle: "Mehr über Franklin (Wikipedia)"
    },
    {
        text: "Fürchte dich nicht vor dem langsamen Vorwärtsgehen, fürchte dich nur vor dem Stehenbleiben.",
        author: "Chinesisches Sprichwort",
        dates: "Volksweisheit",
        link: "https://de.wikipedia.org/wiki/Chinesische_Sprache",
        linkTitle: "Mehr über chinesische Weisheiten (Wikipedia)"
    },
    {
        text: "In der Weihnachtszeit steckt ein klein wenig mehr Liebe in den Menschen.",
        author: "Charles Dickens",
        dates: "1812-1870",
        link: "https://de.wikipedia.org/wiki/Charles_Dickens",
        linkTitle: "Mehr über Dickens (Wikipedia)"
    },
    {
        text: "Die meisten Menschen sind bereit zu lernen, aber nur die wenigsten, sich belehren zu lassen.",
        author: "Winston Churchill",
        dates: "1874-1965",
        link: "https://de.wikipedia.org/wiki/Winston_Churchill",
        linkTitle: "Mehr über Churchill (Wikipedia)"
    },
    {
        text: "Der Vorteil der Klugheit besteht darin, dass man sich dumm stellen kann. Das Gegenteil ist schon schwieriger.",
        author: "Kurt Tucholsky",
        dates: "1890-1935",
        link: "https://de.wikipedia.org/wiki/Kurt_Tucholsky",
        linkTitle: "Mehr über Tucholsky (Wikipedia)"
    },
    {
        text: "Man ist nie zu alt, um sich ein neues Ziel zu setzen oder einen neuen Traum zu träumen.",
        author: "C.S. Lewis",
        dates: "1898-1963",
        link: "https://de.wikipedia.org/wiki/C._S._Lewis",
        linkTitle: "Mehr über Lewis (Wikipedia)"
    },
    {
        text: "Das Leben ist entweder ein gewagtes Abenteuer oder gar nichts.",
        author: "Helen Keller",
        dates: "1880-1968",
        link: "https://de.wikipedia.org/wiki/Helen_Keller",
        linkTitle: "Mehr über Keller (Wikipedia)"
    },
    {
        text: "Freude an der Freude und Leid am Leid des Anderen, das macht erst die wahre Menschlichkeit aus.",
        author: "Hugo von Hofmannsthal",
        dates: "1874-1929",
        link: "https://de.wikipedia.org/wiki/Hugo_von_Hofmannsthal",
        linkTitle: "Mehr über von Hofmannsthal (Wikipedia)"
    },
    {
        text: "Du kannst dein Leben nicht verlängern und du kannst es auch nicht verbreitern. Aber du kannst es vertiefen.",
        author: "Gorch Fock",
        dates: "1880-1916",
        link: "https://de.wikipedia.org/wiki/Johann_Kinau",
        linkTitle: "Mehr über Gorch Fock (Wikipedia)"
    },
    {
        text: "Der kürzeste Weg zwischen zwei Menschen ist ein Lächeln.",
        author: "Volksweisheit",
        dates: "Sprichwort",
        link: "https://de.wikipedia.org/wiki/L%C3%A4cheln",
        linkTitle: "Mehr über Lächeln (Wikipedia)"
    },
    {
        text: "Das größte Geschenk, das du jemandem machen kannst, ist deine Zeit.",
        author: "Volksweisheit",
        dates: "Sprichwort",
        link: "https://de.wikipedia.org/wiki/Zeit",
        linkTitle: "Mehr über Zeit (Wikipedia)"
    },
    {
        text: "Erfolg besteht darin, dass man genau die Fähigkeiten hat, die im Moment gefragt sind.",
        author: "Henry Ford",
        dates: "1863-1947",
        link: "https://de.wikipedia.org/wiki/Henry_Ford",
        linkTitle: "Mehr über Ford (Wikipedia)"
    },
    {
        text: "Der Sinn des Lebens besteht nicht darin, ein erfolgreicher Mensch zu sein, sondern ein wertvoller.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://de.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "Mehr über Einstein (Wikipedia)"
    },
    {
        text: "Wir können den Wind nicht ändern, aber wir können die Segel richtig setzen.",
        author: "Aristoteles",
        dates: "384-322 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Aristoteles",
        linkTitle: "Mehr über Aristoteles (Wikipedia)"
    },
    {
        text: "Das Leben ist wie ein Spiegel: Wenn du hineinlächelst, lächelt es zurück.",
        author: "George Bernard Shaw",
        dates: "1856-1950",
        link: "https://de.wikipedia.org/wiki/George_Bernard_Shaw",
        linkTitle: "Mehr über Shaw (Wikipedia)"
    },
    {
        text: "Gott gebe mir die Gelassenheit, Dinge hinzunehmen, die ich nicht ändern kann, den Mut, Dinge zu ändern, die ich ändern kann, und die Weisheit, das eine vom anderen zu unterscheiden.",
        author: "Reinhold Niebuhr",
        dates: "1892-1971",
        link: "https://de.wikipedia.org/wiki/Reinhold_Niebuhr",
        linkTitle: "Mehr über Niebuhr (Wikipedia)"
    },
    {
        text: "Der Wert eines Menschen liegt nicht in dem, was er hat, sondern in dem, was er ist.",
        author: "Oscar Wilde",
        dates: "1854-1900",
        link: "https://de.wikipedia.org/wiki/Oscar_Wilde",
        linkTitle: "Mehr über Wilde (Wikipedia)"
    },
    {
        text: "Nichts ist so stark wie eine Idee, deren Zeit gekommen ist.",
        author: "Victor Hugo",
        dates: "1802-1885",
        link: "https://de.wikipedia.org/wiki/Victor_Hugo",
        linkTitle: "Mehr über Hugo (Wikipedia)"
    },
    {
        text: "Die Zukunft kann man am besten voraussagen, wenn man sie selbst gestaltet.",
        author: "Alan Kay",
        dates: "1940-",
        link: "https://de.wikipedia.org/wiki/Alan_Kay",
        linkTitle: "Mehr über Kay (Wikipedia)"
    },
    {
        text: "Ein neues Jahr steht vor der Tür. Lass uns die Jahre gut nutzen, die noch kommen.",
        author: "Johann Wolfgang von Goethe",
        dates: "1749-1832",
        link: "https://de.wikipedia.org/wiki/Johann_Wolfgang_von_Goethe",
        linkTitle: "Mehr über Goethe (Wikipedia)"
    },
    {
        text: "Das Ende ist auch immer ein neuer Anfang.",
        author: "Volksweisheit",
        dates: "Sprichwort",
        link: "https://de.wikipedia.org/wiki/Neujahr",
        linkTitle: "Mehr über Neujahr (Wikipedia)"
    }
];

// Funktion zum Abrufen eines zufälligen Spruchs
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    return QUOTES[randomIndex];
}

// Funktion zum Erstellen einer neuen Spruchzuordnung
function generateQuoteMapping(numberOfDays) {
    const availableQuotes = [...QUOTES];
    const mapping = [];

    for (let i = 0; i < numberOfDays; i++) {
        if (availableQuotes.length === 0) {
            // Falls wir mehr Tage als Sprüche haben, befülle das Array neu
            availableQuotes.push(...QUOTES);
        }

        // Zufälligen Spruch auswählen
        const randomIndex = Math.floor(Math.random() * availableQuotes.length);
        mapping.push(availableQuotes[randomIndex]);

        // Ausgewählten Spruch entfernen, um Wiederholungen zu vermeiden
        availableQuotes.splice(randomIndex, 1);
    }

    return mapping;
}

// Export für Verwendung in anderen Dateien
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QUOTES, getRandomQuote, generateQuoteMapping, getQuoteForDay };
}
