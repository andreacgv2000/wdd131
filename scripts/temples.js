/* File: scripts/temples.js */
// temples.js - handles hamburger and footer dates
document.addEventListener('DOMContentLoaded', function(){
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('main-nav');


function toggleNav(){
const isOpen = nav.classList.toggle('open');
hamburger.setAttribute('aria-expanded', isOpen);
// change symbol to X when open
hamburger.textContent = isOpen ? '✕' : '☰';
}


hamburger.addEventListener('click', toggleNav);


// Close nav when clicking outside (mobile) or when a link is clicked
document.addEventListener('click', function(e){
if(!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('open')){
nav.classList.remove('open');
hamburger.setAttribute('aria-expanded', 'false');
hamburger.textContent = '☰';
}
});


nav.addEventListener('click', function(e){
if(e.target.tagName.toLowerCase()==='a' && nav.classList.contains('open')){
nav.classList.remove('open');
hamburger.setAttribute('aria-expanded', 'false');
hamburger.textContent = '☰';
}
});


// Footer dates
const yearSpan = document.getElementById('copyright-year');
const lastSpan = document.getElementById('last-modified');
const now = new Date();
yearSpan.textContent = now.getFullYear();
// document.lastModified returns a string; if empty, show current date
lastSpan.textContent = document.lastModified || now.toLocaleString();


});