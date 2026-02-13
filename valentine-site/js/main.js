document.addEventListener("DOMContentLoaded", function () {
  initParticles()
  initPuzzleInputs()
  initMatchingPuzzle()
  initScramblePuzzle()
  initEasterEggs()
  initSmoothScroll()
})

/* ===================== HONEY PARTICLES ===================== */
function initParticles() {
  var container = document.getElementById("honey-particles")
  if (!container) return
  for (var i = 0; i < 20; i++) {
    var p = document.createElement("div")
    p.className = "particle"
    var size = Math.random() * 60 + 20
    p.style.width = size + "px"
    p.style.height = size + "px"
    p.style.left = Math.random() * 100 + "%"
    p.style.top = Math.random() * 100 + "%"
    p.style.animationDelay = Math.random() * 15 + "s"
    p.style.animationDuration = Math.random() * 10 + 10 + "s"
    container.appendChild(p)
  }
}

/* ===================== PUZZLE: SNOW CIPHER ===================== */
var snowAnswers = ["SUNSHINE", "TRESOR", "UNIVERSO", "SOGNO", "STERN", "SING"]
var snowSolved = [false, false, false, false, false, false]

function initPuzzleInputs() {
  var inputs = document.querySelectorAll('.clue-input[data-puzzle="snow"]')
  inputs.forEach(function (input) {
    input.addEventListener("input", function () {
      var idx = parseInt(this.getAttribute("data-index"))
      var answer = this.getAttribute("data-answer")
      var val = this.value.trim().toUpperCase()
      var check = this.parentElement.querySelector(".clue-check")

      if (val === answer) {
        this.classList.add("correct")
        this.classList.remove("incorrect")
        check.textContent = "\u2764\uFE0F"
        snowSolved[idx] = true
      } else if (val.length >= answer.length) {
        this.classList.add("incorrect")
        this.classList.remove("correct")
        check.textContent = ""
        snowSolved[idx] = false
      } else {
        this.classList.remove("correct", "incorrect")
        check.textContent = ""
        snowSolved[idx] = false
      }
      updateSnowSolution()
    })
  })
}

function updateSnowSolution() {
  var display = document.getElementById("snow-solution-display")
  var letters = ""
  for (var i = 0; i < snowAnswers.length; i++) {
    if (snowSolved[i]) {
      letters += snowAnswers[i][0]
    } else {
      letters += "_"
    }
  }
  display.textContent = letters.split("").join(" ")
}

/* ===================== PUZZLE: TROPICAL MATCHING ===================== */
var tropicalMatched = {}
var tropicalOrder = ["italian", "french", "spanish", "german", "english"]
var tropicalLetters = {
  italian: "A",
  french: "L",
  spanish: "O",
  german: "H",
  english: "A",
}

function initMatchingPuzzle() {
  var phrases = document.querySelectorAll(".match-item.phrase")
  var dropZones = document.querySelectorAll(".drop-zone")

  phrases.forEach(function (phrase) {
    phrase.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("text/plain", this.getAttribute("data-match"))
      e.dataTransfer.setData("text/html", this.outerHTML)
      this.classList.add("dragging")
    })

    phrase.addEventListener("dragend", function () {
      this.classList.remove("dragging")
    })

    phrase.addEventListener("click", function () {
      if (this.classList.contains("matched")) return
      var allPhrases = document.querySelectorAll(".match-item.phrase")
      allPhrases.forEach(function (p) {
        p.classList.remove("selected-phrase")
      })
      this.classList.add("selected-phrase")
    })
  })

  dropZones.forEach(function (zone) {
    zone.addEventListener("dragover", function (e) {
      e.preventDefault()
      this.classList.add("over")
    })

    zone.addEventListener("dragleave", function () {
      this.classList.remove("over")
    })

    zone.addEventListener("drop", function (e) {
      e.preventDefault()
      this.classList.remove("over")
      var matchLang = e.dataTransfer.getData("text/plain")
      var acceptLang = this.getAttribute("data-accept")

      if (matchLang === acceptLang) {
        var draggedEl = document.querySelector(
          '.match-item.phrase[data-match="' + matchLang + '"]'
        )
        if (draggedEl) {
          draggedEl.classList.add("matched")
          draggedEl.setAttribute("draggable", "false")
          this.textContent = draggedEl.textContent
          this.style.background = "#E8F5E9"
          this.style.border = "2px solid #4CAF50"
          this.style.padding = "8px"
          this.style.borderRadius = "6px"
          this.style.fontSize = "0.85rem"
          tropicalMatched[matchLang] = true
          updateTropicalSolution()
        }
      }
    })

    zone.addEventListener("click", function () {
      var acceptLang = this.getAttribute("data-accept")
      var selectedPhrase = document.querySelector(
        ".match-item.phrase.selected-phrase"
      )
      if (!selectedPhrase) return

      var matchLang = selectedPhrase.getAttribute("data-match")
      if (matchLang === acceptLang) {
        selectedPhrase.classList.add("matched")
        selectedPhrase.classList.remove("selected-phrase")
        selectedPhrase.setAttribute("draggable", "false")
        this.textContent = selectedPhrase.textContent
        this.style.background = "#E8F5E9"
        this.style.border = "2px solid #4CAF50"
        this.style.padding = "8px"
        this.style.borderRadius = "6px"
        this.style.fontSize = "0.85rem"
        tropicalMatched[matchLang] = true
        updateTropicalSolution()
      }
    })
  })
}

