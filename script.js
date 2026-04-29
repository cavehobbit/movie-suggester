let currentStep = 0;
let userAnswers = {
    type: '', 
    q1: '',
    q2: '',
    q2Input: '', 
    q3: ''
};

let shownRecommendations = []; 
let animeMode = false;

const movieQuestions = [
    {
        question: "What genre do you want?",
        options: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller", "Historical"]
    },
    {
        question: "Have you seen something you want more of?",
        options: ["Yes", "No, surprise me"],
        hasInput: true
    },
    {
        question: "What's your mood right now?",
        options: ["Happy", "Sad", "Excited", "Chill", "Scared", "Curious"]
    }
];

const seasonQuestions = [
    {
        question: "What genre do you want?",
        options: ["Drama", "Comedy", "Thriller", "Fantasy", "Crime", "Sci-Fi", "Historical", "Teen Drama"]
    },
    {
        question: "Have you seen something you want more of?",
        options: ["Yes", "No, surprise me"],
        hasInput: true
    },
    {
        question: "How many episodes can you handle?",
        options: ["Short (Under 20)", "Medium (20-50)", "Long (50+)", "Don't care"]
    }
];

const animeQuestions = [
    {
        question: "What genre do you want?",
        options: ["Shonen", "Slice of Life", "Isekai", "Mecha", "Romance", "Horror", "Sports", "Mystery"]
    },
    {
        question: "Have you seen something you want more of?",
        options: ["Yes", "No, surprise me"],
        hasInput: true
    },
    {
        question: "What's your vibe?",
        options: ["Action-packed", "Wholesome", "Dark", "Funny", "Emotional", "Mind-bending"]
    }
];

const mangaQuestions = [
    {
        question: "What genre do you want?",
        options: ["Shonen", "Shoujo", "Seinen", "Horror", "Romance", "Fantasy", "Psychological", "Adventure"]
    },
    {
        question: "Have you seen something you want more of?",
        options: ["Yes", "No, surprise me"],
        hasInput: true
    },
    {
        question: "How many chapters can you handle?",
        options: ["Short (Under 50)", "Medium (50-200)", "Long (200+)", "Don't care"]
    }
];

const movieDatabase = [
    { title: "Dead Poets Society", genre: "Drama", mood: "Curious", tags: ["school", "poetry", "inspiration"], info: "2h 8m • Robin Williams, Ethan Hawke • Dir: Peter Weir" },
    { title: "Lady Bird", genre: "Drama", mood: "Happy", tags: ["coming-of-age", "family", "high school"], info: "1h 34m • Saoirse Ronan, Laurie Metcalf • Dir: Greta Gerwig" },
    { title: "Beautiful Boy", genre: "Drama", mood: "Sad", tags: ["addiction", "family", "emotional"], info: "2h • Timothée Chalamet, Steve Carell • Dir: Felix Van Groeningen" },
    { title: "Call Me by Your Name", genre: "Romance", mood: "Happy", tags: ["romance", "summer", "italy"], info: "2h 12m • Timothée Chalamet, Armie Hammer • Dir: Luca Guadagnino" },
    { title: "Little Miss Sunshine", genre: "Comedy", mood: "Happy", tags: ["family", "road trip", "quirky"], info: "1h 41m • Abigail Breslin, Steve Carell • Dir: Jonathan Dayton, Valerie Faris" },
    { title: "The Theory of Everything", genre: "Drama", mood: "Curious", tags: ["biography", "science", "romance"], info: "2h 3m • Eddie Redmayne, Felicity Jones • Dir: James Marsh" },
    { title: "We Need to Talk About Kevin", genre: "Thriller", mood: "Scared", tags: ["psychological", "dark", "mother-son"], info: "1h 52m • Tilda Swinton, Ezra Miller • Dir: Lynne Ramsay" },
    { title: "The Boy in the Striped Pajamas", genre: "Drama", mood: "Sad", tags: ["war", "holocaust", "friendship"], info: "1h 34m • Asa Butterfield, Jack Scanlon • Dir: Mark Herman" },
    { title: "Capernaum", genre: "Drama", mood: "Sad", tags: ["poverty", "childhood", "lebanon"], info: "2h 6m • Zain Al Rafeea • Dir: Nadine Labaki" },
    { title: "Annabelle", genre: "Horror", mood: "Scared", tags: ["supernatural", "doll", "haunted"], info: "1h 39m • Annabelle Wallis, Ward Horton • Dir: John R. Leonetti" },
    { title: "I.T.", genre: "Thriller", mood: "Excited", tags: ["tech", "stalker", "thriller"], info: "1h 36m • Pierce Brosnan • Dir: John Moore" },
    { title: "Marrowbone", genre: "Horror", mood: "Scared", tags: ["mystery", "haunted house", "family"], info: "1h 50m • George MacKay, Anya Taylor-Joy • Dir: Sergio G. Sánchez" },
    { title: "Terrifier", genre: "Horror", mood: "Scared", tags: ["slasher", "clown", "gore"], info: "1h 24m • Jenna Kanell, David Howard Thornton • Dir: Damien Leone" },
    { title: "Unfriended", genre: "Horror", mood: "Scared", tags: ["found footage", "cyber horror", "teens"], info: "1h 23m • Shelley Hennig • Dir: Levan Gabriadze" },
    { title: "Maze Runner", genre: "Sci-Fi", mood: "Excited", tags: ["dystopian", "teens", "action"], info: "1h 53m • Dylan O'Brien, Kaya Scodelario • Dir: Wes Ball" },
    { title: "Rush Hour", genre: "Action", mood: "Happy", tags: ["comedy", "buddy cop", "martial arts"], info: "1h 38m • Jackie Chan, Chris Tucker • Dir: Brett Ratner" },
    { title: "Kingdom of Heaven", genre: "Historical", mood: "Excited", tags: ["crusades", "medieval", "epic"], info: "2h 24m • Orlando Bloom, Eva Green • Dir: Ridley Scott" },
    { title: "Atonement", genre: "Romance", mood: "Sad", tags: ["war", "love", "tragedy"], info: "2h 3m • Keira Knightley, James McAvoy • Dir: Joe Wright" },
    { title: "Five Feet Apart", genre: "Romance", mood: "Sad", tags: ["illness", "teen romance", "emotional"], info: "1h 56m • Haley Lu Richardson, Cole Sprouse • Dir: Justin Baldoni" },
    { title: "The Fault in Our Stars", genre: "Romance", mood: "Sad", tags: ["cancer", "teen romance", "emotional"], info: "2h 6m • Shailene Woodley, Ansel Elgort • Dir: Josh Boone" },
    { title: "My Policeman", genre: "Romance", mood: "Sad", tags: ["lgbtq", "period drama", "forbidden love"], info: "1h 53m • Harry Styles, Emma Corrin • Dir: Michael Grandage" },
    { title: "The Other Boleyn Girl", genre: "Historical", mood: "Curious", tags: ["royalty", "sisters", "tudor"], info: "1h 55m • Natalie Portman, Scarlett Johansson • Dir: Justin Chadwick" },
    { title: "Malèna", genre: "Romance", mood: "Sad", tags: ["italy", "war", "coming-of-age"], info: "1h 48m • Monica Bellucci • Dir: Giuseppe Tornatore" },
    { title: "Thirteen", genre: "Drama", mood: "Sad", tags: ["teens", "rebellion", "drugs"], info: "1h 40m • Evan Rachel Wood, Nikki Reed • Dir: Catherine Hardwicke" },
    { title: "The Perks of Being a Wallflower", genre: "Drama", mood: "Happy", tags: ["high school", "friendship", "mental health"], info: "1h 43m • Logan Lerman, Emma Watson • Dir: Stephen Chbosky" },
    { title: "Mid90s", genre: "Drama", mood: "Chill", tags: ["skateboarding", "90s", "coming-of-age"], info: "1h 25m • Sunny Suljic • Dir: Jonah Hill" },
    { title: "Moonrise Kingdom", genre: "Comedy", mood: "Happy", tags: ["quirky", "young love", "adventure"], info: "1h 34m • Jared Gilman, Kara Hayward • Dir: Wes Anderson" },
    { title: "Words on Bathroom Walls", genre: "Romance", mood: "Happy", tags: ["mental health", "schizophrenia", "teen romance"], info: "1h 50m • Charlie Plummer, Taylor Russell • Dir: Thor Freudenthal" },
    { title: "Disconnect", genre: "Thriller", mood: "Curious", tags: ["internet", "cyberbullying", "interconnected"], info: "1h 55m • Jason Bateman, Hope Davis • Dir: Henry Alex Rubin (2012)" },
    { title: "Never Let Me Go", genre: "Sci-Fi", mood: "Sad", tags: ["dystopian", "cloning", "love"], info: "1h 43m • Carey Mulligan, Andrew Garfield • Dir: Mark Romanek" },
    { title: "Split", genre: "Thriller", mood: "Scared", tags: ["psychological", "kidnapping", "multiple personality"], info: "1h 57m • James McAvoy, Anya Taylor-Joy • Dir: M. Night Shyamalan" },
    { title: "Dead in a Week (Or Your Money Back)", genre: "Comedy", mood: "Happy", tags: ["dark comedy", "suicide", "british"], info: "1h 30m • Aneurin Barnard, Tom Wilkinson • Dir: Tom Edmunds" },
    { title: "The Pursuit of Happyness", genre: "Drama", mood: "Happy", tags: ["biography", "motivation", "father-son"], info: "1h 57m • Will Smith, Jaden Smith • Dir: Gabriele Muccino" },
    { title: "The Social Network", genre: "Drama", mood: "Curious", tags: ["tech", "facebook", "entrepreneurship"], info: "2h • Jesse Eisenberg, Andrew Garfield • Dir: David Fincher" },
    { title: "Fight Club", genre: "Thriller", mood: "Excited", tags: ["psychological", "anarchism", "twist"], info: "2h 19m • Brad Pitt, Edward Norton • Dir: David Fincher" },
    { title: "Se7en", genre: "Thriller", mood: "Scared", tags: ["serial killer", "detective", "dark"], info: "2h 7m • Brad Pitt, Morgan Freeman • Dir: David Fincher" },
    { title: "The Silence of the Lambs", genre: "Thriller", mood: "Scared", tags: ["serial killer", "fbi", "psychological"], info: "1h 58m • Jodie Foster, Anthony Hopkins • Dir: Jonathan Demme" },
    { title: "Napola", genre: "Historical", mood: "Sad", tags: ["nazi", "war", "germany", "friendship"], info: "1h 50m • Max Riemelt • Dir: Dennis Gansel (German)" },
    { title: "Rodrick Rules", genre: "Comedy", mood: "Happy", tags: ["family", "teens", "brothers"], info: "1h 39m • Zachary Gordon, Devon Bostick • Dir: David Bowers" },
    { title: "Peter Pan", genre: "Fantasy", mood: "Happy", tags: ["adventure", "magic", "childhood"], info: "1h 53m • Jeremy Sumpter, Rachel Hurd-Wood • Dir: P.J. Hogan" }
];

