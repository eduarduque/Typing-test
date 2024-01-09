                    document.addEventListener('DOMContentLoaded', () => {
                    // DOM elements
                    const exerciseTextElement = document.getElementById('exerciseText');
                    const userInput = document.getElementById('userInput');
                    const results = document.getElementById('results');
                    const restartButton = document.getElementById('restartButton');
                    const attemptDetailsElement = document.getElementById('attemptDetails');

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
                        "adventure", "journey"
                        
                    ];
                    let mistakeCounter = {}; // Object to track mistakes for each letter
                    let attemptCount = 0; // Count the number of attempts
                
                    
                    function completeExercise() {
                        endTime = new Date();
                        const deltaTime = (endTime - startTime) / 1000;
                        const wpm = calculateWPM(originalExerciseText.split(' ').length, deltaTime);
                        results.textContent = `Your speed: ${wpm} WPM.`;
                        updateAttemptDetails(attemptCount, mistakeCounter, wpm, deltaTime);
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
                
                    function getRandomWords(numWords) {
                        let shuffled = wordsArray.sort(() => 0.5 - Math.random());
                        return shuffled.slice(0, numWords).join(' ');
                    }

                    function updateAttemptDetails(attempt, mistakes, wpm, deltaTime) {
                        let table = document.getElementById('attemptDetailsTable');
                        if (!table) {
                            table = document.createElement('table');
                            table.id = 'attemptDetailsTable';
                            table.innerHTML = `<tr><th>Attempt</th><th>Speed (WPM)</th><th>Time (s)</th><th>Mistakes</th></tr>`;
                            attemptDetailsElement.appendChild(table);
                        }
                        let row = table.insertRow(-1);
                        row.innerHTML = `<td>${attempt}</td><td>${wpm}</td><td>${deltaTime.toFixed(2)}</td><td>${Object.entries(mistakes).map(([letter, count]) => `${letter}(${count})`).join(', ')}</td>`;
                    }
                
                    function startExercise() {
                        attemptCount++;
                        startTime = new Date(); // Initialize start time
                        endTime = null;
                        originalExerciseText = getRandomWords(10);
                        exerciseTextElement.textContent = originalExerciseText;
                        userInput.value = '';
                        userInput.disabled = false;
                        userInput.classList.remove('error');
                        userInput.focus();
                       
                    }
                    
                    restartButton.addEventListener('click', startExercise);
                    
                    userInput.addEventListener('input', () => {
                        const typedText = userInput.value;
                        if (originalExerciseText.startsWith(typedText)) {
                            userInput.classList.remove('error-bg'); // Remove error background
                            exerciseTextElement.textContent = originalExerciseText.slice(typedText.length);
                    
                            if (typedText.length === originalExerciseText.length) {
                                completeExercise(); // Call this when the exercise is completed
                                userInput.disabled = true;
                            }
                        } else {
                            let mistakeLetter = typedText[typedText.length - 1];
                            mistakeCounter[mistakeLetter] = (mistakeCounter[mistakeLetter] || 0) + 1;
                            userInput.classList.add('error-bg'); // Add error background
                            userInput.value = typedText.slice(0, -1); // Remove the last character
                            setTimeout(() => { userInput.classList.remove('error-bg'); }, 500);
                        }
                    });
                    
                
                    startExercise();
                });
                
               function calculateWPM(words, timeSeconds) {
    return ((words / timeSeconds) * 60).toFixed(2);
}
                