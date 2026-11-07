/* Grammar Master — self-contained study application (no network required). */
const STORAGE_KEY = "grammar-master-progress-v1";

const TOPIC_INFO = {
  presentSimple: { title: "Present Simple", icon: "◷", description: "Habits, facts, routines, do/does, and third-person forms." },
  presentContinuous: { title: "Present Continuous", icon: "⌁", description: "Actions now, temporary situations, change, and arrangements." },
  frequency: { title: "Adverbs of Frequency", icon: "≈", description: "Always to never: position, questions, and emphasis." },
  sentenceTypes: { title: "Types of Sentences", icon: "▤", description: "Simple, compound, complex, and compound-complex sentences." },
  commaSplice: { title: "Comma Splice", icon: "✎", description: "Spot and repair commas that wrongly join complete sentences." },
  fusedSentences: { title: "Fused Sentences", icon: "⇄", description: "Find and fix independent clauses run together without punctuation." },
  fragments: { title: "Sentence Fragments", icon: "⚠", description: "Complete thoughts, missing parts, and fragment repairs." },
  clauses: { title: "Independent & Dependent Clauses", icon: "⌘", description: "Clauses, subordinators, relative pronouns, and punctuation." },
  topicSentences: { title: "Topic Sentences", icon: "¶", description: "Main ideas, controlling ideas, support, and paragraph focus." }
};

const FORMAT_NAMES = {
  MCQ: "Multiple choice", TF: "True or false", Fill: "Fill in the blank", Error: "Identify the error",
  Correct: "Correct the sentence", Choose: "Choose the correct sentence", Classify: "Sentence classification",
  Clauses: "Identify clauses", Arrange: "Arrange the words", Topic: "Topic sentence skill"
};

function question(id, format, prompt, options, correct, explanation) {
  return { id, format, prompt, options, correct, explanation };
}

