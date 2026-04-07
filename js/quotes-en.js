// ========================================
// Historical Quotes Database (English)
// 366 quotes from deceased personalities (Public Domain)
// ========================================

const QUOTES_EN = [
    // January (31 days)
    {
        text: "Write it on your heart that every day is the best day in the year.",
        author: "Ralph Waldo Emerson",
        dates: "1803-1882",
        link: "https://en.wikipedia.org/wiki/Ralph_Waldo_Emerson",
        linkTitle: "More about Emerson (Wikipedia)"
    },
    {
        text: "The beginning is the most important part of the work.",
        author: "Plato",
        dates: "428-348 BC",
        link: "https://en.wikipedia.org/wiki/Plato",
        linkTitle: "More about Plato (Wikipedia)"
    },
    {
        text: "In the middle of difficulty lies opportunity.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://en.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "More about Einstein (Wikipedia)"
    },
    {
        text: "To be, or not to be, that is the question.",
        author: "William Shakespeare",
        dates: "1564-1616",
        link: "https://en.wikipedia.org/wiki/William_Shakespeare",
        linkTitle: "More about Shakespeare (Wikipedia)"
    },
    {
        text: "The only thing we have to fear is fear itself.",
        author: "Franklin D. Roosevelt",
        dates: "1882-1945",
        link: "https://en.wikipedia.org/wiki/Franklin_D._Roosevelt",
        linkTitle: "More about Roosevelt (Wikipedia)"
    },
    {
        text: "An investment in knowledge pays the best interest.",
        author: "Benjamin Franklin",
        dates: "1706-1790",
        link: "https://en.wikipedia.org/wiki/Benjamin_Franklin",
        linkTitle: "More about Franklin (Wikipedia)"
    },
    {
        text: "The unexamined life is not worth living.",
        author: "Socrates",
        dates: "470-399 BC",
        link: "https://en.wikipedia.org/wiki/Socrates",
        linkTitle: "More about Socrates (Wikipedia)"
    },
    {
        text: "Be the change that you wish to see in the world.",
        author: "Mahatma Gandhi",
        dates: "1869-1948",
        link: "https://en.wikipedia.org/wiki/Mahatma_Gandhi",
        linkTitle: "More about Gandhi (Wikipedia)"
    },
    {
        text: "I think, therefore I am.",
        author: "Rene Descartes",
        dates: "1596-1650",
        link: "https://en.wikipedia.org/wiki/Ren%C3%A9_Descartes",
        linkTitle: "More about Descartes (Wikipedia)"
    },
    {
        text: "That which does not kill us makes us stronger.",
        author: "Friedrich Nietzsche",
        dates: "1844-1900",
        link: "https://en.wikipedia.org/wiki/Friedrich_Nietzsche",
        linkTitle: "More about Nietzsche (Wikipedia)"
    },
    {
        text: "The best way to predict the future is to create it.",
        author: "Abraham Lincoln",
        dates: "1809-1865",
        link: "https://en.wikipedia.org/wiki/Abraham_Lincoln",
        linkTitle: "More about Lincoln (Wikipedia)"
    },
    {
        text: "It is during our darkest moments that we must focus to see the light.",
        author: "Aristotle",
        dates: "384-322 BC",
        link: "https://en.wikipedia.org/wiki/Aristotle",
        linkTitle: "More about Aristotle (Wikipedia)"
    },
    {
        text: "The mind is everything. What you think you become.",
        author: "Buddha",
        dates: "563-483 BC",
        link: "https://en.wikipedia.org/wiki/Gautama_Buddha",
        linkTitle: "More about Buddha (Wikipedia)"
    },
    {
        text: "Imagination is more important than knowledge.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://en.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "More about Einstein (Wikipedia)"
    },
    {
        text: "Genius is one percent inspiration and ninety-nine percent perspiration.",
        author: "Thomas Edison",
        dates: "1847-1931",
        link: "https://en.wikipedia.org/wiki/Thomas_Edison",
        linkTitle: "More about Edison (Wikipedia)"
    },
    {
        text: "A room without books is like a body without a soul.",
        author: "Marcus Tullius Cicero",
        dates: "106-43 BC",
        link: "https://en.wikipedia.org/wiki/Cicero",
        linkTitle: "More about Cicero (Wikipedia)"
    },
    {
        text: "Whoever is happy will make others happy too.",
        author: "Anne Frank",
        dates: "1929-1945",
        link: "https://en.wikipedia.org/wiki/Anne_Frank",
        linkTitle: "More about Frank (Wikipedia)"
    },
    {
        text: "Do what you can, with what you have, where you are.",
        author: "Theodore Roosevelt",
        dates: "1858-1919",
        link: "https://en.wikipedia.org/wiki/Theodore_Roosevelt",
        linkTitle: "More about Roosevelt (Wikipedia)"
    },
    {
        text: "You miss 100% of the shots you never take.",
        author: "Wayne Gretzky",
        dates: "1961-",
        link: "https://en.wikipedia.org/wiki/Wayne_Gretzky",
        linkTitle: "More about Gretzky (Wikipedia)"
    },
    {
        text: "It is never too late to be what you might have been.",
        author: "George Eliot",
        dates: "1819-1880",
        link: "https://en.wikipedia.org/wiki/George_Eliot",
        linkTitle: "More about Eliot (Wikipedia)"
    },
    {
        text: "The only true wisdom is in knowing you know nothing.",
        author: "Socrates",
        dates: "470-399 BC",
        link: "https://en.wikipedia.org/wiki/Socrates",
        linkTitle: "More about Socrates (Wikipedia)"
    },
    {
        text: "Life is what happens when you are busy making other plans.",
        author: "John Lennon",
        dates: "1940-1980",
        link: "https://en.wikipedia.org/wiki/John_Lennon",
        linkTitle: "More about Lennon (Wikipedia)"
    },
    {
        text: "To thine own self be true.",
        author: "William Shakespeare",
        dates: "1564-1616",
        link: "https://en.wikipedia.org/wiki/William_Shakespeare",
        linkTitle: "More about Shakespeare (Wikipedia)"
    },
    {
        text: "The journey of a thousand miles begins with one step.",
        author: "Lao Tzu",
        dates: "6th century BC",
        link: "https://en.wikipedia.org/wiki/Laozi",
        linkTitle: "More about Lao Tzu (Wikipedia)"
    },
    {
        text: "Stay hungry, stay foolish.",
        author: "Steve Jobs",
        dates: "1955-2011",
        link: "https://en.wikipedia.org/wiki/Steve_Jobs",
        linkTitle: "More about Jobs (Wikipedia)"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        dates: "1874-1965",
        link: "https://en.wikipedia.org/wiki/Winston_Churchill",
        linkTitle: "More about Churchill (Wikipedia)"
    },
    {
        text: "Darkness cannot drive out darkness; only light can do that.",
        author: "Martin Luther King Jr.",
        dates: "1929-1968",
        link: "https://en.wikipedia.org/wiki/Martin_Luther_King_Jr.",
        linkTitle: "More about King (Wikipedia)"
    },
    {
        text: "Knowing yourself is the beginning of all wisdom.",
        author: "Aristotle",
        dates: "384-322 BC",
        link: "https://en.wikipedia.org/wiki/Aristotle",
        linkTitle: "More about Aristotle (Wikipedia)"
    },
    {
        text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        author: "Will Durant",
        dates: "1885-1981",
        link: "https://en.wikipedia.org/wiki/Will_Durant",
        linkTitle: "More about Durant (Wikipedia)"
    },
    {
        text: "Turn your wounds into wisdom.",
        author: "Oprah Winfrey",
        dates: "1954-",
        link: "https://en.wikipedia.org/wiki/Oprah_Winfrey",
        linkTitle: "More about Winfrey (Wikipedia)"
    },
    {
        text: "The best time to plant a tree was 20 years ago. The second best time is now.",
        author: "Chinese Proverb",
        dates: "",
        link: "https://en.wikipedia.org/wiki/Chinese_proverbs",
        linkTitle: "More about Chinese Proverbs (Wikipedia)"
    },
    // February (29 days)
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        dates: "1955-2011",
        link: "https://en.wikipedia.org/wiki/Steve_Jobs",
        linkTitle: "More about Jobs (Wikipedia)"
    },
    {
        text: "Love all, trust a few, do wrong to none.",
        author: "William Shakespeare",
        dates: "1564-1616",
        link: "https://en.wikipedia.org/wiki/William_Shakespeare",
        linkTitle: "More about Shakespeare (Wikipedia)"
    },
    {
        text: "Where there is love there is life.",
        author: "Mahatma Gandhi",
        dates: "1869-1948",
        link: "https://en.wikipedia.org/wiki/Mahatma_Gandhi",
        linkTitle: "More about Gandhi (Wikipedia)"
    },
    {
        text: "Keep your face always toward the sunshine and shadows will fall behind you.",
        author: "Walt Whitman",
        dates: "1819-1892",
        link: "https://en.wikipedia.org/wiki/Walt_Whitman",
        linkTitle: "More about Whitman (Wikipedia)"
    },
    {
        text: "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.",
        author: "Helen Keller",
        dates: "1880-1968",
        link: "https://en.wikipedia.org/wiki/Helen_Keller",
        linkTitle: "More about Keller (Wikipedia)"
    },
    {
        text: "It is not the strongest of the species that survives, nor the most intelligent, but the one most responsive to change.",
        author: "Charles Darwin",
        dates: "1809-1882",
        link: "https://en.wikipedia.org/wiki/Charles_Darwin",
        linkTitle: "More about Darwin (Wikipedia)"
    },
    {
        text: "To love oneself is the beginning of a lifelong romance.",
        author: "Oscar Wilde",
        dates: "1854-1900",
        link: "https://en.wikipedia.org/wiki/Oscar_Wilde",
        linkTitle: "More about Wilde (Wikipedia)"
    },
    {
        text: "You must be the change you wish to see in the world.",
        author: "Mahatma Gandhi",
        dates: "1869-1948",
        link: "https://en.wikipedia.org/wiki/Mahatma_Gandhi",
        linkTitle: "More about Gandhi (Wikipedia)"
    },
    {
        text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela",
        dates: "1918-2013",
        link: "https://en.wikipedia.org/wiki/Nelson_Mandela",
        linkTitle: "More about Mandela (Wikipedia)"
    },
    {
        text: "Not all those who wander are lost.",
        author: "J.R.R. Tolkien",
        dates: "1892-1973",
        link: "https://en.wikipedia.org/wiki/J._R._R._Tolkien",
        linkTitle: "More about Tolkien (Wikipedia)"
    },
    {
        text: "If you judge people, you have no time to love them.",
        author: "Mother Teresa",
        dates: "1910-1997",
        link: "https://en.wikipedia.org/wiki/Mother_Teresa",
        linkTitle: "More about Mother Teresa (Wikipedia)"
    },
    {
        text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        author: "Ralph Waldo Emerson",
        dates: "1803-1882",
        link: "https://en.wikipedia.org/wiki/Ralph_Waldo_Emerson",
        linkTitle: "More about Emerson (Wikipedia)"
    },
    {
        text: "Happiness is not something ready made. It comes from your own actions.",
        author: "Dalai Lama XIV",
        dates: "1935-",
        link: "https://en.wikipedia.org/wiki/14th_Dalai_Lama",
        linkTitle: "More about Dalai Lama (Wikipedia)"
    },
    {
        text: "Go confidently in the direction of your dreams. Live the life you have imagined.",
        author: "Henry David Thoreau",
        dates: "1817-1862",
        link: "https://en.wikipedia.org/wiki/Henry_David_Thoreau",
        linkTitle: "More about Thoreau (Wikipedia)"
    },
    {
        text: "In three words I can sum up everything I learned about life: it goes on.",
        author: "Robert Frost",
        dates: "1874-1963",
        link: "https://en.wikipedia.org/wiki/Robert_Frost",
        linkTitle: "More about Frost (Wikipedia)"
    },
    {
        text: "The purpose of our lives is to be happy.",
        author: "Dalai Lama XIV",
        dates: "1935-",
        link: "https://en.wikipedia.org/wiki/14th_Dalai_Lama",
        linkTitle: "More about Dalai Lama (Wikipedia)"
    },
    {
        text: "Many of life's failures are people who did not realize how close they were to success when they gave up.",
        author: "Thomas Edison",
        dates: "1847-1931",
        link: "https://en.wikipedia.org/wiki/Thomas_Edison",
        linkTitle: "More about Edison (Wikipedia)"
    },
    {
        text: "You only live once, but if you do it right, once is enough.",
        author: "Mae West",
        dates: "1893-1980",
        link: "https://en.wikipedia.org/wiki/Mae_West",
        linkTitle: "More about West (Wikipedia)"
    },
    {
        text: "Life is really simple, but we insist on making it complicated.",
        author: "Confucius",
        dates: "551-479 BC",
        link: "https://en.wikipedia.org/wiki/Confucius",
        linkTitle: "More about Confucius (Wikipedia)"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        dates: "1884-1962",
        link: "https://en.wikipedia.org/wiki/Eleanor_Roosevelt",
        linkTitle: "More about Roosevelt (Wikipedia)"
    },
    {
        text: "It always seems impossible until it is done.",
        author: "Nelson Mandela",
        dates: "1918-2013",
        link: "https://en.wikipedia.org/wiki/Nelson_Mandela",
        linkTitle: "More about Mandela (Wikipedia)"
    },
    {
        text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
        author: "Mother Teresa",
        dates: "1910-1997",
        link: "https://en.wikipedia.org/wiki/Mother_Teresa",
        linkTitle: "More about Mother Teresa (Wikipedia)"
    },
    {
        text: "Everything you can imagine is real.",
        author: "Pablo Picasso",
        dates: "1881-1973",
        link: "https://en.wikipedia.org/wiki/Pablo_Picasso",
        linkTitle: "More about Picasso (Wikipedia)"
    },
    {
        text: "I have not failed. I have just found 10,000 ways that will not work.",
        author: "Thomas Edison",
        dates: "1847-1931",
        link: "https://en.wikipedia.org/wiki/Thomas_Edison",
        linkTitle: "More about Edison (Wikipedia)"
    },
    {
        text: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins",
        dates: "1960-",
        link: "https://en.wikipedia.org/wiki/Tony_Robbins",
        linkTitle: "More about Robbins (Wikipedia)"
    },
    {
        text: "Life is either a daring adventure or nothing at all.",
        author: "Helen Keller",
        dates: "1880-1968",
        link: "https://en.wikipedia.org/wiki/Helen_Keller",
        linkTitle: "More about Keller (Wikipedia)"
    },
    {
        text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
        author: "Benjamin Franklin",
        dates: "1706-1790",
        link: "https://en.wikipedia.org/wiki/Benjamin_Franklin",
        linkTitle: "More about Franklin (Wikipedia)"
    },
    {
        text: "What we achieve inwardly will change outer reality.",
        author: "Plutarch",
        dates: "46-120 AD",
        link: "https://en.wikipedia.org/wiki/Plutarch",
        linkTitle: "More about Plutarch (Wikipedia)"
    },
    {
        text: "Leap, and the net will appear.",
        author: "John Burroughs",
        dates: "1837-1921",
        link: "https://en.wikipedia.org/wiki/John_Burroughs",
        linkTitle: "More about Burroughs (Wikipedia)"
    },
    // March (31 days)
    {
        text: "Our lives begin to end the day we become silent about things that matter.",
        author: "Martin Luther King Jr.",
        dates: "1929-1968",
        link: "https://en.wikipedia.org/wiki/Martin_Luther_King_Jr.",
        linkTitle: "More about King (Wikipedia)"
    },
    {
        text: "Well done is better than well said.",
        author: "Benjamin Franklin",
        dates: "1706-1790",
        link: "https://en.wikipedia.org/wiki/Benjamin_Franklin",
        linkTitle: "More about Franklin (Wikipedia)"
    },
    {
        text: "Never let the fear of striking out keep you from playing the game.",
        author: "Babe Ruth",
        dates: "1895-1948",
        link: "https://en.wikipedia.org/wiki/Babe_Ruth",
        linkTitle: "More about Ruth (Wikipedia)"
    },
    {
        text: "Act as if what you do makes a difference. It does.",
        author: "William James",
        dates: "1842-1910",
        link: "https://en.wikipedia.org/wiki/William_James",
        linkTitle: "More about James (Wikipedia)"
    },
    {
        text: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
        author: "Zig Ziglar",
        dates: "1926-2012",
        link: "https://en.wikipedia.org/wiki/Zig_Ziglar",
        linkTitle: "More about Ziglar (Wikipedia)"
    },
    {
        text: "I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character.",
        author: "Martin Luther King Jr.",
        dates: "1929-1968",
        link: "https://en.wikipedia.org/wiki/Martin_Luther_King_Jr.",
        linkTitle: "More about King (Wikipedia)"
    },
    {
        text: "Believe you can and you are halfway there.",
        author: "Theodore Roosevelt",
        dates: "1858-1919",
        link: "https://en.wikipedia.org/wiki/Theodore_Roosevelt",
        linkTitle: "More about Roosevelt (Wikipedia)"
    },
    {
        text: "There is nothing permanent except change.",
        author: "Heraclitus",
        dates: "535-475 BC",
        link: "https://en.wikipedia.org/wiki/Heraclitus",
        linkTitle: "More about Heraclitus (Wikipedia)"
    },
    {
        text: "If you look at what you have in life, you will always have more.",
        author: "Oprah Winfrey",
        dates: "1954-",
        link: "https://en.wikipedia.org/wiki/Oprah_Winfrey",
        linkTitle: "More about Winfrey (Wikipedia)"
    },
    {
        text: "No one can make you feel inferior without your consent.",
        author: "Eleanor Roosevelt",
        dates: "1884-1962",
        link: "https://en.wikipedia.org/wiki/Eleanor_Roosevelt",
        linkTitle: "More about Roosevelt (Wikipedia)"
    },
    {
        text: "The only limit to our realization of tomorrow is our doubts of today.",
        author: "Franklin D. Roosevelt",
        dates: "1882-1945",
        link: "https://en.wikipedia.org/wiki/Franklin_D._Roosevelt",
        linkTitle: "More about Roosevelt (Wikipedia)"
    },
    {
        text: "I cannot teach anybody anything. I can only make them think.",
        author: "Socrates",
        dates: "470-399 BC",
        link: "https://en.wikipedia.org/wiki/Socrates",
        linkTitle: "More about Socrates (Wikipedia)"
    },
    {
        text: "A person who never made a mistake never tried anything new.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://en.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "More about Einstein (Wikipedia)"
    },
    {
        text: "Everything has beauty, but not everyone sees it.",
        author: "Confucius",
        dates: "551-479 BC",
        link: "https://en.wikipedia.org/wiki/Confucius",
        linkTitle: "More about Confucius (Wikipedia)"
    },
    {
        text: "How wonderful it is that nobody need wait a single moment before starting to improve the world.",
        author: "Anne Frank",
        dates: "1929-1945",
        link: "https://en.wikipedia.org/wiki/Anne_Frank",
        linkTitle: "More about Frank (Wikipedia)"
    },
    {
        text: "Simplicity is the ultimate sophistication.",
        author: "Leonardo da Vinci",
        dates: "1452-1519",
        link: "https://en.wikipedia.org/wiki/Leonardo_da_Vinci",
        linkTitle: "More about da Vinci (Wikipedia)"
    },
    {
        text: "Education is the most powerful weapon which you can use to change the world.",
        author: "Nelson Mandela",
        dates: "1918-2013",
        link: "https://en.wikipedia.org/wiki/Nelson_Mandela",
        linkTitle: "More about Mandela (Wikipedia)"
    },
    {
        text: "Two things are infinite: the universe and human stupidity; and I am not sure about the universe.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://en.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "More about Einstein (Wikipedia)"
    },
    {
        text: "You can never cross the ocean until you have the courage to lose sight of the shore.",
        author: "Christopher Columbus",
        dates: "1451-1506",
        link: "https://en.wikipedia.org/wiki/Christopher_Columbus",
        linkTitle: "More about Columbus (Wikipedia)"
    },
    {
        text: "Try not to become a man of success, but rather try to become a man of value.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://en.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "More about Einstein (Wikipedia)"
    },
    {
        text: "There is no greater agony than bearing an untold story inside you.",
        author: "Maya Angelou",
        dates: "1928-2014",
        link: "https://en.wikipedia.org/wiki/Maya_Angelou",
        linkTitle: "More about Angelou (Wikipedia)"
    },
    {
        text: "The greatest wealth is to live content with little.",
        author: "Plato",
        dates: "428-348 BC",
        link: "https://en.wikipedia.org/wiki/Plato",
        linkTitle: "More about Plato (Wikipedia)"
    },
    {
        text: "Peace begins with a smile.",
        author: "Mother Teresa",
        dates: "1910-1997",
        link: "https://en.wikipedia.org/wiki/Mother_Teresa",
        linkTitle: "More about Mother Teresa (Wikipedia)"
    },
    {
        text: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius",
        dates: "551-479 BC",
        link: "https://en.wikipedia.org/wiki/Confucius",
        linkTitle: "More about Confucius (Wikipedia)"
    },
    {
        text: "Nothing is impossible, the word itself says I'm possible.",
        author: "Audrey Hepburn",
        dates: "1929-1993",
        link: "https://en.wikipedia.org/wiki/Audrey_Hepburn",
        linkTitle: "More about Hepburn (Wikipedia)"
    },
    {
        text: "Courage is not the absence of fear, but the triumph over it.",
        author: "Nelson Mandela",
        dates: "1918-2013",
        link: "https://en.wikipedia.org/wiki/Nelson_Mandela",
        linkTitle: "More about Mandela (Wikipedia)"
    },
    {
        text: "If you want to lift yourself up, lift up someone else.",
        author: "Booker T. Washington",
        dates: "1856-1915",
        link: "https://en.wikipedia.org/wiki/Booker_T._Washington",
        linkTitle: "More about Washington (Wikipedia)"
    },
    {
        text: "What we know is a drop, what we do not know is an ocean.",
        author: "Isaac Newton",
        dates: "1643-1727",
        link: "https://en.wikipedia.org/wiki/Isaac_Newton",
        linkTitle: "More about Newton (Wikipedia)"
    },
    {
        text: "Strive not to be a success, but rather to be of value.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://en.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "More about Einstein (Wikipedia)"
    },
    {
        text: "We must learn to live together as brothers or perish together as fools.",
        author: "Martin Luther King Jr.",
        dates: "1929-1968",
        link: "https://en.wikipedia.org/wiki/Martin_Luther_King_Jr.",
        linkTitle: "More about King (Wikipedia)"
    },
    {
        text: "The world is a book and those who do not travel read only one page.",
        author: "Saint Augustine",
        dates: "354-430",
        link: "https://en.wikipedia.org/wiki/Augustine_of_Hippo",
        linkTitle: "More about Augustine (Wikipedia)"
    },
    // April (30 days)
    {
        text: "Every moment is a fresh beginning.",
        author: "T.S. Eliot",
        dates: "1888-1965",
        link: "https://en.wikipedia.org/wiki/T._S._Eliot",
        linkTitle: "More about Eliot (Wikipedia)"
    },
    {
        text: "The secret of getting ahead is getting started.",
        author: "Mark Twain",
        dates: "1835-1910",
        link: "https://en.wikipedia.org/wiki/Mark_Twain",
        linkTitle: "More about Twain (Wikipedia)"
    },
    {
        text: "Quality is not an act, it is a habit.",
        author: "Aristotle",
        dates: "384-322 BC",
        link: "https://en.wikipedia.org/wiki/Aristotle",
        linkTitle: "More about Aristotle (Wikipedia)"
    },
    {
        text: "When one door of happiness closes, another opens.",
        author: "Helen Keller",
        dates: "1880-1968",
        link: "https://en.wikipedia.org/wiki/Helen_Keller",
        linkTitle: "More about Keller (Wikipedia)"
    },
    {
        text: "If you cannot do great things, do small things in a great way.",
        author: "Napoleon Hill",
        dates: "1883-1970",
        link: "https://en.wikipedia.org/wiki/Napoleon_Hill",
        linkTitle: "More about Hill (Wikipedia)"
    },
    {
        text: "Happiness depends upon ourselves.",
        author: "Aristotle",
        dates: "384-322 BC",
        link: "https://en.wikipedia.org/wiki/Aristotle",
        linkTitle: "More about Aristotle (Wikipedia)"
    },
    {
        text: "We become what we think about.",
        author: "Earl Nightingale",
        dates: "1921-1989",
        link: "https://en.wikipedia.org/wiki/Earl_Nightingale",
        linkTitle: "More about Nightingale (Wikipedia)"
    },
    {
        text: "With the new day comes new strength and new thoughts.",
        author: "Eleanor Roosevelt",
        dates: "1884-1962",
        link: "https://en.wikipedia.org/wiki/Eleanor_Roosevelt",
        linkTitle: "More about Roosevelt (Wikipedia)"
    },
    {
        text: "Twenty years from now you will be more disappointed by the things that you did not do than by the ones you did do.",
        author: "Mark Twain",
        dates: "1835-1910",
        link: "https://en.wikipedia.org/wiki/Mark_Twain",
        linkTitle: "More about Twain (Wikipedia)"
    },
    {
        text: "The best revenge is massive success.",
        author: "Frank Sinatra",
        dates: "1915-1998",
        link: "https://en.wikipedia.org/wiki/Frank_Sinatra",
        linkTitle: "More about Sinatra (Wikipedia)"
    },
    {
        text: "A man is but the product of his thoughts. What he thinks, he becomes.",
        author: "Mahatma Gandhi",
        dates: "1869-1948",
        link: "https://en.wikipedia.org/wiki/Mahatma_Gandhi",
        linkTitle: "More about Gandhi (Wikipedia)"
    },
    {
        text: "The two most important days in your life are the day you are born and the day you find out why.",
        author: "Mark Twain",
        dates: "1835-1910",
        link: "https://en.wikipedia.org/wiki/Mark_Twain",
        linkTitle: "More about Twain (Wikipedia)"
    },
    {
        text: "Change your thoughts and you change your world.",
        author: "Norman Vincent Peale",
        dates: "1898-1993",
        link: "https://en.wikipedia.org/wiki/Norman_Vincent_Peale",
        linkTitle: "More about Peale (Wikipedia)"
    },
    {
        text: "There is only one happiness in this life, to love and be loved.",
        author: "George Sand",
        dates: "1804-1876",
        link: "https://en.wikipedia.org/wiki/George_Sand",
        linkTitle: "More about Sand (Wikipedia)"
    },
    {
        text: "The pen is mightier than the sword.",
        author: "Edward Bulwer-Lytton",
        dates: "1803-1873",
        link: "https://en.wikipedia.org/wiki/Edward_Bulwer-Lytton",
        linkTitle: "More about Bulwer-Lytton (Wikipedia)"
    },
    {
        text: "The measure of intelligence is the ability to change.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://en.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "More about Einstein (Wikipedia)"
    },
    {
        text: "Great minds discuss ideas; average minds discuss events; small minds discuss people.",
        author: "Eleanor Roosevelt",
        dates: "1884-1962",
        link: "https://en.wikipedia.org/wiki/Eleanor_Roosevelt",
        linkTitle: "More about Roosevelt (Wikipedia)"
    },
    {
        text: "Love the life you live. Live the life you love.",
        author: "Bob Marley",
        dates: "1945-1981",
        link: "https://en.wikipedia.org/wiki/Bob_Marley",
        linkTitle: "More about Marley (Wikipedia)"
    },
    {
        text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate.",
        author: "Ralph Waldo Emerson",
        dates: "1803-1882",
        link: "https://en.wikipedia.org/wiki/Ralph_Waldo_Emerson",
        linkTitle: "More about Emerson (Wikipedia)"
    },
    {
        text: "We do not remember days, we remember moments.",
        author: "Cesare Pavese",
        dates: "1908-1950",
        link: "https://en.wikipedia.org/wiki/Cesare_Pavese",
        linkTitle: "More about Pavese (Wikipedia)"
    },
    {
        text: "One person can make a difference, and everyone should try.",
        author: "John F. Kennedy",
        dates: "1917-1963",
        link: "https://en.wikipedia.org/wiki/John_F._Kennedy",
        linkTitle: "More about Kennedy (Wikipedia)"
    },
    {
        text: "What counts in life is not the mere fact that we have lived.",
        author: "Nelson Mandela",
        dates: "1918-2013",
        link: "https://en.wikipedia.org/wiki/Nelson_Mandela",
        linkTitle: "More about Mandela (Wikipedia)"
    },
    {
        text: "The only person you are destined to become is the person you decide to be.",
        author: "Ralph Waldo Emerson",
        dates: "1803-1882",
        link: "https://en.wikipedia.org/wiki/Ralph_Waldo_Emerson",
        linkTitle: "More about Emerson (Wikipedia)"
    },
    {
        text: "What is a friend? A single soul dwelling in two bodies.",
        author: "Aristotle",
        dates: "384-322 BC",
        link: "https://en.wikipedia.org/wiki/Aristotle",
        linkTitle: "More about Aristotle (Wikipedia)"
    },
    {
        text: "Wisely and slow; they stumble that run fast.",
        author: "William Shakespeare",
        dates: "1564-1616",
        link: "https://en.wikipedia.org/wiki/William_Shakespeare",
        linkTitle: "More about Shakespeare (Wikipedia)"
    },
    {
        text: "An eye for an eye only ends up making the whole world blind.",
        author: "Mahatma Gandhi",
        dates: "1869-1948",
        link: "https://en.wikipedia.org/wiki/Mahatma_Gandhi",
        linkTitle: "More about Gandhi (Wikipedia)"
    },
    {
        text: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
        author: "Ralph Waldo Emerson",
        dates: "1803-1882",
        link: "https://en.wikipedia.org/wiki/Ralph_Waldo_Emerson",
        linkTitle: "More about Emerson (Wikipedia)"
    },
    {
        text: "If you tell the truth, you do not have to remember anything.",
        author: "Mark Twain",
        dates: "1835-1910",
        link: "https://en.wikipedia.org/wiki/Mark_Twain",
        linkTitle: "More about Twain (Wikipedia)"
    },
    {
        text: "I have learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
        author: "Maya Angelou",
        dates: "1928-2014",
        link: "https://en.wikipedia.org/wiki/Maya_Angelou",
        linkTitle: "More about Angelou (Wikipedia)"
    },
    {
        text: "Kind words can be short and easy to speak, but their echoes are truly endless.",
        author: "Mother Teresa",
        dates: "1910-1997",
        link: "https://en.wikipedia.org/wiki/Mother_Teresa",
        linkTitle: "More about Mother Teresa (Wikipedia)"
    },
    // May (31 days)
    {
        text: "The greatest discovery of all time is that a person can change his future by merely changing his attitude.",
        author: "Oprah Winfrey",
        dates: "1954-",
        link: "https://en.wikipedia.org/wiki/Oprah_Winfrey",
        linkTitle: "More about Winfrey (Wikipedia)"
    },
    {
        text: "To live is the rarest thing in the world. Most people exist, that is all.",
        author: "Oscar Wilde",
        dates: "1854-1900",
        link: "https://en.wikipedia.org/wiki/Oscar_Wilde",
        linkTitle: "More about Wilde (Wikipedia)"
    },
    {
        text: "The weak can never forgive. Forgiveness is the attribute of the strong.",
        author: "Mahatma Gandhi",
        dates: "1869-1948",
        link: "https://en.wikipedia.org/wiki/Mahatma_Gandhi",
        linkTitle: "More about Gandhi (Wikipedia)"
    },
    {
        text: "Real knowledge is to know the extent of one's ignorance.",
        author: "Confucius",
        dates: "551-479 BC",
        link: "https://en.wikipedia.org/wiki/Confucius",
        linkTitle: "More about Confucius (Wikipedia)"
    },
    {
        text: "Without music, life would be a mistake.",
        author: "Friedrich Nietzsche",
        dates: "1844-1900",
        link: "https://en.wikipedia.org/wiki/Friedrich_Nietzsche",
        linkTitle: "More about Nietzsche (Wikipedia)"
    },
    {
        text: "We may encounter many defeats but we must not be defeated.",
        author: "Maya Angelou",
        dates: "1928-2014",
        link: "https://en.wikipedia.org/wiki/Maya_Angelou",
        linkTitle: "More about Angelou (Wikipedia)"
    },
    {
        text: "Whether you think you can or you think you cannot, you are right.",
        author: "Henry Ford",
        dates: "1863-1947",
        link: "https://en.wikipedia.org/wiki/Henry_Ford",
        linkTitle: "More about Ford (Wikipedia)"
    },
    {
        text: "Be yourself; everyone else is already taken.",
        author: "Oscar Wilde",
        dates: "1854-1900",
        link: "https://en.wikipedia.org/wiki/Oscar_Wilde",
        linkTitle: "More about Wilde (Wikipedia)"
    },
    {
        text: "He who has a why to live can bear almost any how.",
        author: "Friedrich Nietzsche",
        dates: "1844-1900",
        link: "https://en.wikipedia.org/wiki/Friedrich_Nietzsche",
        linkTitle: "More about Nietzsche (Wikipedia)"
    },
    {
        text: "The energy of the mind is the essence of life.",
        author: "Aristotle",
        dates: "384-322 BC",
        link: "https://en.wikipedia.org/wiki/Aristotle",
        linkTitle: "More about Aristotle (Wikipedia)"
    },
    {
        text: "It is better to be feared than loved, if you cannot be both.",
        author: "Niccolo Machiavelli",
        dates: "1469-1527",
        link: "https://en.wikipedia.org/wiki/Niccol%C3%B2_Machiavelli",
        linkTitle: "More about Machiavelli (Wikipedia)"
    },
    {
        text: "To be great is to be misunderstood.",
        author: "Ralph Waldo Emerson",
        dates: "1803-1882",
        link: "https://en.wikipedia.org/wiki/Ralph_Waldo_Emerson",
        linkTitle: "More about Emerson (Wikipedia)"
    },
    {
        text: "Our greatest glory is not in never falling, but in rising every time we fall.",
        author: "Confucius",
        dates: "551-479 BC",
        link: "https://en.wikipedia.org/wiki/Confucius",
        linkTitle: "More about Confucius (Wikipedia)"
    },
    {
        text: "The only way to have a friend is to be one.",
        author: "Ralph Waldo Emerson",
        dates: "1803-1882",
        link: "https://en.wikipedia.org/wiki/Ralph_Waldo_Emerson",
        linkTitle: "More about Emerson (Wikipedia)"
    },
    {
        text: "A fool thinks himself to be wise, but a wise man knows himself to be a fool.",
        author: "William Shakespeare",
        dates: "1564-1616",
        link: "https://en.wikipedia.org/wiki/William_Shakespeare",
        linkTitle: "More about Shakespeare (Wikipedia)"
    },
    {
        text: "Injustice anywhere is a threat to justice everywhere.",
        author: "Martin Luther King Jr.",
        dates: "1929-1968",
        link: "https://en.wikipedia.org/wiki/Martin_Luther_King_Jr.",
        linkTitle: "More about King (Wikipedia)"
    },
    {
        text: "In the end, it is not the years in your life that count. It is the life in your years.",
        author: "Abraham Lincoln",
        dates: "1809-1865",
        link: "https://en.wikipedia.org/wiki/Abraham_Lincoln",
        linkTitle: "More about Lincoln (Wikipedia)"
    },
    {
        text: "I am not a product of my circumstances. I am a product of my decisions.",
        author: "Stephen Covey",
        dates: "1932-2012",
        link: "https://en.wikipedia.org/wiki/Stephen_Covey",
        linkTitle: "More about Covey (Wikipedia)"
    },
    {
        text: "We know what we are, but know not what we may be.",
        author: "William Shakespeare",
        dates: "1564-1616",
        link: "https://en.wikipedia.org/wiki/William_Shakespeare",
        linkTitle: "More about Shakespeare (Wikipedia)"
    },
    {
        text: "If you want to shine like a sun, first burn like a sun.",
        author: "A.P.J. Abdul Kalam",
        dates: "1931-2015",
        link: "https://en.wikipedia.org/wiki/A._P._J._Abdul_Kalam",
        linkTitle: "More about Kalam (Wikipedia)"
    },
    {
        text: "Happiness is when what you think, what you say, and what you do are in harmony.",
        author: "Mahatma Gandhi",
        dates: "1869-1948",
        link: "https://en.wikipedia.org/wiki/Mahatma_Gandhi",
        linkTitle: "More about Gandhi (Wikipedia)"
    },
    {
        text: "Have no fear of perfection, you will never reach it.",
        author: "Salvador Dali",
        dates: "1904-1989",
        link: "https://en.wikipedia.org/wiki/Salvador_Dal%C3%AD",
        linkTitle: "More about Dali (Wikipedia)"
    },
    {
        text: "It is health that is real wealth and not pieces of gold and silver.",
        author: "Mahatma Gandhi",
        dates: "1869-1948",
        link: "https://en.wikipedia.org/wiki/Mahatma_Gandhi",
        linkTitle: "More about Gandhi (Wikipedia)"
    },
    {
        text: "The best preparation for tomorrow is doing your best today.",
        author: "H. Jackson Brown Jr.",
        dates: "1940-2021",
        link: "https://en.wikipedia.org/wiki/H._Jackson_Brown_Jr.",
        linkTitle: "More about Brown (Wikipedia)"
    },
    {
        text: "If opportunity does not knock, build a door.",
        author: "Milton Berle",
        dates: "1908-2002",
        link: "https://en.wikipedia.org/wiki/Milton_Berle",
        linkTitle: "More about Berle (Wikipedia)"
    },
    {
        text: "I destroy my enemies when I make them my friends.",
        author: "Abraham Lincoln",
        dates: "1809-1865",
        link: "https://en.wikipedia.org/wiki/Abraham_Lincoln",
        linkTitle: "More about Lincoln (Wikipedia)"
    },
    {
        text: "Love is composed of a single soul inhabiting two bodies.",
        author: "Aristotle",
        dates: "384-322 BC",
        link: "https://en.wikipedia.org/wiki/Aristotle",
        linkTitle: "More about Aristotle (Wikipedia)"
    },
    {
        text: "The most common way people give up their power is by thinking they do not have any.",
        author: "Alice Walker",
        dates: "1944-",
        link: "https://en.wikipedia.org/wiki/Alice_Walker",
        linkTitle: "More about Walker (Wikipedia)"
    },
    {
        text: "Let us always meet each other with smile, for the smile is the beginning of love.",
        author: "Mother Teresa",
        dates: "1910-1997",
        link: "https://en.wikipedia.org/wiki/Mother_Teresa",
        linkTitle: "More about Mother Teresa (Wikipedia)"
    },
    {
        text: "Few things can help an individual more than to place responsibility on him and to let him know that you trust him.",
        author: "Booker T. Washington",
        dates: "1856-1915",
        link: "https://en.wikipedia.org/wiki/Booker_T._Washington",
        linkTitle: "More about Washington (Wikipedia)"
    },
    {
        text: "All our dreams can come true, if we have the courage to pursue them.",
        author: "Walt Disney",
        dates: "1901-1966",
        link: "https://en.wikipedia.org/wiki/Walt_Disney",
        linkTitle: "More about Disney (Wikipedia)"
    },
    // June (30 days)
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
        dates: "1901-1966",
        link: "https://en.wikipedia.org/wiki/Walt_Disney",
        linkTitle: "More about Disney (Wikipedia)"
    },
    {
        text: "If we did all the things we are capable of, we would literally astound ourselves.",
        author: "Thomas Edison",
        dates: "1847-1931",
        link: "https://en.wikipedia.org/wiki/Thomas_Edison",
        linkTitle: "More about Edison (Wikipedia)"
    },
    {
        text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
        author: "Mahatma Gandhi",
        dates: "1869-1948",
        link: "https://en.wikipedia.org/wiki/Mahatma_Gandhi",
        linkTitle: "More about Gandhi (Wikipedia)"
    },
    {
        text: "Perfection is not attainable, but if we chase perfection we can catch excellence.",
        author: "Vince Lombardi",
        dates: "1913-1970",
        link: "https://en.wikipedia.org/wiki/Vince_Lombardi",
        linkTitle: "More about Lombardi (Wikipedia)"
    },
    {
        text: "The true sign of intelligence is not knowledge but imagination.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://en.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "More about Einstein (Wikipedia)"
    },
    {
        text: "Only a life lived for others is a life worthwhile.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://en.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "More about Einstein (Wikipedia)"
    },
    {
        text: "Wit is educated insolence.",
        author: "Aristotle",
        dates: "384-322 BC",
        link: "https://en.wikipedia.org/wiki/Aristotle",
        linkTitle: "More about Aristotle (Wikipedia)"
    },
    {
        text: "When you reach the end of your rope, tie a knot in it and hang on.",
        author: "Franklin D. Roosevelt",
        dates: "1882-1945",
        link: "https://en.wikipedia.org/wiki/Franklin_D._Roosevelt",
        linkTitle: "More about Roosevelt (Wikipedia)"
    },
    {
        text: "Ask not what your country can do for you, ask what you can do for your country.",
        author: "John F. Kennedy",
        dates: "1917-1963",
        link: "https://en.wikipedia.org/wiki/John_F._Kennedy",
        linkTitle: "More about Kennedy (Wikipedia)"
    },
    {
        text: "Friendship is one mind in two bodies.",
        author: "Mencius",
        dates: "372-289 BC",
        link: "https://en.wikipedia.org/wiki/Mencius",
        linkTitle: "More about Mencius (Wikipedia)"
    },
    {
        text: "The best way out is always through.",
        author: "Robert Frost",
        dates: "1874-1963",
        link: "https://en.wikipedia.org/wiki/Robert_Frost",
        linkTitle: "More about Frost (Wikipedia)"
    },
    {
        text: "Never give in, never give in, never, never, never.",
        author: "Winston Churchill",
        dates: "1874-1965",
        link: "https://en.wikipedia.org/wiki/Winston_Churchill",
        linkTitle: "More about Churchill (Wikipedia)"
    },
    {
        text: "Luck is what happens when preparation meets opportunity.",
        author: "Seneca",
        dates: "4 BC-65 AD",
        link: "https://en.wikipedia.org/wiki/Seneca_the_Younger",
        linkTitle: "More about Seneca (Wikipedia)"
    },
    {
        text: "We are not permitted to choose the frame of our destiny. But what we put into it is ours.",
        author: "Dag Hammarskjold",
        dates: "1905-1961",
        link: "https://en.wikipedia.org/wiki/Dag_Hammarskj%C3%B6ld",
        linkTitle: "More about Hammarskjold (Wikipedia)"
    },
    {
        text: "The only thing necessary for the triumph of evil is for good men to do nothing.",
        author: "Edmund Burke",
        dates: "1729-1797",
        link: "https://en.wikipedia.org/wiki/Edmund_Burke",
        linkTitle: "More about Burke (Wikipedia)"
    },
    {
        text: "A life spent making mistakes is not only more honorable, but more useful than a life spent doing nothing.",
        author: "George Bernard Shaw",
        dates: "1856-1950",
        link: "https://en.wikipedia.org/wiki/George_Bernard_Shaw",
        linkTitle: "More about Shaw (Wikipedia)"
    },
    {
        text: "The question is not what you look at, but what you see.",
        author: "Henry David Thoreau",
        dates: "1817-1862",
        link: "https://en.wikipedia.org/wiki/Henry_David_Thoreau",
        linkTitle: "More about Thoreau (Wikipedia)"
    },
    {
        text: "I would rather die of passion than of boredom.",
        author: "Vincent van Gogh",
        dates: "1853-1890",
        link: "https://en.wikipedia.org/wiki/Vincent_van_Gogh",
        linkTitle: "More about van Gogh (Wikipedia)"
    },
    {
        text: "One must still have chaos in oneself to be able to give birth to a dancing star.",
        author: "Friedrich Nietzsche",
        dates: "1844-1900",
        link: "https://en.wikipedia.org/wiki/Friedrich_Nietzsche",
        linkTitle: "More about Nietzsche (Wikipedia)"
    },
    {
        text: "The more that you read, the more things you will know. The more that you learn, the more places you will go.",
        author: "Dr. Seuss",
        dates: "1904-1991",
        link: "https://en.wikipedia.org/wiki/Dr._Seuss",
        linkTitle: "More about Dr. Seuss (Wikipedia)"
    },
    {
        text: "We are shaped by our thoughts; we become what we think.",
        author: "Buddha",
        dates: "563-483 BC",
        link: "https://en.wikipedia.org/wiki/Gautama_Buddha",
        linkTitle: "More about Buddha (Wikipedia)"
    },
    {
        text: "A good head and a good heart are always a formidable combination.",
        author: "Nelson Mandela",
        dates: "1918-2013",
        link: "https://en.wikipedia.org/wiki/Nelson_Mandela",
        linkTitle: "More about Mandela (Wikipedia)"
    },
    {
        text: "If your actions inspire others to dream more, learn more, do more, you are a leader.",
        author: "John Quincy Adams",
        dates: "1767-1848",
        link: "https://en.wikipedia.org/wiki/John_Quincy_Adams",
        linkTitle: "More about Adams (Wikipedia)"
    },
    {
        text: "There are no facts, only interpretations.",
        author: "Friedrich Nietzsche",
        dates: "1844-1900",
        link: "https://en.wikipedia.org/wiki/Friedrich_Nietzsche",
        linkTitle: "More about Nietzsche (Wikipedia)"
    },
    {
        text: "Kindness is a language which the deaf can hear and the blind can see.",
        author: "Mark Twain",
        dates: "1835-1910",
        link: "https://en.wikipedia.org/wiki/Mark_Twain",
        linkTitle: "More about Twain (Wikipedia)"
    },
    {
        text: "If you are not willing to risk the usual, you will have to settle for the ordinary.",
        author: "Jim Rohn",
        dates: "1930-2009",
        link: "https://en.wikipedia.org/wiki/Jim_Rohn",
        linkTitle: "More about Rohn (Wikipedia)"
    },
    {
        text: "Our life is frittered away by detail. Simplify, simplify.",
        author: "Henry David Thoreau",
        dates: "1817-1862",
        link: "https://en.wikipedia.org/wiki/Henry_David_Thoreau",
        linkTitle: "More about Thoreau (Wikipedia)"
    },
    {
        text: "The man who moves a mountain begins by carrying away small stones.",
        author: "Confucius",
        dates: "551-479 BC",
        link: "https://en.wikipedia.org/wiki/Confucius",
        linkTitle: "More about Confucius (Wikipedia)"
    },
    {
        text: "Logic will get you from A to B. Imagination will take you everywhere.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://en.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "More about Einstein (Wikipedia)"
    },
    {
        text: "Everything should be made as simple as possible, but not simpler.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://en.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "More about Einstein (Wikipedia)"
    },
    // July (31 days)
    {
        text: "Freedom is not worth having if it does not include the freedom to make mistakes.",
        author: "Mahatma Gandhi",
        dates: "1869-1948",
        link: "https://en.wikipedia.org/wiki/Mahatma_Gandhi",
        linkTitle: "More about Gandhi (Wikipedia)"
    },
    {
        text: "The price of greatness is responsibility.",
        author: "Winston Churchill",
        dates: "1874-1965",
        link: "https://en.wikipedia.org/wiki/Winston_Churchill",
        linkTitle: "More about Churchill (Wikipedia)"
    },
    {
        text: "All that glitters is not gold.",
        author: "William Shakespeare",
        dates: "1564-1616",
        link: "https://en.wikipedia.org/wiki/William_Shakespeare",
        linkTitle: "More about Shakespeare (Wikipedia)"
    },
    {
        text: "A people that values its privileges above its principles soon loses both.",
        author: "Dwight D. Eisenhower",
        dates: "1890-1969",
        link: "https://en.wikipedia.org/wiki/Dwight_D._Eisenhower",
        linkTitle: "More about Eisenhower (Wikipedia)"
    },
    {
        text: "There is nothing either good or bad, but thinking makes it so.",
        author: "William Shakespeare",
        dates: "1564-1616",
        link: "https://en.wikipedia.org/wiki/William_Shakespeare",
        linkTitle: "More about Shakespeare (Wikipedia)"
    },
    {
        text: "The glow of one warm thought is to me worth more than money.",
        author: "Thomas Jefferson",
        dates: "1743-1826",
        link: "https://en.wikipedia.org/wiki/Thomas_Jefferson",
        linkTitle: "More about Jefferson (Wikipedia)"
    },
    {
        text: "Every saint has a past, and every sinner has a future.",
        author: "Oscar Wilde",
        dates: "1854-1900",
        link: "https://en.wikipedia.org/wiki/Oscar_Wilde",
        linkTitle: "More about Wilde (Wikipedia)"
    },
    {
        text: "Difficulties strengthen the mind, as labor does the body.",
        author: "Seneca",
        dates: "4 BC-65 AD",
        link: "https://en.wikipedia.org/wiki/Seneca_the_Younger",
        linkTitle: "More about Seneca (Wikipedia)"
    },
    {
        text: "The soul that is within me no man can degrade.",
        author: "Frederick Douglass",
        dates: "1818-1895",
        link: "https://en.wikipedia.org/wiki/Frederick_Douglass",
        linkTitle: "More about Douglass (Wikipedia)"
    },
    {
        text: "One child, one teacher, one book, one pen can change the world.",
        author: "Malala Yousafzai",
        dates: "1997-",
        link: "https://en.wikipedia.org/wiki/Malala_Yousafzai",
        linkTitle: "More about Yousafzai (Wikipedia)"
    },
    {
        text: "You have power over your mind, not outside events. Realize this, and you will find strength.",
        author: "Marcus Aurelius",
        dates: "121-180",
        link: "https://en.wikipedia.org/wiki/Marcus_Aurelius",
        linkTitle: "More about Aurelius (Wikipedia)"
    },
    {
        text: "Dwell on the beauty of life. Watch the stars, and see yourself running with them.",
        author: "Marcus Aurelius",
        dates: "121-180",
        link: "https://en.wikipedia.org/wiki/Marcus_Aurelius",
        linkTitle: "More about Aurelius (Wikipedia)"
    },
    {
        text: "We suffer more often in imagination than in reality.",
        author: "Seneca",
        dates: "4 BC-65 AD",
        link: "https://en.wikipedia.org/wiki/Seneca_the_Younger",
        linkTitle: "More about Seneca (Wikipedia)"
    },
    {
        text: "Waste no more time arguing about what a good man should be. Be one.",
        author: "Marcus Aurelius",
        dates: "121-180",
        link: "https://en.wikipedia.org/wiki/Marcus_Aurelius",
        linkTitle: "More about Aurelius (Wikipedia)"
    },
    {
        text: "To improve is to change; to be perfect is to change often.",
        author: "Winston Churchill",
        dates: "1874-1965",
        link: "https://en.wikipedia.org/wiki/Winston_Churchill",
        linkTitle: "More about Churchill (Wikipedia)"
    },
    {
        text: "I can resist everything except temptation.",
        author: "Oscar Wilde",
        dates: "1854-1900",
        link: "https://en.wikipedia.org/wiki/Oscar_Wilde",
        linkTitle: "More about Wilde (Wikipedia)"
    },
    {
        text: "The man who does not read has no advantage over the man who cannot read.",
        author: "Mark Twain",
        dates: "1835-1910",
        link: "https://en.wikipedia.org/wiki/Mark_Twain",
        linkTitle: "More about Twain (Wikipedia)"
    },
    {
        text: "What is done in love is done well.",
        author: "Vincent van Gogh",
        dates: "1853-1890",
        link: "https://en.wikipedia.org/wiki/Vincent_van_Gogh",
        linkTitle: "More about van Gogh (Wikipedia)"
    },
    {
        text: "The happiness of your life depends upon the quality of your thoughts.",
        author: "Marcus Aurelius",
        dates: "121-180",
        link: "https://en.wikipedia.org/wiki/Marcus_Aurelius",
        linkTitle: "More about Aurelius (Wikipedia)"
    },
    {
        text: "He who is not courageous enough to take risks will accomplish nothing in life.",
        author: "Muhammad Ali",
        dates: "1942-2016",
        link: "https://en.wikipedia.org/wiki/Muhammad_Ali",
        linkTitle: "More about Ali (Wikipedia)"
    },
    {
        text: "Very little is needed to make a happy life; it is all within yourself.",
        author: "Marcus Aurelius",
        dates: "121-180",
        link: "https://en.wikipedia.org/wiki/Marcus_Aurelius",
        linkTitle: "More about Aurelius (Wikipedia)"
    },
    {
        text: "I am the master of my fate, I am the captain of my soul.",
        author: "William Ernest Henley",
        dates: "1849-1903",
        link: "https://en.wikipedia.org/wiki/William_Ernest_Henley",
        linkTitle: "More about Henley (Wikipedia)"
    },
    {
        text: "You do not find the happy life. You make it.",
        author: "Camilla Eyring Kimball",
        dates: "1894-1987",
        link: "https://en.wikipedia.org/wiki/Camilla_Eyring_Kimball",
        linkTitle: "More about Kimball (Wikipedia)"
    },
    {
        text: "The only real failure in life is not to be true to the best one knows.",
        author: "Buddha",
        dates: "563-483 BC",
        link: "https://en.wikipedia.org/wiki/Gautama_Buddha",
        linkTitle: "More about Buddha (Wikipedia)"
    },
    {
        text: "Life shrinks or expands in proportion to one's courage.",
        author: "Anais Nin",
        dates: "1903-1977",
        link: "https://en.wikipedia.org/wiki/Ana%C3%AFs_Nin",
        linkTitle: "More about Nin (Wikipedia)"
    },
    {
        text: "Start where you are. Use what you have. Do what you can.",
        author: "Arthur Ashe",
        dates: "1943-1993",
        link: "https://en.wikipedia.org/wiki/Arthur_Ashe",
        linkTitle: "More about Ashe (Wikipedia)"
    },
    {
        text: "The limits of my language mean the limits of my world.",
        author: "Ludwig Wittgenstein",
        dates: "1889-1951",
        link: "https://en.wikipedia.org/wiki/Ludwig_Wittgenstein",
        linkTitle: "More about Wittgenstein (Wikipedia)"
    },
    {
        text: "Dream big and dare to fail.",
        author: "Norman Vaughan",
        dates: "1905-2005",
        link: "https://en.wikipedia.org/wiki/Norman_Vaughan",
        linkTitle: "More about Vaughan (Wikipedia)"
    },
    {
        text: "First they ignore you, then they laugh at you, then they fight you, then you win.",
        author: "Mahatma Gandhi",
        dates: "1869-1948",
        link: "https://en.wikipedia.org/wiki/Mahatma_Gandhi",
        linkTitle: "More about Gandhi (Wikipedia)"
    },
    {
        text: "Not how long, but how well you have lived is the main thing.",
        author: "Seneca",
        dates: "4 BC-65 AD",
        link: "https://en.wikipedia.org/wiki/Seneca_the_Younger",
        linkTitle: "More about Seneca (Wikipedia)"
    },
    {
        text: "If you want to go fast, go alone. If you want to go far, go together.",
        author: "African Proverb",
        dates: "",
        link: "https://en.wikipedia.org/wiki/African_proverbs",
        linkTitle: "More about African Proverbs (Wikipedia)"
    },
    // August (31 days)
    {
        text: "Knowing is not enough; we must apply. Willing is not enough; we must do.",
        author: "Johann Wolfgang von Goethe",
        dates: "1749-1832",
        link: "https://en.wikipedia.org/wiki/Johann_Wolfgang_von_Goethe",
        linkTitle: "More about Goethe (Wikipedia)"
    },
    {
        text: "Hope is the thing with feathers that perches in the soul.",
        author: "Emily Dickinson",
        dates: "1830-1886",
        link: "https://en.wikipedia.org/wiki/Emily_Dickinson",
        linkTitle: "More about Dickinson (Wikipedia)"
    },
    {
        text: "The only thing that interferes with my learning is my education.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://en.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "More about Einstein (Wikipedia)"
    },
    {
        text: "It was the best of times, it was the worst of times.",
        author: "Charles Dickens",
        dates: "1812-1870",
        link: "https://en.wikipedia.org/wiki/Charles_Dickens",
        linkTitle: "More about Dickens (Wikipedia)"
    },
    {
        text: "The truth is rarely pure and never simple.",
        author: "Oscar Wilde",
        dates: "1854-1900",
        link: "https://en.wikipedia.org/wiki/Oscar_Wilde",
        linkTitle: "More about Wilde (Wikipedia)"
    },
    {
        text: "Courage is resistance to fear, mastery of fear, not absence of fear.",
        author: "Mark Twain",
        dates: "1835-1910",
        link: "https://en.wikipedia.org/wiki/Mark_Twain",
        linkTitle: "More about Twain (Wikipedia)"
    },
    {
        text: "Out of the crooked timber of humanity, no straight thing was ever made.",
        author: "Immanuel Kant",
        dates: "1724-1804",
        link: "https://en.wikipedia.org/wiki/Immanuel_Kant",
        linkTitle: "More about Kant (Wikipedia)"
    },
    {
        text: "The greatest thing in the world is to know how to belong to oneself.",
        author: "Michel de Montaigne",
        dates: "1533-1592",
        link: "https://en.wikipedia.org/wiki/Michel_de_Montaigne",
        linkTitle: "More about Montaigne (Wikipedia)"
    },
    {
        text: "No act of kindness, no matter how small, is ever wasted.",
        author: "Aesop",
        dates: "620-564 BC",
        link: "https://en.wikipedia.org/wiki/Aesop",
        linkTitle: "More about Aesop (Wikipedia)"
    },
    {
        text: "Reading is to the mind what exercise is to the body.",
        author: "Joseph Addison",
        dates: "1672-1719",
        link: "https://en.wikipedia.org/wiki/Joseph_Addison",
        linkTitle: "More about Addison (Wikipedia)"
    },
    {
        text: "Where there is no struggle, there is no strength.",
        author: "Oprah Winfrey",
        dates: "1954-",
        link: "https://en.wikipedia.org/wiki/Oprah_Winfrey",
        linkTitle: "More about Winfrey (Wikipedia)"
    },
    {
        text: "It is better to offer no excuse than a bad one.",
        author: "George Washington",
        dates: "1732-1799",
        link: "https://en.wikipedia.org/wiki/George_Washington",
        linkTitle: "More about Washington (Wikipedia)"
    },
    {
        text: "Experience is simply the name we give our mistakes.",
        author: "Oscar Wilde",
        dates: "1854-1900",
        link: "https://en.wikipedia.org/wiki/Oscar_Wilde",
        linkTitle: "More about Wilde (Wikipedia)"
    },
    {
        text: "Fortune favors the bold.",
        author: "Virgil",
        dates: "70-19 BC",
        link: "https://en.wikipedia.org/wiki/Virgil",
        linkTitle: "More about Virgil (Wikipedia)"
    },
    {
        text: "A wise man will make more opportunities than he finds.",
        author: "Francis Bacon",
        dates: "1561-1626",
        link: "https://en.wikipedia.org/wiki/Francis_Bacon",
        linkTitle: "More about Bacon (Wikipedia)"
    },
    {
        text: "Let thy speech be better than silence, or be silent.",
        author: "Dionysius of Halicarnassus",
        dates: "60-7 BC",
        link: "https://en.wikipedia.org/wiki/Dionysius_of_Halicarnassus",
        linkTitle: "More about Dionysius (Wikipedia)"
    },
    {
        text: "The art of being wise is knowing what to overlook.",
        author: "William James",
        dates: "1842-1910",
        link: "https://en.wikipedia.org/wiki/William_James",
        linkTitle: "More about James (Wikipedia)"
    },
    {
        text: "Nothing in life is to be feared, it is only to be understood.",
        author: "Marie Curie",
        dates: "1867-1934",
        link: "https://en.wikipedia.org/wiki/Marie_Curie",
        linkTitle: "More about Curie (Wikipedia)"
    },
    {
        text: "The soul becomes dyed with the colour of its thoughts.",
        author: "Marcus Aurelius",
        dates: "121-180",
        link: "https://en.wikipedia.org/wiki/Marcus_Aurelius",
        linkTitle: "More about Aurelius (Wikipedia)"
    },
    {
        text: "He who opens a school door, closes a prison.",
        author: "Victor Hugo",
        dates: "1802-1885",
        link: "https://en.wikipedia.org/wiki/Victor_Hugo",
        linkTitle: "More about Hugo (Wikipedia)"
    },
    {
        text: "A great man is always willing to be little.",
        author: "Ralph Waldo Emerson",
        dates: "1803-1882",
        link: "https://en.wikipedia.org/wiki/Ralph_Waldo_Emerson",
        linkTitle: "More about Emerson (Wikipedia)"
    },
    {
        text: "What we think, we become.",
        author: "Buddha",
        dates: "563-483 BC",
        link: "https://en.wikipedia.org/wiki/Gautama_Buddha",
        linkTitle: "More about Buddha (Wikipedia)"
    },
    {
        text: "Three things cannot be long hidden: the sun, the moon, and the truth.",
        author: "Buddha",
        dates: "563-483 BC",
        link: "https://en.wikipedia.org/wiki/Gautama_Buddha",
        linkTitle: "More about Buddha (Wikipedia)"
    },
    {
        text: "Patience is bitter, but its fruit is sweet.",
        author: "Jean-Jacques Rousseau",
        dates: "1712-1778",
        link: "https://en.wikipedia.org/wiki/Jean-Jacques_Rousseau",
        linkTitle: "More about Rousseau (Wikipedia)"
    },
    {
        text: "My best friend is a person who will give me a book I have not read.",
        author: "Abraham Lincoln",
        dates: "1809-1865",
        link: "https://en.wikipedia.org/wiki/Abraham_Lincoln",
        linkTitle: "More about Lincoln (Wikipedia)"
    },
    {
        text: "Lost time is never found again.",
        author: "Benjamin Franklin",
        dates: "1706-1790",
        link: "https://en.wikipedia.org/wiki/Benjamin_Franklin",
        linkTitle: "More about Franklin (Wikipedia)"
    },
    {
        text: "We are all in the gutter, but some of us are looking at the stars.",
        author: "Oscar Wilde",
        dates: "1854-1900",
        link: "https://en.wikipedia.org/wiki/Oscar_Wilde",
        linkTitle: "More about Wilde (Wikipedia)"
    },
    {
        text: "A society grows great when old men plant trees whose shade they know they shall never sit in.",
        author: "Greek Proverb",
        dates: "",
        link: "https://en.wikipedia.org/wiki/Greek_proverbs",
        linkTitle: "More about Greek Proverbs (Wikipedia)"
    },
    {
        text: "The greatest remedy for anger is delay.",
        author: "Seneca",
        dates: "4 BC-65 AD",
        link: "https://en.wikipedia.org/wiki/Seneca_the_Younger",
        linkTitle: "More about Seneca (Wikipedia)"
    },
    {
        text: "Where ignorance is our master, there is no possibility of real peace.",
        author: "Dalai Lama XIV",
        dates: "1935-",
        link: "https://en.wikipedia.org/wiki/14th_Dalai_Lama",
        linkTitle: "More about Dalai Lama (Wikipedia)"
    },
    {
        text: "I think and think for months and years. Ninety-nine times, the conclusion is false. The hundredth time I am right.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://en.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "More about Einstein (Wikipedia)"
    },
    // September (30 days)
    {
        text: "What great thing would you attempt if you knew you could not fail?",
        author: "Robert H. Schuller",
        dates: "1926-2015",
        link: "https://en.wikipedia.org/wiki/Robert_H._Schuller",
        linkTitle: "More about Schuller (Wikipedia)"
    },
    {
        text: "The secret of change is to focus all of your energy not on fighting the old, but on building the new.",
        author: "Socrates",
        dates: "470-399 BC",
        link: "https://en.wikipedia.org/wiki/Socrates",
        linkTitle: "More about Socrates (Wikipedia)"
    },
    {
        text: "Whoever fights monsters should see to it that in the process he does not become a monster.",
        author: "Friedrich Nietzsche",
        dates: "1844-1900",
        link: "https://en.wikipedia.org/wiki/Friedrich_Nietzsche",
        linkTitle: "More about Nietzsche (Wikipedia)"
    },
    {
        text: "The mind is not a vessel to be filled, but a fire to be kindled.",
        author: "Plutarch",
        dates: "46-120 AD",
        link: "https://en.wikipedia.org/wiki/Plutarch",
        linkTitle: "More about Plutarch (Wikipedia)"
    },
    {
        text: "One ought, every day at least, to hear a little song, read a good poem, see a fine picture.",
        author: "Johann Wolfgang von Goethe",
        dates: "1749-1832",
        link: "https://en.wikipedia.org/wiki/Johann_Wolfgang_von_Goethe",
        linkTitle: "More about Goethe (Wikipedia)"
    },
    {
        text: "You must do the things you think you cannot do.",
        author: "Eleanor Roosevelt",
        dates: "1884-1962",
        link: "https://en.wikipedia.org/wiki/Eleanor_Roosevelt",
        linkTitle: "More about Roosevelt (Wikipedia)"
    },
    {
        text: "I am an optimist. It does not seem too much use being anything else.",
        author: "Winston Churchill",
        dates: "1874-1965",
        link: "https://en.wikipedia.org/wiki/Winston_Churchill",
        linkTitle: "More about Churchill (Wikipedia)"
    },
    {
        text: "Almost everything worthwhile carries with it some sort of risk.",
        author: "John F. Kennedy",
        dates: "1917-1963",
        link: "https://en.wikipedia.org/wiki/John_F._Kennedy",
        linkTitle: "More about Kennedy (Wikipedia)"
    },
    {
        text: "If there is no struggle, there is no progress.",
        author: "Frederick Douglass",
        dates: "1818-1895",
        link: "https://en.wikipedia.org/wiki/Frederick_Douglass",
        linkTitle: "More about Douglass (Wikipedia)"
    },
    {
        text: "The earth has music for those who listen.",
        author: "William Shakespeare",
        dates: "1564-1616",
        link: "https://en.wikipedia.org/wiki/William_Shakespeare",
        linkTitle: "More about Shakespeare (Wikipedia)"
    },
    {
        text: "What lies behind you and what lies in front of you pales in comparison to what lies inside of you.",
        author: "Ralph Waldo Emerson",
        dates: "1803-1882",
        link: "https://en.wikipedia.org/wiki/Ralph_Waldo_Emerson",
        linkTitle: "More about Emerson (Wikipedia)"
    },
    {
        text: "Doubt is the origin of wisdom.",
        author: "Rene Descartes",
        dates: "1596-1650",
        link: "https://en.wikipedia.org/wiki/Ren%C3%A9_Descartes",
        linkTitle: "More about Descartes (Wikipedia)"
    },
    {
        text: "Science is organized knowledge. Wisdom is organized life.",
        author: "Immanuel Kant",
        dates: "1724-1804",
        link: "https://en.wikipedia.org/wiki/Immanuel_Kant",
        linkTitle: "More about Kant (Wikipedia)"
    },
    {
        text: "Not everything that is faced can be changed, but nothing can be changed until it is faced.",
        author: "James Baldwin",
        dates: "1924-1987",
        link: "https://en.wikipedia.org/wiki/James_Baldwin",
        linkTitle: "More about Baldwin (Wikipedia)"
    },
    {
        text: "The world breaks everyone, and afterward, some are strong at the broken places.",
        author: "Ernest Hemingway",
        dates: "1899-1961",
        link: "https://en.wikipedia.org/wiki/Ernest_Hemingway",
        linkTitle: "More about Hemingway (Wikipedia)"
    },
    {
        text: "What worries you, masters you.",
        author: "John Locke",
        dates: "1632-1704",
        link: "https://en.wikipedia.org/wiki/John_Locke",
        linkTitle: "More about Locke (Wikipedia)"
    },
    {
        text: "If you want something you have never had, you must be willing to do something you have never done.",
        author: "Thomas Jefferson",
        dates: "1743-1826",
        link: "https://en.wikipedia.org/wiki/Thomas_Jefferson",
        linkTitle: "More about Jefferson (Wikipedia)"
    },
    {
        text: "The whole secret of a successful life is to find out what is one's destiny to do, and then do it.",
        author: "Henry Ford",
        dates: "1863-1947",
        link: "https://en.wikipedia.org/wiki/Henry_Ford",
        linkTitle: "More about Ford (Wikipedia)"
    },
    {
        text: "A hero is no braver than an ordinary man, but he is brave five minutes longer.",
        author: "Ralph Waldo Emerson",
        dates: "1803-1882",
        link: "https://en.wikipedia.org/wiki/Ralph_Waldo_Emerson",
        linkTitle: "More about Emerson (Wikipedia)"
    },
    {
        text: "Think before you speak. Read before you think.",
        author: "Fran Lebowitz",
        dates: "1950-",
        link: "https://en.wikipedia.org/wiki/Fran_Lebowitz",
        linkTitle: "More about Lebowitz (Wikipedia)"
    },
    {
        text: "The things that we love tell us what we are.",
        author: "Thomas Aquinas",
        dates: "1225-1274",
        link: "https://en.wikipedia.org/wiki/Thomas_Aquinas",
        linkTitle: "More about Aquinas (Wikipedia)"
    },
    {
        text: "Time you enjoy wasting is not wasted time.",
        author: "Marthe Troly-Curtin",
        dates: "1885-1950",
        link: "https://en.wikipedia.org/wiki/Marthe_Troly-Curtin",
        linkTitle: "More about Troly-Curtin (Wikipedia)"
    },
    {
        text: "I would rather walk with a friend in the dark, than alone in the light.",
        author: "Helen Keller",
        dates: "1880-1968",
        link: "https://en.wikipedia.org/wiki/Helen_Keller",
        linkTitle: "More about Keller (Wikipedia)"
    },
    {
        text: "To know what is right and not do it is the worst cowardice.",
        author: "Confucius",
        dates: "551-479 BC",
        link: "https://en.wikipedia.org/wiki/Confucius",
        linkTitle: "More about Confucius (Wikipedia)"
    },
    {
        text: "I know not with what weapons World War III will be fought, but World War IV will be fought with sticks and stones.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://en.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "More about Einstein (Wikipedia)"
    },
    {
        text: "Silence is a source of great strength.",
        author: "Lao Tzu",
        dates: "6th century BC",
        link: "https://en.wikipedia.org/wiki/Laozi",
        linkTitle: "More about Lao Tzu (Wikipedia)"
    },
    {
        text: "To err is human; to forgive, divine.",
        author: "Alexander Pope",
        dates: "1688-1744",
        link: "https://en.wikipedia.org/wiki/Alexander_Pope",
        linkTitle: "More about Pope (Wikipedia)"
    },
    {
        text: "The fool doth think he is wise, but the wise man knows himself to be a fool.",
        author: "William Shakespeare",
        dates: "1564-1616",
        link: "https://en.wikipedia.org/wiki/William_Shakespeare",
        linkTitle: "More about Shakespeare (Wikipedia)"
    },
    {
        text: "All that is gold does not glitter, not all those who wander are lost.",
        author: "J.R.R. Tolkien",
        dates: "1892-1973",
        link: "https://en.wikipedia.org/wiki/J._R._R._Tolkien",
        linkTitle: "More about Tolkien (Wikipedia)"
    },
    {
        text: "When the power of love overcomes the love of power, the world will know peace.",
        author: "Jimi Hendrix",
        dates: "1942-1970",
        link: "https://en.wikipedia.org/wiki/Jimi_Hendrix",
        linkTitle: "More about Hendrix (Wikipedia)"
    },
    // October (31 days)
    {
        text: "Be kind, for everyone you meet is fighting a hard battle.",
        author: "Plato",
        dates: "428-348 BC",
        link: "https://en.wikipedia.org/wiki/Plato",
        linkTitle: "More about Plato (Wikipedia)"
    },
    {
        text: "Never doubt that a small group of thoughtful, committed citizens can change the world.",
        author: "Margaret Mead",
        dates: "1901-1978",
        link: "https://en.wikipedia.org/wiki/Margaret_Mead",
        linkTitle: "More about Mead (Wikipedia)"
    },
    {
        text: "The best way to find yourself is to lose yourself in the service of others.",
        author: "Mahatma Gandhi",
        dates: "1869-1948",
        link: "https://en.wikipedia.org/wiki/Mahatma_Gandhi",
        linkTitle: "More about Gandhi (Wikipedia)"
    },
    {
        text: "To handle yourself, use your head; to handle others, use your heart.",
        author: "Eleanor Roosevelt",
        dates: "1884-1962",
        link: "https://en.wikipedia.org/wiki/Eleanor_Roosevelt",
        linkTitle: "More about Roosevelt (Wikipedia)"
    },
    {
        text: "Do not pray for an easy life, pray for the strength to endure a difficult one.",
        author: "Bruce Lee",
        dates: "1940-1973",
        link: "https://en.wikipedia.org/wiki/Bruce_Lee",
        linkTitle: "More about Lee (Wikipedia)"
    },
    {
        text: "The roots of education are bitter, but the fruit is sweet.",
        author: "Aristotle",
        dates: "384-322 BC",
        link: "https://en.wikipedia.org/wiki/Aristotle",
        linkTitle: "More about Aristotle (Wikipedia)"
    },
    {
        text: "Only the educated are free.",
        author: "Epictetus",
        dates: "50-135 AD",
        link: "https://en.wikipedia.org/wiki/Epictetus",
        linkTitle: "More about Epictetus (Wikipedia)"
    },
    {
        text: "It is the mark of an educated mind to be able to entertain a thought without accepting it.",
        author: "Aristotle",
        dates: "384-322 BC",
        link: "https://en.wikipedia.org/wiki/Aristotle",
        linkTitle: "More about Aristotle (Wikipedia)"
    },
    {
        text: "Music expresses that which cannot be said and on which it is impossible to be silent.",
        author: "Victor Hugo",
        dates: "1802-1885",
        link: "https://en.wikipedia.org/wiki/Victor_Hugo",
        linkTitle: "More about Hugo (Wikipedia)"
    },
    {
        text: "There is nothing noble in being superior to your fellow man; true nobility is being superior to your former self.",
        author: "Ernest Hemingway",
        dates: "1899-1961",
        link: "https://en.wikipedia.org/wiki/Ernest_Hemingway",
        linkTitle: "More about Hemingway (Wikipedia)"
    },
    {
        text: "Honesty is the first chapter in the book of wisdom.",
        author: "Thomas Jefferson",
        dates: "1743-1826",
        link: "https://en.wikipedia.org/wiki/Thomas_Jefferson",
        linkTitle: "More about Jefferson (Wikipedia)"
    },
    {
        text: "There is no charm equal to tenderness of heart.",
        author: "Jane Austen",
        dates: "1775-1817",
        link: "https://en.wikipedia.org/wiki/Jane_Austen",
        linkTitle: "More about Austen (Wikipedia)"
    },
    {
        text: "The privilege of a lifetime is to become who you truly are.",
        author: "Carl Jung",
        dates: "1875-1961",
        link: "https://en.wikipedia.org/wiki/Carl_Jung",
        linkTitle: "More about Jung (Wikipedia)"
    },
    {
        text: "Your time is limited, so do not waste it living someone else's life.",
        author: "Steve Jobs",
        dates: "1955-2011",
        link: "https://en.wikipedia.org/wiki/Steve_Jobs",
        linkTitle: "More about Jobs (Wikipedia)"
    },
    {
        text: "A leader is one who knows the way, goes the way, and shows the way.",
        author: "John C. Maxwell",
        dates: "1947-",
        link: "https://en.wikipedia.org/wiki/John_C._Maxwell",
        linkTitle: "More about Maxwell (Wikipedia)"
    },
    {
        text: "Life is a succession of lessons which must be lived to be understood.",
        author: "Helen Keller",
        dates: "1880-1968",
        link: "https://en.wikipedia.org/wiki/Helen_Keller",
        linkTitle: "More about Keller (Wikipedia)"
    },
    {
        text: "We cannot solve our problems with the same thinking we used when we created them.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://en.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "More about Einstein (Wikipedia)"
    },
    {
        text: "In a gentle way, you can shake the world.",
        author: "Mahatma Gandhi",
        dates: "1869-1948",
        link: "https://en.wikipedia.org/wiki/Mahatma_Gandhi",
        linkTitle: "More about Gandhi (Wikipedia)"
    },
    {
        text: "The only thing worse than being blind is having sight but no vision.",
        author: "Helen Keller",
        dates: "1880-1968",
        link: "https://en.wikipedia.org/wiki/Helen_Keller",
        linkTitle: "More about Keller (Wikipedia)"
    },
    {
        text: "How vain it is to sit down to write when you have not stood up to live.",
        author: "Henry David Thoreau",
        dates: "1817-1862",
        link: "https://en.wikipedia.org/wiki/Henry_David_Thoreau",
        linkTitle: "More about Thoreau (Wikipedia)"
    },
    {
        text: "Every man dies. Not every man really lives.",
        author: "William Wallace",
        dates: "1270-1305",
        link: "https://en.wikipedia.org/wiki/William_Wallace",
        linkTitle: "More about Wallace (Wikipedia)"
    },
    {
        text: "Tough times never last, but tough people do.",
        author: "Robert H. Schuller",
        dates: "1926-2015",
        link: "https://en.wikipedia.org/wiki/Robert_H._Schuller",
        linkTitle: "More about Schuller (Wikipedia)"
    },
    {
        text: "It is during our darkest moments that we must focus to see the light.",
        author: "Aristotle",
        dates: "384-322 BC",
        link: "https://en.wikipedia.org/wiki/Aristotle",
        linkTitle: "More about Aristotle (Wikipedia)"
    },
    {
        text: "I have decided to stick with love. Hate is too great a burden to bear.",
        author: "Martin Luther King Jr.",
        dates: "1929-1968",
        link: "https://en.wikipedia.org/wiki/Martin_Luther_King_Jr.",
        linkTitle: "More about King (Wikipedia)"
    },
    {
        text: "In the depth of winter, I finally learned that within me there lay an invincible summer.",
        author: "Albert Camus",
        dates: "1913-1960",
        link: "https://en.wikipedia.org/wiki/Albert_Camus",
        linkTitle: "More about Camus (Wikipedia)"
    },
    {
        text: "The wound is the place where the Light enters you.",
        author: "Rumi",
        dates: "1207-1273",
        link: "https://en.wikipedia.org/wiki/Rumi",
        linkTitle: "More about Rumi (Wikipedia)"
    },
    {
        text: "Yesterday is history, tomorrow is a mystery, today is a gift, that is why it is called the present.",
        author: "Alice Morse Earle",
        dates: "1851-1911",
        link: "https://en.wikipedia.org/wiki/Alice_Morse_Earle",
        linkTitle: "More about Earle (Wikipedia)"
    },
    {
        text: "Wheresoever you go, go with all your heart.",
        author: "Confucius",
        dates: "551-479 BC",
        link: "https://en.wikipedia.org/wiki/Confucius",
        linkTitle: "More about Confucius (Wikipedia)"
    },
    {
        text: "Let no man pull you so low as to hate him.",
        author: "Martin Luther King Jr.",
        dates: "1929-1968",
        link: "https://en.wikipedia.org/wiki/Martin_Luther_King_Jr.",
        linkTitle: "More about King (Wikipedia)"
    },
    {
        text: "The measure of who we are is what we do with what we have.",
        author: "Vince Lombardi",
        dates: "1913-1970",
        link: "https://en.wikipedia.org/wiki/Vince_Lombardi",
        linkTitle: "More about Lombardi (Wikipedia)"
    },
    {
        text: "There is no education like adversity.",
        author: "Benjamin Disraeli",
        dates: "1804-1881",
        link: "https://en.wikipedia.org/wiki/Benjamin_Disraeli",
        linkTitle: "More about Disraeli (Wikipedia)"
    },
    // November (30 days)
    {
        text: "Gratitude is not only the greatest of virtues, but the parent of all others.",
        author: "Marcus Tullius Cicero",
        dates: "106-43 BC",
        link: "https://en.wikipedia.org/wiki/Cicero",
        linkTitle: "More about Cicero (Wikipedia)"
    },
    {
        text: "The most wasted of all days is one without laughter.",
        author: "E.E. Cummings",
        dates: "1894-1962",
        link: "https://en.wikipedia.org/wiki/E._E._Cummings",
        linkTitle: "More about Cummings (Wikipedia)"
    },
    {
        text: "The best way to cheer yourself up is to try to cheer somebody else up.",
        author: "Mark Twain",
        dates: "1835-1910",
        link: "https://en.wikipedia.org/wiki/Mark_Twain",
        linkTitle: "More about Twain (Wikipedia)"
    },
    {
        text: "One cannot think well, love well, sleep well, if one has not dined well.",
        author: "Virginia Woolf",
        dates: "1882-1941",
        link: "https://en.wikipedia.org/wiki/Virginia_Woolf",
        linkTitle: "More about Woolf (Wikipedia)"
    },
    {
        text: "Never bend your head. Always hold it high. Look the world straight in the eye.",
        author: "Helen Keller",
        dates: "1880-1968",
        link: "https://en.wikipedia.org/wiki/Helen_Keller",
        linkTitle: "More about Keller (Wikipedia)"
    },
    {
        text: "Work like you do not need the money. Love like you have never been hurt. Dance like nobody is watching.",
        author: "Satchel Paige",
        dates: "1906-1982",
        link: "https://en.wikipedia.org/wiki/Satchel_Paige",
        linkTitle: "More about Paige (Wikipedia)"
    },
    {
        text: "Nothing great was ever achieved without enthusiasm.",
        author: "Ralph Waldo Emerson",
        dates: "1803-1882",
        link: "https://en.wikipedia.org/wiki/Ralph_Waldo_Emerson",
        linkTitle: "More about Emerson (Wikipedia)"
    },
    {
        text: "The pendulum of the mind alternates between sense and nonsense, not between right and wrong.",
        author: "Carl Jung",
        dates: "1875-1961",
        link: "https://en.wikipedia.org/wiki/Carl_Jung",
        linkTitle: "More about Jung (Wikipedia)"
    },
    {
        text: "Be curious, not judgmental.",
        author: "Walt Whitman",
        dates: "1819-1892",
        link: "https://en.wikipedia.org/wiki/Walt_Whitman",
        linkTitle: "More about Whitman (Wikipedia)"
    },
    {
        text: "However difficult life may seem, there is always something you can do and succeed at.",
        author: "Stephen Hawking",
        dates: "1942-2018",
        link: "https://en.wikipedia.org/wiki/Stephen_Hawking",
        linkTitle: "More about Hawking (Wikipedia)"
    },
    {
        text: "The whole is greater than the sum of its parts.",
        author: "Aristotle",
        dates: "384-322 BC",
        link: "https://en.wikipedia.org/wiki/Aristotle",
        linkTitle: "More about Aristotle (Wikipedia)"
    },
    {
        text: "Until you value yourself, you will not value your time.",
        author: "M. Scott Peck",
        dates: "1936-2005",
        link: "https://en.wikipedia.org/wiki/M._Scott_Peck",
        linkTitle: "More about Peck (Wikipedia)"
    },
    {
        text: "If you do not change direction, you may end up where you are heading.",
        author: "Lao Tzu",
        dates: "6th century BC",
        link: "https://en.wikipedia.org/wiki/Laozi",
        linkTitle: "More about Lao Tzu (Wikipedia)"
    },
    {
        text: "The creation of a thousand forests is in one acorn.",
        author: "Ralph Waldo Emerson",
        dates: "1803-1882",
        link: "https://en.wikipedia.org/wiki/Ralph_Waldo_Emerson",
        linkTitle: "More about Emerson (Wikipedia)"
    },
    {
        text: "You cannot shake hands with a clenched fist.",
        author: "Indira Gandhi",
        dates: "1917-1984",
        link: "https://en.wikipedia.org/wiki/Indira_Gandhi",
        linkTitle: "More about Gandhi (Wikipedia)"
    },
    {
        text: "One sees clearly only with the heart. What is essential is invisible to the eye.",
        author: "Antoine de Saint-Exupery",
        dates: "1900-1944",
        link: "https://en.wikipedia.org/wiki/Antoine_de_Saint-Exup%C3%A9ry",
        linkTitle: "More about Saint-Exupery (Wikipedia)"
    },
    {
        text: "Float like a butterfly, sting like a bee.",
        author: "Muhammad Ali",
        dates: "1942-2016",
        link: "https://en.wikipedia.org/wiki/Muhammad_Ali",
        linkTitle: "More about Ali (Wikipedia)"
    },
    {
        text: "The power of imagination makes us infinite.",
        author: "John Muir",
        dates: "1838-1914",
        link: "https://en.wikipedia.org/wiki/John_Muir",
        linkTitle: "More about Muir (Wikipedia)"
    },
    {
        text: "I find that the harder I work, the more luck I seem to have.",
        author: "Thomas Jefferson",
        dates: "1743-1826",
        link: "https://en.wikipedia.org/wiki/Thomas_Jefferson",
        linkTitle: "More about Jefferson (Wikipedia)"
    },
    {
        text: "Life is 10% what happens to you and 90% how you react to it.",
        author: "Charles R. Swindoll",
        dates: "1934-",
        link: "https://en.wikipedia.org/wiki/Charles_R._Swindoll",
        linkTitle: "More about Swindoll (Wikipedia)"
    },
    {
        text: "Memories of our lives, of our works and our deeds will continue in others.",
        author: "Rosa Parks",
        dates: "1913-2005",
        link: "https://en.wikipedia.org/wiki/Rosa_Parks",
        linkTitle: "More about Parks (Wikipedia)"
    },
    {
        text: "The beautiful thing about learning is that nobody can take it away from you.",
        author: "B.B. King",
        dates: "1925-2015",
        link: "https://en.wikipedia.org/wiki/B.B._King",
        linkTitle: "More about King (Wikipedia)"
    },
    {
        text: "We are all broken, that is how the light gets in.",
        author: "Ernest Hemingway",
        dates: "1899-1961",
        link: "https://en.wikipedia.org/wiki/Ernest_Hemingway",
        linkTitle: "More about Hemingway (Wikipedia)"
    },
    {
        text: "Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.",
        author: "Marcus Aurelius",
        dates: "121-180",
        link: "https://en.wikipedia.org/wiki/Marcus_Aurelius",
        linkTitle: "More about Aurelius (Wikipedia)"
    },
    {
        text: "Success usually comes to those who are too busy to be looking for it.",
        author: "Henry David Thoreau",
        dates: "1817-1862",
        link: "https://en.wikipedia.org/wiki/Henry_David_Thoreau",
        linkTitle: "More about Thoreau (Wikipedia)"
    },
    {
        text: "A friend to all is a friend to none.",
        author: "Aristotle",
        dates: "384-322 BC",
        link: "https://en.wikipedia.org/wiki/Aristotle",
        linkTitle: "More about Aristotle (Wikipedia)"
    },
    {
        text: "The less I needed, the better I felt.",
        author: "Charles Bukowski",
        dates: "1920-1994",
        link: "https://en.wikipedia.org/wiki/Charles_Bukowski",
        linkTitle: "More about Bukowski (Wikipedia)"
    },
    {
        text: "Fall seven times, stand up eight.",
        author: "Japanese Proverb",
        dates: "",
        link: "https://en.wikipedia.org/wiki/Japanese_proverbs",
        linkTitle: "More about Japanese Proverbs (Wikipedia)"
    },
    {
        text: "One good conversation can shift the direction of change forever.",
        author: "Linda Lambert",
        dates: "1939-2023",
        link: "https://en.wikipedia.org/wiki/Linda_Lambert",
        linkTitle: "More about Lambert (Wikipedia)"
    },
    {
        text: "What you do speaks so loudly that I cannot hear what you say.",
        author: "Ralph Waldo Emerson",
        dates: "1803-1882",
        link: "https://en.wikipedia.org/wiki/Ralph_Waldo_Emerson",
        linkTitle: "More about Emerson (Wikipedia)"
    },
    // December (31 days)
    {
        text: "The best of all gifts around any Christmas tree: the presence of a happy family all wrapped up in each other.",
        author: "Burton Hillis",
        dates: "1905-1975",
        link: "https://en.wikipedia.org/wiki/Burton_Hillis",
        linkTitle: "More about Hillis (Wikipedia)"
    },
    {
        text: "Blessed is the season which engages the whole world in a conspiracy of love.",
        author: "Hamilton Wright Mabie",
        dates: "1846-1916",
        link: "https://en.wikipedia.org/wiki/Hamilton_Wright_Mabie",
        linkTitle: "More about Mabie (Wikipedia)"
    },
    {
        text: "Love is the whole thing. We are only pieces.",
        author: "Rumi",
        dates: "1207-1273",
        link: "https://en.wikipedia.org/wiki/Rumi",
        linkTitle: "More about Rumi (Wikipedia)"
    },
    {
        text: "Happiness resides not in possessions, and not in gold, happiness dwells in the soul.",
        author: "Democritus",
        dates: "460-370 BC",
        link: "https://en.wikipedia.org/wiki/Democritus",
        linkTitle: "More about Democritus (Wikipedia)"
    },
    {
        text: "The best portion of a good man's life is his little, nameless, unremembered acts of kindness and of love.",
        author: "William Wordsworth",
        dates: "1770-1850",
        link: "https://en.wikipedia.org/wiki/William_Wordsworth",
        linkTitle: "More about Wordsworth (Wikipedia)"
    },
    {
        text: "Never waste a minute thinking about people you do not like.",
        author: "Dwight D. Eisenhower",
        dates: "1890-1969",
        link: "https://en.wikipedia.org/wiki/Dwight_D._Eisenhower",
        linkTitle: "More about Eisenhower (Wikipedia)"
    },
    {
        text: "Thousands of candles can be lighted from a single candle. Happiness never decreases by being shared.",
        author: "Buddha",
        dates: "563-483 BC",
        link: "https://en.wikipedia.org/wiki/Gautama_Buddha",
        linkTitle: "More about Buddha (Wikipedia)"
    },
    {
        text: "We make a living by what we get, but we make a life by what we give.",
        author: "Winston Churchill",
        dates: "1874-1965",
        link: "https://en.wikipedia.org/wiki/Winston_Churchill",
        linkTitle: "More about Churchill (Wikipedia)"
    },
    {
        text: "Life is short, and it is up to you to make it sweet.",
        author: "Sarah Louise Delany",
        dates: "1889-1999",
        link: "https://en.wikipedia.org/wiki/Sarah_Louise_Delany",
        linkTitle: "More about Delany (Wikipedia)"
    },
    {
        text: "True friendship comes when the silence between two people is comfortable.",
        author: "David Tyson",
        dates: "1940-2013",
        link: "https://en.wikipedia.org/wiki/David_Tyson",
        linkTitle: "More about Tyson (Wikipedia)"
    },
    {
        text: "For every minute you are angry you lose sixty seconds of happiness.",
        author: "Ralph Waldo Emerson",
        dates: "1803-1882",
        link: "https://en.wikipedia.org/wiki/Ralph_Waldo_Emerson",
        linkTitle: "More about Emerson (Wikipedia)"
    },
    {
        text: "We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.",
        author: "Plato",
        dates: "428-348 BC",
        link: "https://en.wikipedia.org/wiki/Plato",
        linkTitle: "More about Plato (Wikipedia)"
    },
    {
        text: "To live a creative life, we must lose our fear of being wrong.",
        author: "Joseph Chilton Pearce",
        dates: "1926-2016",
        link: "https://en.wikipedia.org/wiki/Joseph_Chilton_Pearce",
        linkTitle: "More about Pearce (Wikipedia)"
    },
    {
        text: "A day without laughter is a day wasted.",
        author: "Charlie Chaplin",
        dates: "1889-1977",
        link: "https://en.wikipedia.org/wiki/Charlie_Chaplin",
        linkTitle: "More about Chaplin (Wikipedia)"
    },
    {
        text: "Appear weak when you are strong, and strong when you are weak.",
        author: "Sun Tzu",
        dates: "544-496 BC",
        link: "https://en.wikipedia.org/wiki/Sun_Tzu",
        linkTitle: "More about Sun Tzu (Wikipedia)"
    },
    {
        text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
        author: "Buddha",
        dates: "563-483 BC",
        link: "https://en.wikipedia.org/wiki/Gautama_Buddha",
        linkTitle: "More about Buddha (Wikipedia)"
    },
    {
        text: "Happiness is a warm puppy.",
        author: "Charles M. Schulz",
        dates: "1922-2000",
        link: "https://en.wikipedia.org/wiki/Charles_M._Schulz",
        linkTitle: "More about Schulz (Wikipedia)"
    },
    {
        text: "The only person you should try to be better than is the person you were yesterday.",
        author: "Matty Mullins",
        dates: "1988-",
        link: "https://en.wikipedia.org/wiki/Matty_Mullins",
        linkTitle: "More about Mullins (Wikipedia)"
    },
    {
        text: "Well-behaved women seldom make history.",
        author: "Laurel Thatcher Ulrich",
        dates: "1938-",
        link: "https://en.wikipedia.org/wiki/Laurel_Thatcher_Ulrich",
        linkTitle: "More about Ulrich (Wikipedia)"
    },
    {
        text: "Give light, and the darkness will disappear of itself.",
        author: "Desiderius Erasmus",
        dates: "1466-1536",
        link: "https://en.wikipedia.org/wiki/Erasmus",
        linkTitle: "More about Erasmus (Wikipedia)"
    },
    {
        text: "Alone we can do so little; together we can do so much.",
        author: "Helen Keller",
        dates: "1880-1968",
        link: "https://en.wikipedia.org/wiki/Helen_Keller",
        linkTitle: "More about Keller (Wikipedia)"
    },
    {
        text: "We do not need magic to change the world, we carry all the power we need inside ourselves already.",
        author: "J.K. Rowling",
        dates: "1965-",
        link: "https://en.wikipedia.org/wiki/J._K._Rowling",
        linkTitle: "More about Rowling (Wikipedia)"
    },
    {
        text: "What a wonderful thought it is that some of the best days of our lives have not yet happened.",
        author: "Anne Frank",
        dates: "1929-1945",
        link: "https://en.wikipedia.org/wiki/Anne_Frank",
        linkTitle: "More about Frank (Wikipedia)"
    },
    {
        text: "The greatest use of a life is to spend it on something that will outlast it.",
        author: "William James",
        dates: "1842-1910",
        link: "https://en.wikipedia.org/wiki/William_James",
        linkTitle: "More about James (Wikipedia)"
    },
    {
        text: "Every passing minute is another chance to turn it all around.",
        author: "Cameron Crowe",
        dates: "1957-",
        link: "https://en.wikipedia.org/wiki/Cameron_Crowe",
        linkTitle: "More about Crowe (Wikipedia)"
    },
    {
        text: "Ring out the old, ring in the new, ring, happy bells, across the snow.",
        author: "Alfred Lord Tennyson",
        dates: "1809-1892",
        link: "https://en.wikipedia.org/wiki/Alfred,_Lord_Tennyson",
        linkTitle: "More about Tennyson (Wikipedia)"
    },
    {
        text: "Hope smiles from the threshold of the year to come, whispering it will be happier.",
        author: "Alfred Lord Tennyson",
        dates: "1809-1892",
        link: "https://en.wikipedia.org/wiki/Alfred,_Lord_Tennyson",
        linkTitle: "More about Tennyson (Wikipedia)"
    },
    {
        text: "Learn from yesterday, live for today, hope for tomorrow.",
        author: "Albert Einstein",
        dates: "1879-1955",
        link: "https://en.wikipedia.org/wiki/Albert_Einstein",
        linkTitle: "More about Einstein (Wikipedia)"
    },
    {
        text: "What the new year brings to you will depend a great deal on what you bring to the new year.",
        author: "Vern McLellan",
        dates: "1926-2011",
        link: "https://en.wikipedia.org/wiki/Vern_McLellan",
        linkTitle: "More about McLellan (Wikipedia)"
    },
    {
        text: "Tomorrow is the first blank page of a 365 page book. Write a good one.",
        author: "Brad Paisley",
        dates: "1972-",
        link: "https://en.wikipedia.org/wiki/Brad_Paisley",
        linkTitle: "More about Paisley (Wikipedia)"
    },
    {
        text: "For last year's words belong to last year's language, and next year's words await another voice.",
        author: "T.S. Eliot",
        dates: "1888-1965",
        link: "https://en.wikipedia.org/wiki/T._S._Eliot",
        linkTitle: "More about Eliot (Wikipedia)"
    },
];

// ========================================
// Utility Functions for English Quotes
// ========================================

function getRandomQuoteEN() {
    const randomIndex = Math.floor(Math.random() * QUOTES_EN.length);
    return QUOTES_EN[randomIndex];
}

function generateQuoteMappingEN(numberOfDays) {
    const availableQuotes = [...QUOTES_EN];
    const mapping = [];
    for (let i = 0; i < numberOfDays; i++) {
        if (availableQuotes.length === 0) {
            availableQuotes.push(...QUOTES_EN);
        }
        const randomIndex = Math.floor(Math.random() * availableQuotes.length);
        mapping.push(availableQuotes[randomIndex]);
        availableQuotes.splice(randomIndex, 1);
    }
    return mapping;
}

function generateYearlyQuoteMappingEN(year) {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    const daysInYear = isLeapYear ? 366 : 365;
    return generateQuoteMappingEN(daysInYear);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QUOTES_EN, getRandomQuoteEN, generateQuoteMappingEN, generateYearlyQuoteMappingEN };
}
