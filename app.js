/* =========================================================
   VAYLEE - MAIN WEBSITE SCRIPT
   ========================================================= */

/*
    TEMPORARY PET DATABASE

    These are examples for now.
    Later we can replace this with a complete
    Adopt Me pet database.
*/

const pets = [

    // COMMON

    {
        name: "Dog",
        rarity: "Common",
        emoji: "🐶"
    },

    {
        name: "Cat",
        rarity: "Common",
        emoji: "🐱"
    },

    {
        name: "Otter",
        rarity: "Common",
        emoji: "🦦"
    },

    {
        name: "Mouse",
        rarity: "Common",
        emoji: "🐭"
    },


    // UNCOMMON

    {
        name: "Red Fox",
        rarity: "Uncommon",
        emoji: "🦊"
    },

    {
        name: "Chocolate Labrador",
        rarity: "Uncommon",
        emoji: "🐕"
    },

    {
        name: "Snow Cat",
        rarity: "Uncommon",
        emoji: "🐈"
    },


    // RARE

    {
        name: "Rabbit",
        rarity: "Rare",
        emoji: "🐰"
    },

    {
        name: "Cow",
        rarity: "Rare",
        emoji: "🐮"
    },

    {
        name: "Beaver",
        rarity: "Rare",
        emoji: "🦫"
    },


    // ULTRA-RARE

    {
        name: "Unicorn",
        rarity: "Ultra-Rare",
        emoji: "🦄"
    },

    {
        name: "Bee",
        rarity: "Ultra-Rare",
        emoji: "🐝"
    },

    {
        name: "Koala",
        rarity: "Ultra-Rare",
        emoji: "🐨"
    },


    // LEGENDARY

    {
        name: "Bat Dragon",
        rarity: "Legendary",
        emoji: "🐉"
    },

    {
        name: "Frost Dragon",
        rarity: "Legendary",
        emoji: "🐲"
    },

    {
        name: "Golden Rat",
        rarity: "Legendary",
        emoji: "🐀"
    },

    {
        name: "Dodo",
        rarity: "Legendary",
        emoji: "🦤"
    }

];


/* =========================================================
   STORAGE
   ========================================================= */

const STORAGE_KEY = "vayleeSelectedPets";


function getSelectedPets() {

    return JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );

}


function saveSelectedPets(petsList) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(petsList)
    );

}


/* =========================================================
   CREATE PET CARD
   ========================================================= */

function createPetCard(pet, index, selectable = false) {

    const card = document.createElement("div");

    card.className = "pet-card";

    card.dataset.index = index;

    card.dataset.name =
        pet.name.toLowerCase();

    card.dataset.rarity =
        pet.rarity;


    card.innerHTML = `

        <div class="pet-image">
            ${pet.emoji}
        </div>

        <div class="pet-name">
            ${pet.name}
        </div>

        <div class="pet-rarity">
            ${pet.rarity}
        </div>

    `;


    if (selectable) {

        card.addEventListener(
            "click",
            () => {

                card.classList.toggle(
                    "selected"
                );

            }
        );

    }


    return card;

}


/* =========================================================
   PET BROWSER
   ========================================================= */

function setupPetBrowser() {

    const grid =
        document.querySelector("#petGrid");

    if (!grid) return;


    function renderPets(list) {

        grid.innerHTML = "";


        list.forEach((pet) => {

            const index =
                pets.indexOf(pet);


            grid.appendChild(
                createPetCard(
                    pet,
                    index,
                    true
                )
            );

        });

    }


    renderPets(pets);


    /* SEARCH */

    const search =
        document.querySelector("#petSearch");


    if (search) {

        search.addEventListener(
            "input",
            () => {

                const value =
                    search.value
                        .toLowerCase()
                        .trim();


                const filtered =
                    pets.filter((pet) => {

                        return pet.name
                            .toLowerCase()
                            .includes(value);

                    });


                renderPets(filtered);

            }
        );

    }


    /* RARITY FILTER */

    const filters =
        document.querySelectorAll(
            ".filter"
        );


    filters.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                filters.forEach(
                    (b) =>
                        b.classList.remove(
                            "active"
                        )
                );


                button.classList.add(
                    "active"
                );


                const rarity =
                    button.dataset.rarity;


                if (
                    rarity === "All"
                ) {

                    renderPets(pets);

                    return;

                }


                renderPets(
                    pets.filter(
                        (pet) =>
                            pet.rarity ===
                            rarity
                    )
                );

            }
        );

    });

}