/* Each row is a unique, ready-to-use question. Difficulty is assigned 12 easy / 12 intermediate / 6 advanced per topic. */
const RAW_BANK = {
  presentSimple: [
    question("ps01", "MCQ", "My brother ___ to campus by bus every day.", ["go", "goes", "is going", "going"], 1, "Use goes with a third-person singular subject (my brother)."),
    question("ps02", "MCQ", "___ your classmates study in the library after class?", ["Do", "Does", "Are", "Is"], 0, "Use Do to make a present-simple question with the plural subject classmates."),
    question("ps03", "Fill", "The library ___ at 8:00 a.m. on weekdays.", ["open", "opens", "is open", "opening"], 1, "Schedules and regular opening times use the present simple; library is singular, so use opens."),
    question("ps04", "TF", "We use the present simple for an action happening at this exact moment.", ["True", "False"], 1, "Actions happening now normally use the present continuous, not the present simple."),
    question("ps05", "Fill", "I ___ not drink coffee before my morning class.", ["do", "does", "am", "are"], 0, "Use do not with I in a present-simple negative sentence."),
    question("ps06", "Correct", "Choose the correct revision: “She doesn't likes spicy food.”", ["She doesn't likes spicy food.", "She doesn't like spicy food.", "She don't like spicy food.", "She isn't like spicy food."], 1, "After does not, use the base form like, not likes."),
    question("ps07", "Error", "What is the error in “Emma play volleyball on Fridays”?", ["Emma should be plural.", "play should be plays.", "on should be at.", "Fridays should be Friday."], 1, "Emma is third-person singular, so the main verb needs -s: plays."),
    question("ps08", "Choose", "Choose the correct sentence.", ["He watch documentaries on weekends.", "He watches documentaries on weekends.", "He is watch documentaries on weekends.", "He watching documentaries on weekends."], 1, "He takes the third-person singular form watches."),
    question("ps09", "Arrange", "Choose the correctly arranged sentence: “usually / I / my notes / review / at night.”", ["Usually I at night review my notes.", "I review usually my notes at night.", "I usually review my notes at night.", "I review my notes usually at night."], 2, "An adverb of frequency normally comes before the main verb: I usually review."),
    question("ps10", "MCQ", "People in Canada often ___ English and French.", ["speak", "speaks", "are speaking", "speaking"], 0, "People is plural, so use the base form speak."),
    question("ps11", "Fill", "My friend ___ a car, so she walks to class.", ["don't have", "doesn't have", "isn't having", "doesn't has"], 1, "With she, use does not + base verb: doesn't have."),
    question("ps12", "TF", "In a present-simple question about he, she, or it, we use does before the subject.", ["True", "False"], 0, "Does is the auxiliary for third-person singular present-simple questions."),
    question("ps13", "MCQ", "The train ___ at 6:15 tomorrow morning.", ["leave", "leaves", "is leave", "leaving"], 1, "The present simple can describe a fixed timetable: the train leaves."),
    question("ps14", "MCQ", "Why ___ Maria need the course catalog?", ["do", "does", "is", "are"], 1, "Maria is singular, so use does; the following verb stays in the base form need."),
    question("ps15", "Error", "Which is the correct third-person singular form of study?", ["studys", "studies", "studyies", "studyes"], 1, "For a consonant + y verb, change y to ies: studies."),
    question("ps16", "Fill", "Our teacher ___ homework every Friday.", ["assign", "assigns", "is assigning", "assigned"], 1, "A regular weekly action uses assigns with the singular subject teacher."),
    question("ps17", "Correct", "Choose the correct revision: “Does he works at the bookstore?”", ["Does he works at the bookstore?", "Do he work at the bookstore?", "Does he work at the bookstore?", "Is he work at the bookstore?"], 2, "After does, use the base verb work."),
    question("ps18", "Fill", "Water ___ at 100°C under normal conditions.", ["boil", "boils", "is boiling", "boiling"], 1, "Scientific facts use the present simple; water is singular, so use boils."),
    question("ps19", "Choose", "Choose the correct sentence about television habits.", ["My parents doesn't watch television often.", "My parents don't watch television often.", "My parents aren't watch television often.", "My parents not watch television often."], 1, "Parents is plural, so the negative auxiliary is don't."),
    question("ps20", "MCQ", "Every student ___ an ID card for the exam.", ["need", "needs", "needing", "is need"], 1, "Every student is grammatically singular, so use needs."),
    question("ps21", "MCQ", "Which sentence correctly uses the present simple?", ["I am believing your story.", "The Earth moves around the Sun.", "They are own two bicycles.", "She is knowing the answer."], 1, "General truths use the present simple: the Earth moves around the Sun."),
    question("ps22", "Fill", "The movie ___ until 9:30, so we have time for dinner.", ["don't start", "doesn't start", "isn't start", "not starts"], 1, "Movie is singular; use doesn't + base form start for the schedule."),
    question("ps23", "Arrange", "Choose the correct question: “often / how / do / you / call / your family?”", ["How often you call your family?", "How often do you call your family?", "How do often you call your family?", "How often are you call your family?"], 1, "Present-simple questions use How often + do + subject + base verb."),
    question("ps24", "Error", "What should be corrected in “I am know the answer”?", ["Change I to me.", "Remove am: “I know the answer.”", "Change know to knowing.", "Add do before know."], 1, "Know is normally a stative verb, so use the present simple: I know."),
    question("ps25", "Choose", "Which sentence describes a habitual action and is correct?", ["Lena is taking the same route every day.", "Lena takes the same route every day.", "Lena take the same route every day.", "Lena has taking the same route every day."], 1, "Every day signals a routine, so use takes."),
    question("ps26", "MCQ", "If the museum ___ at 10, we can meet outside at 9:45.", ["open", "opens", "is opening", "opened"], 1, "In time and condition clauses about the future, use the present simple: opens."),
    question("ps27", "Correct", "Choose the correct revision: “My university have a large science building.”", ["My university have a large science building.", "My university has a large science building.", "My university is have a large science building.", "My university having a large science building."], 1, "University is singular, so the verb is has."),
    question("ps28", "MCQ", "Which sentence has the correct third-person singular spelling?", ["Nora wash the dishes after dinner.", "Nora washs the dishes after dinner.", "Nora washes the dishes after dinner.", "Nora washing the dishes after dinner."], 2, "Verbs ending in -sh add -es with a third-person singular subject: washes."),
    question("ps29", "MCQ", "___ the results of the survey show a clear pattern?", ["Do", "Does", "Is", "Are"], 0, "The subject results is plural, so use Do."),
    question("ps30", "Choose", "Select the present-simple sentence that refers to a scheduled future event.", ["The semester ends on December 18.", "The semester is end on December 18.", "The semester ending on December 18.", "The semester has end on December 18."], 0, "Official schedules can use the present simple: the semester ends."),
  ],
  presentContinuous: [
    question("pc01", "MCQ", "Look! The baby ___.", ["sleep", "sleeps", "is sleeping", "sleeping"], 2, "Look signals an action happening now; use is + sleeping."),
    question("pc02", "Fill", "I ___ a report right now.", ["write", "writes", "am writing", "writing"], 2, "With I, use am + verb-ing for an action in progress now."),
    question("pc03", "MCQ", "___ they ___ dinner at the moment?", ["Do / cook", "Are / cooking", "Is / cooking", "Are / cook"], 1, "Present-continuous questions use are + subject + verb-ing for they."),
    question("pc04", "TF", "The stative verb know is normally used in “I am knowing the answer.”", ["True", "False"], 1, "Know is normally stative, so say I know the answer."),
    question("pc05", "Fill", "She ___ today because she has a fever.", ["doesn't work", "isn't working", "not working", "doesn't working"], 1, "A temporary situation now uses isn't working."),
    question("pc06", "Correct", "Choose the correct revision: “We are study for the test.”", ["We are study for the test.", "We study for the test now.", "We are studying for the test.", "We are studies for the test."], 2, "After are, use the -ing form: studying."),
    question("pc07", "Error", "Which spelling is correct for the -ing form of plan?", ["planing", "planning", "plannning", "plansing"], 1, "Double the final consonant in plan before adding -ing: planning."),
    question("pc08", "Choose", "Choose the sentence about a temporary situation.", ["Daniel stays with his aunt this month.", "Daniel is staying with his aunt this month.", "Daniel stay with his aunt this month.", "Daniel has stay with his aunt this month."], 1, "This month shows a temporary arrangement, so is staying is appropriate."),
    question("pc09", "MCQ", "They ___ a new bridge near the river these days.", ["build", "builds", "are building", "building"], 2, "These days introduces an ongoing temporary project: are building."),
    question("pc10", "Arrange", "Choose the correct arrangement: “not / I / am / tonight / studying.”", ["I not am studying tonight.", "I am not studying tonight.", "I am studying not tonight.", "Not I am studying tonight."], 1, "Place not after am: I am not studying."),
    question("pc11", "Error", "What is missing in “Is raining outside”?", ["A subject: “It is raining outside.”", "A plural noun after is.", "The word now.", "A period after raining."], 0, "English needs the dummy subject it for weather: It is raining."),
    question("pc12", "Choose", "Choose the correct future arrangement.", ["We meet the tutor at 3 tomorrow.", "We are meeting the tutor at 3 tomorrow.", "We meeting the tutor at 3 tomorrow.", "We are meet the tutor at 3 tomorrow."], 1, "The present continuous can describe a personal future arrangement."),
    question("pc13", "MCQ", "My roommate ___ always ___ my pens without asking.", ["is / borrowing", "does / borrow", "are / borrow", "is / borrow"], 0, "Is always borrowing expresses an annoying repeated action."),
    question("pc14", "Fill", "Prices ___ quickly this year.", ["rise", "rises", "are rising", "rising"], 2, "A changing trend in progress uses are rising."),
    question("pc15", "Choose", "Which sentence expresses annoyance about a repeated behavior?", ["She always forgets her notebook.", "She is always forgetting her notebook.", "She always is forget her notebook.", "She forgetting always her notebook."], 1, "Be + always + verb-ing can emphasize annoyance about repetition."),
    question("pc16", "Correct", "Choose the correct revision: “Are you listen to the lecture?”", ["Are you listen to the lecture?", "Do you listening to the lecture?", "Are you listening to the lecture?", "Is you listening to the lecture?"], 2, "After are, use listening."),
    question("pc17", "Fill", "My cousins ___ for an apartment near campus this week.", ["look", "looks", "are looking", "looking"], 2, "This week suggests a temporary action in progress: are looking."),
    question("pc18", "MCQ", "Why ___ you ___ a coat indoors?", ["do / wear", "are / wearing", "is / wearing", "are / wear"], 1, "Use are + wearing in a question about what is happening now."),
    question("pc19", "Choose", "Choose the correct sentence with a stative verb.", ["I am understanding the instructions.", "I understand the instructions.", "I understanding the instructions.", "I do understanding the instructions."], 1, "Understand is normally stative and takes the simple form here."),
    question("pc20", "MCQ", "This soup ___ delicious.", ["is tasting", "tastes", "taste", "is taste"], 1, "When taste describes a state or quality, use the present simple: tastes."),
    question("pc21", "Fill", "He ___ around the track right now.", ["run", "runs", "is running", "is runing"], 2, "Run doubles the final consonant before -ing: running."),
    question("pc22", "Arrange", "Choose the correct arrangement: “waiting / are / the students / outside.”", ["The students waiting are outside.", "Are waiting the students outside.", "The students are waiting outside.", "The students are outside waiting are."], 2, "Present continuous uses subject + are + waiting."),
    question("pc23", "TF", "The present continuous is formed with be + the base verb, such as “They are study.”", ["True", "False"], 1, "The form is be + verb-ing: They are studying."),
    question("pc24", "Fill", "Our neighbors ___ a party tonight.", ["have", "are having", "having", "has"], 1, "Are having describes a planned arrangement tonight."),
    question("pc25", "MCQ", "The number of online students ___ every semester.", ["increase", "are increasing", "is increasing", "increasing"], 2, "The number is singular; an ongoing change uses is increasing."),
    question("pc26", "Choose", "Choose the correct present-continuous question.", ["What you are doing now?", "What are you doing now?", "What do you doing now?", "What are doing you now?"], 1, "Question order is What + are + subject + verb-ing."),
    question("pc27", "Correct", "Choose the best revision: “I am not believing his excuse.”", ["I am not believing his excuse.", "I do not believe his excuse.", "I am don't believe his excuse.", "I not believe his excuse."], 1, "Believe is usually stative; use the simple form do not believe."),
    question("pc28", "MCQ", "They ___ constantly ___ about the Wi-Fi.", ["are / complaining", "do / complain", "is / complaining", "are / complain"], 0, "Are constantly complaining emphasizes an irritating repeated behavior."),
    question("pc29", "Fill", "The company ___ new staff for the summer season.", ["hire", "hires", "is hiring", "hiring"], 2, "A current, temporary recruitment process uses is hiring."),
    question("pc30", "Choose", "Choose the best response to an invitation for Friday.", ["Yes, I come to the concert.", "Yes, I am coming to the concert.", "Yes, I coming to the concert.", "Yes, I am come to the concert."], 1, "Am coming can describe a confirmed future arrangement."),
  ],
  frequency: [
    question("af01", "Fill", "She ___ arrives early for class.", ["always", "is always", "always is", "does always"], 0, "With a main verb, always goes before the verb: always arrives."),
    question("af02", "Choose", "Choose the correct sentence with often.", ["He visits often his grandparents.", "He often visits his grandparents.", "He is often visits his grandparents.", "He visit often his grandparents."], 1, "Adverbs of frequency normally come before the main verb."),
    question("af03", "Fill", "They are ___ late for practice.", ["never", "never are", "are never", "not never"], 0, "With the verb be, the frequency adverb goes after be: are never late."),
    question("af04", "TF", "An adverb of frequency usually comes after the verb be.", ["True", "False"], 0, "Say She is always prepared, not She always is prepared in the neutral order."),
    question("af05", "MCQ", "How often ___ you visit the writing center?", ["do", "does", "are", "is"], 0, "Use do with you in present-simple How often questions."),
    question("af06", "Fill", "I ___ eat lunch at the student café.", ["usually", "am usually", "usually am", "do usually"], 0, "Usually comes before the main verb eat."),
    question("af07", "Choose", "Choose the correct sentence with an auxiliary verb.", ["She never has forgotten her password.", "She has never forgotten her password.", "She has forgotten never her password.", "She never has forget her password."], 1, "With have as an auxiliary, never comes after have and before the past participle."),
    question("af08", "Choose", "Choose the correct negative sentence.", ["We don't usually eat out on weekdays.", "We usually don't eat out on weekdays.", "We don't eat usually out on weekdays.", "We not usually eat out on weekdays."], 0, "Both first and second forms can occur, but the first is the standard neutral placement taught at this level."),
    question("af09", "Arrange", "Choose the correct arrangement: “always / is / Maya / helpful.”", ["Always Maya is helpful.", "Maya always is helpful.", "Maya is always helpful.", "Maya helpful is always."], 2, "With be, place always after is: Maya is always helpful."),
    question("af10", "MCQ", "___ does the campus café close early on Fridays?", ["How often", "How many", "How long", "How much"], 0, "How often asks about frequency."),
    question("af11", "TF", "With a main verb, an adverb such as usually normally comes before the verb.", ["True", "False"], 0, "For example: They usually study at night."),
    question("af12", "Choose", "Choose the correct sentence.", ["He sometimes is nervous before exams.", "He is sometimes nervous before exams.", "He is nervous sometimes before exams always.", "He sometimes nervous is before exams."], 1, "With be, sometimes goes after is."),
    question("af13", "Fill", "My teammates ___ practice after class.", ["often", "are often", "often are", "do often"], 0, "With the main verb practice, often comes before it."),
    question("af14", "MCQ", "Where ___ you usually study after dinner?", ["do", "does", "are", "is"], 0, "Use do with you; usually comes before the base verb study."),
    question("af15", "Fill", "The buses are ___ crowded at 8:00 a.m.", ["often", "often are", "are often", "not often"], 0, "With are, the adverb follows it: are often crowded."),
    question("af16", "Correct", "Choose the correct revision: “I go always to bed before eleven.”", ["I always go to bed before eleven.", "I go to bed always before eleven.", "Always I go to bed before eleven.", "I am always go to bed before eleven."], 0, "Put always before the main verb go."),
    question("af17", "Choose", "Choose the correct sentence about agreement.", ["She doesn't agree always with him.", "She doesn't always agree with him.", "She always doesn't agree with him.", "She doesn't agrees always with him."], 1, "With do/does, the adverb goes after the auxiliary: doesn't always agree."),
    question("af18", "MCQ", "How often ___ your lectures meet each week?", ["do", "does", "are", "is"], 0, "Lectures is plural, so use do."),
    question("af19", "Choose", "Choose the correct sentence with never.", ["She never is late.", "She is never late.", "She is late never.", "She never late is."], 1, "With be, place never after is."),
    question("af20", "Choose", "Choose the correct sentence with the present perfect.", ["They usually have studied before dinner.", "They have usually studied before dinner.", "They have studied usually before dinner.", "They usually have study before dinner."], 1, "With have as an auxiliary, usually follows have and precedes the participle."),
    question("af21", "MCQ", "Which adverb means “not often”?", ["Always", "Usually", "Rarely", "Never"], 2, "Rarely means not often; never means not at any time."),
    question("af22", "Arrange", "Choose the correct question: “always / am / I / late / ?”", ["Always am I late?", "Am I always late?", "I am always late?", "Am always I late?"], 1, "In a be question, put am before the subject: Am I always late?"),
    question("af23", "Error", "What is wrong with “Luis is often forget his keys”?", ["Use is forgetting for a habit.", "Remove is and use forgets.", "Change often to always.", "Keys should be key."], 1, "For a usual habit, use the present simple: Luis often forgets his keys."),
    question("af24", "Fill", "We ___ have dinner at home, but we eat out on Fridays.", ["sometimes", "are sometimes", "sometimes are", "do sometimes"], 0, "Sometimes comes before the main verb have."),
    question("af25", "Choose", "Which sentence places the frequency adverb correctly with a modal verb?", ["Students should bring always an ID.", "Students should always bring an ID.", "Students always should bring an ID.", "Students should bring an ID always."], 1, "With a modal, place always after should and before the base verb."),
    question("af26", "Choose", "Choose the correct How often question.", ["How often Maya calls her sister?", "How often does Maya call her sister?", "How often does Maya calls her sister?", "How often is Maya call her sister?"], 1, "Use does + base verb call with the singular subject Maya."),
    question("af27", "Choose", "Choose the grammatically correct formal sentence.", ["Seldom students arrive late.", "Seldom do students arrive late.", "Seldom students arrives late.", "Seldom are students arrive late."], 1, "After a negative-like adverb at the beginning, formal English uses inversion: Seldom do students arrive."),
    question("af28", "Fill", "I have ___ been to that part of the city.", ["never", "never have", "been never", "not never"], 0, "Never follows the auxiliary have: have never been."),
    question("af29", "Choose", "Choose the correct sentence about the projector.", ["The projector rarely works during presentations.", "The projector works rarely during presentations.", "The projector is rarely works during presentations.", "The projector rare works during presentations."], 0, "Rarely normally goes before the main verb works."),
    question("af30", "MCQ", "Which question asks about the frequency of an action?", ["How often do you exercise?", "How long do you exercise?", "How much do you exercise?", "How many do you exercise?"], 0, "How often asks about how frequently an action happens."),
  ],
  sentenceTypes: [
    question("st01", "Classify", "What type of sentence is “The sun set behind the hills”?", ["Simple", "Compound", "Complex", "Compound-complex"], 0, "It has one independent clause, so it is simple."),
    question("st02", "Classify", "What type is “Rita revised her notes, and Omar organized the slides”?", ["Simple", "Compound", "Complex", "Compound-complex"], 1, "It has two independent clauses joined by and."),
    question("st03", "Classify", "What type is “Because the bus was late, we missed the first activity”?", ["Simple", "Compound", "Complex", "Compound-complex"], 2, "It combines a dependent clause (Because...) with one independent clause."),
    question("st04", "Classify", "What type is “Although it was raining, we walked to class, and we arrived on time”?", ["Simple", "Compound", "Complex", "Compound-complex"], 3, "It has a dependent clause plus two independent clauses."),
    question("st05", "TF", "A simple sentence may have a compound verb, as in “The dog barked and ran.”", ["True", "False"], 0, "There is still only one independent clause, so the sentence is simple."),
    question("st06", "MCQ", "Which word is a coordinating conjunction?", ["because", "although", "but", "when"], 2, "But is one of the FANBOYS coordinating conjunctions."),
    question("st07", "Classify", "What type is “When the bell rang, everyone left”?", ["Simple", "Compound", "Complex", "Compound-complex"], 2, "When the bell rang is dependent; everyone left is independent."),
    question("st08", "Classify", "What type is “The professor smiled, but the students left because the room was cold”?", ["Simple", "Compound", "Complex", "Compound-complex"], 3, "Two independent clauses are joined by but, and because introduces a dependent clause."),
    question("st09", "Clauses", "In “After the lecture ended, students asked questions,” which part is the independent clause?", ["After the lecture ended", "students asked questions", "After", "the lecture"], 1, "Students asked questions can stand alone as a complete sentence."),
    question("st10", "Arrange", "Which correctly arranged complex sentence uses while?", ["While rain falls, the match continued.", "While the rain fell, the match continued.", "The match while continued the rain fell.", "The rain fell while, the match continued."], 1, "While the rain fell is a dependent clause followed by an independent clause."),
    question("st11", "MCQ", "Which description defines an independent clause?", ["A group of words that begins with because", "A complete thought with a subject and verb", "Any long sentence", "A phrase with a comma"], 1, "An independent clause can stand alone because it is a complete thought."),
    question("st12", "TF", "Although is a subordinating conjunction.", ["True", "False"], 0, "Although introduces a dependent clause."),
    question("st13", "Classify", "What type is “The dog barked and ran toward the gate”?", ["Simple", "Compound", "Complex", "Compound-complex"], 0, "The subject has two verbs, but there is only one independent clause."),
    question("st14", "Classify", "What type is “The dog barked, and the cat hid under the bed”?", ["Simple", "Compound", "Complex", "Compound-complex"], 1, "Two independent clauses are joined with comma + and."),
    question("st15", "Classify", "What type is “Although the store was closing, we found the book”?", ["Simple", "Compound", "Complex", "Compound-complex"], 2, "Although the store was closing is a dependent clause."),
    question("st16", "Classify", "What type is “We packed quickly because it was late, and we caught the bus”?", ["Simple", "Compound", "Complex", "Compound-complex"], 3, "There are two independent clauses plus the dependent because clause."),
    question("st17", "MCQ", "Which word can introduce a dependent clause?", ["and", "but", "because", "so"], 2, "Because is a subordinating conjunction that introduces a dependent clause."),
    question("st18", "Choose", "Which sentence has two independent clauses and one dependent clause?", ["The students studied all night.", "When the exam ended, the students relaxed, and they called their families.", "Because the students studied, they relaxed.", "The students studied and relaxed."], 1, "The second option has a dependent when clause and two complete independent clauses."),
    question("st19", "Classify", "What type is “The lab closed early because the power failed”?", ["Simple", "Compound", "Complex", "Compound-complex"], 2, "The lab closed early is independent; because the power failed is dependent."),
    question("st20", "TF", "A complex sentence must always be long.", ["True", "False"], 1, "Sentence type depends on clauses, not length. “Because it rained, we left” is complex and short."),
    question("st21", "MCQ", "Which word belongs to the FANBOYS group?", ["unless", "or", "while", "since"], 1, "Or is a coordinating conjunction in FANBOYS."),
    question("st22", "Choose", "Choose the correctly punctuated compound sentence.", ["She studied so she passed.", "She studied, so she passed.", "She studied because, so she passed.", "She studied; so she passed."], 1, "Two independent clauses joined by so need a comma before so."),
    question("st23", "Classify", "What type is “I called the office, but no one answered”?", ["Simple", "Compound", "Complex", "Compound-complex"], 1, "I called the office and no one answered are independent clauses joined by but."),
    question("st24", "Classify", "What type is “After we ate lunch, we returned to the library”?", ["Simple", "Compound", "Complex", "Compound-complex"], 2, "After we ate lunch is dependent; we returned to the library is independent."),
    question("st25", "Classify", "What type is “The students who arrived early chose their seats”?", ["Simple", "Compound", "Complex", "Compound-complex"], 2, "Who arrived early is a dependent relative clause attached to students."),
    question("st26", "Classify", "What type is “While I waited, I read an article, but my friend watched a video”?", ["Simple", "Compound", "Complex", "Compound-complex"], 3, "It includes a dependent while clause and two independent clauses joined by but."),
    question("st27", "Classify", "What type is “The reviewer praised the clear introduction”?", ["Simple", "Compound", "Complex", "Compound-complex"], 0, "It contains one independent clause."),
    question("st28", "Choose", "Which sentence is compound, not simple?", ["Mina sang and danced.", "Mina sang, and Leo danced.", "When Mina sang, Leo danced.", "Singing, Mina danced."], 1, "Mina sang and Leo danced are two independent clauses."),
    question("st29", "Choose", "Which sentence is complex?", ["The lights went out, and everyone screamed.", "Although the lights went out, everyone stayed calm.", "The lights went out suddenly.", "The lights went out; everyone stayed calm."], 1, "Although introduces a dependent clause, creating a complex sentence."),
    question("st30", "MCQ", "A sentence with one independent clause and at least one dependent clause is called a ___ sentence.", ["simple", "compound", "complex", "fragment"], 2, "That clause pattern is the definition of a complex sentence."),
  ],
  commaSplice: [
    question("cs01", "Error", "Which sentence contains a comma splice?", ["The seminar ended, students packed their bags.", "The seminar ended, so students packed their bags.", "After the seminar ended, students packed their bags.", "The seminar ended; students packed their bags."], 0, "The first option joins two independent clauses with only a comma."),
    question("cs02", "TF", "A comma alone correctly joins two independent clauses.", ["True", "False"], 1, "A comma alone creates a comma splice when both sides are complete sentences."),
    question("cs03", "Correct", "Choose the correct repair: “The class ended, we went home.”", ["The class ended we went home.", "The class ended. We went home.", "The class ended, we went home.", "The class ended, because we went home."], 1, "A period correctly separates the two independent clauses."),
    question("cs04", "Correct", "Choose the repair that uses a coordinating conjunction correctly.", ["The room was cold, but we stayed.", "The room was cold but, we stayed.", "The room was cold, we stayed but.", "The room was cold; but we stayed."], 0, "Comma + but correctly joins two independent clauses."),
    question("cs05", "Correct", "Choose the repair that uses a semicolon correctly.", ["I finished the assignment; I submitted it online.", "I finished the assignment,; I submitted it online.", "I finished the assignment; and I submitted it online.", "I finished the assignment, I submitted it online."], 0, "A semicolon can join closely related independent clauses."),
    question("cs06", "Choose", "Which sentence does NOT contain a comma splice?", ["Although the rain stopped, we stayed inside.", "The rain stopped, we stayed inside.", "The rain stopped, everyone cheered.", "We stayed inside, the roads were flooded."], 0, "Although makes the first part dependent, so the comma is correct."),
    question("cs07", "Error", "Which sentence has a comma splice?", ["The meeting was long, everyone became tired.", "The meeting was long, but everyone listened.", "Because the meeting was long, everyone became tired.", "The meeting was long; everyone became tired."], 0, "Both parts of the first sentence can stand alone, and only a comma joins them."),
    question("cs08", "Choose", "Which sentence is correctly punctuated?", ["We were tired, we kept working.", "We were tired, but we kept working.", "We were tired; but we kept working.", "We were tired, because we kept working."], 1, "Comma + coordinating conjunction but joins the two independent clauses."),
    question("cs09", "Correct", "Choose the correct use of a conjunctive adverb.", ["The essay was late, therefore, it lost points.", "The essay was late; therefore, it lost points.", "The essay was late therefore it lost points.", "The essay was late, therefore it lost points."], 1, "Use a semicolon before therefore and a comma after it when joining independent clauses."),
    question("cs10", "MCQ", "Why is “The quiz was difficult, many students asked questions” incorrect?", ["It has no subject.", "It joins two independent clauses with only a comma.", "It uses the wrong verb tense.", "It needs an exclamation mark."], 1, "That error is exactly a comma splice."),
    question("cs11", "Choose", "Choose the correct sentence.", ["The class ended. We walked to the bus stop.", "The class ended, we walked to the bus stop.", "The class ended, and because we walked to the bus stop.", "The class ended; and we walked to the bus stop."], 0, "A period correctly separates two independent clauses."),
    question("cs12", "Choose", "Which sentence uses a dependent clause to avoid a comma splice?", ["Because the roads were icy, school closed early.", "The roads were icy, school closed early.", "The roads were icy; because school closed early.", "The roads were icy, therefore school closed early."], 0, "Because makes the opening clause dependent, so the comma is correct."),
    question("cs13", "Correct", "Which repair adds the needed comma and coordinating conjunction?", ["The printer jammed so, I emailed the paper.", "The printer jammed, so I emailed the paper.", "The printer jammed; so I emailed the paper.", "The printer jammed, I emailed the paper."], 1, "Use a comma before so when it joins two independent clauses."),
    question("cs14", "Correct", "Choose the correct revision: “She practices daily, she improves quickly.”", ["She practices daily; she improves quickly.", "She practices daily, she improves quickly.", "She practices daily; and she improves quickly.", "She practices daily, because she improves quickly."], 0, "A semicolon correctly joins the related independent clauses."),
    question("cs15", "TF", "A comma splice can be corrected by using a semicolon.", ["True", "False"], 0, "A semicolon is one accepted way to join closely related independent clauses."),
    question("cs16", "Choose", "Choose the correct punctuation with however.", ["The room was full, however, we found seats.", "The room was full; however, we found seats.", "The room was full however we found seats.", "The room was full; however we found seats."], 1, "When however connects two independent clauses, use ; however, ."),
    question("cs17", "Error", "Which chapter sentence contains a comma splice?", ["I reviewed the chapter, I understood the lecture.", "I reviewed the chapter, so I understood the lecture.", "After I reviewed the chapter, I understood the lecture.", "I reviewed the chapter; I understood the lecture."], 0, "The first sentence uses a comma alone between independent clauses."),
    question("cs18", "Correct", "Choose the best correction: “The bus was late, we arrived after the test began.”", ["Because the bus was late, we arrived after the test began.", "The bus was late, because we arrived after the test began.", "The bus was late, we arrived after the test began.", "The bus was late; because we arrived after the test began."], 0, "The revision makes the cause clause dependent with because."),
    question("cs19", "TF", "Replacing the comma in a comma splice with a period can correct the error.", ["True", "False"], 0, "A period makes two separate sentences, each with an independent clause."),
    question("cs20", "Choose", "Which change does NOT correct a comma splice?", ["Replace the comma with a period.", "Replace the comma with a semicolon.", "Add a comma before and.", "Add a second comma after the first comma."], 3, "Adding another comma does not properly join the two independent clauses."),
    question("cs21", "Error", "Which lights-and-audience sentence has a comma splice?", ["The lights went out, the audience became quiet.", "When the lights went out, the audience became quiet.", "The lights went out, and the audience became quiet.", "The lights went out; the audience became quiet."], 0, "The first has two independent clauses joined only by a comma."),
    question("cs22", "Choose", "Choose the correct compound sentence.", ["Some students studied, so they felt prepared.", "Some students studied so, they felt prepared.", "Some students studied; so they felt prepared.", "Some students studied, they felt prepared."], 0, "Comma + so correctly links the two independent clauses."),
    question("cs23", "Choose", "Which sentence correctly uses consequently?", ["My phone died, consequently, I missed the call.", "My phone died; consequently, I missed the call.", "My phone died consequently I missed the call.", "My phone died; consequently I missed the call."], 1, "A conjunctive adverb requires a semicolon before it and a comma after it in this structure."),
    question("cs24", "Error", "What is wrong with “The chef prepared dinner, the guests set the table”?", ["It is a comma splice.", "It is a sentence fragment.", "It has a spelling error.", "It has no verb."], 0, "Each side is an independent clause; a comma alone is not enough."),
    question("cs25", "Correct", "Choose the correction that shows cause: “We missed the bus, we arrived late.”", ["Because we missed the bus, we arrived late.", "We missed the bus, because we arrived late.", "We missed the bus; because we arrived late.", "We missed the bus, we arrived late."], 0, "Because turns the cause into a dependent clause and clearly shows the relationship."),
    question("cs26", "Choose", "Which sentence is a comma splice rather than a fused sentence?", ["I called her, she did not answer.", "I called her she did not answer.", "I called her; she did not answer.", "I called her because she did not answer."], 0, "A comma splice has a comma but no proper connector between two independent clauses."),
    question("cs27", "TF", "A conjunctive adverb such as therefore can join two independent clauses with a comma alone.", ["True", "False"], 1, "Use a semicolon or period before a conjunctive adverb, not a comma alone."),
    question("cs28", "Correct", "Choose the best revision: “The research was incomplete, the team delayed publication.”", ["The research was incomplete; the team delayed publication.", "The research was incomplete, the team delayed publication.", "The research was incomplete; and the team delayed publication.", "The research was incomplete, because the team delayed publication."], 0, "A semicolon correctly joins the two related independent clauses."),
    question("cs29", "MCQ", "Which punctuation can replace the comma in “I was hungry, I made a sandwich” without changing the words?", ["A semicolon", "A question mark only", "An apostrophe", "No punctuation"], 0, "A semicolon can join the two closely related independent clauses."),
    question("cs30", "Correct", "Choose the repair that preserves a contrast relationship.", ["The test was hard, but I remained calm.", "The test was hard, I remained calm but.", "The test was hard; but I remained calm.", "The test was hard because I remained calm."], 0, "Comma + but clearly connects the contrasting independent clauses."),
  ],
  fusedSentences: [
    question("fs01", "Error", "Which sentence is fused?", ["The roads flooded the buses stopped running.", "The roads flooded, so the buses stopped running.", "Because the roads flooded, the buses stopped running.", "The roads flooded; the buses stopped running."], 0, "Two independent clauses are run together with no punctuation or connector."),
    question("fs02", "TF", "A fused sentence has no punctuation or coordinating conjunction between two independent clauses.", ["True", "False"], 0, "That missing boundary is what makes it fused."),
    question("fs03", "Correct", "Choose the correct repair: “The library closed we went home.”", ["The library closed we went home.", "The library closed. We went home.", "The library closed, we went home.", "The library closed because we went home."], 1, "A period separates the two independent clauses."),
    question("fs04", "Classify", "What kind of error is “The speaker finished, the audience clapped”?", ["Comma splice", "Fused sentence", "Fragment", "Correct sentence"], 0, "The comma is present but no suitable connector is used, so it is a comma splice."),
    question("fs05", "Correct", "Choose the correct semicolon repair.", ["The alarm rang; everyone left the building.", "The alarm rang,; everyone left the building.", "The alarm rang; and everyone left the building.", "The alarm rang everyone; left the building."], 0, "A semicolon correctly joins two independent clauses."),
    question("fs06", "Correct", "Choose the correct repair with and.", ["The rain stopped and, we continued the game.", "The rain stopped, and we continued the game.", "The rain stopped; and we continued the game.", "The rain stopped, we continued the game."], 1, "Use comma + and to join two independent clauses."),
    question("fs07", "Error", "Which club sentence is fused?", ["I want to join the club it meets on Thursdays.", "I want to join the club because it meets on Thursdays.", "I want to join the club, and it meets on Thursdays.", "I want to join the club; it meets on Thursdays."], 0, "The first option runs two independent clauses together without punctuation."),
    question("fs08", "TF", "A fused sentence is also called a run-on sentence.", ["True", "False"], 0, "Fused sentences are one kind of run-on sentence."),
    question("fs09", "Correct", "Choose the correct repair using however.", ["We hurried however we missed the bus.", "We hurried; however, we missed the bus.", "We hurried, however, we missed the bus.", "We hurried; however we missed the bus."], 1, "Use a semicolon before however and a comma after it."),
    question("fs10", "Choose", "Which sentence is NOT fused?", ["The concert was canceled the fans went home.", "The concert was canceled, so the fans went home.", "The concert was canceled the fans went home early.", "The fans went home the concert was canceled."], 1, "Comma + so properly joins the two independent clauses."),
    question("fs11", "MCQ", "What is the key difference between a fused sentence and a comma splice?", ["A fused sentence has no punctuation; a comma splice uses only a comma.", "A fused sentence has a semicolon; a comma splice has no punctuation.", "They have no difference.", "A fused sentence is a fragment."], 0, "A fused sentence lacks a boundary; a comma splice uses an insufficient comma boundary."),
    question("fs12", "Correct", "Choose the revision that uses a dependent clause: “We were late we took a taxi.”", ["Because we were late, we took a taxi.", "We were late, because we took a taxi.", "We were late; because we took a taxi.", "We were late, we took a taxi."], 0, "Because makes the reason clause dependent, so the comma is correct."),
    question("fs13", "Error", "What is wrong with “The experiment failed it needs to be repeated”?", ["It is fused.", "It has no subject.", "It is a fragment.", "It uses the wrong tense."], 0, "The two complete thoughts need punctuation or a conjunction between them."),
    question("fs14", "Correct", "Choose the correct repair using a colon.", ["The reason was clear: the road was closed.", "The reason was clear, the road was closed.", "The reason was clear; because the road was closed.", "The reason was clear the road was closed."], 0, "A colon can introduce an explanation after a complete independent clause."),
    question("fs15", "Choose", "Which sentence is correctly separated into two sentences?", ["The concert was late. The audience waited patiently.", "The concert was late the audience waited patiently.", "The concert was late, the audience waited patiently.", "The concert was late; and the audience waited patiently."], 0, "A period makes two complete sentences."),
    question("fs16", "TF", "A fused sentence must contain two independent clauses.", ["True", "False"], 0, "Both parts must be complete thoughts for the error to be a fused sentence."),
    question("fs17", "Correct", "Choose the best repair: “The library was full we studied outside.”", ["The library was full; we studied outside.", "The library was full, we studied outside.", "The library was full; because we studied outside.", "The library was full we studied outside."], 0, "A semicolon correctly separates two related independent clauses."),
    question("fs18", "Choose", "Which revision makes a compound sentence?", ["The deadline passed, and the system closed.", "The deadline passed because the system closed.", "The deadline passing the system closed.", "The deadline passed; because the system closed."], 0, "Comma + and joins two independent clauses into a compound sentence."),
    question("fs19", "Error", "Which alarm sentence is fused?", ["The alarm rang students left the room.", "The alarm rang, and students left the room.", "When the alarm rang, students left the room.", "The alarm rang; students left the room."], 0, "The first sentence joins two independent clauses without punctuation."),
    question("fs20", "TF", "Adding a comma alone always corrects a fused sentence.", ["True", "False"], 1, "A comma alone would usually create a comma splice; use a period, semicolon, or comma + coordinator."),
    question("fs21", "Choose", "Which repair uses a coordinating conjunction correctly?", ["The room was noisy, but we could concentrate.", "The room was noisy but, we could concentrate.", "The room was noisy; but we could concentrate.", "The room was noisy, we could concentrate but."], 0, "Comma + but correctly connects the independent clauses."),
    question("fs22", "Error", "Which login sentence is fused?", ["I could not log in the password was incorrect.", "I could not log in because the password was incorrect.", "I could not log in; the password was incorrect.", "I could not log in, so I asked for help."], 0, "The first runs two complete clauses together without a boundary."),
    question("fs23", "Choose", "Choose the only fused sentence.", ["The printer broke; we used another one.", "The printer broke, so we used another one.", "The printer broke we used another one.", "Because the printer broke, we used another one."], 2, "The third sentence has no punctuation or connector between independent clauses."),
    question("fs24", "Correct", "Choose the correct semicolon revision: “The store was closed we returned tomorrow.”", ["The store was closed; we returned the next day.", "The store was closed, we returned the next day.", "The store was closed; because we returned the next day.", "The store was closed we returned the next day."], 0, "A semicolon properly joins the two independent clauses."),
    question("fs25", "MCQ", "Which sentence cannot be a fused sentence?", ["A sentence with only one independent clause", "A sentence with two independent clauses and no punctuation", "A sentence with two independent clauses run together", "A run-on with no connector"], 0, "A fused sentence requires two independent clauses, so one clause cannot be fused."),
    question("fs26", "Classify", "What kind of error is “The coach gave instructions, the team began practice”?", ["Comma splice", "Fused sentence", "Fragment", "Correct sentence"], 0, "There is a comma alone between two independent clauses, so it is a comma splice."),
    question("fs27", "TF", "A period can correct a fused sentence by creating two complete sentences.", ["True", "False"], 0, "A period is a valid way to separate the independent clauses."),
    question("fs28", "Correct", "Choose the repair that shows a result.", ["The server crashed, so the website went offline.", "The server crashed; because the website went offline.", "The server crashed, the website went offline.", "The server crashed so, the website went offline."], 0, "Comma + so connects the cause and result clauses correctly."),
    question("fs29", "Error", "What is wrong with “The work needs review it is not ready to submit”?", ["It is fused.", "It is a fragment.", "It has no verb.", "It has a spelling error."], 0, "The two independent clauses need a proper boundary."),
    question("fs30", "Correct", "Choose the best correction that preserves the cause relationship.", ["Because the server failed, the files were unavailable.", "The server failed, the files were unavailable.", "The server failed; because the files were unavailable.", "The server failed, because the files were unavailable."], 0, "Because turns the cause into a dependent clause and makes the punctuation correct."),
  ],
  fragments: [
    question("fr01", "Choose", "Which is a complete sentence?", ["After the team finished the project.", "The team finished the project on time.", "Working on the project all night.", "Because the project was difficult."], 1, "The second option has a subject, verb, and complete thought."),
    question("fr02", "Classify", "What is “After the lecture ended” ?", ["A complete sentence", "A dependent-clause fragment", "A compound sentence", "A comma splice"], 1, "After introduces a dependent clause, which cannot stand alone."),
    question("fr03", "TF", "“Because the roads were icy” is a complete sentence.", ["True", "False"], 1, "Because creates a dependent clause; it needs an independent clause."),
    question("fr04", "Correct", "Choose the best revision of “Running to catch the bus.”", ["Running to catch the bus.", "I was running to catch the bus.", "Because running to catch the bus.", "To running catch the bus."], 1, "Add a subject and a finite verb to complete the thought."),
    question("fr05", "Error", "What is missing in “The quiet students in the back row”?", ["A subject", "A main verb", "A comma", "An adjective"], 1, "The words name a group but do not state what the students do or are."),
    question("fr06", "Error", "What is missing in “Went to the writing center after class”?", ["A subject", "A verb", "A period", "An object"], 0, "The action went needs a subject, such as I or Maria."),
    question("fr07", "Classify", "What is “The article that I borrowed from the library”?", ["A complete sentence", "A fragment missing a main verb", "A compound sentence", "A question"], 1, "The article is the subject, but no main verb completes the thought."),
    question("fr08", "Correct", "Choose the correct revision of “While waiting for the bus.”", ["While waiting for the bus, I read a chapter.", "While waiting for the bus.", "While I waiting for the bus.", "Waiting the bus while."], 0, "The revision attaches the dependent opening to an independent clause."),
    question("fr09", "Classify", "What is “Although the test was difficult”?", ["A complete sentence", "A dependent-clause fragment", "A compound sentence", "A comma splice"], 1, "Although introduces a dependent clause that needs a main clause."),
    question("fr10", "Choose", "Which option about an answer is a complete sentence?", ["Her answer was clear and well organized.", "Because her answer was clear.", "Her clear and well-organized answer.", "After the answer."], 0, "It has the subject Her answer and the complete verb phrase was clear and well organized."),
    question("fr11", "Classify", "What kind of fragment is “For example, the first chapter”?", ["A dependent clause", "An extra-information fragment", "A complete sentence", "A comma splice"], 1, "It adds an example but does not contain a complete independent clause."),
    question("fr12", "Choose", "Which sentence is complete?", ["The researchers working in the lab.", "The researchers worked in the lab all day.", "Working in the lab all day.", "Because the researchers worked in the lab."], 1, "The second option has a subject and a complete finite verb worked."),
    question("fr13", "Classify", "What is “To finish the assignment before midnight”?", ["A complete sentence", "An infinitive fragment", "A compound sentence", "A comma splice"], 1, "An infinitive phrase does not make a complete sentence by itself."),
    question("fr14", "Error", "What is missing in “The books on the shelf”?", ["A main verb", "A subject", "A preposition", "A plural noun"], 0, "The phrase names books but does not say anything about them."),
    question("fr15", "Correct", "Choose the correct repair of “Because the computer crashed.”", ["Because the computer crashed, I lost my draft.", "Because the computer crashed.", "The computer because crashed.", "Because I lost my draft."], 0, "The dependent because clause is completed by the independent clause I lost my draft."),
    question("fr16", "TF", "A fragment can sometimes be repaired by attaching it to a nearby complete sentence.", ["True", "False"], 0, "For example, attach “Because it was raining” to “We stayed inside.”"),
    question("fr17", "Classify", "What kind of fragment is “Standing near the door”?", ["An -ing fragment", "A complete sentence", "A comma splice", "A compound sentence"], 0, "The -ing phrase needs a subject and main verb to complete it."),
    question("fr18", "Choose", "Which option about Mia is a complete sentence?", ["Walking to campus in the rain.", "Mia walked to campus in the rain.", "Because Mia walked to campus.", "The walk to campus in the rain."], 1, "Mia is the subject and walked is the main verb."),
    question("fr19", "Error", "What is missing in “The reason for the delay”?", ["A main verb", "A subject", "A modifier", "A capital letter"], 0, "The phrase needs a verb such as was or is to express a complete thought."),
    question("fr20", "Classify", "What is “Although the doors were locked”?", ["A complete sentence", "A dependent-clause fragment", "A compound sentence", "A comma splice"], 1, "Although makes the clause dependent."),
    question("fr21", "Classify", "What is “At the stranger”?", ["A complete sentence", "An extra-information fragment", "A compound sentence", "An independent clause"], 1, "It is a prepositional phrase and cannot stand alone as a sentence."),
    question("fr22", "Correct", "Choose the best correction of “Therefore, after the computer failed.”", ["The computer failed. Therefore, we used a backup.", "Therefore, after the computer failed.", "Therefore the computer failed after.", "After therefore, computer failed."], 0, "The revision provides complete clauses before and after the transition."),
    question("fr23", "MCQ", "Which word often signals a dependent-clause fragment when it begins a group of words?", ["because", "students", "quickly", "library"], 0, "Because is a subordinating conjunction and needs an independent clause."),
    question("fr24", "Error", "What is wrong with “The professor who teaches biology”?", ["It lacks a main verb to complete the thought.", "It has too many verbs.", "It is a comma splice.", "It needs a semicolon."], 0, "Who teaches biology describes professor, but the sentence still needs a main predicate."),
    question("fr25", "Choose", "Choose the complete sentence beginning with an -ing phrase.", ["After completing the form, we submitted it online.", "After completing the form.", "Completing the form online.", "After we completing the form."], 0, "The independent clause we submitted it online completes the opening phrase."),
    question("fr26", "Correct", "Choose the correct revision of “Such as notebooks, pens, and folders.”", ["Bring supplies, such as notebooks, pens, and folders.", "Such as notebooks, pens, and folders.", "Such notebooks, pens, and folders.", "As such, notebooks pens folders."], 0, "The revision attaches the example list to a complete sentence."),
    question("fr27", "Classify", "What is “While students were taking the exam”?", ["A complete sentence", "A dependent-clause fragment", "A compound sentence", "A question"], 1, "While introduces a dependent time clause that needs an independent clause."),
    question("fr28", "Choose", "Which option is a fragment because it has no main verb?", ["The students in the science lab.", "The students worked in the science lab.", "The students are working in the science lab.", "The students worked, and the teacher observed."], 0, "The first option has a noun phrase but no main verb."),
    question("fr29", "Classify", "What is “The final report, which included three charts”?", ["A complete sentence", "A fragment missing a main verb", "A compound sentence", "A comma splice"], 1, "The relative clause describes the report, but no main verb finishes the sentence."),
    question("fr30", "Correct", "Choose the revision that combines the fragment with a complete thought.", ["The workshop was useful. Especially the final activity.", "The workshop was useful, especially the final activity.", "Especially the final activity was useful the workshop.", "The workshop especially was useful final activity."], 1, "The phrase especially the final activity is correctly attached to the complete sentence."),
  ],
  clauses: [
    question("cl01", "Clauses", "Which group of words is an independent clause?", ["Students need clear instructions.", "because students need clear instructions", "when students need clear instructions", "who need clear instructions"], 0, "It has a subject and verb and expresses a complete thought."),
    question("cl02", "Clauses", "Which group of words is a dependent clause?", ["The class begins at noon.", "because the class begins at noon", "Students arrive early.", "The lights are on."], 1, "Because makes the otherwise complete thought dependent."),
    question("cl03", "TF", "An independent clause has a subject, a verb, and a complete thought.", ["True", "False"], 0, "That is the definition of an independent clause."),
    question("cl04", "MCQ", "Which word is a subordinating conjunction?", ["and", "but", "because", "or"], 2, "Because introduces a dependent clause."),
    question("cl05", "MCQ", "Which word can introduce a relative clause?", ["which", "and", "so", "but"], 0, "Which can introduce a relative clause that describes a noun."),
    question("cl06", "Clauses", "In “The film ended after the lights came on,” which part is the dependent clause?", ["The film ended", "after the lights came on", "The film", "came on"], 1, "After the lights came on cannot stand alone because after is a subordinator."),
    question("cl07", "Clauses", "What is “Although the room was small”?", ["Independent clause", "Dependent clause", "Complete sentence", "Compound sentence"], 1, "Although makes the clause dependent."),
    question("cl08", "Clauses", "What is “I stayed until the office opened”?", ["Only a dependent clause", "An independent clause containing a dependent clause", "A fragment", "A phrase with no verb"], 1, "I stayed is independent, and until the office opened is dependent within the full sentence."),
    question("cl09", "Clauses", "What is “Because the train was delayed”?", ["Independent clause", "Dependent clause", "Compound sentence", "Complete sentence"], 1, "Because prevents the clause from standing alone."),
    question("cl10", "Choose", "Choose the correctly punctuated sentence with an opening dependent clause.", ["When the class ended we walked outside.", "When the class ended, we walked outside.", "When, the class ended we walked outside.", "When the class, ended we walked outside."], 1, "Use a comma after an opening dependent clause."),
    question("cl11", "Choose", "Choose the correctly punctuated sentence with a dependent clause after the main clause.", ["The team celebrated because it won.", "The team celebrated, because it won.", "The team, celebrated because it won.", "The team celebrated; because it won."], 0, "A dependent clause following the main clause usually does not need a comma."),
    question("cl12", "Clauses", "Which clause can stand alone?", ["when the game ended", "because the game ended", "the game ended", "although the game ended"], 2, "The game ended is a complete thought without a subordinator."),
    question("cl13", "Clauses", "In “The professor who wrote the article spoke today,” what is “who wrote the article”?", ["An independent clause", "A dependent relative clause", "A complete sentence", "A coordinating clause"], 1, "It begins with the relative pronoun who and describes professor."),
    question("cl14", "TF", "A dependent clause can stand alone as a complete sentence.", ["True", "False"], 1, "A dependent clause needs an independent clause to complete its meaning."),
    question("cl15", "Clauses", "In “Because the roads were icy, the school closed,” which label is correct?", ["Because...icy = IC; the school closed = DC", "Because...icy = DC; the school closed = IC", "Both are ICs", "Both are DCs"], 1, "Because makes the first clause dependent; the school closed can stand alone."),
    question("cl16", "MCQ", "Which word introduces a dependent condition clause?", ["unless", "and", "yet", "so"], 0, "Unless introduces a dependent condition clause."),
    question("cl17", "Clauses", "In “The study that we discussed was useful,” what is “that we discussed”?", ["An independent clause", "A dependent relative clause", "A complete sentence", "A FANBOYS clause"], 1, "That we discussed modifies study and cannot stand alone."),
    question("cl18", "Clauses", "In “The student arrived late, so the teacher spoke to her,” how many independent clauses are there?", ["One", "Two", "None", "Three"], 1, "The student arrived late and the teacher spoke to her are both independent clauses."),
    question("cl19", "Choose", "Choose the correct punctuation.", ["If the printer works we will print the forms.", "If the printer works, we will print the forms.", "If, the printer works we will print the forms.", "If the printer, works we will print the forms."], 1, "An opening if clause is dependent and is followed by a comma."),
    question("cl20", "Clauses", "In “We will leave when the lecture ends,” what is the main independent clause?", ["We will leave", "when the lecture ends", "the lecture ends", "when"], 0, "We will leave expresses the complete main thought."),
    question("cl21", "Classify", "What is “Although I studied carefully”?", ["Independent clause", "Dependent clause", "Compound sentence", "Simple sentence"], 1, "Although makes the clause dependent."),
    question("cl22", "TF", "A semicolon cannot correctly join an independent clause to a dependent clause.", ["True", "False"], 0, "Semicolons join independent clauses, not an independent clause with a dependent clause."),
    question("cl23", "Clauses", "What is “Before the doors opened”?", ["Independent clause", "Dependent clause", "Complete sentence", "Coordinating clause"], 1, "Before makes the time clause dependent."),
    question("cl24", "Choose", "Which sentence has two independent clauses correctly joined with a semicolon?", ["The book was expensive; I bought it anyway.", "The book was expensive; because I bought it anyway.", "Because the book was expensive; I bought it anyway.", "The book was expensive, I bought it anyway."], 0, "Both clauses can stand alone, so a semicolon is correct."),
    question("cl25", "Clauses", "In “I smiled because the joke was funny,” which clause is independent?", ["I smiled", "because the joke was funny", "the joke was funny", "because"], 0, "I smiled is a complete thought and can stand alone."),
    question("cl26", "MCQ", "Which relative pronoun can begin a dependent clause that describes people?", ["who", "so", "but", "yet"], 0, "Who commonly introduces a relative clause about people."),
    question("cl27", "Choose", "Choose the correctly punctuated sentence.", ["Although I was tired I finished the report.", "Although I was tired, I finished the report.", "Although, I was tired I finished the report.", "Although I was tired; I finished the report."], 1, "The opening dependent clause needs a comma before the independent clause."),
    question("cl28", "Choose", "Which group is dependent even though it has a subject and verb?", ["when the guests arrived", "the guests arrived", "guests arrived", "the arriving guests"], 0, "When makes the clause dependent even though it has subject and verb."),
    question("cl29", "Clauses", "In “We will leave when the rain stops,” what does the sentence contain?", ["One independent clause and one dependent clause", "Two independent clauses", "Only a dependent clause", "No verbs"], 0, "We will leave is independent; when the rain stops is dependent."),
    question("cl30", "Clauses", "In “After the meeting ended, the manager answered questions, and the staff took notes,” which description is accurate?", ["One IC and one DC", "Two ICs and one DC", "Two DCs and one IC", "Three ICs"], 1, "After the meeting ended is dependent; the manager answered questions and the staff took notes are independent."),
  ],
  topicSentences: [
    question("ts01", "Topic", "Choose the best topic sentence for a paragraph about the benefits of eating breakfast before class.", ["Breakfast foods include eggs, fruit, and toast.", "Eating breakfast can help students focus and have energy for morning classes.", "I ate toast yesterday.", "Many students arrive on campus early."], 1, "It names the topic (eating breakfast) and a clear controlling idea (focus and energy)."),
    question("ts02", "Topic", "Which sentence is the topic sentence in this paragraph? “The campus garden gives students a quiet place to relax. Benches sit under tall trees. Students also use the garden to read between classes.”", ["The campus garden gives students a quiet place to relax.", "Benches sit under tall trees.", "Students also use the garden to read between classes.", "Between classes."], 0, "The first sentence states the main idea; the other sentences support it."),
    question("ts03", "Topic", "Which sentence is a supporting detail rather than a topic sentence?", ["Regular exercise improves both physical and mental health.", "For example, walking can reduce stress after a long day.", "Exercise has several benefits for students.", "Daily exercise is important for university students."], 1, "For example signals a specific supporting detail, not the paragraph's broad main idea."),
    question("ts04", "TF", "A strong topic sentence should be specific enough to guide the supporting details in its paragraph.", ["True", "False"], 0, "A topic sentence gives the reader the paragraph's focused main idea."),
    question("ts05", "Topic", "Which sentence is irrelevant in a paragraph about ways to save money on textbooks?", ["Students can buy used books online.", "Many bookstores sell notebooks and pens.", "Renting a textbook may cost less than buying one.", "Students can compare prices before purchasing."], 1, "The sentence about notebooks and pens does not support saving money on textbooks."),
    question("ts06", "Topic", "Choose the strongest topic sentence for a paragraph about the advantages of studying with a group.", ["Groups are things with people.", "Studying with a group can improve understanding because members explain ideas to one another.", "My group meets in room 204.", "Students study many subjects."], 1, "It gives both a topic and a controlling idea that details can explain."),
    question("ts07", "Topic", "Which topic sentence is too vague for a paragraph?", ["There are many things in life.", "A weekly study schedule helps students manage their time effectively.", "Campus clubs help new students make friends.", "Drinking enough water supports concentration."], 0, "It has no clear topic or controlling idea for a focused paragraph."),
    question("ts08", "Topic", "Which sentence is the topic sentence in this paragraph? “The campus library is useful for more than borrowing books. It provides quiet study rooms, research databases, and helpful librarians. Many students also use its computers.”", ["The campus library is useful for more than borrowing books.", "It provides quiet study rooms.", "Many students use its computers.", "Research databases."], 0, "The first sentence introduces the broad claim that the details develop."),
    question("ts09", "Topic", "Which detail best supports this topic sentence: “Keeping a calendar helps students meet deadlines”?", ["A calendar can remind students when assignments are due.", "Calendars come in many colors.", "Some students prefer writing with blue pens.", "Deadlines are words on course outlines."], 0, "Reminders about due dates directly support meeting deadlines."),
    question("ts10", "Topic", "Which sentence best fits a paragraph about how online study tools can support organization?", ["Digital planners can send reminders for classes and assignments.", "The sky is usually blue in summer.", "My friend has a new backpack.", "Online classes are sometimes long."], 0, "Digital planners and reminders directly support the paragraph's organizational focus."),
    question("ts11", "Topic", "Choose the best topic sentence for a paragraph about recycling on campus.", ["Recycling bins are usually blue or green.", "Campus recycling programs can reduce waste and teach students sustainable habits.", "I saw a bin near the cafeteria.", "Paper is made from trees."], 1, "It states a focused main idea that details about bins, waste, and habits can support."),
    question("ts12", "TF", "A topic sentence must list every detail that will appear in the paragraph.", ["True", "False"], 1, "It should state the main idea, not list all evidence or examples."),
    question("ts13", "Topic", "What is the main idea of this paragraph? “Public transportation can make commuting easier for students. Buses cost less than daily parking, and students can read or rest while traveling.”", ["Buses are always crowded.", "Public transportation makes commuting easier for students.", "Students dislike parking lots.", "Reading is more important than driving."], 1, "The first sentence states the main idea, and the next sentence gives support."),
    question("ts14", "Topic", "Choose the best revision of the vague topic sentence “There are many good things about the library.”", ["Libraries are good.", "The campus library helps students succeed by offering research help, quiet spaces, and technology.", "I went to the library yesterday.", "Books are in libraries."], 1, "It is specific and provides a focused controlling idea."),
    question("ts15", "Topic", "Which sentence is irrelevant in a paragraph about learning photography?", ["Practice with different lighting helps photographers improve.", "Photography students should learn how to frame a subject.", "The cafeteria offers soup on Tuesdays.", "Studying camera settings can improve photo quality."], 2, "The cafeteria schedule does not support the topic of learning photography."),
    question("ts16", "TF", "A topic sentence should focus on one main idea rather than several unrelated ideas.", ["True", "False"], 0, "A focused topic sentence helps a paragraph stay unified."),
    question("ts17", "Topic", "Choose the best topic sentence for a paragraph explaining why sleep matters for students.", ["Students sleep in beds.", "Getting enough sleep helps students concentrate, remember information, and manage stress.", "I slept eight hours last night.", "Some rooms are quiet at night."], 1, "It states the topic and several connected benefits that details can develop."),
    question("ts18", "Topic", "Which detail does NOT support this topic sentence: “Joining a campus club can help students build community”?", ["Clubs allow students with shared interests to meet regularly.", "Members can work together on events and projects.", "The campus gym opens at 6:00 a.m.", "New members can form friendships with other students."], 2, "The gym's hours do not support building community through clubs."),
    question("ts19", "Topic", "Which order gives a paragraph the clearest start?", ["A supporting detail, then an unrelated fact, then a topic sentence.", "A focused topic sentence, followed by related supporting details.", "Three examples with no main idea.", "A conclusion before the main idea."], 1, "A paragraph is clearest when the main idea comes first and related details follow."),
    question("ts20", "Topic", "Choose the best topic sentence for a paragraph about the value of city parks.", ["Parks have grass and trees.", "City parks give residents places to exercise, relax, and connect with neighbors.", "I saw a dog in a park.", "Some parks are near streets."], 1, "It presents a focused main idea about the benefits of city parks."),
    question("ts21", "TF", "A clear topic sentence often includes both a topic and a controlling idea.", ["True", "False"], 0, "The topic names the subject; the controlling idea limits what the paragraph will say about it."),
    question("ts22", "Topic", "Choose the strongest revision of “My favorite class is interesting.”", ["My favorite class is interesting.", "My psychology class is my favorite because its experiments show how people think and behave.", "Classes are at school.", "The class has a teacher."], 1, "It identifies the class and explains the specific reason it is interesting."),
    question("ts23", "Topic", "Choose the best topic sentence for a paragraph about creating a useful study schedule.", ["Schedules use days of the week.", "A realistic study schedule balances course work, breaks, and other responsibilities.", "I use a calendar sometimes.", "Students have homework."], 1, "It provides a clear controlling idea that details can explain."),
    question("ts24", "Topic", "Which sentence is irrelevant in a paragraph about online safety?", ["Students should use strong, unique passwords.", "Checking website addresses can prevent scams.", "Sharing a password with strangers is unsafe.", "The history building has four floors."], 3, "The history building fact does not support online safety."),
    question("ts25", "MCQ", "Where can a topic sentence appear in a well-organized paragraph?", ["Usually near the beginning, though it can appear elsewhere", "Only as the last word", "Only in the title", "Never in a paragraph"], 0, "Topic sentences often come first, but writers may place them elsewhere for effect."),
    question("ts26", "Topic", "Which topic sentence is too broad for one short paragraph?", ["Technology affects everything in the world.", "Using a password manager can make online accounts safer.", "Morning exercise can improve a student's energy level.", "The tutoring center offers free writing feedback."], 0, "It is far too broad to develop fully in one focused paragraph."),
    question("ts27", "Topic", "Choose the best topic sentence for a paragraph about benefits of public transportation.", ["Buses have wheels.", "Public transportation can save students money and reduce traffic near campus.", "I rode a bus once.", "The bus driver wore a uniform."], 1, "It gives a focused main idea that related details can support."),
    question("ts28", "Topic", "Which option states a main idea rather than a supporting detail?", ["The library has twenty computers on the second floor.", "The library supports student learning in several practical ways.", "The computer screens are large.", "The second floor is quiet after noon."], 1, "It is the broad claim that the more specific details can support."),
    question("ts29", "Topic", "Which is a strong topic sentence for a paragraph about group study?", ["Group study is good.", "Working with classmates can make difficult course concepts easier to understand.", "My group has three people.", "Students use tables when they study."], 1, "It clearly states a topic and a focused benefit."),
    question("ts30", "Choose", "Choose the best advice for a topic sentence.", ["Start with “This paragraph will talk about...”", "Use a clear topic and a focused controlling idea.", "Include every supporting example in one sentence.", "Use an unrelated attention getter only."], 1, "A clear topic plus controlling idea gives the reader a useful map of the paragraph."),
  ]
};

