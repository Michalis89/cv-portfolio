var typed = new Typed('.typing', {
  strings: ["Front End Engineer", "Web Developer"],
  typeSpeed: 80,
  backSpeed: 60,
  smartBackspace: true,
  backDelay: 800,
  loop: true
});



const nav = document.querySelector('.nav'),
  navList = nav.querySelectorAll('li'),
  totalNavList = navList.length,
  allSection = document.querySelectorAll('.section'),
  totalSection = allSection.length;

removeBackSection()
for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector('a');
  a.addEventListener('click', function () {

    for (let j = 0; j < totalNavList; j++) {
      if (navList[j].querySelector('a').classList.contains('active')) {
        addBackSection(j);
      }
      navList[j].querySelector('a').classList.remove('active');
    }
    this.classList.add('active');
    showSection(this);
    if (window.innerWidth < 1200) {
      asideSectionTogglerBtn();
    }
  })
}

function removeBackSection() {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove('back-section');
  }
}

function addBackSection(num) {
  allSection[num].classList.add('back-section');
}

function showSection(element) {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove('active');
  }
  const target = element.getAttribute('href').split('#')[1];
  document.querySelector('#' + target).classList.add('active');
}

function updateNav(element) {
  for (let i = 0; i < totalNavList; i++) {
    navList[i].querySelector('a').classList.remove('active');
    const target = element.getAttribute('href').split('#')[1];
    if (target === navList[i].querySelector('a').getAttribute('href').split('#')[1]) {
      navList[i].querySelector('a').classList.add('active');
    }
  }
}

document.querySelector('.watch-my-cv').addEventListener('click', function () {
  showSection(this);
  updateNav(this);
  removeBackSection();
  addBackSection(1);
})

const navTogglerBtn = document.querySelector('.nav-toggler'),
  aside = document.querySelector('.aside');
navTogglerBtn.addEventListener('click', () => {
  asideSectionTogglerBtn();
})

function asideSectionTogglerBtn() {
  aside.classList.toggle('open');
  navTogglerBtn.classList.toggle('open');
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.toggle('open');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var filterButtons = document.querySelectorAll('.filter-button');
  var portfolioItems = document.querySelectorAll('.portfolio-item');
  var filteredPortfolioContainer = document.getElementById('filteredPortfolio');
  var noProjectsMessage = document.getElementById('noProjectsMessage');

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var filter = this.getAttribute('data-filter');
      var technology = this.textContent.trim();
      filteredPortfolioContainer.innerHTML = '';

      var hiddenRows = new Set();
      var hasFilteredItems = false;
      portfolioItems.forEach(function (item) {
        var tagIcon = item.querySelector('.tag i');
        if (filter === 'all' || (tagIcon && tagIcon.classList.contains('fa-' + filter))) {
          var clonedItem = item.cloneNode(true);
          filteredPortfolioContainer.appendChild(clonedItem);
          hasFilteredItems = true;
        } else {
          var row = item.closest('.row');
          hiddenRows.add(row);
        }
      });

      groupItemsIntoRows(filteredPortfolioContainer);
      hiddenRows.forEach(function (row) {
        row.classList.add('hidden');
      });

      if (hasFilteredItems) {
        noProjectsMessage.classList.add('hidden');
      } else {
        noProjectsMessage.textContent = `There are no projects with ${technology} at the moment.`;
        noProjectsMessage.classList.remove('hidden');
      }
    });
  });
});


function groupItemsIntoRows(container) {
  var portfolioItems = container.querySelectorAll('.portfolio-item');
  var rows = [];

  portfolioItems.forEach(function (item, index) {
    if (index % 3 === 0) {
      // Create a new row after every third item
      var newRow = document.createElement('div');
      newRow.classList.add('row');
      container.appendChild(newRow);
      rows.push(newRow);
    }

    rows[rows.length - 1].appendChild(item);
  });
}