/* =========================================================
   PET PICKER MODAL
   ========================================================= */

function setupPetPicker() {

    const modal =
        document.querySelector(
            "#petModal"
        );


    if (!modal) return;


    const grid =
        document.querySelector(
            "#modalGrid"
        );


    const search =
        document.querySelector(
            "#pickerSearch"
        );


    const openButton =
        document.querySelector(
            "#openPicker"
        );


    const closeButton =
        document.querySelector(
            "#closeModal"
        );


    const addButton =
        document.querySelector(
            "#addSelected"
        );


    let chosen = [];


    function renderPicker(list) {

        grid.innerHTML = "";


        list.forEach((pet) => {

            const index =
                pets.indexOf(pet);


            const card =
                createPetCard(
                    pet,
                    index,
                    true
                );


            card.addEventListener(
                "click",
                () => {

                    const exists =
                        chosen.some(
                            (p) =>
                                p.name ===
                                pet.name
                        );


                    if (exists) {

                        chosen =
                            chosen.filter(
                                (p) =>
                                    p.name !==
                                    pet.name
                            );

                    } else {

                        chosen.push(pet);

                    }


                    card.classList.toggle(
                        "selected",
                        !exists
                    );

                }
            );


            grid.appendChild(card);

        });

    }


    function openPicker() {

        chosen = [];

        renderPicker(pets);

        modal.classList.add(
            "show"
        );

    }


    function closePicker() {

        modal.classList.remove(
            "show"
        );

    }


    openButton.addEventListener(
        "click",
        openPicker
    );


    closeButton.addEventListener(
        "click",
        closePicker
    );


    modal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === modal
            ) {

                closePicker();

            }

        }
    );


    if (search) {

        search.addEventListener(
            "input",
            () => {

                const value =
                    search.value
                        .toLowerCase()
                        .trim();


                const filtered =
                    pets.filter(
                        (pet) =>
                            pet.name
                                .toLowerCase()
                                .includes(
                                    value
                                )
                    );


                renderPicker(
                    filtered
                );

            }
        );

    }


    addButton.addEventListener(
        "click",
        () => {

            if (
                chosen.length === 0
            ) {

                alert(
                    "Select at least one pet first!"
                );

                return;

            }


            const current =
                getSelectedPets();


            const updated =
                [
                    ...current,
                    ...chosen
                ];


            saveSelectedPets(
                updated
            );


            renderSelectedPets();


            closePicker();

        }
    );

}


/* =========================================================
   DISPLAY SELECTED PETS
   ========================================================= */

function renderSelectedPets() {

    const container =
        document.querySelector(
            "#selectedPets"
        );


    if (!container) return;


    const selected =
        getSelectedPets();


    container.innerHTML = "";


    if (
        selected.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-message">

                <div style="font-size:45px;">
                    🐾
                </div>

                <div>
                    No pets added yet
                </div>

                <small>
                    Click + Add Pets to begin.
                </small>

            </div>

        `;

        return;

    }


    selected.forEach(
        (pet, index) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "smallpet";


            card.innerHTML = `

                <span>
                    ${pet.emoji}
                </span>

                <div>
                    ${pet.name}
                </div>

                <small>
                    ${pet.rarity}
                </small>

                <button
                    class="remove-pet"
                    data-index="${index}"
                >
                    ×
                </button>

            `;


            container.appendChild(
                card
            );

        }
    );


    document
        .querySelectorAll(
            ".remove-pet"
        )
        .forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                button
                                    .dataset
                                    .index
                            );


                        const updated =
                            getSelectedPets();


                        updated.splice(
                            index,
                            1
                        );


                        saveSelectedPets(
                            updated
                        );


                        renderSelectedPets();

                    }
                );

            }
        );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupPetBrowser();

        setupPetPicker();

        renderSelectedPets();

    }
);