const seasonDatabase = [
    { title: "Skins", genre: "Teen Drama", episodes: "61 episodes (7 seasons)", tags: ["teens", "drugs", "uk", "friendship"], info: "Nicholas Hoult, Dev Patel, Kaya Scodelario • UK Series" },
    { title: "Euphoria", genre: "Teen Drama", episodes: "16 episodes (2 seasons)", tags: ["drugs", "addiction", "high school", "dark"], info: "Zendaya, Hunter Schafer • Creator: Sam Levinson" },
    { title: "Never Have I Ever", genre: "Teen Drama", episodes: "40 episodes (4 seasons)", tags: ["coming-of-age", "indian-american", "high school", "comedy"], info: "Maitreyi Ramakrishnan • Creator: Mindy Kaling" },
    { title: "The Summer I Turned Pretty", genre: "Teen Drama", episodes: "15 episodes (2 seasons)", tags: ["summer", "romance", "beach", "love triangle"], info: "Lola Tung, Christopher Briney • Based on Jenny Han's novels" },
    { title: "My Life with the Walter Boys", genre: "Teen Drama", episodes: "10 episodes (1 season)", tags: ["romance", "family", "small town"], info: "Nikki Rodriguez, Noah LaLonde • Based on Ali Novak's novel" },
    { title: "Sex Education", genre: "Teen Drama", episodes: "32 episodes (4 seasons)", tags: ["sex", "high school", "uk", "comedy"], info: "Asa Butterfield, Gillian Anderson • Creator: Laurie Nunn" },
    { title: "Anne with an E", genre: "Teen Drama", episodes: "27 episodes (3 seasons)", tags: ["period drama", "orphan", "friendship", "canada"], info: "Amybeth McNulty • Based on Anne of Green Gables" },
    { title: "I'm Not Okay with This", genre: "Teen Drama", episodes: "7 episodes (1 season - Cancelled)", tags: ["superpowers", "high school", "lgbtq", "dark comedy"], info: "Sophia Lillis • Producers: Stranger Things creators" },
    { title: "The End of the F***ing World", genre: "Teen Drama", episodes: "16 episodes (2 seasons)", tags: ["dark comedy", "road trip", "psychopath", "uk"], info: "Jessica Barden, Alex Lawther • Based on Charles Forsman's comic" },
    { title: "Baby", genre: "Teen Drama", episodes: "18 episodes (3 seasons)", tags: ["italian", "scandal", "double life", "rome"], info: "Benedetta Porcaroli • Italian series inspired by true events" },
    { title: "Peaky Blinders", genre: "Crime", episodes: "36 episodes (6 seasons) + Movie coming", tags: ["gangs", "1920s", "uk", "family"], info: "Cillian Murphy, Tom Hardy • Creator: Steven Knight" },
    { title: "The Boys", genre: "Sci-Fi", episodes: "32 episodes (4 seasons)", tags: ["superheroes", "dark", "satire", "violence"], info: "Karl Urban, Antony Starr • Based on Garth Ennis' comic" },
    { title: "Money Heist (La Casa de Papel)", genre: "Crime", episodes: "41 episodes (5 parts)", tags: ["heist", "spanish", "resistance", "drama"], info: "Álvaro Morte, Úrsula Corberó • Creator: Álex Pina" },
    { title: "Berlin", genre: "Crime", episodes: "8 episodes (1 season)", tags: ["heist", "spanish", "money heist spinoff", "romance"], info: "Pedro Alonso • Money Heist spin-off" },
    { title: "Dexter", genre: "Crime", episodes: "96 episodes (8 seasons + New Blood)", tags: ["serial killer", "vigilante", "forensics", "dark"], info: "Michael C. Hall • Creator: James Manos Jr." },
    { title: "Hannibal", genre: "Thriller", episodes: "39 episodes (3 seasons)", tags: ["serial killer", "cannibalism", "psychological", "fbi"], info: "Mads Mikkelsen, Hugh Dancy • Creator: Bryan Fuller" },
    { title: "Mr. Robot", genre: "Thriller", episodes: "45 episodes (4 seasons)", tags: ["hacking", "mental health", "conspiracy", "tech"], info: "Rami Malek, Christian Slater • Creator: Sam Esmail" },
    { title: "Deadly Class", genre: "Crime", episodes: "10 episodes (1 season - Cancelled)", tags: ["assassins", "80s", "high school", "comic adaptation"], info: "Benjamin Wadsworth, Lana Condor • Based on Rick Remender's comic" },
    { title: "Scorpion", genre: "Crime", episodes: "93 episodes (4 seasons)", tags: ["genius", "tech", "team", "problem solving"], info: "Elyes Gabel, Katharine McPhee • Based on Walter O'Brien's life" },
    { title: "The Mick", genre: "Comedy", episodes: "37 episodes (2 seasons)", tags: ["family", "dark comedy", "aunt", "irresponsible"], info: "Kaitlin Olson • Creator: Dave Chernin, John Chernin" },
    { title: "Shameless (US)", genre: "Comedy", episodes: "134 episodes (11 seasons)", tags: ["family", "poverty", "chicago", "dysfunctional"], info: "William H. Macy, Emmy Rossum • Based on UK series" },
    { title: "ASSI (Asur)", genre: "Thriller", episodes: "16 episodes (2 seasons)", tags: ["indian", "serial killer", "mythology", "forensics"], info: "Arshad Warsi, Barun Sobti • Indian series (Voot)" },
    { title: "Game of Thrones", genre: "Fantasy", episodes: "73 episodes (8 seasons)", tags: ["dragons", "medieval", "war", "epic"], info: "Emilia Clarke, Kit Harington • Based on George R.R. Martin's novels" },
    { title: "House of the Dragon", genre: "Fantasy", episodes: "18 episodes (2 seasons)", tags: ["dragons", "targaryen", "prequel", "civil war"], info: "Emma D'Arcy, Matt Smith • Game of Thrones prequel" },
    { title: "A Knight of the Seven Kingdoms", genre: "Fantasy", episodes: "TBA (Upcoming)", tags: ["game of thrones", "prequel", "knights", "adventure"], info: "Upcoming GoT prequel series" },
    { title: "The Sandman", genre: "Fantasy", episodes: "11 episodes (1 season)", tags: ["dreams", "mythology", "dark", "neil gaiman"], info: "Tom Sturridge • Based on Neil Gaiman's comic" },
    { title: "The Gifted", genre: "Sci-Fi", episodes: "29 episodes (2 seasons)", tags: ["mutants", "x-men", "family", "powers"], info: "Stephen Moyer, Amy Acker • Set in X-Men universe" },
    { title: "1899", genre: "Sci-Fi", episodes: "8 episodes (1 season - Cancelled)", tags: ["mystery", "ship", "multilingual", "dark creators"], info: "Emily Beecham • Creators of Dark (Netflix)" },
    { title: "Merlin", genre: "Fantasy", episodes: "65 episodes (5 seasons)", tags: ["magic", "arthur", "medieval", "uk"], info: "Colin Morgan, Bradley James • BBC series" },
    { title: "Magnificent Century", genre: "Historical", episodes: "139 episodes (4 seasons)", tags: ["ottoman", "turkish", "sultan", "harem"], info: "Halit Ergenç, Meryem Uzerli • Turkish series (Muhteşem Yüzyıl)" },
    { title: "Suits", genre: "Drama", episodes: "134 episodes (9 seasons)", tags: ["lawyers", "corporate", "mentorship", "nyc"], info: "Gabriel Macht, Patrick J. Adams, Meghan Markle • Creator: Aaron Korsh" },
    { title: "Kingdom", genre: "Horror", episodes: "18 episodes (2 seasons + special)", tags: ["zombies", "korean", "joseon", "political"], info: "Ju Ji-hoon, Bae Doona • Korean Netflix series" },
    { title: "Squid Game", genre: "Thriller", episodes: "9 episodes (1 season, S2 coming)", tags: ["survival", "korean", "death game", "debt"], info: "Lee Jung-jae • Creator: Hwang Dong-hyuk" },
    { title: "Alice in Borderland", genre: "Thriller", episodes: "16 episodes (2 seasons)", tags: ["survival", "japanese", "death game", "mystery"], info: "Kento Yamazaki, Tao Tsuchiya • Based on manga" },
    { title: "Dark Desire (Oscuro Deseo)", genre: "Thriller", episodes: "33 episodes (2 seasons)", tags: ["mexican", "affair", "mystery", "obsession"], info: "Maite Perroni, Alejandro Speitzer • Mexican Netflix series" },
    { title: "WAYNE", genre: "Action", episodes: "10 episodes (1 season)", tags: ["teen", "violence", "road trip", "comedy"], info: "Mark McKenna, Ciara Bravo • YouTube Premium series" },
    { title: "The Queen's Gambit", genre: "Drama", episodes: "7 episodes (Limited series)", tags: ["chess", "genius", "60s", "addiction"], info: "Anya Taylor-Joy • Dir: Scott Frank" }
];