function updateTropicalSolution() {
  var display = document.getElementById("tropical-solution-display")
  var letters = ""
  tropicalOrder.forEach(function (lang) {
    if (tropicalMatched[lang]) {
      letters += tropicalLetters[lang]
    } else {
      letters += "_"
    }
  })
  display.textContent = letters.split("").join(" ")
}

/* ===================== PUZZLE: EUROPE LOCKS ===================== */
var europeCorrectAnswers = ["FLAMME", "ETERNO", "LIEBE", "VINCE", "KEY"]
var europeSolved = [false, false, false, false, false]

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("lock-option")) {
    var idx = parseInt(e.target.getAttribute("data-index"))
    var val = e.target.getAttribute("data-value")
    var puzzle = e.target.getAttribute("data-puzzle")
    if (puzzle !== "europe") return

    var siblings = e.target.parentElement.querySelectorAll(".lock-option")
    siblings.forEach(function (s) {
      s.classList.remove("selected", "correct", "wrong")
    })

    e.target.classList.add("selected")

    if (val === europeCorrectAnswers[idx]) {
      e.target.classList.add("correct")
      europeSolved[idx] = true
      var lockItem = e.target.closest(".lock-item")
      if (lockItem) {
        lockItem.classList.add("unlocked")
        var lockIcon = lockItem.querySelector(".lock-icon")
        if (lockIcon) lockIcon.textContent = "\uD83D\uDD13"
        var check = lockItem.querySelector(".lock-check")
        if (check) check.textContent = "\u2764\uFE0F"
      }
    } else {
      europeSolved[idx] = false
    }
    updateEuropeSolution()
  }
})

function updateEuropeSolution() {
  var display = document.getElementById("europe-solution-display")
  var letters = ""
  for (var i = 0; i < europeCorrectAnswers.length; i++) {
    if (europeSolved[i]) {
      letters += europeCorrectAnswers[i][0]
    } else {
      letters += "_"
    }
  }
  display.textContent = letters.split("").join(" ")
}

/* ===================== PUZZLE: LATIN SCRAMBLE ===================== */
var latinAnswers = ["TANGO", "AMORE", "NUIT", "GEBEN", "HONEY"]
var latinSolvedItems = [false, false, false, false, false]

function initScramblePuzzle() {
  var scrambleItems = document.querySelectorAll(".scramble-item")

  scrambleItems.forEach(function (item, itemIdx) {
    var tiles = item.querySelectorAll(".scramble-tile")
    var slots = item.querySelectorAll(".answer-slot")
    var currentLetters = []

    tiles.forEach(function (tile) {
      tile.addEventListener("click", function () {
        if (this.classList.contains("used")) return
        var letter = this.getAttribute("data-letter")
        var nextSlot = null
        for (var i = 0; i < slots.length; i++) {
          if (!slots[i].textContent) {
            nextSlot = slots[i]
            break
          }
        }
        if (nextSlot) {
          nextSlot.textContent = letter
          nextSlot.classList.add("filled")
          nextSlot.setAttribute(
            "data-tile-idx",
            Array.from(tiles).indexOf(this)
          )
          this.classList.add("used")
          currentLetters.push(letter)
          checkScrambleAnswer(itemIdx, item, slots, tiles)
        }
      })
    })

    slots.forEach(function (slot) {
      slot.addEventListener("click", function () {
        if (!this.textContent) return
        var tileIdx = parseInt(this.getAttribute("data-tile-idx"))
        if (!isNaN(tileIdx) && tiles[tileIdx]) {
          tiles[tileIdx].classList.remove("used")
        }
        this.textContent = ""
        this.classList.remove("filled", "correct")
        this.removeAttribute("data-tile-idx")
        latinSolvedItems[itemIdx] = false
        updateLatinSolution()
      })
    })
  })
}

