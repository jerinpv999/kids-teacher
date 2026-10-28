// ─────────────────────────────────────────────────────────────
// Curriculum for Pre-KG, LKG and UKG (Montessori style).
// Everything a teacher or parent would want to change lives here.
// ─────────────────────────────────────────────────────────────

/** label = what is drawn on the 3D block, name = spoken title, line = the little lesson */
const mk = (label, name, line) => ({ label, name, line });

// ── Levels ───────────────────────────────────────────────────
// opts  = how many answer blocks to show in a Find game
// win   = how many blocks in an Order round
// count = highest number used
export const LEVELS = [
  { id: 'prekg', title: 'Pre-KG', ages: 'Ages 2–3', icon: '🧸', opts: 2, win: 3, count: 5 },
  { id: 'lkg',   title: 'LKG',    ages: 'Ages 3–4', icon: '🎈', opts: 3, win: 4, count: 10 },
  { id: 'ukg',   title: 'UKG',    ages: 'Ages 4–6', icon: '🎒', opts: 4, win: 5, count: 20 },
];

// ── Language: letters and phonics ────────────────────────────
const PHONICS = 'ah,buh,kuh,duh,eh,fff,guh,huh,ih,juh,kuh,lll,mmm,nnn,aw,puh,kwuh,rrr,sss,tuh,uh,vvv,wuh,ks,yuh,zzz'.split(',');
const A_WORDS = 'Apple,Ball,Cat,Dog,Egg,Fish,Goat,Hat,Ice cream,Jam,Kite,Lion,Moon,Nut,Orange,Pig,Queen,Rabbit,Sun,Tiger,Umbrella,Van,Water,Xylophone,Yarn,Zebra'.split(',');
const A_EMOJI = ['🍎','⚽','🐱','🐶','🥚','🐟','🐐','🎩','🍦','🍯','🪁','🦁','🌙','🥜','🍊','🐷','👑','🐰','☀️','🐯','☂️','🚐','💧','🎹','🧶','🦓'];

export const LETTERS = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map((c, i) => ({
  label: c,
  name: `Letter ${c}`,
  line: `${c} says ${PHONICS[i]}. ${c} is for ${A_WORDS[i]} ${A_EMOJI[i]}`,
  small: c.toLowerCase(),
  word: A_WORDS[i],
  emo: A_EMOJI[i],
}));