//addmore

const animeDatabase = [
    { title: "Demon Slayer", genre: "Shonen", vibe: "Action-packed", tags: ["demons", "swords", "family"], info: "4 seasons • Ufotable • Based on Koyoharu Gotouge's manga" },
    { title: "My Hero Academia", genre: "Shonen", vibe: "Action-packed", tags: ["superheroes", "school", "powers"], info: "7 seasons • Bones • Based on Kohei Horikoshi's manga" },
    { title: "Jujutsu Kaisen", genre: "Shonen", vibe: "Action-packed", tags: ["curses", "supernatural", "school"], info: "2 seasons • MAPPA • Based on Gege Akutami's manga" },
    { title: "Attack on Titan", genre: "Shonen", vibe: "Dark", tags: ["titans", "war", "mystery"], info: "4 seasons • WIT Studio/MAPPA • Based on Hajime Isayama's manga" },
    { title: "Death Note", genre: "Mystery", vibe: "Mind-bending", tags: ["psychological", "thriller", "supernatural"], info: "37 episodes • Madhouse • Based on Tsugumi Ohba's manga" },
    { title: "Steins;Gate", genre: "Sci-Fi", vibe: "Mind-bending", tags: ["time travel", "thriller", "science"], info: "24 episodes • White Fox • Based on visual novel" },
    { title: "Your Lie in April", genre: "Romance", vibe: "Emotional", tags: ["music", "drama", "tragedy"], info: "22 episodes • A-1 Pictures • Based on Naoshi Arakawa's manga" },
    { title: "A Silent Voice", genre: "Romance", vibe: "Emotional", tags: ["disability", "redemption", "school"], info: "Movie • Kyoto Animation • Based on Yoshitoki Oima's manga" },
    { title: "Violet Evergarden", genre: "Slice of Life", vibe: "Emotional", tags: ["drama", "war", "letters"], info: "13 episodes • Kyoto Animation • Original" },
    { title: "Spy x Family", genre: "Comedy", vibe: "Funny", tags: ["family", "spies", "wholesome"], info: "2 seasons • Wit Studio/CloverWorks • Based on Tatsuya Endo's manga" },
    { title: "Kaguya-sama: Love is War", genre: "Romance", vibe: "Funny", tags: ["comedy", "school", "romance"], info: "3 seasons • A-1 Pictures • Based on Aka Akasaka's manga" },
    { title: "One Punch Man", genre: "Shonen", vibe: "Funny", tags: ["superhero", "parody", "action"], info: "2 seasons • Madhouse/J.C.Staff • Based on ONE's manga" },
    { title: "Mob Psycho 100", genre: "Shonen", vibe: "Action-packed", tags: ["psychic", "comedy", "supernatural"], info: "3 seasons • Bones • Based on ONE's manga" },
    { title: "Chainsaw Man", genre: "Shonen", vibe: "Dark", tags: ["demons", "gore", "action"], info: "1 season • MAPPA • Based on Tatsuki Fujimoto's manga" },
    { title: "Fullmetal Alchemist: Brotherhood", genre: "Shonen", vibe: "Emotional", tags: ["alchemy", "brothers", "adventure"], info: "64 episodes • Bones • Based on Hiromu Arakawa's manga" },
    { title: "Hunter x Hunter", genre: "Shonen", vibe: "Action-packed", tags: ["adventure", "friendship", "powers"], info: "148 episodes • Madhouse • Based on Yoshihiro Togashi's manga" },
    { title: "Naruto", genre: "Shonen", vibe: "Action-packed", tags: ["ninja", "friendship", "adventure"], info: "720 episodes total • Pierrot • Based on Masashi Kishimoto's manga" },
    { title: "One Piece", genre: "Shonen", vibe: "Action-packed", tags: ["pirates", "adventure", "friendship"], info: "1000+ episodes • Toei Animation • Based on Eiichiro Oda's manga" },
    { title: "Bleach", genre: "Shonen", vibe: "Action-packed", tags: ["soul reapers", "supernatural", "action"], info: "366 episodes • Pierrot • Based on Tite Kubo's manga" },
    { title: "Tokyo Ghoul", genre: "Horror", vibe: "Dark", tags: ["ghouls", "psychological", "tragedy"], info: "4 seasons • Pierrot • Based on Sui Ishida's manga" },
    { title: "Parasyte", genre: "Horror", vibe: "Dark", tags: ["parasites", "psychological", "thriller"], info: "24 episodes • Madhouse • Based on Hitoshi Iwaaki's manga" },
    { title: "Another", genre: "Horror", vibe: "Dark", tags: ["mystery", "death", "school"], info: "12 episodes • P.A. Works • Based on Yukito Ayatsuji's novel" },
    { title: "Haikyu!!", genre: "Sports", vibe: "Action-packed", tags: ["volleyball", "teamwork", "school"], info: "4 seasons • Production I.G • Based on Haruichi Furudate's manga" },
    { title: "Kuroko's Basketball", genre: "Sports", vibe: "Action-packed", tags: ["basketball", "supernatural", "teamwork"], info: "3 seasons • Production I.G • Based on Tadatoshi Fujimaki's manga" },
    { title: "Re:Zero", genre: "Isekai", vibe: "Dark", tags: ["time loop", "fantasy", "psychological"], info: "2 seasons • White Fox • Based on Tappei Nagatsuki's light novel" },
    { title: "Sword Art Online", genre: "Isekai", vibe: "Action-packed", tags: ["virtual reality", "gaming", "romance"], info: "4 seasons • A-1 Pictures • Based on Reki Kawahara's light novel" },
    { title: "Overlord", genre: "Isekai", vibe: "Dark", tags: ["skeleton", "villain", "fantasy"], info: "4 seasons • Madhouse • Based on Kugane Maruyama's light novel" },
    { title: "Mushoku Tensei", genre: "Isekai", vibe: "Emotional", tags: ["reincarnation", "magic", "growth"], info: "2 seasons • Studio Bind • Based on Rifujin na Magonote's light novel" },
    { title: "The Promised Neverland", genre: "Mystery", vibe: "Dark", tags: ["orphanage", "escape", "thriller"], info: "2 seasons • CloverWorks • Based on Kaiu Shirai's manga" },
    { title: "Code Geass", genre: "Mecha", vibe: "Mind-bending", tags: ["strategy", "rebellion", "mechs"], info: "2 seasons • Sunrise • Original" },
    { title: "Neon Genesis Evangelion", genre: "Mecha", vibe: "Mind-bending", tags: ["psychological", "apocalypse", "mechs"], info: "26 episodes • Gainax • Original" },
    { title: "K-On!", genre: "Slice of Life", vibe: "Wholesome", tags: ["music", "friendship", "school"], info: "2 seasons • Kyoto Animation • Based on Kakifly's manga" },
    { title: "Laid-Back Camp", genre: "Slice of Life", vibe: "Wholesome", tags: ["camping", "relaxing", "friendship"], info: "2 seasons • C-Station • Based on Afro's manga" },
    { title: "March Comes in Like a Lion", genre: "Slice of Life", vibe: "Emotional", tags: ["shogi", "depression", "family"], info: "2 seasons • Shaft • Based on Chica Umino's manga" },
    { title: "Bocchi the Rock!", genre: "Slice of Life", vibe: "Funny", tags: ["music", "social anxiety", "comedy"], info: "1 season • CloverWorks • Based on Aki Hamaji's manga" },
    { title: "Frieren: Beyond Journey's End", genre: "Fantasy", vibe: "Emotional", tags: ["adventure", "elves", "time"], info: "1 season • Madhouse • Based on Kanehito Yamada's manga" }
];
//add more later

