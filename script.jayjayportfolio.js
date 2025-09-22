
/* skill logo container */

document.querySelectorAll('.skill-logo-container').forEach(container => {
  const btnInfoPopup = container.querySelector('.btn-info-popup');
  const infoPopupContainer = container.querySelector('.info-popup-container');

  btnInfoPopup.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent triggering document click

    // Close all other popups
    document.querySelectorAll('.info-popup-container.active').forEach(popup => {
      if (popup !== infoPopupContainer) {
        popup.classList.remove('active');
      }
    });

    // Toggle the clicked popup
    infoPopupContainer.classList.toggle('active');
  });
});

// Optional: close all when clicking outside (if desired)
document.addEventListener('click', () => {
  document.querySelectorAll('.info-popup-container.active').forEach(popup => {
    popup.classList.remove('active');
  });
});


/* bouncing letters */

  document.querySelectorAll('.no-bounce').forEach(span => {
    const text = span.textContent;
    span.innerHTML = '';
    text.split('').forEach(char => {
      const letterSpan = document.createElement('span');
      letterSpan.textContent = char;
      span.appendChild(letterSpan);
    });
  });
  
  document.querySelectorAll('.no-bounce span').forEach(letter => {
    letter.addEventListener('click', () => {
      letter.classList.add('bounce');
      setTimeout(() => letter.classList.remove('bounce'), 600);
    });
  });


/* chart */
function getChartTextColor() {
  return getComputedStyle(document.documentElement)
           .getPropertyValue('--chart-text-color').trim();
}
const myChart = document.getElementById('myChart').getContext('2d');

const skillChart = new Chart(myChart, {
  type: 'bar',
  data: {
    labels: ['Calisthenics', 'Mountaineering', 'Travelling'],
    datasets: [{
      label: 'Skill Level',
      data: [10, 7, 6],
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 206, 86, 0.6)',
      ],
      borderColor: '#333',
      borderWidth: 1
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false},

      
    },
    scales: {
      x: {
        beginAtZero: false,
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1,
          autoSkip: false,
          color: getChartTextColor(),
          font: { size: 14, weight: 300},
          callback: val => {
            const labels = {
              0: 'noob',
              5: 'average',
              10: 'ninja'
            };
            return labels[val] || '';
          }
        }
      },
      y: {
        ticks: {
          color: getChartTextColor(),  // ✅ dynamic text color
          font: { size: 14, weight: 300}
        }
      }
    }
  }
});

/* scroll animations */

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});
const scrollElements = document.querySelectorAll(".scroll");
scrollElements.forEach((element) => observer.observe(element));

/* timeLine scroll */




/* darkmode toggle */

const toggle = document.getElementById('darkmode-toggle');

document.documentElement.classList.add('dark');
toggle.checked = true;

const updateChartColor = () => {
  const color = getComputedStyle(document.documentElement)
                 .getPropertyValue('--chart-text-color').trim();
  skillChart.options.scales.x.ticks.color = color;
  skillChart.options.scales.y.ticks.color = color;
  skillChart.update();
};

updateChartColor();

toggle.addEventListener('change', () => {
  document.documentElement.classList.toggle('dark', toggle.checked);
  updateChartColor();
});

/* grid window pup-ups for mobile devices */

const container = document.querySelector('.timeline-events');
const events = container.querySelectorAll('.timeline-event');
let currentId = 0;

document.querySelector('.scroll-up').addEventListener('click', (e) => {
    e.preventDefault(); // prevent page scroll
    if (currentId > 0) currentId--;
    events[currentId].scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
});

document.querySelector('.scroll-down').addEventListener('click', (e) => {
    e.preventDefault(); // prevent page scroll
    if (currentId < events.length - 1) currentId++;
    events[currentId].scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
});

