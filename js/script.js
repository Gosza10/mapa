
'use strict';

function titleClickHandler(event){
  console.log('Link was clicked!');
  console.log(event);


  /* remove class 'active' from all article links */

  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  event.preventDefault();
  const clickedElement = this;

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log('hrefArticle', articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle', targetArticle);

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');
  console.log('newTarget', targetArticle);
}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  //optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';
  //optAuthorsListSelector = '.authors.list';


function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  
  const titleList = document.querySelector(optTitleListSelector);
  console.log('titleList', titleList);

  function clearList(){
    titleList.innerHTML = '';
  }

  clearList();
  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('1article', articles);


  let html = '';

  for(let article of articles){
  
    /* get the article id */
    
    const articleId = article.getAttribute('id');
    console.log('id', articleId);
  
    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log('articleTitle', articleTitle);
  
    /* get the title from the title element */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('link', linkHTML);

    /* insert link into titleList */
    
    html = html + linkHTML;
    console.log('htmlLink', html);

  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log('links', links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}


generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 9999999
  };

  for (const tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber  = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
} 
/*TAGS*/
function generateTags(){
  /*[NEW] create a new variable allTags with an empty object*/
  
  let allTags = {};

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log('2article', articles);

  /* START LOOP: for every article: */

  for(let article of articles){
 
    /* find tags wrapper */
 
    const tagList = article.querySelector(optArticleTagsSelector);
    console.log('tagList', tagList);
 
    /* make html variable with empty string */

    let html = '';
    
    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log('articletag', articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray', articleTagsArray);
    
    /* START LOOP: for each tag */

    for (let tag of articleTagsArray){
      console.log('tag1', tag);

      /* generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      console.log('tag2', tagHTML);

      /* add generated code to html variable */

      html += tagHTML;
      console.log('htmltag', html);

      /*[NEW] check if this link is NOT already in allTags*/

      if(!allTags.hasOwnProperty[tag]){

        /*[NEW] add tag  to allTAgs obect*/

        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /*insert HTML of all the links into the tags wrapper */
    
    tagList.innerHTML = html;
    console.log('!! html', tagList.innerHTML);

  /* END LOOP: for every article: */
  }

  /*[NEW] find list od tags in right column*/
  
  const tagList = document.querySelector('.tags');

  /*[NEW] create variable for all links HTML code*/
  
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams', tagsParams);

  let allTagsHTML = '';
  
  /*[NEW] START LOOP: for each tag in allTags:*/

  for(let tag in allTags){
    /*[NEW] generate code od a link and add it to allTagsHTML*/
    
    let tagLinkHTML = '<li><a href="#tag-' + tag  + '" class="' + calculateTagClass(allTags[tag],tagsParams) + '"><span>' + tag + '</span></a></li>';

    //`<li><a href="#tag-' + tag + '" class="${calculateTagClass(allTags[tag],tagsParams)}">${tag}</a></li>`;
    console.log('tagLinkHTML', tagLinkHTML);
    //allTagsHTML += '<li><a href="#tag-' + tag + '"><span>' + tag +' (' + allTags[tag] + ') </span></a></li>';
    allTagsHTML +=tagLinkHTML;
    console.log('allTagsHTML', allTagsHTML);
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add html from allTagsHTML to tagList*/
  
  tagList.innerHTML = allTagsHTML;

}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('hrefTag', href);
  
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('!tag', tag);

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('.post-tags .active');

  console.log('activeTags',activeTags);
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const activeTagsHref = document.querySelectorAll('a[href^="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let foundTag of activeTagsHref){
    /* add class active */
    foundTag.classList.add('active');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}




function addClickListenersToTags(){
  /* find all links to tag */
  const linksTags = document.querySelectorAll('a[href^="#tag-"]');
  console.log('links', linksTags);
  /* START LOOP: for each link */
  for (let link of linksTags){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  }
}

/* END LOOP: for each link */

addClickListenersToTags();



/*AUTHORS*/

function generateAuthors(){
  
  
  /* find all articles */
  
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('article', articles);

  /* START LOOP: for every article: */
  let allAuthors = [];
  
  for (let article of articles){
    

    
    const authorsList = article.querySelector(optArticleAuthorSelector);
    console.log('authorList', authorsList);

    const articleAuthor = article.getAttribute('data-author');
    console.log('author', articleAuthor);
    
    const authorHTML = '<li><a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>';
    console.log('authorHTML', authorHTML);
    //const authorHTMLData = {id: articleAuthor, title: articleAuthor};
    //const authorHTML = templates.authorLink(authorHTMLData);

    if(allAuthors.indexOf(authorHTML) == -1){
      /* [NEW] add generated code to allTags array */
      allAuthors.push(authorHTML);
    }
 
    authorsList.innerHTML = authorHTML;
    console.log('autorList', authorsList); 

    
    //let allAuthorsHTML = '';

    //for(let author in allAuthors){
    //allAuthorsHTML += author + ' (' + allAuthors[author] + ') ';

    // }
  }
  const authorsLists = document.querySelector('.authors');

  authorsLists.innerHTML = allAuthors.join(' ');
}

generateAuthors();


function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('hrefAuthor', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('.post-author .active');
  /* START LOOP: for each active author link */
  for (let activeAuthor of activeAuthors) {
    /* remove class active */
    activeAuthor.classList.remove('active');
  /* END LOOP: for each active author link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const activeAuthorsHref = document.querySelectorAll('a[href^="' + author + '"]');
  /* START LOOP: for each found author link */
  for(let foundAuthor of activeAuthorsHref){
    /* add class active */
    foundAuthor.classList.add('active');

  /* END LOOP: for each found author link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}



function addClickListenersToAuthors(){
  /* find all links to author */
  const linksAuthors = document.querySelectorAll('a[href^="#author-"]');
  console.log('linksAuthor', linksAuthors);
  /* START LOOP: for each link */
  for (let link of linksAuthors){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
  }
}

/* END LOOP: for each link */

addClickListenersToAuthors();