const mangaDatabase = [
    { title: "One Piece", genre: "Shonen", chapters: "1100+ chapters (Ongoing)", tags: ["pirates", "adventure", "friendship"], info: "Eiichiro Oda • Shueisha • Started 1997" },
    { title: "Berserk", genre: "Seinen", chapters: "380+ chapters (Ongoing)", tags: ["dark fantasy", "revenge", "medieval"], info: "Kentaro Miura • Hakusensha • Started 1989" },
    { title: "Vagabond", genre: "Seinen", chapters: "327 chapters (Hiatus)", tags: ["samurai", "historical", "martial arts"], info: "Takehiko Inoue • Kodansha • Based on Musashi novel" },
    { title: "Monster", genre: "Psychological", chapters: "162 chapters (Complete)", tags: ["thriller", "mystery", "germany"], info: "Naoki Urasawa • Shogakukan • Completed 2001" },
    { title: "20th Century Boys", genre: "Psychological", chapters: "249 chapters (Complete)", tags: ["mystery", "cult", "friendship"], info: "Naoki Urasawa • Shogakukan • Completed 2006" },
    { title: "Vinland Saga", genre: "Seinen", chapters: "200+ chapters (Ongoing)", tags: ["vikings", "revenge", "historical"], info: "Makoto Yukimura • Kodansha • Started 2005" },
    { title: "Jujutsu Kaisen", genre: "Shonen", chapters: "240+ chapters (Ongoing)", tags: ["curses", "supernatural", "school"], info: "Gege Akutami • Shueisha • Started 2018" },
    { title: "Chainsaw Man", genre: "Shonen", chapters: "180+ chapters (Ongoing)", tags: ["demons", "gore", "dark"], info: "Tatsuki Fujimoto • Shueisha • Started 2018" },
    { title: "My Hero Academia", genre: "Shonen", chapters: "400+ chapters (Ongoing)", tags: ["superheroes", "school", "powers"], info: "Kohei Horikoshi • Shueisha • Started 2014" },
    { title: "Tokyo Ghoul", genre: "Horror", chapters: "279 chapters (Complete)", tags: ["ghouls", "psychological", "tragedy"], info: "Sui Ishida • Shueisha • Completed 2018" },
    { title: "Attack on Titan", genre: "Shonen", chapters: "139 chapters (Complete)", tags: ["titans", "war", "mystery"], info: "Hajime Isayama • Kodansha • Completed 2021" },
    { title: "Death Note", genre: "Psychological", chapters: "108 chapters (Complete)", tags: ["psychological", "thriller", "supernatural"], info: "Tsugumi Ohba, Takeshi Obata • Shueisha • Completed 2006" },
    { title: "Fullmetal Alchemist", genre: "Shonen", chapters: "116 chapters (Complete)", tags: ["alchemy", "brothers", "adventure"], info: "Hiromu Arakawa • Square Enix • Completed 2010" },
    { title: "Naruto", genre: "Shonen", chapters: "700 chapters (Complete)", tags: ["ninja", "friendship", "adventure"], info: "Masashi Kishimoto • Shueisha • Completed 2014" },
    { title: "Bleach", genre: "Shonen", chapters: "686 chapters (Complete)", tags: ["soul reapers", "supernatural", "action"], info: "Tite Kubo • Shueisha • Completed 2016" },
    { title: "Hunter x Hunter", genre: "Shonen", chapters: "400+ chapters (Hiatus)", tags: ["adventure", "friendship", "powers"], info: "Yoshihiro Togashi • Shueisha • Started 1998" },
    { title: "Demon Slayer", genre: "Shonen", chapters: "205 chapters (Complete)", tags: ["demons", "swords", "family"], info: "Koyoharu Gotouge • Shueisha • Completed 2020" },
    { title: "Spy x Family", genre: "Comedy", chapters: "90+ chapters (Ongoing)", tags: ["family", "spies", "wholesome"], info: "Tatsuya Endo • Shueisha • Started 2019" },
    { title: "Kaguya-sama: Love is War", genre: "Romance", chapters: "281 chapters (Complete)", tags: ["comedy", "school", "romance"], info: "Aka Akasaka • Shueisha • Completed 2022" },
    { title: "Your Lie in April", genre: "Romance", chapters: "44 chapters (Complete)", tags: ["music", "drama", "tragedy"], info: "Naoshi Arakawa • Kodansha • Completed 2015" },
    { title: "A Silent Voice", genre: "Romance", chapters: "62 chapters (Complete)", tags: ["disability", "redemption", "school"], info: "Yoshitoki Oima • Kodansha • Completed 2014" },
    { title: "Blue Period", genre: "Seinen", chapters: "60+ chapters (Ongoing)", tags: ["art", "coming-of-age", "school"], info: "Tsubasa Yamaguchi • Kodansha • Started 2017" },
    { title: "Goodnight Punpun", genre: "Seinen", chapters: "147 chapters (Complete)", tags: ["psychological", "depression", "surreal"], info: "Inio Asano • Shogakukan • Completed 2013" },
    { title: "Oyasumi Punpun", genre: "Psychological", chapters: "147 chapters (Complete)", tags: ["dark", "depression", "coming-of-age"], info: "Inio Asano • Shogakukan • Completed 2013" },
    { title: "The Promised Neverland", genre: "Mystery", chapters: "181 chapters (Complete)", tags: ["orphanage", "escape", "thriller"], info: "Kaiu Shirai, Posuka Demizu • Shueisha • Completed 2020" },
    { title: "Parasyte", genre: "Horror", chapters: "64 chapters (Complete)", tags: ["parasites", "psychological", "thriller"], info: "Hitoshi Iwaaki • Kodansha • Completed 1995" },
    { title: "Uzumaki", genre: "Horror", chapters: "19 chapters (Complete)", tags: ["spiral", "psychological", "horror"], info: "Junji Ito • Shogakukan • Completed 1999" },
    { title: "Tomie", genre: "Horror", chapters: "20 chapters (Complete)", tags: ["supernatural", "psychological", "horror"], info: "Junji Ito • Shogakukan • Completed 2000" },
    { title: "Solo Leveling", genre: "Fantasy", chapters: "200 chapters (Complete)", tags: ["dungeon", "leveling", "op mc"], info: "Chugong • Korean Manhwa • Completed 2021" },
    { title: "Tower of God", genre: "Fantasy", chapters: "580+ chapters (Ongoing)", tags: ["tower", "adventure", "mystery"], info: "SIU • Korean Manhwa • Started 2010" }
];