function difficultyFor(index) { return index < 12 ? "Easy" : index < 24 ? "Intermediate" : "Advanced"; }

const QUESTION_BANK = Object.fromEntries(Object.entries(RAW_BANK).map(([topic, rows]) => [topic, rows.map((item, index) => ({ ...item, topic, difficulty: difficultyFor(index) }))]));
const ALL_QUESTIONS = Object.values(QUESTION_BANK).flat();
const QUESTION_BY_ID = new Map(ALL_QUESTIONS.map(item => [item.id, item]));

function validateQuestionBank() {
  const expectedTopics = Object.keys(TOPIC_INFO);
  const errors = [];
  if (expectedTopics.length !== 9) errors.push("Expected exactly nine topics.");
  expectedTopics.forEach(topic => {
    const questions = QUESTION_BANK[topic] || [];
    if (questions.length < 30) errors.push(`${topic} has fewer than 30 questions.`);
    if (new Set(questions.map(q => q.id)).size !== questions.length) errors.push(`${topic} has duplicate question IDs.`);
    if (new Set(questions.map(q => q.prompt)).size !== questions.length) errors.push(`${topic} has duplicate prompts.`);
    const tiers = questions.reduce((acc, q) => ({ ...acc, [q.difficulty]: (acc[q.difficulty] || 0) + 1 }), {});
    if (tiers.Easy !== 12 || tiers.Intermediate !== 12 || tiers.Advanced !== 6) errors.push(`${topic} has an invalid difficulty distribution.`);
    questions.forEach(q => {
      if (!FORMAT_NAMES[q.format] || !q.prompt || !q.explanation || q.options.length < 2 || q.correct < 0 || q.correct >= q.options.length) errors.push(`Invalid question: ${q.id}.`);
    });
  });
  if (ALL_QUESTIONS.length < 270) errors.push("Question bank has fewer than 270 questions.");
  return { valid: errors.length === 0, errors, totalQuestions: ALL_QUESTIONS.length, topics: expectedTopics.length };
}

