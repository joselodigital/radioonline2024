document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const commentName = document.getElementById('commentName').value;
    const commentText = document.getElementById('commentText').value;

    if (commentName.trim() !== "" && commentText.trim() !== "") {
        fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: commentName, comment: commentText }),
        })
        .then(response => response.json())
        .then(comment => {
            addCommentToDOM(comment);
            document.getElementById('commentName').value = ""; // Limpiar el campo de nombre
            document.getElementById('commentText').value = ""; // Limpiar el textarea después de enviar
        })
        .catch(error => console.error('Error:', error));
    }
});

function addCommentToDOM(comment) {
    const commentContainer = document.createElement('div');
    commentContainer.className = 'comment';

    const commentName = document.createElement('strong');
    commentName.textContent = comment.name;

    const commentText = document.createElement('p');
    commentText.textContent = comment.comment;

    commentContainer.appendChild(commentName);
    commentContainer.appendChild(commentText);

    document.getElementById('commentsContainer').appendChild(commentContainer);
}

// Obtener comentarios al cargar la página
fetch('http://localhost:3000/comments')
    .then(response => response.json())
    .then(comments => {
        comments.forEach(comment => addCommentToDOM(comment));
    })
    .catch(error => console.error('Error:', error));