let thinkingTimeout = null;
let characterTimeout = null;

const searchBar = document.getElementById('search-bar');
const searchResults = document.getElementById('search-results');

searchBar.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length === 0) {
        searchResults.classList.add('hidden');
        searchResults.innerHTML = '';
        return;
    }

    let allContent;
    if (animeMode) {
        allContent = [...animeDatabase, ...mangaDatabase];
    } else {
        allContent = [...movieDatabase, ...seasonDatabase];
    }

        const filtered = allContent.filter(item => {
        const titleMatch = item.title && item.title.toLowerCase().includes(query);
        const genreMatch = item.genre && item.genre.toLowerCase().includes(query);
        const tagsMatch = Array.isArray(item.tags) && item.tags.some(tag => tag.toLowerCase().includes(query));
        return titleMatch || genreMatch || tagsMatch;
    });

    if (filtered.length === 0) {
        searchResults.classList.add('hidden');
        searchResults.innerHTML = '';
        return;
    }

    const unique = [];
    const seenTitles = new Set();
    filtered.forEach(item => {
        if (!seenTitles.has(item.title)) {
            seenTitles.add(item.title);
            unique.push(item);
        }
    });

    searchResults.innerHTML = '';
    unique.slice(0, 10).forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';

        let extra = '';
        if (item.episodes) {
            extra = item.episodes + ' • ';
        } else if (item.chapters) {
            extra = item.chapters + ' • ';
        }

        resultItem.innerHTML = `
            <h4>${item.title}</h4>
            <p>${extra}${item.info}</p>
        `;
        resultItem.onclick = () => showSearchedItem(item);
        searchResults.appendChild(resultItem);
    });

    searchResults.classList.remove('hidden');
    });

