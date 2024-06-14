function submitQuestion() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (title.length < 5 || content.length < 20) {
        alert('제목은 최소 5자 이상, 내용은 최소 20자 이상 입력해주세요.');
        return;
    }

    const question = {
        title,
        content,
        timestamp: new Date().toLocaleString()
    };

    // 로컬 스토리지에 질문 저장
    let questions = localStorage.getItem('questions');
    questions = questions ? JSON.parse(questions) : [];
    questions.push(question);
    localStorage.setItem('questions', JSON.stringify(questions));

    // 업로드 중 메시지 표시
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = 'flex';

    // 질문게시판 페이지로 리다이렉트 (딜레이 추가)
    setTimeout(() => {
        window.location.href = 'questions.html';
    }, 2000); // 2초 딜레이
}