// ── Maths: numbers ───────────────────────────────────────────
const NUM_WORDS = ['one','two','three','four','five','six','seven','eight','nine','ten',
  'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
const COUNT_EMOJI = ['🍎','⭐','🐟','🎈','🐥','🍓','🚗','🌼','🍪','🦋',
  '🍋','🐞','🧁','🌺','🐬','🍇','🚂','🌈','🐝','🎁'];

export const NUMBERS = NUM_WORDS.map((w, i) => ({
  label: String(i + 1),
  name: String(i + 1),
  line: `${w}. Count with me.`,
  n: i + 1,
  word: w,
  emo: COUNT_EMOJI[i],
}));

// ── Three-letter words (UKG spelling) ────────────────────────
export const CVC_WORDS = [
  { word: 'CAT', emo: '🐱' }, { word: 'DOG', emo: '🐶' }, { word: 'SUN', emo: '☀️' },
  { word: 'BUS', emo: '🚌' }, { word: 'PIG', emo: '🐷' }, { word: 'HAT', emo: '🎩' },
  { word: 'CUP', emo: '🥤' }, { word: 'BED', emo: '🛏️' }, { word: 'PEN', emo: '🖊️' },
  { word: 'BOX', emo: '📦' }, { word: 'MAP', emo: '🗺️' }, { word: 'KEY', emo: '🔑' },
];

// ── Opposites (UKG matching) ─────────────────────────────────
export const OPPOSITES = [
  { a: mk('🐘', 'Big', 'An elephant is big.'),   b: mk('🐜', 'Small', 'An ant is small.') },
  { a: mk('☀️', 'Day', 'The sun shines in the day.'), b: mk('🌙', 'Night', 'The moon comes at night.') },
  { a: mk('🔥', 'Hot', 'Fire is hot.'),          b: mk('❄️', 'Cold', 'Ice is cold.') },
  { a: mk('⬆️', 'Up', 'The balloon goes up.'),   b: mk('⬇️', 'Down', 'The ball falls down.') },
  { a: mk('😀', 'Happy', 'A smile means happy.'), b: mk('😢', 'Sad', 'Tears mean sad.') },
  { a: mk('🐇', 'Fast', 'The rabbit is fast.'),  b: mk('🐢', 'Slow', 'The tortoise is slow.') },
  { a: mk('🌳', 'Tall', 'The tree is tall.'),    b: mk('🌱', 'Short', 'The plant is short.') },
  { a: mk('🧼', 'Clean', 'Soap makes us clean.'), b: mk('🧹', 'Dirty', 'We sweep what is dirty.') },
];

// ── Topic items ──────────────────────────────────────────────
const animals = [
  mk('🐶', 'Dog', 'The dog says woof woof!'),
  mk('🐱', 'Cat', 'The cat says meow!'),
  mk('🐮', 'Cow', 'The cow says moo. She gives us milk.'),
  mk('🐑', 'Sheep', 'The sheep says baa. Its wool keeps us warm.'),
  mk('🐷', 'Pig', 'The pig says oink oink!'),
  mk('🐴', 'Horse', 'The horse says neigh. Horses run fast.'),
  mk('🦁', 'Lion', 'The lion says roar. He is the king of the jungle.'),
  mk('🐘', 'Elephant', 'The elephant is very big. It has a long trunk.'),
  mk('🐵', 'Monkey', 'The monkey loves bananas.'),
  mk('🐸', 'Frog', 'The frog says ribbit and jumps high.'),
  mk('🐐', 'Goat', 'The goat says maa.'),
  mk('🐯', 'Tiger', 'The tiger has orange and black stripes.'),
];

const birds = [
  mk('🦜', 'Parrot', 'The parrot is colourful and can copy words.'),
  mk('🦉', 'Owl', 'The owl says hoo hoo and wakes at night.'),
  mk('🦆', 'Duck', 'The duck says quack and loves to swim.'),
  mk('🐔', 'Hen', 'The hen says cluck cluck and lays eggs.'),
  mk('🐓', 'Rooster', 'The rooster calls us in the morning.'),
  mk('🦚', 'Peacock', 'The peacock opens its feathers and dances.'),
  mk('🦅', 'Eagle', 'The eagle flies very high.'),
  mk('🐧', 'Penguin', 'The penguin cannot fly, but it swims well.'),
  mk('🦢', 'Swan', 'The swan glides on the water.'),
  mk('🐦', 'Sparrow', 'The sparrow says chirp chirp.'),
];

const colours = [
  mk('🔴', 'Red', 'Apples are red.'),
  mk('🔵', 'Blue', 'The sky is blue.'),
  mk('🟢', 'Green', 'Leaves are green.'),
  mk('🟡', 'Yellow', 'The sun is yellow.'),
  mk('🟠', 'Orange', 'An orange is orange.'),
  mk('🟣', 'Purple', 'Grapes are purple.'),
  mk('🟤', 'Brown', 'Chocolate is brown.'),
  mk('⚫', 'Black', 'Night is black.'),
  mk('⚪', 'White', 'Milk is white.'),
];

const shapes = [
  mk('⭕', 'Circle', 'A circle is round, like a ball.'),
  mk('🟦', 'Square', 'A square has four equal sides.'),
  mk('🔺', 'Triangle', 'A triangle has three sides.'),
  mk('▬', 'Rectangle', 'A rectangle has two long and two short sides.'),
  mk('⭐', 'Star', 'A star has five points.'),
  mk('❤️', 'Heart', 'A heart means love.'),
  mk('🔷', 'Diamond', 'A diamond stands on its corner.'),
];

const fruits = [
  mk('🍎', 'Apple', 'An apple a day keeps you healthy.'),
  mk('🍌', 'Banana', 'A banana is yellow and sweet.'),
  mk('🍇', 'Grapes', 'Grapes grow in a bunch.'),
  mk('🍉', 'Watermelon', 'Watermelon is red inside and full of water.'),
  mk('🥭', 'Mango', 'Mango is the king of fruits.'),
  mk('🥕', 'Carrot', 'Carrots are good for your eyes.'),
  mk('🍅', 'Tomato', 'Tomato is red and juicy.'),
  mk('🥔', 'Potato', 'Potatoes grow under the ground.'),
  mk('🌽', 'Corn', 'Corn has many yellow seeds.'),
  mk('🥦', 'Broccoli', 'Broccoli is a green vegetable.'),
];

const vehicles = [
  mk('🚌', 'Bus', 'The bus takes us to school.'),
  mk('🚗', 'Car', 'The car goes on the road.'),
  mk('🚲', 'Bicycle', 'We pedal a bicycle.'),
  mk('🚂', 'Train', 'The train runs on tracks.'),
  mk('✈️', 'Aeroplane', 'The aeroplane flies in the sky.'),
  mk('🚢', 'Ship', 'The ship sails on the sea.'),
  mk('🚑', 'Ambulance', 'The ambulance helps sick people.'),
  mk('🚒', 'Fire engine', 'The fire engine puts out fires.'),
  mk('🚜', 'Tractor', 'The tractor works on the farm.'),
  mk('🛺', 'Auto rickshaw', 'The auto rickshaw has three wheels.'),
];

const body = [
  mk('👀', 'Eyes', 'We see with our eyes.'),
  mk('👂', 'Ears', 'We hear with our ears.'),
  mk('👃', 'Nose', 'We smell with our nose.'),
  mk('👄', 'Mouth', 'We eat and talk with our mouth.'),
  mk('✋', 'Hands', 'We hold things with our hands.'),
  mk('🦶', 'Feet', 'We walk and run with our feet.'),
  mk('🦷', 'Teeth', 'We chew with our teeth.'),
  mk('💇', 'Hair', 'Hair grows on our head.'),
];

const feelings = [
  mk('😀', 'Happy', 'I feel happy when I play.'),
  mk('😢', 'Sad', 'I feel sad when I lose a toy. It is okay to cry.'),
  mk('😠', 'Angry', 'When I feel angry, I take a deep breath.'),
  mk('😨', 'Scared', 'When I feel scared, I hold someone I love.'),
  mk('😴', 'Sleepy', 'When I feel sleepy, I go to bed.'),
  mk('😲', 'Surprised', 'A surprise makes my eyes go big.'),
];

const traffic = [
  { ...mk('🔴', 'Red light', 'Red means stop. Wait and do not cross.'), ask: 'Which light means stop?' },
  { ...mk('🟡', 'Yellow light', 'Yellow means get ready and wait.'), ask: 'Which light means get ready?' },
  { ...mk('🟢', 'Green light', 'Green means go. Now cars can move.'), ask: 'Which light means go?' },
  { ...mk('🛑', 'Stop sign', 'A stop sign means everybody must stop.'), ask: 'Find the stop sign' },
  { ...mk('🚸', 'School crossing', 'Near a school, slow down. Children are crossing.'), ask: 'Find the school sign' },
  { ...mk('🚶', 'Footpath', 'Always walk on the footpath, not on the road.'), ask: 'Where should we walk?' },
  { ...mk('🤝', 'Hold hands', 'Hold a grown-up hand when you cross the road.'), ask: 'What do we do when we cross?' },
  { ...mk('👀', 'Look both ways', 'Look right, look left, then right again before you cross.'), ask: 'What do we do before crossing?' },
  { ...mk('⛑️', 'Helmet', 'Wear a helmet when you ride a bicycle.'), ask: 'What do we wear on a bicycle?' },
  { ...mk('💺', 'Seat belt', 'Always wear your seat belt in a car.'), ask: 'What do we wear in a car?' },
];

const goodHabits = [
  mk('🪥', 'Brushing teeth', 'Brush your teeth in the morning and at night.'),
  mk('🧼', 'Washing hands', 'Wash your hands before you eat.'),
  mk('🙏', 'Saying please', 'Say please and thank you. It is polite.'),
  mk('😴', 'Sleeping on time', 'Sleep on time so you wake up fresh.'),
  mk('🥦', 'Eating vegetables', 'Vegetables and fruits make you strong.'),
  mk('💧', 'Drinking water', 'Drink water many times a day.'),
  mk('🧸', 'Tidying toys', 'Put your toys back after you play.'),
  mk('🤗', 'Sharing', 'Share your toys and snacks with friends.'),
  mk('🚿', 'Taking a bath', 'A bath keeps you clean and healthy.'),
  mk('👂', 'Listening', 'Listen when your teacher or parents talk.'),
].map((x) => ({ ...x, kind: 'good' }));

const badHabits = [
  mk('🍬', 'Too many sweets', 'Too many sweets hurt your teeth. Eat fruit instead.'),
  mk('📱', 'Too much screen', 'Too much screen is not good. Go out and play.'),
  mk('🤥', 'Telling lies', 'Lies make people sad. Always tell the truth.'),
  mk('👊', 'Hitting', 'Hitting hurts. Use kind words instead.'),
  mk('🗑️', 'Littering', 'Do not throw rubbish on the ground. Use the dustbin.'),
  mk('🤧', 'Open sneezing', 'Cover your mouth when you cough or sneeze.'),
  mk('😬', 'Biting nails', 'Biting nails is not clean. Keep your nails short.'),
  mk('🌃', 'Staying up late', 'Staying up late makes you tired. Sleep on time.'),
  mk('😠', 'Shouting', 'Do not shout at people. Use a soft, calm voice.'),
  mk('😤', 'Not sharing', 'Not sharing makes friends sad. Share and smile.'),
].map((x) => ({ ...x, kind: 'bad' }));

// Interleaved so that any slice of the list still mixes good with bad
export const HABITS = goodHabits.flatMap((g, i) => (badHabits[i] ? [g, badHabits[i]] : [g]));

const days = [
  mk('Mon', 'Monday', 'Monday is the first school day.'),
  mk('Tue', 'Tuesday', 'Tuesday comes after Monday.'),
  mk('Wed', 'Wednesday', 'Wednesday is in the middle of the week.'),
  mk('Thu', 'Thursday', 'Thursday comes after Wednesday.'),
  mk('Fri', 'Friday', 'Friday is the last school day.'),
  mk('Sat', 'Saturday', 'Saturday is a holiday.'),
  mk('Sun', 'Sunday', 'Sunday is a holiday too.'),
];

// ── Subjects ─────────────────────────────────────────────────
// acts: which activities each level sees for this subject.
// ask:  how the Find game words its question.
export const SUBJECTS = [
  { id: 'letters', title: 'Letters', icon: '🔤', area: 'Language', items: LETTERS,
    take: { prekg: 10, lkg: 26, ukg: 26 },
    ask: (it) => `Find the letter ${it.label}`,
    acts: { prekg: ['learn', 'find'], lkg: ['learn', 'find', 'order'], ukg: ['learn', 'find', 'order', 'case'] } },

  { id: 'numbers', title: 'Numbers', icon: '🔢', area: 'Maths', items: NUMBERS,
    take: { prekg: 5, lkg: 10, ukg: 20 },
    ask: () => 'How many can you count?',
    acts: { prekg: ['learn', 'count'], lkg: ['learn', 'count', 'order'], ukg: ['learn', 'count', 'order', 'add'] } },

  { id: 'words', title: 'Words', icon: '📖', area: 'Language', items: [],
    levels: ['ukg'], acts: { ukg: ['spell'] } },

  { id: 'colours', title: 'Colours', icon: '🎨', area: 'Sensorial', items: colours,
    take: { prekg: 6, lkg: 9, ukg: 9 },
    ask: (it) => `Find ${it.name.toLowerCase()}`,
    acts: { prekg: ['learn', 'find'], lkg: ['learn', 'find'], ukg: ['learn', 'find'] } },

  { id: 'shapes', title: 'Shapes', icon: '🔷', area: 'Sensorial', items: shapes,
    take: { prekg: 4, lkg: 6, ukg: 7 },
    ask: (it) => `Find the ${it.name.toLowerCase()}`,
    acts: { prekg: ['learn', 'find'], lkg: ['learn', 'find'], ukg: ['learn', 'find'] } },

  { id: 'animals', title: 'Animals', icon: '🐶', area: 'World', items: animals,
    take: { prekg: 6, lkg: 10, ukg: 12 },
    ask: (it) => `Find the ${it.name.toLowerCase()}`,
    acts: { prekg: ['learn', 'find'], lkg: ['learn', 'find'], ukg: ['learn', 'find'] } },

  { id: 'birds', title: 'Birds', icon: '🦜', area: 'World', items: birds,
    take: { prekg: 5, lkg: 8, ukg: 10 },
    ask: (it) => `Find the ${it.name.toLowerCase()}`,
    acts: { prekg: ['learn', 'find'], lkg: ['learn', 'find'], ukg: ['learn', 'find'] } },

  { id: 'fruits', title: 'Fruits & veg', icon: '🍎', area: 'World', items: fruits,
    take: { prekg: 5, lkg: 8, ukg: 10 },
    ask: (it) => `Find the ${it.name.toLowerCase()}`,
    acts: { prekg: ['learn', 'find'], lkg: ['learn', 'find'], ukg: ['learn', 'find'] } },

  { id: 'vehicles', title: 'Vehicles', icon: '🚌', area: 'World', items: vehicles,
    take: { prekg: 5, lkg: 8, ukg: 10 },
    ask: (it) => `Find the ${it.name.toLowerCase()}`,
    acts: { prekg: ['learn', 'find'], lkg: ['learn', 'find'], ukg: ['learn', 'find'] } },

  { id: 'body', title: 'My body', icon: '👀', area: 'World', items: body,
    take: { prekg: 6, lkg: 8, ukg: 8 },
    ask: (it) => `Find the ${it.name.toLowerCase()}`,
    acts: { prekg: ['learn', 'find'], lkg: ['learn', 'find'], ukg: ['learn', 'find'] } },

  { id: 'feelings', title: 'Feelings', icon: '😀', area: 'Life skills', items: feelings,
    take: { prekg: 4, lkg: 6, ukg: 6 },
    ask: (it) => `Which one is ${it.name.toLowerCase()}?`,
    acts: { prekg: ['learn', 'find'], lkg: ['learn', 'find'], ukg: ['learn', 'find'] } },

  { id: 'traffic', title: 'Traffic', icon: '🚦', area: 'Life skills', items: traffic,
    take: { prekg: 4, lkg: 8, ukg: 10 },
    ask: (it) => it.ask,
    acts: { prekg: ['learn', 'find'], lkg: ['learn', 'find'], ukg: ['learn', 'find'] } },

  { id: 'habits', title: 'Habits', icon: '🌟', area: 'Life skills', items: HABITS,
    take: { prekg: 8, lkg: 14, ukg: 20 },
    ask: (it) => `Find ${it.name.toLowerCase()}`,
    acts: { prekg: ['learn', 'judge'], lkg: ['learn', 'find', 'judge'], ukg: ['learn', 'find', 'judge'] } },

  { id: 'opposites', title: 'Opposites', icon: '↔️', area: 'Thinking', items: [],
    levels: ['lkg', 'ukg'], acts: { lkg: ['pairs'], ukg: ['pairs'] } },

  { id: 'days', title: 'Days', icon: '📅', area: 'Thinking', items: days,
    take: { lkg: 7, ukg: 7 }, levels: ['lkg', 'ukg'],
    ask: (it) => `Which day is ${it.name}?`,
    acts: { lkg: ['learn', 'find'], ukg: ['learn', 'find', 'order'] } },
];

export const ACTIVITY_LABELS = {
  learn: '👀 Learn', find: '🎯 Find', order: '🧩 Order', count: '🔢 Count',
  add: '➕ Add', case: '🔡 Big & small', spell: '✏️ Spell', judge: '👍 Good or bad',
  pairs: '↔️ Match',
};

export const TILE_COLORS = ['#ff6b6b','#4dabf7','#51cf66','#ffa94d','#b197fc','#f06595','#20c997'];
export const CHEERS = ['Great job! 🎉','Yay! ⭐','Super! 🌈','You did it! 🥳','Well done! 👏'];

/** Items a subject shows at a level */
export const itemsFor = (subject, level) => subject.items.slice(0, (subject.take || {})[level] || subject.items.length);

/** Subjects available at a level */
export const subjectsFor = (level) => SUBJECTS.filter((s) => (s.levels ? s.levels.includes(level) : true));

export const levelOf = (id) => LEVELS.find((l) => l.id === id);
