const section = document.querySelector('.quizz')

// copie stack overflow
const shuffle = (array) => {
  let j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  answers = array
}

let i = 0

fetch('https://opentdb.com/api.php?amount=15&category=14&difficulty=medium&type=multiple')
  .then(response => response.json())
  .then((quizzApi) => {
    console.log(quizzApi)

    for (let element of quizzApi.results) {
      let answers = []
      let correctAnswer = element.correct_answer
      const question = document.createElement('div')
      question.className = 'question'
      question.innerHTML = element.question
      const possibility = document.createElement('div')
      possibility.className = 'possibility'
      answers.push(element.correct_answer)
      for (let elem of element.incorrect_answers) {
        answers.push(elem)
      }

      shuffle(answers);  // shuffle nos réponse de notre array 

      

      let name = element.question // pour que name dans checkboxanswer soit associé à la question, un name par question 
      for (let el of answers) {
        const divGeneral = document.createElement('div')
        divGeneral.className = 'divGeneral'

        const checkboxAnswers = document.createElement('input') // on doit mettre le meme nom a la radio pour qu'il y en ai que un de selctionné
        checkboxAnswers.setAttribute('type', 'radio')
        checkboxAnswers.setAttribute('name', name)

        const checkboxAnswersLabel = document.createElement('label')
        checkboxAnswersLabel.innerHTML = el

        divGeneral.appendChild(checkboxAnswers)
        divGeneral.appendChild(checkboxAnswersLabel)
        possibility.appendChild(divGeneral)
        possibility.appendChild(checkboxAnswers)
        possibility.appendChild(checkboxAnswersLabel)

        let point = true  // utilisation de booleen pour la fonction score

        checkboxAnswers.addEventListener('click', function () {
          let labels = document.querySelectorAll('label')
          for (let e of labels) {
            e.classList.remove('green')
            e.classList.remove('red')
          }
          if (checkboxAnswersLabel.innerHTML == correctAnswer) { // veut le contenu texte car ligne 21 = a une balise html
            checkboxAnswersLabel.classList.add('green')
            const score = document.querySelector('.score')
            if (point == true){
              i += 1
              point = false
              score.innerHTML = 'Score : ' + i
            }
          } else {
            checkboxAnswersLabel.classList.add('red')
          }
        })
      }
      section.appendChild(question)
      section.appendChild(possibility)

    }

  })
  .catch(error => {
    console.log('There was an error!', error)
  })

const minuteur = document.querySelector('.minuteur')
const timer = document.querySelector('.timer');
minuteur.appendChild(timer)


let sec = 150;

let interval = setInterval(function () {
  sec--;
  let min = Math.floor(sec / 60) // 3min mais reste 45sec
  timer.innerHTML = min + ' min ' + (sec - (min * 60)) + ' sec' // on retire le nombre de min(3) de mes secondes
  if (sec == 10) {
    timer.classList.add('redText')
  }
  if(sec == 0){
    clearInterval(interval)
    // setTimeout(function () { //effectue une action
      alert('LOOSER --> TRY AGAIN :) ')
      window.location = ''
  
    // }, 1000);
  }

}, 1000);