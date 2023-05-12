function checkAnswers() {
    const form = document.getElementById('quizForm');
    const result = document.getElementById('result');

    
    const inputs = form.querySelectorAll('input, select, textarea');
    let isComplete = true;
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '') {
            isComplete = false;
            break;
        }
    }

    if (isComplete) {
        // Válaszok ellenőrzése
        const answer1 = form.querySelector('input[name="kerdes1"]:checked');
        const answer2 = form.querySelectorAll('input[name="kerdes2"]:checked');
        const answer3 = form
            .querySelector('input[name="kerdes3"]')
            .value
            .toLowerCase();
        const answer4 = form
            .querySelector('textarea[name="kerdes4"]')
            .value;
        const answer5 = form
            .querySelector('select[name="kerdes5"]')
            .value;
        const answer5_2 = form
            .querySelector('select[name="kerdes5.1"]')
            .value;

        let score = 0;

        // 1. kérdés ellenőrzése
        if (answer1 && answer1.value === 'A') {
            score += 1;
        }

        // 2. kérdés ellenőrzése
        if (answer2 && answer2.length >= 2) {
            let hasA = false;
            let hasB = false;

            for (let i = 0; i < answer2.length; i++) {
                if (answer2[i].value === 'A') {
                    hasA = true;
                } else if (answer2[i].value === 'B') {
                    hasB = true;
                }
            }

            if (hasA && hasB) {
                score += 1;
            }
        }

        // 3. kérdés ellenőrzése
        if (answer3 === 'let') {
            score += 1;
        }

        // 4. kérdés ellenőrzése
        const keywords = ['var', 'let', 'const', 'function', 'class'];
        let count = 0;

        for (let i = 0; i < keywords.length; i++) {
            const lowercaseKeyword = keywords[i].toLowerCase();
            const lowercaseAnswer = answer4.toLowerCase();
        
            if (lowercaseAnswer.includes(lowercaseKeyword)) {
                count += 1;
                if (count >= 3) {
                    break;
                }
            }
        }

        const isAnswer4Correct = count >= 3;

        if (isAnswer4Correct) {
            score += 1;
        }

        // 5. kérdés ellenőrzése
        if (answer5 === '0' && answer5_2 === '2') {
            score += 1;
        }
        const audio = document.getElementById('Zene');
        

        // Eredmény kiszámítása és megjelenítése
        const percentage = (score / 5) * 100;
        const resultElement = document.getElementById('result');
        result.textContent = `Eredmény: ${percentage}%`;
        if (percentage===100) {
            audio.play();
        }
    } else {
        result.textContent = 'Kérlek tölts ki minden mezőt!';
    }
}