function checkScrambleAnswer(itemIdx, item, slots, tiles) {
  var answer = latinAnswers[itemIdx]
  var current = ""
  for (var i = 0; i < slots.length; i++) {
    current += slots[i].textContent || ""
  }

  if (current.length === answer.length) {
    if (current.toUpperCase() === answer) {
      latinSolvedItems[itemIdx] = true
      for (var j = 0; j < slots.length; j++) {
        slots[j].classList.add("correct")
      }
    } else {
      latinSolvedItems[itemIdx] = false
    }
    updateLatinSolution()
  }
}

function updateLatinSolution() {
  var display = document.getElementById("latin-solution-display")
  var letters = ""
  for (var i = 0; i < latinAnswers.length; i++) {
    if (latinSolvedItems[i]) {
      letters += latinAnswers[i][0]
    } else {
      letters += "_"
    }
  }
  display.textContent = letters.split("").join(" ")
}

/* ===================== OPEN/CLOSE PUZZLES ===================== */
function openPuzzle(type) {
  var modal = document.getElementById("puzzle-modal-" + type)
  if (modal) {
    modal.style.display = "block"
    document.body.style.overflow = "hidden"
  }
}

function closePuzzle(type) {
  var modal = document.getElementById("puzzle-modal-" + type)
  if (modal) {
    modal.style.display = "none"
    document.body.style.overflow = ""
  }
}

window.openPuzzle = openPuzzle
window.closePuzzle = closePuzzle

/* ===================== CHECK PUZZLE ===================== */
function checkPuzzle(type) {
  var result = document.getElementById(type + "-result")
  var statusEl = document.getElementById("status-" + type)

  if (type === "snow") {
    var allSolved = snowSolved.every(function (s) {
      return s
    })
    if (allSolved) {
      result.className = "puzzle-result success"
      result.innerHTML =
        '<strong>\u2764\uFE0F STUSS! \u2764\uFE0F</strong><br>The first letters spell <strong>S-T-U-S-S-S</strong>... Wait! The secret message is: <strong>"S.T.U.S.S."</strong> &mdash; but the true message is:<br><em>"Sunshine, Tr\u00E9sor, Universo, Sogno, Stern, Sing &mdash; You are all of these to me, in every language!"</em>'
      result.style.display = "block"
      if (statusEl) {
        statusEl.textContent = "Solved!"
        statusEl.classList.add("solved")
      }
    } else {
      result.className = "puzzle-result partial"
      result.innerHTML = "Keep going! Fill in all the missing words correctly."
      result.style.display = "block"
    }
  }

  if (type === "tropical") {
    var allMatched = tropicalOrder.every(function (lang) {
      return tropicalMatched[lang]
    })
    if (allMatched) {
      result.className = "puzzle-result success"
      result.innerHTML =
        '<strong>\u2764\uFE0F ALOHA! \u2764\uFE0F</strong><br>The first letters spell <strong>A-L-O-H-A</strong> &mdash; a greeting of love from the tropical paradise!<br><em>"Amore, L\'amour, Ojos, Herz, Always &mdash; Love speaks every language under the sun!"</em>'
      result.style.display = "block"
      if (statusEl) {
        statusEl.textContent = "Solved!"
        statusEl.classList.add("solved")
      }
    } else {
      result.className = "puzzle-result partial"
      result.innerHTML =
        "Match all phrases to their correct language! (Drag or click to match)"
      result.style.display = "block"
    }
  }

  if (type === "europe") {
    var allUnlocked = europeSolved.every(function (s) {
      return s
    })
    if (allUnlocked) {
      result.className = "puzzle-result success"
      result.innerHTML =
        '<strong>\u2764\uFE0F FELVK... FELIZ! \u2764\uFE0F</strong><br>The first letters spell <strong>F-E-L-V-K</strong>... but the locks reveal:<br><em>"Flamme, Eterno, Liebe, Vince, Key &mdash; Our love is a Flame, Eternal, it Conquers all, and you hold the Key!"</em>'
      result.style.display = "block"
      if (statusEl) {
        statusEl.textContent = "Solved!"
        statusEl.classList.add("solved")
      }
    } else {
      result.className = "puzzle-result partial"
      result.innerHTML = "Select the correct word for each love lock!"
      result.style.display = "block"
    }
  }

  if (type === "latin") {
    var allDescrambled = latinSolvedItems.every(function (s) {
      return s
    })
    if (allDescrambled) {
      result.className = "puzzle-result success"
      result.innerHTML =
        '<strong>\u2764\uFE0F TANGH! \u2764\uFE0F</strong><br>The first letters spell <strong>T-A-N-G-H</strong> &mdash; TANGO + HONEY!<br><em>"Tango, Amore, Nuit, Geben, Honey &mdash; We dance through life, giving love as sweet as honey, even in the darkest night!"</em>'
      result.style.display = "block"
      if (statusEl) {
        statusEl.textContent = "Solved!"
        statusEl.classList.add("solved")
      }
    } else {
      result.className = "puzzle-result partial"
      result.innerHTML = "Unscramble all the words! Click tiles to place them."
      result.style.display = "block"
    }
  }
}