document.addEventListener('click', (e) => {
    if (e.target !== searchBar && !searchResults.contains(e.target)) {
        searchResults.classList.add('hidden');
    }
});

function showSearchedItem(item) {
    searchResults.classList.add('hidden');
    searchBar.value = '';

    document.getElementById('question-screen').classList.add('hidden');
    document.getElementById('character-container').classList.add('hidden');

    const thinkingScreen = document.getElementById('thinking-screen');
    if (animeMode) {
        thinkingScreen.querySelector('img').src = 'images/dogstand.png';
        thinkingScreen.querySelector('h2').textContent = 'DOGGO IS THINKING...';
    } else {
        thinkingScreen.querySelector('img').src = 'images/thinking.png';
        thinkingScreen.querySelector('h2').textContent = 'LUFFY IS THINKING...';
    }
    thinkingScreen.classList.remove('hidden');
    //fixed thinking screen
    thinkingTimeout = setTimeout(() => {

        thinkingScreen.classList.add('hidden');

        const resultScreen = document.getElementById('result-screen');
        document.getElementById('result-title').textContent = item.title;
        document.getElementById('result-description').textContent =
            (item.episodes || item.chapters ? (item.episodes || item.chapters) + ' • ' : '') + item.info;
        
        document.getElementById('feedback-buttons').classList.remove('hidden');
        document.getElementById('restart-btn').classList.add('hidden');
        resultScreen.classList.remove('hidden');
    }, 2000);
}

function typeWriter(text, element, callback) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 30);
        } else if (callback) {
            callback();
        }
    }
    
    type();
}

function changeCharacterImage(imageName) {
    const charImg = document.getElementById('character-img');
    charImg.src = `images/${imageName}`;
}

document.getElementById('theme-btn').addEventListener('click', () => {
    const themeOptions = document.getElementById('theme-options');
    themeOptions.classList.toggle('hidden');
});

function changeTheme(theme) {
    if (theme === 'default') {
        document.body.className = '';
    } else {
        document.body.className = `theme-${theme}`;
    }
    document.getElementById('theme-options').classList.add('hidden');
}

