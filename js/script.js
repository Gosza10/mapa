'use strict';


function titleClickHandler(event) {
  console.log('Link został klikniety!');
  console.log(event);
 
  /* usuniecie klasy acvitve ze wszystkich linkow  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  
  /* dodanie klasy active dla kliknietego elementu */
  event.preventDefault();     //wyłączenia domyślnego zachowania przeglądarki - adres strony nie zmienia sie 
  const clickedElement = this;
  clickedElement.classList.add('active');

  /* usuniecie klasy active ze wszystkich artykułów */
  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* pobranie atrybutu href z kliknietego elementu*/
  const articleSelector = clickedElement.getAttribute('href');

  /* znajduje odpowiedni artykul */
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add('active'); //dodanie klasy active
}

/*zmienne*/
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';


/*funkcja generujaca linki*/
function generateTitleLinks() {

  /*wybiera liste linkow*/
  const titleList = document.querySelector(optTitleListSelector);
  
  /*usuwa wartosci*/
  function clearList() {
    titleList.innerHTML = '';
  }
  clearList();

  /*wybiera wszystkie artykuly*/
  const articles = document.querySelectorAll(optArticleSelector);

  let html = '';

  /*petla po wszystkich artykulach*/
  for (let article of articles) {
    const articleId = article.getAttribute('id'); //pobiera id
    const articleTitle = article.querySelector(optTitleSelector).innerHTML; //znajduje 
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'; // tworzy kod HTML linka
    html = html + linkHTML;
  }
  titleList.innerHTML = html; //wstawia link do kolumny


  /*powiązanie klikniecia w linki z funkcją titleClickHandler*/
  const links = document.querySelectorAll('.titles a');  //zapisanie do zmiennej wszystkich linkow pasujacych do selektora
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}


generateTitleLinks();