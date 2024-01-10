                    document.addEventListener('DOMContentLoaded', () => {
                    document.getElementById('wordsMode').addEventListener('click', () => setMode('words'));
                    document.getElementById('lettersMode').addEventListener('click', () => setMode('letters'));
                        

                    // DOM elements
                    const exerciseTextElement = document.getElementById('exerciseText');
                    const userInput = document.getElementById('userInput');
                    const results = document.getElementById('results');
                    const restartButton = document.getElementById('restartButton');
                    const attemptDetailsElement = document.getElementById('attemptDetails');
                    let currentMistakeCounter = {}; // Object to track mistakes for the current attempt
                    let mode = 'words';

                    // Variables
                    let startTime, endTime;
                    let originalExerciseText = '';
                    let wordsArray = [
                        "hello", "world", "computer", "programming", "learning", 
                        "typing", "exercise", "challenge", "success", "achievement", "goal", 
                        "education", "knowledge", "understanding", "communication", "efficiency", 
                        "accuracy", "speed", "performance", "skill", "development", "progress", 
                        "focus", "dedication", "motivation", "inspiration", "creativity", "innovation", 
                        "solution", "strategy", "method", "technique", "tool", "resource", "guide", 
                        "tutorial", "lesson", "practice", "experience", "expertise", "proficiency", 
                        "mastery", "competence", "capability", "potential", "opportunity", "challenge", 
                        "adventure", "journey", "discovery", "exploration", "perspective", "insight", 
                        "imagination", "thought", "wisdom", "philosophy", "science", "technology", 
                        "history", "culture", "art", "literature", "poetry", "music", "harmony", 
                        "rhythm", "melody", "symphony", "orchestra", "guitar", "piano", "violin", 
                        "trumpet", "flute", "saxophone", "drum", "dance", "theatre", "cinema", 
                        "photography", "painting", "sculpture", "architecture", "design", "fashion", 
                        "style", "elegance", "beauty", "nature", "environment", "ecology", "sustainability", 
                        "conservation", "biodiversity", "wildlife", "flora", "fauna", "landscape", "phone", "coffee", "master"
                    ];
                    

                    let mistakeCounter = {}; // Object to track mistakes for each letter
                    let attemptCount = 0; // Count the number of attempts
                
                    function setMode(newMode) {
                        mode = newMode;
                        startExercise(); // Restart exercise with new mode
                    }
                    
                    function completeExercise() {
                        endTime = new Date();
                        const deltaTime = (endTime - startTime) / 1000;

                        const charCount = originalExerciseText.length; // Count the number of characters
                        const wpm = calculateWPM(charCount, deltaTime);
                        results.textContent = `Your speed: ${wpm} WPM.`;

                        const letterToPractice = analyzeMistakes();
                        results.innerHTML += `<br><br>Focus on improving: '${letterToPractice}'`;

                        updateAttemptDetails(attemptCount, currentMistakeCounter, mistakeCounter, wpm, deltaTime);
                    };
                         
                    
                    function analyzeMistakes() {
                        let maxMistakes = 0;
                        let letterToPractice = '';
                        for (let letter in mistakeCounter) {
                            if (mistakeCounter[letter] > maxMistakes) {
                                maxMistakes = mistakeCounter[letter];
                                letterToPractice = letter;
                            }
                        }
                        return letterToPractice;
                    }

                    function getRandomContent(numWords) {
                        if (mode === 'letters') {
                            return getRandomLetters(numWords); // Implement this function
                        } else {
                            return getRandomWords(numWords);
                        }
                    }
                    function getRandomLetters(numWords) {
                        let lettersArray = 'abcdefghijklmnopqrstuvwxyz'.split(''); // Array of all letters
                        let letterCombinations = [];
                    
                        for (let i = 0; i < numWords; i++) {
                            let word = '';
                            for (let j = 0; j < 5; j++) { // Assuming each "word" is 5 letters long
                                word += lettersArray[Math.floor(Math.random() * lettersArray.length)];
                            }
                            letterCombinations.push(word);
                    
                            // Add a space after each word except the last one
                            if (i < numWords - 1) {
                                letterCombinations.push(' ');
                            }
                        }
                    
                        // Ensure the first character is not a space
                        if (letterCombinations.length > 0 && letterCombinations[0] === ' ') {
                            letterCombinations.shift();
                        }
                    
                        return letterCombinations.join('');
                    }
                    
                    
                
                    function getRandomWords(numWords) {
                        let shuffled = wordsArray.sort(() => 0.5 - Math.random());
                        return shuffled.slice(0, numWords).join(' ');
                    }

                    function updateAttemptDetails(attempt, currentMistakes, cumulativeMistakes, wpm, deltaTime) {
                        let table = document.getElementById('attemptDetailsTable');
                        if (!table) {
                            table = document.createElement('table');
                            table.id = 'attemptDetailsTable';
                            table.innerHTML = `<tr><th>Attempt</th><th>Speed (WPM)</th><th>Time (s)</th><th>Mistakes Attempt</th><th>Summary</th></tr>`;
                            attemptDetailsElement.appendChild(table);
                        }
                        let row = table.insertRow(-1);
                        let currentMistakesDisplay = Object.entries(currentMistakes).map(([letter, count]) => `${letter}(${count})`).join(', ');
                        let cumulativeMistakesDisplay = Object.entries(cumulativeMistakes).map(([letter, count]) => `${letter}(${count})`).join(', ');
                        row.innerHTML = `<td>${attempt}</td><td>${wpm}</td><td>${deltaTime.toFixed(2)}</td><td>${currentMistakesDisplay}</td><td>${cumulativeMistakesDisplay}</td>`;
                    }

                    function provideDetailedFeedback(typedText, correctText) {
                        let feedback = '';
                        for (let i = 0; i < typedText.length; i++) {
                            if (typedText[i] !== correctText[i]) {
                                feedback += `<span class="mistake-highlight">Expected: "${correctText[i]}", Typed: "${typedText[i]}"</span><br/>`;
                            }
                        }
                        document.getElementById('detailedFeedback').innerHTML = feedback;
                    }
                
                    function startExercise() {
                        attemptCount++;
                        startTime = new Date(); // Initialize start time
                        endTime = null;

                        originalExerciseText = getRandomContent(10);

                        exerciseTextElement.textContent = originalExerciseText;
                        userInput.value = '';
                        currentMistakeCounter = {};
                        userInput.disabled = false;
                        userInput.classList.remove('error');
                        userInput.focus();
                    
                        // Clear the previous results and detailed feedback
                        results.textContent = '';
                        document.getElementById('detailedFeedback').innerHTML = '';
                    }
                    
                    
                    restartButton.addEventListener('click', startExercise);
                    
                    userInput.addEventListener('input', () => {
                        const typedText = userInput.value;
                        let remainingText = originalExerciseText.substring(typedText.length);
                    
                        if (originalExerciseText.startsWith(typedText)) {
                            userInput.classList.remove('error-bg'); // Remove error background
                            exerciseTextElement.textContent = remainingText;
                    
                            if (typedText.length === originalExerciseText.length) {
                                completeExercise(); // Call this when the exercise is completed
                                userInput.disabled = true;
                            }
                        } else {
                            // Mistake made
                            let mistakeLetter = typedText[typedText.length - 1];
                            mistakeCounter[mistakeLetter] = (mistakeCounter[mistakeLetter] || 0) + 1;
                            currentMistakeCounter[mistakeLetter] = (currentMistakeCounter[mistakeLetter] || 0) + 1;
                            userInput.classList.add('error-bg');
                            userInput.value = typedText.slice(0, -1); // Remove the last character
                            setTimeout(() => { userInput.classList.remove('error-bg'); }, 500);
                            provideDetailedFeedback(typedText, originalExerciseText);
                        }
                    });
                    
                    
                    startExercise();
                });
                
                function calculateWPM(charCount, timeSeconds) {
                    const words = charCount / 5; // A word is typically five characters long
                    return ((words / timeSeconds) * 60).toFixed(2);
                }
                
                