function createFinalQuestions() {
  return shuffle(Object.values(QUESTION_BANK).flatMap(questions => shuffle(questions).slice(0, 5)));
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
}

function defaultProgress() {
  return { attempts: 0, correct: 0, incorrect: 0, completedIds: [], mistakes: [], bestPercent: 0, topic: Object.fromEntries(Object.keys(TOPIC_INFO).map(id => [id, { attempts: 0, correct: 0, completedIds: [] }])) };
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const base = defaultProgress();
    if (!saved || typeof saved !== "object") return base;
    const progress = { ...base, ...saved, topic: { ...base.topic, ...(saved.topic || {}) } };
    Object.keys(base.topic).forEach(id => { progress.topic[id] = { ...base.topic[id], ...(progress.topic[id] || {}) }; });
    progress.completedIds = Array.isArray(progress.completedIds) ? progress.completedIds.filter(id => QUESTION_BY_ID.has(id)) : [];
    progress.mistakes = Array.isArray(progress.mistakes) ? progress.mistakes.filter(id => QUESTION_BY_ID.has(id)) : [];
    return progress;
  } catch { return defaultProgress(); }
}

let progress = loadProgress();
let currentQuiz = null;
let quizTimer = null;
let toastTimer = null;

function saveProgress() { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char])); }
function formatTime(seconds) { const safe = Math.max(0, Math.round(seconds)); return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`; }
function showToast(message) { const toast = document.getElementById("toast"); toast.textContent = message; toast.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("show"), 3600); }

function showView(id) {
  document.querySelectorAll(".view").forEach(view => view.classList.toggle("is-visible", view.id === `${id}-view`));
  document.querySelectorAll(".nav-link").forEach(button => button.classList.toggle("is-active", button.dataset.action === id));
  document.getElementById("main-content").focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateDashboard() {
  const uniqueComplete = new Set(progress.completedIds).size;
  const percent = Math.round((uniqueComplete / ALL_QUESTIONS.length) * 100);
  const score = progress.attempts ? `${Math.round((progress.correct / progress.attempts) * 100)}%` : "—";
  document.getElementById("overall-progress").textContent = `${percent}%`;
  document.getElementById("progress-ring").style.setProperty("--progress", `${percent}%`);
  document.getElementById("stat-completed").textContent = progress.attempts;
  document.getElementById("stat-score").textContent = score;
  document.getElementById("stat-correct").textContent = progress.correct;
  document.getElementById("stat-incorrect").textContent = progress.incorrect;
  document.getElementById("bank-count").textContent = `${ALL_QUESTIONS.length} validated questions`;
  document.getElementById("topic-grid").innerHTML = Object.entries(TOPIC_INFO).map(([id, info]) => {
    const topicProgress = progress.topic[id];
    const done = new Set(topicProgress.completedIds || []).size;
    const topicPercent = Math.round((done / QUESTION_BANK[id].length) * 100);
    return `<article class="topic-card"><div class="topic-card-top"><span class="topic-icon" aria-hidden="true">${info.icon}</span><div><h3>${escapeHtml(info.title)}</h3><p>${escapeHtml(info.description)}</p></div></div><div class="topic-progress-copy"><span>${done} of ${QUESTION_BANK[id].length} completed</span><span>${topicPercent}%</span></div><div class="mini-progress"><span style="width:${topicPercent}%"></span></div><div class="topic-actions"><button class="button primary" type="button" data-action="topic-practice" data-topic="${id}">Practice</button><button class="button quiet" type="button" data-action="topic-exam" data-topic="${id}">Exam</button></div></article>`;
  }).join("");
}

function updateStatistics() {
  document.getElementById("stats-attempts").textContent = progress.attempts;
  document.getElementById("stats-accuracy").textContent = progress.attempts ? `${Math.round((progress.correct / progress.attempts) * 100)}%` : "—";
  document.getElementById("stats-best").textContent = progress.bestPercent ? `${progress.bestPercent}%` : "—";
  document.getElementById("stats-mistakes").textContent = new Set(progress.mistakes).size;
  document.getElementById("statistics-topics").innerHTML = Object.entries(TOPIC_INFO).map(([id, info]) => {
    const record = progress.topic[id];
    const done = new Set(record.completedIds || []).size;
    const ratio = Math.round((done / QUESTION_BANK[id].length) * 100);
    return `<div class="stats-topic-row"><strong>${escapeHtml(info.title)}</strong><div class="mini-progress"><span style="width:${ratio}%"></span></div><span>${done}/${QUESTION_BANK[id].length} · ${ratio}%</span></div>`;
  }).join("");
}

function startQuiz(questions, config) {
  clearTimer();
  if (!questions.length) { showToast("There are no saved mistakes to review yet. Finish a quiz first."); return; }
  const selection = config.shuffle === false ? [...questions] : shuffle(questions);
  currentQuiz = { questions: selection, title: config.title, mode: config.mode, timeLimit: config.timeLimit || null, secondsRemaining: config.timeLimit || null, startedAt: Date.now(), answers: Array(selection.length).fill(null), reviewed: new Set(), index: 0, submitted: false };
  document.getElementById("quiz-title").textContent = config.title;
  document.getElementById("quiz-mode-label").textContent = config.mode;
  document.getElementById("timer-box").classList.toggle("hidden", !config.timeLimit);
  document.getElementById("timer-box").classList.remove("warning");
  renderQuiz();
  showView("quiz");
  if (config.timeLimit) {
    updateTimer();
    quizTimer = setInterval(() => {
      if (!currentQuiz || currentQuiz.submitted) return;
      currentQuiz.secondsRemaining -= 1;
      updateTimer();
      if (currentQuiz.secondsRemaining <= 0) { clearTimer(); showToast("Time is up. Your quiz has been submitted."); submitQuiz(true); }
    }, 1000);
  }
}

function updateTimer() {
  if (!currentQuiz?.timeLimit) return;
  const box = document.getElementById("timer-box");
  document.getElementById("timer").textContent = formatTime(currentQuiz.secondsRemaining);
  box.classList.toggle("warning", currentQuiz.secondsRemaining <= 300);
}
function clearTimer() { if (quizTimer) clearInterval(quizTimer); quizTimer = null; }

function renderQuiz() {
  if (!currentQuiz) return;
  const question = currentQuiz.questions[currentQuiz.index];
  const answeredCount = currentQuiz.answers.filter(answer => answer !== null).length;
  document.getElementById("answered-count").textContent = `${answeredCount} / ${currentQuiz.questions.length}`;
  document.getElementById("question-number").textContent = `Question ${currentQuiz.index + 1} of ${currentQuiz.questions.length}`;
  document.getElementById("format-label").textContent = FORMAT_NAMES[question.format];
  document.getElementById("difficulty-label").textContent = question.difficulty;
  document.getElementById("quiz-progress-fill").style.width = `${((currentQuiz.index + 1) / currentQuiz.questions.length) * 100}%`;
  document.getElementById("question-prompt").textContent = question.prompt;
  document.getElementById("answer-options").innerHTML = question.options.map((option, index) => `<label class="answer-option"><input type="radio" name="answer" value="${index}" ${currentQuiz.answers[currentQuiz.index] === index ? "checked" : ""}><span class="option-letter">${String.fromCharCode(65 + index)}</span><span>${escapeHtml(option)}</span></label>`).join("");
  document.getElementById("question-nav").innerHTML = currentQuiz.questions.map((item, index) => `<button class="question-number-button ${index === currentQuiz.index ? "current" : ""} ${currentQuiz.answers[index] !== null ? "answered" : ""} ${currentQuiz.reviewed.has(index) ? "review" : ""}" type="button" data-action="go-question" data-index="${index}" aria-label="Question ${index + 1}${currentQuiz.answers[index] !== null ? ", answered" : ""}${currentQuiz.reviewed.has(index) ? ", marked for review" : ""}">${index + 1}</button>`).join("");
  const reviewButton = document.getElementById("review-button");
  reviewButton.classList.toggle("is-marked", currentQuiz.reviewed.has(currentQuiz.index));
  reviewButton.textContent = currentQuiz.reviewed.has(currentQuiz.index) ? "★ Marked for review" : "☆ Mark for review";
  document.getElementById("previous-button").disabled = currentQuiz.index === 0;
  document.getElementById("next-button").textContent = currentQuiz.index === currentQuiz.questions.length - 1 ? "Review answers →" : "Next →";
}

function changeQuestion(delta) {
  if (!currentQuiz) return;
  const target = currentQuiz.index + delta;
  if (target >= 0 && target < currentQuiz.questions.length) { currentQuiz.index = target; renderQuiz(); }
  else if (delta > 0) requestSubmission();
}

function requestSubmission() {
  if (!currentQuiz) return;
  const unanswered = currentQuiz.answers.filter(value => value === null).length;
  document.getElementById("modal-message").textContent = unanswered ? `You still have ${unanswered} unanswered question${unanswered === 1 ? "" : "s"}. You may submit anyway, or go back to review them.` : "All questions have an answer. You can still return to review them before submitting.";
  document.getElementById("submission-modal").classList.remove("hidden");
}
function closeModal() { document.getElementById("submission-modal").classList.add("hidden"); }

function submitQuiz(forced = false) {
  if (!currentQuiz || currentQuiz.submitted) return;
  closeModal(); clearTimer(); currentQuiz.submitted = true;
  const quiz = currentQuiz;
  const result = quiz.questions.map((item, index) => ({ question: item, selected: quiz.answers[index], correct: quiz.answers[index] === item.correct }));
  const correct = result.filter(item => item.correct).length;
  const attempted = result.filter(item => item.selected !== null).length;
  const incorrect = result.length - correct;
  const percent = Math.round((correct / result.length) * 100);
  const elapsed = quiz.timeLimit ? quiz.timeLimit - quiz.secondsRemaining : Math.max(0, Math.round((Date.now() - quiz.startedAt) / 1000));
  recordResult(result, percent);
  renderResults({ result, correct, attempted, incorrect, percent, elapsed, forced, title: quiz.title });
  currentQuiz = null;
  showView("results");
}

function recordResult(result, percent) {
  result.forEach(({ question, selected, correct }) => {
    if (selected === null) return;
    progress.attempts += 1;
    progress.topic[question.topic].attempts += 1;
    if (!progress.completedIds.includes(question.id)) progress.completedIds.push(question.id);
    if (!progress.topic[question.topic].completedIds.includes(question.id)) progress.topic[question.topic].completedIds.push(question.id);
    if (correct) {
      progress.correct += 1; progress.topic[question.topic].correct += 1;
      progress.mistakes = progress.mistakes.filter(id => id !== question.id);
    } else {
      progress.incorrect += 1;
      if (!progress.mistakes.includes(question.id)) progress.mistakes.push(question.id);
    }
  });
  progress.bestPercent = Math.max(progress.bestPercent || 0, percent);
  saveProgress(); updateDashboard(); updateStatistics();
}

function performanceLevel(percent) {
  if (percent >= 90) return "Excellent";
  if (percent >= 80) return "Very Good";
  if (percent >= 70) return "Good";
  if (percent >= 60) return "Needs More Practice";
  return "Keep Learning";
}

let lastIncorrect = [];
function renderResults(data) {
  lastIncorrect = data.result.filter(item => !item.correct).map(item => item.question);
  const level = performanceLevel(data.percent);
  document.getElementById("results-title").textContent = data.title;
  document.getElementById("result-percent").textContent = `${data.percent}%`;
  document.getElementById("result-level").textContent = level;
  document.getElementById("result-summary").textContent = `${data.correct} of ${data.result.length} correct${data.forced ? " · time expired" : ""}`;
  document.getElementById("result-correct").textContent = data.correct;
  document.getElementById("result-incorrect").textContent = data.incorrect;
  document.getElementById("result-time").textContent = formatTime(data.elapsed);
  document.getElementById("result-score").textContent = `${data.correct} / ${data.result.length}`;
  document.getElementById("retry-button").classList.toggle("hidden", !lastIncorrect.length);
  document.getElementById("corrections").innerHTML = lastIncorrect.length ? data.result.filter(item => !item.correct).map(({ question, selected }) => `<article class="correction"><div class="correction-meta"><span>${escapeHtml(TOPIC_INFO[question.topic].title)}</span><span>·</span><span>${escapeHtml(FORMAT_NAMES[question.format])}</span></div><h3>${escapeHtml(question.prompt)}</h3><div class="answer-comparison"><div class="your-answer"><span>Your answer</span>${selected === null ? "No answer" : escapeHtml(question.options[selected])}</div><div class="correct-answer"><span>Correct answer</span>${escapeHtml(question.options[question.correct])}</div></div><p class="explanation"><strong>Why:</strong> ${escapeHtml(question.explanation)}</p></article>`).join("") : `<p class="empty-message">Perfect work — no corrections needed for this quiz.</p>`;
}

function startTopic(id, exam) {
  const info = TOPIC_INFO[id];
  startQuiz(QUESTION_BANK[id], { title: info.title, mode: exam ? "TOPIC EXAM · 30 MINUTES" : "PRACTICE · NO TIMER", timeLimit: exam ? 30 * 60 : null });
}
function startRandom() { startQuiz(shuffle(ALL_QUESTIONS).slice(0, 20), { title: "Random mixed practice", mode: "PRACTICE · 20 RANDOM QUESTIONS", timeLimit: null, shuffle: false }); }
function startFinal() { startQuiz(createFinalQuestions(), { title: "Comprehensive final exam", mode: "FINAL EXAM · 45 MINUTES", timeLimit: 45 * 60, shuffle: false }); }
function startMistakes() { const items = [...new Set(progress.mistakes)].map(id => QUESTION_BY_ID.get(id)).filter(Boolean); startQuiz(items, { title: "Review saved mistakes", mode: "REVIEW MISTAKES · NO TIMER" }); }
function retryIncorrect() { startQuiz(lastIncorrect, { title: "Retry incorrect questions", mode: "TARGETED PRACTICE · NO TIMER" }); }
function quitQuiz() { if (!currentQuiz || confirm("Exit this quiz? Unsubmitted answers will not be saved.")) { clearTimer(); currentQuiz = null; showView("dashboard"); } }
function resetProgress() { if (confirm("Reset all saved Grammar Master progress? This cannot be undone.")) { clearTimer(); localStorage.removeItem(STORAGE_KEY); progress = defaultProgress(); lastIncorrect = []; updateDashboard(); updateStatistics(); showView("dashboard"); showToast("Your saved progress has been reset."); } }

function handleAction(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const { action } = target.dataset;
  if (action === "dashboard") { clearTimer(); currentQuiz = null; updateDashboard(); showView("dashboard"); }
  else if (action === "statistics") { updateStatistics(); showView("statistics"); }
  else if (action === "mistakes") startMistakes();
  else if (action === "random") startRandom();
  else if (action === "final") startFinal();
  else if (action === "topic-practice") startTopic(target.dataset.topic, false);
  else if (action === "topic-exam") startTopic(target.dataset.topic, true);
  else if (action === "previous") changeQuestion(-1);
  else if (action === "next") changeQuestion(1);
  else if (action === "go-question") { currentQuiz.index = Number(target.dataset.index); renderQuiz(); }
  else if (action === "review") { currentQuiz.reviewed.has(currentQuiz.index) ? currentQuiz.reviewed.delete(currentQuiz.index) : currentQuiz.reviewed.add(currentQuiz.index); renderQuiz(); }
  else if (action === "submit") requestSubmission();
  else if (action === "cancel-submit") closeModal();
  else if (action === "confirm-submit") submitQuiz();
  else if (action === "retry") retryIncorrect();
  else if (action === "quit") quitQuiz();
  else if (action === "reset") resetProgress();
}

function boot() {
  const validation = validateQuestionBank();
  if (!validation.valid) { console.error("Question bank validation failed", validation.errors); alert("Question bank validation failed. Please inspect the console."); return; }
  updateDashboard(); updateStatistics();
  document.addEventListener("click", handleAction);
  document.getElementById("answer-options").addEventListener("change", event => { if (event.target.matches("input[name=answer]") && currentQuiz) { currentQuiz.answers[currentQuiz.index] = Number(event.target.value); renderQuiz(); } });
  document.addEventListener("keydown", event => { if (!currentQuiz || event.target.matches("input, button")) return; if (event.key === "ArrowRight") changeQuestion(1); if (event.key === "ArrowLeft") changeQuestion(-1); });
}

const testApi = { QUESTION_BANK, ALL_QUESTIONS, validateQuestionBank, createFinalQuestions, performanceLevel, difficultyFor };
if (typeof window !== "undefined") { window.__grammarMasterTestApi = testApi; document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", boot) : boot(); }