window.checkPuzzle = checkPuzzle

/* ===================== EASTER EGGS ===================== */
var eggPhotos = {
  "hero-bee": {
    src: "images/easter-eggs/egg-hero-bee.jpg",
    svgFallback: "images/easter-eggs/egg-hero-bee.svg",
    caption:
      "You found the honey bee! \uD83D\uDC1D Our love is as sweet as Manuka honey!",
  },
  "about-heart": {
    src: "images/easter-eggs/egg-about-heart.jpg",
    svgFallback: "images/easter-eggs/egg-about-heart.svg",
    caption: "A hidden heart! \u2764\uFE0F Every detail reminds me of you.",
  },
  "map-compass": {
    src: "images/easter-eggs/egg-map-compass.jpg",
    svgFallback: "images/easter-eggs/egg-map-compass.svg",
    caption: "The compass of love! \uD83E\uDDED You are my true north.",
  },
  "tropical-flower": {
    src: "images/easter-eggs/egg-tropical-flower.jpg",
    svgFallback: "images/easter-eggs/egg-tropical-flower.svg",
    caption:
      "A tropical bloom! \uD83C\uDF3A Our love blossoms everywhere we go.",
  },
  "europe-lock": {
    src: "images/easter-eggs/egg-europe-lock.jpg",
    svgFallback: "images/easter-eggs/egg-europe-lock.svg",
    caption: "A love lock! \uD83D\uDD12 Our love is locked forever.",
  },
  "puzzle-key": {
    src: "images/easter-eggs/egg-puzzle-key.jpg",
    svgFallback: "images/easter-eggs/egg-puzzle-key.svg",
    caption: "The golden key! \uD83D\uDD11 You hold the key to my heart.",
  },
  "letter-seal": {
    src: "images/easter-eggs/egg-letter-seal.jpg",
    svgFallback: "images/easter-eggs/egg-letter-seal.svg",
    caption: "A sealed letter! \uD83D\uDC8C Words of love, sealed with a kiss.",
  },
  "footer-honey": {
    src: "images/easter-eggs/egg-footer-honey.jpg",
    svgFallback: "images/easter-eggs/egg-footer-honey.svg",
    caption: "Honey jar! \uD83C\uDF6F The sweetest ending to our story.",
  },
}

function initEasterEggs() {
  var eggs = document.querySelectorAll(".easter-egg")
  eggs.forEach(function (egg) {
    egg.addEventListener("click", function () {
      var eggId = this.getAttribute("data-egg")
      var eggData = eggPhotos[eggId]
      if (eggData) {
        openEggLightbox(eggData.src, eggData.caption, eggData.svgFallback)
      }
    })
  })
}

function openEggLightbox(src, caption, svgFallback) {
  var lightbox = document.getElementById("egg-lightbox")
  var img = document.getElementById("egg-lightbox-img")
  var cap = document.getElementById("egg-lightbox-caption")
  img.src = src
  img.onerror = function () {
    if (svgFallback) {
      this.onerror = null
      this.src = svgFallback
    } else {
      this.src =
        "data:image/svg+xml," +
        encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">' +
            '<rect width="400" height="300" fill="#FFF8E7" rx="12"/>' +
            '<text x="200" y="130" text-anchor="middle" font-size="48">\uD83D\uDC1D</text>' +
            '<text x="200" y="180" text-anchor="middle" font-size="16" fill="#8B6914" font-family="serif">Easter Egg Found!</text>' +
            '<text x="200" y="210" text-anchor="middle" font-size="12" fill="#999" font-family="serif">Replace this placeholder photo</text>' +
            "</svg>"
        )
    }
  }
  cap.textContent = caption
  lightbox.classList.add("active")
}

function closeEggLightbox() {
  var lightbox = document.getElementById("egg-lightbox")
  lightbox.classList.remove("active")
}

window.closeEggLightbox = closeEggLightbox

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeEggLightbox()
    var modals = document.querySelectorAll(".puzzle-modal")
    modals.forEach(function (m) {
      if (m.style.display === "block") {
        m.style.display = "none"
        document.body.style.overflow = ""
      }
    })
  }
})

/* ===================== SMOOTH SCROLL ===================== */
function initSmoothScroll() {
  var links = document.querySelectorAll("#floating-nav a")
  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      var target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    })
  })
}