function switchToAnimeMode() {
    if (thinkingTimeout) {
        clearTimeout(thinkingTimeout);
        thinkingTimeout = null;
    }
    if (characterTimeout) {
        clearTimeout(characterTimeout);
        characterTimeout = null;
    }
    
    animeMode = true;
    document.body.style.backgroundImage = "url('images/green.jfif')";
    document.getElementById('anime-btn').textContent = 'MOVIE MODE';

    document.getElementById('question-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('final-screen').classList.add('hidden');

    document.getElementById('dialogue-box').style.display = 'none';
    document.getElementById('thinking-screen').classList.add('hidden');

    document.getElementById('overlay').classList.remove('fade-out');

    const charContainer = document.getElementById('character-container');
    charContainer.classList.remove('minimize');
    charContainer.classList.remove('hidden');
    changeCharacterImage('dogspeak.png');

    const dialogueBox = document.getElementById('dialogue-box');

    const dialogueText = document.getElementById('dialogue-text');
    const dialogueOptions = document.getElementById('dialogue-options');
    const continueBtn = document.getElementById('continue-btn');

    dialogueOptions.innerHTML = '';
    continueBtn.classList.add('hidden');
    dialogueBox.style.display = 'block';

    typeWriter("YOU CAN CHOOSE ANIME FROM HERE BUAHAHA", dialogueText, () => {
        continueBtn.classList.remove('hidden');
    });

    continueBtn.onclick = () => {
        changeCharacterImage('dogmad.png');
        dialogueBox.style.display = 'none';
        document.getElementById('overlay').classList.add('fade-out');
        charContainer.classList.add('minimize');
        
        document.getElementById('question-screen').classList.remove('hidden');
        
        document.querySelector('.type-selector').style.display = 'block';
        document.getElementById('questions-container').classList.add('hidden');
        
        const typeButtons = document.querySelector('.type-buttons');
        typeButtons.innerHTML = `
            <button onclick="selectType('anime')">ANIME</button>
            <button onclick="selectType('manga')">MANGA</button>
        `;
    };
}

function switchToMovieMode() {
    if (thinkingTimeout) {
        clearTimeout(thinkingTimeout);
        thinkingTimeout = null;
    }
    if (characterTimeout) {
        clearTimeout(characterTimeout);
        characterTimeout = null;
    }
    
    animeMode = false;
    document.body.style.backgroundImage = "url('images/pink.jfif')";
    document.getElementById('anime-btn').textContent = 'ANIME MODE';

    document.getElementById('question-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');

    document.getElementById('final-screen').classList.add('hidden');
    document.getElementById('dialogue-box').style.display = 'none';
    document.getElementById('thinking-screen').classList.add('hidden');

    document.getElementById('overlay').classList.remove('fade-out');

    const charContainer = document.getElementById('character-container');
    charContainer.classList.remove('minimize');
    charContainer.classList.remove('hidden');
    changeCharacterImage('welcome.png');

    const dialogueBox = document.getElementById('dialogue-box');
    const dialogueText = document.getElementById('dialogue-text');
    const dialogueOptions = document.getElementById('dialogue-options');
    const continueBtn = document.getElementById('continue-btn');

    dialogueOptions.innerHTML = '';
    continueBtn.classList.add('hidden');
    dialogueBox.style.display = 'block';


    typeWriter("Back to movies and shows, huh? Let's find you something good!", dialogueText, () => {
        continueBtn.classList.remove('hidden');

    });

    continueBtn.onclick = () => {
        changeCharacterImage('whiletyping.png');
        dialogueBox.style.display = 'none';
        document.getElementById('overlay').classList.add('fade-out');
        charContainer.classList.add('minimize');
        document.getElementById('question-screen').classList.remove('hidden');
        
        document.querySelector('.type-selector').style.display = 'block';
        document.getElementById('questions-container').classList.add('hidden');
        
        const typeButtons = document.querySelector('.type-buttons');
        typeButtons.innerHTML = `
            <button onclick="selectType('movie')">MOVIE</button>
            <button onclick="selectType('season')">SEASON</button>
        `;
    };
}

document.getElementById('anime-btn').addEventListener('click', () => {

    if (animeMode) {
        switchToMovieMode();
    } else {
        switchToAnimeMode();

    }
});

window.addEventListener('load', () => {
    const dialogueText = document.getElementById('dialogue-text');

    const dialogueOptions = document.getElementById('dialogue-options');
    
    typeWriter("Do you ever feel like you can't find a good movie to watch?", dialogueText, () => {
        dialogueOptions.innerHTML = `
            <button onclick="handleYesNo('yes')">YES</button>
            <button onclick="handleYesNo('no')">NO</button>
        `;
    });
});

function handleYesNo(answer) {
    const dialogueText = document.getElementById('dialogue-text');
    const dialogueOptions = document.getElementById('dialogue-options');
    const continueBtn = document.getElementById('continue-btn');
    
    if (answer === 'no') {
        changeCharacterImage('no.png');
        dialogueOptions.innerHTML = '';
        typeWriter("Oh... Well, goodbye then! :( ", dialogueText, () => {

            setTimeout(() => {
                document.body.innerHTML = '<div style="background:#000; width:100vw; height:100vh; display:flex; align-items:center; justify-content:center; color:#fff; font-size:48px; font-family:Courier New;">GOODBYE!</div>';
            }, 2000);
        });
    } else {
        dialogueOptions.innerHTML = '';
        typeWriter("Then I've got the perfect thing for you! All you have to do is answer 3 quick questions and you'll get a movie to chill with! (or cry)", dialogueText, () => {
            continueBtn.classList.remove('hidden');
            continueBtn.onclick = () => {
                changeCharacterImage('whiletyping.png');
                document.getElementById('dialogue-box').style.display = 'none';

                document.getElementById('overlay').classList.add('fade-out');
                document.getElementById('character-container').classList.add('minimize');
                document.getElementById('question-screen').classList.remove('hidden');
                document.getElementById('anime-selector').classList.add('show');
            };
        });
    }
}

function selectType(type) {
    userAnswers.type = type;
    document.querySelector('.type-selector').style.display = 'none';

    document.getElementById('questions-container').classList.remove('hidden');
    
    let questions;
    if (type === 'movie') {
        questions = movieQuestions;
    } else if (type === 'season') {
        questions = seasonQuestions;

    } else if (type === 'anime') {
        questions = animeQuestions;
    } else if (type === 'manga') {

        questions = mangaQuestions;
    }
    
    loadQuestions(questions);
}

function loadQuestions(questions) {
    questions.forEach((q, index) => {
        const questionNum = index + 1;
        document.getElementById(`q${questionNum}-text`).textContent = `${questionNum}. ${q.question}`;
        
        const optionsContainer = document.getElementById(`q${questionNum}-options`);

        optionsContainer.innerHTML = '';
        
        q.options.forEach(option => {
            const btn = document.createElement('button');

            btn.textContent = option;
            btn.onclick = () => selectAnswer(questionNum, option, btn, q.hasInput);
            optionsContainer.appendChild(btn);
        });
        
        if (q.hasInput && questionNum === 2) {
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.id = 'similar-input';

            inputField.placeholder = 'Type the name here...';
            inputField.className = 'similar-input hidden';

            inputField.style.cssText = 'width: 100%; padding: 15px; margin-top: 15px; font-size: 16px; border: 4px solid #000; font-family: Courier New;';
            optionsContainer.appendChild(inputField);
        }
    });
    
    document.getElementById('submit-btn').classList.remove('hidden');
}

function selectAnswer(questionNum, answer, button, hasInput) {
    userAnswers[`q${questionNum}`] = answer;
    
    const allButtons = button.parentElement.querySelectorAll('button');

    allButtons.forEach(btn => btn.classList.remove('selected'));

    
    button.classList.add('selected');
    
    if (questionNum === 2 && hasInput) {
        const inputField = document.getElementById('similar-input');
        if (answer === 'Yes') {
            inputField.classList.remove('hidden');
        } else {
            inputField.classList.add('hidden');

            userAnswers.q2Input = '';
        }
    }
}

document.getElementById('submit-btn').addEventListener('click', () => {

    if (!userAnswers.q1 || !userAnswers.q2 || !userAnswers.q3) {
        alert('Please answer all questions!');
        return;
    }
    
    if (userAnswers.q2 === 'Yes') {
        const inputField = document.getElementById('similar-input');
        if (inputField && !inputField.classList.contains('hidden')) {

            userAnswers.q2Input = inputField.value.trim().toLowerCase();
        }
    }
    
    document.getElementById('question-screen').classList.add('hidden');

    document.getElementById('character-container').classList.add('hidden');
    
    const thinkingScreen = document.getElementById('thinking-screen');
    if (animeMode) {
        thinkingScreen.querySelector('img').src = 'images/dogstand.png';

        thinkingScreen.querySelector('h2').textContent = 'DOGGO IS THINKING...';
    } else {
        thinkingScreen.querySelector('img').src = 'images/thinking.png';

        thinkingScreen.querySelector('h2').textContent = 'LUFFY IS THINKING...';
    }
    thinkingScreen.classList.remove('hidden');
    
    thinkingTimeout = setTimeout(() => {
        const recommendation = getRecommendation();
        showResult(recommendation);
    }, 3000);
});

function findSimilarContent(userInput, database) {
    if (!userInput) return null;
    
    let match = database.find(item => 

        item.title.toLowerCase().includes(userInput)
    );
    
    if (match) {
        return database.filter(item => 

            item.title !== match.title &&
            item.tags.some(tag => match.tags.includes(tag))
        );
    }
    
    return null;
}

function getRecommendation() {

    let database;
    if (userAnswers.type === 'movie') {

        database = movieDatabase;
    } else if (userAnswers.type === 'season') {

        database = seasonDatabase;
    } else if (userAnswers.type === 'anime') {
        database = animeDatabase;
    } else if (userAnswers.type === 'manga') {
        database = mangaDatabase;
    }
    
    let candidates = [...database];
    
    if (userAnswers.q2Input) {
        const similarContent = findSimilarContent(userAnswers.q2Input, database);
        if (similarContent && similarContent.length > 0) {
            candidates = similarContent;
        }
    }
    
    candidates = candidates.filter(item => 
        item.genre.toLowerCase() === userAnswers.q1.toLowerCase() ||

        item.tags.some(tag => tag.toLowerCase().includes(userAnswers.q1.toLowerCase()))
    );
    
    if (candidates.length === 0) {
        candidates = [...database];
    }


    
    if (userAnswers.type === 'movie' && userAnswers.q3 !== "Don't care") {
        const moodFiltered = candidates.filter(item => 
            item.mood && item.mood.toLowerCase() === userAnswers.q3.toLowerCase()
        );
        if (moodFiltered.length > 0) {
            candidates = moodFiltered;
        }
    }
    
    if (userAnswers.type === 'anime' && userAnswers.q3 !== "Don't care") {
        const vibeFiltered = candidates.filter(item => 

            item.vibe && item.vibe.toLowerCase() === userAnswers.q3.toLowerCase()
        );
        if (vibeFiltered.length > 0) {

            candidates = vibeFiltered;
        }
    }
    


    if (userAnswers.type === 'season' && userAnswers.q3 !== "Don't care") {

        if (userAnswers.q3.includes('Short')) {
            candidates = candidates.filter(item => {
                const episodeNum = parseInt(item.episodes);
                return episodeNum < 20;
            });
        } else if (userAnswers.q3.includes('Medium')) {

            candidates = candidates.filter(item => {
                const episodeNum = parseInt(item.episodes);

                return episodeNum >= 20 && episodeNum <= 50;
            });
        } else if (userAnswers.q3.includes('Long')) {
            candidates = candidates.filter(item => {

                const episodeNum = parseInt(item.episodes);
                return episodeNum > 50;
            });
        }
    }
    
    if (userAnswers.type === 'manga' && userAnswers.q3 !== "Don't care") {
        if (userAnswers.q3.includes('Short')) {
            candidates = candidates.filter(item => {

                const chapterNum = parseInt(item.chapters);
                return chapterNum < 50;
            });
        } else if (userAnswers.q3.includes('Medium')) {
            candidates = candidates.filter(item => {

                const chapterNum = parseInt(item.chapters);
                return chapterNum >= 50 && chapterNum <= 200;
            });
        } else if (userAnswers.q3.includes('Long')) {

            candidates = candidates.filter(item => {

                const chapterNum = parseInt(item.chapters);
                return chapterNum > 200;
            });
        }
    }


    
    candidates = candidates.filter(item => 

        !shownRecommendations.includes(item.title)
    );
    
    if (candidates.length === 0) {

        shownRecommendations = [];

        candidates = [...database];
    }
    
    const recommendation = candidates[Math.floor(Math.random() * candidates.length)];

    shownRecommendations.push(recommendation.title);
    
    return recommendation;
}

function showResult(recommendation) {

    document.getElementById('thinking-screen').classList.add('hidden');
    
    const resultScreen = document.getElementById('result-screen');
    document.getElementById('result-title').textContent = recommendation.title;
    
    let descText = '';
    if (userAnswers.type === 'season' || userAnswers.type === 'anime') {
        descText = (recommendation.episodes ? recommendation.episodes + ' • ' : '');
    } else if (userAnswers.type === 'manga') {
        descText = (recommendation.chapters ? recommendation.chapters + ' • ' : '');
    }
    descText += recommendation.info;
    
    document.getElementById('result-description').textContent = descText;
    
    document.getElementById('feedback-buttons').classList.remove('hidden');

    document.getElementById('restart-btn').classList.add('hidden');
    
    resultScreen.classList.remove('hidden');
}

function handleFeedback(liked) {
    if (liked) {
        document.getElementById('result-screen').classList.add('hidden');

        
        const charContainer = document.getElementById('character-container');
        charContainer.classList.remove('hidden');

        charContainer.classList.remove('minimize');
        
        if (animeMode) {
            changeCharacterImage('dogstand.png');
        } else {
            changeCharacterImage('choosen.png');
        }
        
        characterTimeout = setTimeout(() => {
            charContainer.classList.add('hidden');
            document.getElementById('final-screen').classList.remove('hidden');
        }, 2000);
    } else {
        document.getElementById('result-screen').classList.add('hidden');
        
        const charContainer = document.getElementById('character-container');

        charContainer.classList.remove('hidden');

        charContainer.classList.remove('minimize');
        
        if (animeMode) {
            changeCharacterImage('dogcry.png');
        } else {
            changeCharacterImage('findmore.png');
        }
        
        characterTimeout = setTimeout(() => {
            charContainer.classList.add('hidden');
            
            const thinkingScreen = document.getElementById('thinking-screen');
            if (animeMode) {
                thinkingScreen.querySelector('img').src = 'images/dogstand.png';

                thinkingScreen.querySelector('h2').textContent = 'DOGGO IS THINKING...';
            } else {
                thinkingScreen.querySelector('img').src = 'images/thinking.png';
                thinkingScreen.querySelector('h2').textContent = 'LUFFY IS THINKING...';
            }
            thinkingScreen.classList.remove('hidden');
            
            thinkingTimeout = setTimeout(() => {
                const newRecommendation = getRecommendation();
                showResult(newRecommendation);

            }, 3000);
        }, 2000);
    }
}

function restart() {
    location.reload();
}