const loadAllLevels = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";

  fetch(url)
    .then((response) => response.json())
    .then((json) => displayLevels(json.data));
};

const removeActiveClass = () => {
  const allLessonButton = document.querySelectorAll(".common-btn");

  allLessonButton.forEach((btn) => {
    btn.classList.remove("active");
  });
};

const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner-container").classList.remove("hidden");
    document.getElementById("word-card-container").classList.add("hidden");
  } else {
    document.getElementById("word-card-container").classList.remove("hidden");
    document.getElementById("spinner-container").classList.add("hidden");
  }
};

const loadWordLevel = (levelNo) => {
  manageSpinner(true);
  // jokhn click kormu button re dhoira or face bodlay dimu

  removeActiveClass();
  const lessonBtn = document.getElementById(`lesson-btn-${levelNo}`);
  lessonBtn.classList.add("active");

  const url = `https://openapi.programming-hero.com/api/level/${levelNo}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayWordsLevel(data.data);
    });
};

const loadWordDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((details) => displayWordDetails(details.data));
};

const displayWordDetails = (wordDetails) => {
  const wordDetailsContainer = document.getElementById("word-detail-container");
  wordDetailsContainer.innerHTML = "";
  /* {
    "word": "Eager",
    "meaning": "আগ্রহী",
    "pronunciation": "ইগার",
    "level": 1,
    "sentence": "The kids were eager to open their gifts.",
    "points": 1,
    "partsOfSpeech": "adjective",
    "synonyms": [
        "enthusiastic",
        "excited",
        "keen"
    ],
    "id": 5



    <div class="bg-[#EDF7FF] px-4 py-2 rounded-xl">${wordDetails.synonyms[0]}</div>
                        <div class="bg-[#EDF7FF] px-4 py-2 rounded-xl">${wordDetails.synonyms[1]}</div>
                        <div class="bg-[#EDF7FF] px-4 py-2 rounded-xl">${wordDetails.synonyms[2]}</div>
} */
  const newCardWordDetails = document.createElement("div");
  newCardWordDetails.innerHTML = `
    <div class="border-2 border-[#EDF7FF] p-4 rounded-xl mb-4 space-y-5">
                    <h1 class="font-semibold text-2xl">${
                      wordDetails.word
                    } ( <i class="fa-solid fa-microphone-lines"></i> : ${
    wordDetails.pronunciation
  })</h1>
                    <p class="font-semibold text-xl">Meaning</p>
                    <p class="font-medium font-bangla">${
                      wordDetails.meaning
                        ? wordDetails.meaning
                        : "অর্থ খুঁজে পাওয়া যায়নি"
                    }</p>
                    <p class="font-semibold text-xl">Example</p>
                    <p>${wordDetails.sentence}</p>
                    <p class="font-medium font-bangla">সমার্থক শব্দ গুলো</p>
                    <div class="flex justify-start gap-5">
                        ${displaySynonyms(wordDetails.synonyms)}
                    </div>
    </div>
    `;
  wordDetailsContainer.appendChild(newCardWordDetails);
  document.getElementById("my_modal_5").showModal();
};

const displaySynonyms = (synonyms) => {
  const display = synonyms.map((synonym) => {
    return `<div class="bg-[#EDF7FF] px-4 py-2 rounded-xl">${synonym}</div>`;
  });
  return display.join(" ");
};

const displayWordsLevel = (words) => {
  const wordCardContainer = document.getElementById("word-card-container");
  wordCardContainer.innerHTML = "";

  if (words.length === 0) {
    wordCardContainer.innerHTML = `
    <div class="text-center col-span-full p-8 space-y-4 ">

            <img class="mx-auto" src="./assets/alert-error.png" alt="">

            <p class="font-bangla text-gray-400 text-sm">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>

            <p class="font-bangla text-2xl font-medium">নেক্সট Lesson এ যান</p>
    </div>
    `;
    manageSpinner(false);
    return;
  }

  words.forEach((word) => {
    const newCard = document.createElement("div");

    newCard.innerHTML = `
        <div class="bg-white p-4 md:p-12 m-2 md:m-8 rounded-xl">
            <div class="text-center space-y-5">
                <h3 class="font-bold text-lg md:text-2xl">${
                  word.word ? word.word : "ওয়ার্ড খুঁজে পাওয়া যায়নি"
                }</h3>
                <p class="font-semibold text-lg md:text-2xl">Meaning / Pronounciation</p>
                <p class="font-medium text-lg md:text-2xl font-bangla">"${
                  word.meaning ? word.meaning : "অর্থ খুঁজে পাওয়া যায়নি"
                } / ${
      word.pronunciation ? word.pronunciation : "উচ্চারণ খুঁজে পাওয়া যায়নি"
    }"</p>
            </div>
            <div class="flex justify-between items-center mt-12">

                <button onclick="loadWordDetails(${
                  word.id
                })" class="bg-[#1A91FF10] h-[2rem] w-[2rem] rounded-xl hover:bg-[#1A91FF90] btn"><i class="fa-solid fa-circle-info"></i></button>

                <button class="bg-[#1A91FF10] h-[2rem] w-[2rem] rounded-xl hover:bg-[#1A91FF90] btn"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;

    wordCardContainer.appendChild(newCard);
    manageSpinner(false);
  });
};

const displayLevels = (lessons) => {
  const levelContainer = document.getElementById("lesson-container");
  levelContainer.innerHTML = "";

  lessons.forEach((lesson) => {
    const lessonDiv = document.createElement("div");

    lessonDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadWordLevel(${lesson.level_no})" class="btn btn-outline btn-primary common-btn">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `;

    levelContainer.appendChild(lessonDiv);
  });
};

loadAllLevels();

document.getElementById("search-btn").addEventListener("click", () => {
    removeActiveClass()
    const inputFieldValue = document.getElementById('input-field').value.trim().toLowerCase();

    if(inputFieldValue === ''){
        return;
    }
    
    
    
    // load all words for matching with input field

    const url = 'https://openapi.programming-hero.com/api/words/all';
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const allWords = data.data;
        console.log(allWords);
        const filterWords = allWords.filter(word => word.word.toLowerCase().includes(inputFieldValue))
        // console.log(filterWords);
        
        displayWordsLevel(filterWords);
        
        
    })
    
});
