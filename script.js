const synth = window.speechSynthesis;
//получение кнопки и текстового поля из документа
let likeButton = document.querySelector(".button-like");
let likeCount = likeButton.querySelector(".button-like span");

// получение миниатюр фотографий из документа, именно здесь чтобы использовать для записи в карту
let miniatures = document.querySelectorAll('.preview')

let count = 0;
let currentId = miniatures[0]?.id
let likes = new Map();
for (let i = 0; i < miniatures.length; i++) {
    likes.set(miniatures[i].id, count)
}
console.log(likes)

likeButton.addEventListener('click', function () {
    count++;
    likeCount.textContent = count;
    likes.set(currentId, count)
    //озвучка лайка
    let sayThanks = commentTemplateContent.querySelector('.thanks')
    let speaker = new SpeechSynthesisUtterance(sayThanks.value);
    speaker.lang = "ru-RU";
    synth.speak(speaker);

});
// получение основного фото из документа

let mainPhoto = document.querySelector('.main-photo')
mainPhoto.src = document.querySelector('#firstPhoto').src
// функция переключения фотографий
function photoSwitch(miniature) {
    miniature.addEventListener('click', function () {
        mainPhoto.src = miniature.src;
        currentId = miniature.id;
        count = likes.get(currentId);
        likeCount.textContent = count;
    })

};
for (let i = 0; i < miniatures.length; i++) {
    photoSwitch(miniatures[i]);

}



// получение кнопок, полей ввода,поля с датой, шаблона
let commentTemplateContent = document.querySelector('#comment-template').content;
let commentTemplate = commentTemplateContent.querySelector('.comment');
let inputComment = document.querySelector('.input-comm');
let sendButton = document.querySelector('.send-button');
let commentForm = document.querySelector('.row');

// добавления нового комментария 

function addNewComment() {
    let newComment = commentTemplate.cloneNode(true);
    let textNewComment = newComment.querySelector('p');
    if (inputComment.value === '') {
        alert('Введите комментарий');
        return;
    }
    textNewComment.textContent = inputComment.value;
    //получение времени
    let date = newComment.querySelector('span');
    date.textContent = new Date().toLocaleString('ru-RU');
    commentForm.appendChild(newComment);
    inputComment.value = '';

    //озвучка комментария

    let speaker = new SpeechSynthesisUtterance(textNewComment.textContent);
    speaker.lang = "ru-RU";
    synth.speak(speaker);



    // реакция на комментарий
    let reactions = newComment.querySelectorAll('.dropdown-item')
    let currentReaction = newComment.querySelector('.cur-react')
    function reactionSwitch(reaction) {
        reaction.addEventListener('click', function () {
            currentReaction.textContent = reaction.textContent;
        })
    }
    for (let i = 0; i < reactions.length; i++) {
        reactionSwitch(reactions[i]);

    }

}
sendButton.addEventListener('click', addNewComment);
document.addEventListener('keydown', function (evt) {
    if (evt.code === "Enter") {
        addNewComment();
    }

});


