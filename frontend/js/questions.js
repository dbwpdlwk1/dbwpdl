document.addEventListener('DOMContentLoaded', function() {
    const questionsList = document.querySelector('.questions-list');
    const pagination = document.querySelector('.pagination');
    const questionsPerPage = 4;
    let currentPage = 1;

    let questions = localStorage.getItem('questions');
    questions = questions ? JSON.parse(questions) : [];

    function renderQuestions(page) {
        questionsList.innerHTML = '';
        const start = (page - 1) * questionsPerPage;
        const end = start + questionsPerPage;
        const paginatedQuestions = questions.slice(start, end);

        paginatedQuestions.forEach((question, index) => {
            const questionItem = document.createElement('div');
            questionItem.classList.add('question-item');
            questionItem.innerHTML = `
                <h2>${question.title}</h2>
                <p>${question.content}</p>
                <div class="question-meta">Posted on: ${question.timestamp}</div>
                <button class="delete-button" data-index="${start + index}">삭제</button>
            `;
            questionsList.appendChild(questionItem);
        });

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                deleteQuestion(index);
            });
        });
    }

    function deleteQuestion(index) {
        questions.splice(index, 1);
        localStorage.setItem('questions', JSON.stringify(questions));
        renderQuestions(currentPage);
        renderPagination();
    }

    function renderPagination() {
        pagination.innerHTML = '';
        const pageCount = Math.ceil(questions.length / questionsPerPage);

        for (let i = 1; i <= pageCount; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.toggle('active', i === currentPage);
            pageButton.addEventListener('click', function() {
                currentPage = i;
                renderQuestions(currentPage);
                renderPagination();
            });
            pagination.appendChild(pageButton);
        }
    }

    renderQuestions(currentPage);
    renderPagination();
});
