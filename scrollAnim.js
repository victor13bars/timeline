const line = document.querySelector('.timeline-innerline')
let i = 0
let i2 = 1
let target1 = document.querySelector('.timeline ul')
let target2 = document.querySelectorAll('.timeline ul li')

const timeline_events = document.querySelectorAll('ul li')

function showTime(e) {
	e.setAttribute('done', 'true')
	e.querySelector('.date').style.color = 'red'
	e.querySelector('.timeline-point').style.background = 'red'
	e.querySelector('.arrow').style.filter = 'brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(179%) hue-rotate(166deg) brightness(110%) contrast(101%)'
	// e.querySelector('p').style.opacity = '100%'
	e.querySelector('.cat-image').style.transform = 'translateY(-50px)'
	e.querySelector('.text').style.transform = 'translateY(-50px)'
}

function hideTime(e) {
	e.removeAttribute('done')
	e.querySelector('.date').style.color = 'black'
	e.querySelector('.timeline-point').style.background = 'grey'
	e.querySelector('.arrow').style.fill = 'green'
	// e.querySelector('p').style.opacity = '0%'
	e.querySelector('.cat-image').style.transform = 'translateY(0px)'
	e.querySelector('.text').style.transform = 'translateY(0px)'
}

function slowLoop() {
	setTimeout(function () {
		showTime(timeline_events[i])
		timelineProgress(i + 1)
		i++
		if (i < timeline_events.length) {
			slowLoop()
		}
	}, 3800)
}


function timelineProgress(value) {
	let progress = `${(value / timeline_events.length) * 100}%`
	
	line.style.height = progress
	line.style.width = '4px'
	
}

let observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.intersectionRatio > 0.9) {
				
				showTime(entry.target)
				timelineProgress(i2)
				i2++
				
				observer.unobserve(entry.target)
			}
		})
	},
	{threshold: 1, rootMargin: '0px 0px -70px 0px'}
)


target2.forEach((t) => {
	observer.observe(t)
})


timeline_events.forEach((li, index) => {
	li.addEventListener('click', () => {
		if (li.getAttribute('done')) {
			timelineProgress(index)
			
			timeline_events.forEach((ev, idx) => {
				if (idx >= index) {
					hideTime(ev)
				}
			})
		} else {
			timelineProgress(index + 1)
			
			timeline_events.forEach((ev, idx) => {
				if (idx <= index) {
					showTime(ev)
				}
			})
		}
	})
})

var doit
window.addEventListener('resize', () => {
	clearTimeout(doit)
	doit = setTimeout(resizeEnd, 1200)
})

function resizeEnd() {
	i = 0
	slowLoop()
}

