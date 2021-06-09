let library = [];
let inputNewBook = document.querySelector("#newBook");
inputNewBook.addEventListener("click", e => {
    inputNewBook.disabled = true;
    const form = document.querySelector("#newBookForm")
    form.style.visibility = "visible";
});

const form = document.querySelector("#newBookForm")
const title = document.createElement("p");
title.textContent = "Title";
const author = document.createElement("p");
    author.textContent = "Author"
    const pages = document.createElement("p");
    pages.textContent = "Pages";

    const inputAuthor = document.createElement("input");
    inputAuthor.setAttribute("type", "text");
    inputAuthor.setAttribute("class", "newBookInput")
    inputAuthor.setAttribute("id", "author");

    const inputTitle = document.createElement("input");
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("class", "newBookInput")

    const inputPages = document.createElement("input");
    inputPages.setAttribute("type", "text");
    inputPages.setAttribute("class", "newBookInput")

    const inputIsRead = document.createElement("input");
    inputIsRead.setAttribute("class", "isRead")
    inputIsRead.setAttribute("type", "radio");
    inputIsRead.setAttribute("name", "isRead");
    inputIsRead.setAttribute("value","1"); 
    const read = document.createElement("p");
    read.textContent = "Read";

    const inputIsNotRead = document.createElement("input");
    inputIsNotRead.setAttribute("class", "isRead");
    inputIsNotRead.setAttribute("type", "radio");
    inputIsNotRead.setAttribute("name", "isRead");
    inputIsNotRead.setAttribute("value", "0");
    const notRead = document.createElement("p");
    notRead.textContent = "Not Read";

    

    form.appendChild(author);
    form.appendChild(inputAuthor);
    form.appendChild(title);
    form.appendChild(inputTitle);
    form.appendChild(pages);
    form.appendChild(inputPages);
    form.appendChild(read);
    form.appendChild(inputIsRead);
    form.append(notRead);
    form.appendChild(inputIsNotRead);

form.addEventListener("submit", handleForm);
function handleForm(event){ 
    event.preventDefault(); 
}

function removeAll(){
    const container = document.querySelector("#library");
    const books = document.querySelectorAll(".book");
    const remove = document.querySelectorAll(".remove");
    books.forEach(book => {
        container.removeChild(book);
    });
    remove.forEach(button => {
        container.removeChild(button);
    });
}

function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author; 
    this.pages = pages;
    this.isRead = isRead;
    this.sentenceEnd = (isRead)? "read already" : "not read yet"
}
Book.prototype.info = function(){ 
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.sentenceEnd}`;
}
Book.prototype.toggleIsRead = function(){
    this.isRead = (this.isRead == 0)? 1 : 0;
    this.sentenceEnd = (this.isRead)? "read already" : "not read yet"
}

function displayLibrary(){
    library.forEach((book,index) => {
        let displayCard = document.createElement("div");
        displayCard.style.cssText = `
        height: 200px; 
        width: 200px;
        border-style: solid;
        border-color: black;
        text-align: center;
        margin: 10px;

        `
        displayCard.textContent = `${book.title} by ${book.author}`;
        displayCard.setAttribute("id", `book${index}`);
        displayCard.setAttribute("class", "book");

        const container = document.querySelector("#library");
        container.appendChild(displayCard);
        const remove = document.createElement("button");
        remove.setAttribute("class", "remove");
        remove.addEventListener("click", e => {
            container.removeChild(document.querySelector(`#book${index}`));
            library[index] = null;
            library = library.filter(book => (book != null));
            container.removeChild(e.target);
        });
        remove.textContent = "Remove";
        container.appendChild(remove);
    });
}
function addBookToLibrary(book){
    library.push(book);
}

const submit = document.querySelector("#submitNewBook");    
submit.addEventListener("click", submitForm);
function submitForm(){
    const textInputs = document.querySelectorAll(".newBookInput");
    const radioInput = document.querySelectorAll(".isRead");
    let bookValues = [];
    textInputs.forEach(input => {
        bookValues.push(input.value);
    });
    radioInput.forEach(input => {
        if(input.checked){
        bookValues.push(input.value);
        }
    })
    let bookAdded = new Book(bookValues[1], bookValues[0], Number(bookValues[2]), Number(bookValues[3]));
    addBookToLibrary(bookAdded);
    document.querySelector("#newBookForm").reset();
    document.querySelector("#newBookForm").style.visibility = "hidden";
    document.querySelector("#newBook").disabled = false;
    removeAll();
    displayLibrary();
}

const hobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
const book2 = new Book("Shinegki no Kyojin", "Hajime Isayama", 100 ,true);
const book3 = new Book("Looking for Alaska", "John Green", 100 ,true);
book3.toggleIsRead();


addBookToLibrary(hobbit);
addBookToLibrary(book2);
addBookToLibrary(book3);
displayLibrary();