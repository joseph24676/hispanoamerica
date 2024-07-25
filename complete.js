// script.js
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function() {
        // Remove selected class from all options in the same group
        const group = this.closest('.option-group');
        group.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
        
        // Mark this option as selected
        this.classList.add('selected');
    });
});

function checkAnswers() {
    let correct = true;
    document.querySelectorAll('.text-container').forEach(textContainer => {
        textContainer.querySelectorAll('.blank').forEach(blank => {
            const answer = blank.getAttribute('data-answer');
            const selectedOption = textContainer.querySelector(`.option-group[data-answer="${answer}"] .option.selected`);
            
            if (!selectedOption || selectedOption.textContent.trim().toLowerCase() !== answer) {
                correct = false;
            }
        });
    });

    const feedback = document.getElementById('feedback');
    if (correct) {
        feedback.textContent = '¡Correcto! Has completado todas las palabras.';
        feedback.style.color = 'green';
    } else {
        feedback.textContent = 'Incorrecto. Intenta de nuevo.';
        feedback.style.color = 'red';
    }
}
