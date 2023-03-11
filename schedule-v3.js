import { data } from './test-html.js'

document.addEventListener('DOMContentLoaded', () => {
  const fetchSchedulePage = () => {
    const schedulePageData = document.createElement('div')
    schedulePageData.innerHTML = data
    // Массив, в который получим готовые события
    const events = []
    let eventTeacher = ''
    let eventTeacherLink = ''

    const defaultEventsRows = schedulePageData.querySelectorAll('.state-')

    defaultEventsRows.forEach((row) => {
      const eventName = row.querySelector('a i').innerText.trim()
      const eventLink = row.querySelector('td:nth-child(2) a').href
      const eventTraining = row
        .querySelector('a')
        .childNodes[0].data.trim()
        .split('.')[0]
        .trim()
      const eventModule = row
        .querySelector('a')
        .childNodes[0].data.trim()
        .split('.')[1]
        .replace(':', '')
        .trim()
      if (row.querySelector('td:nth-child(3) a span.text')) {
        eventTeacher = row.querySelector(
          'td:nth-child(3) a span.text'
        ).innerText
      }
      if (row.querySelector('td:nth-child(3) a')) {
        eventTeacherLink = row.querySelector('td:nth-child(3) a').href
      }

      const eventFullDateAndTime = row
        .querySelector('.lesson-state')
        .innerText.trim()
      const eventFullDate = eventFullDateAndTime.split(' ').slice(0, 3)
      let eventFullTime
      let fullDate
      let fullDateAndDay

      if (eventFullDate.length == 2) {
        eventFullTime = String(eventFullDateAndTime.split(' ').slice(1, 2))
        fullDate = eventFullDate[0]
        fullDateAndDay = eventFullDate[0]
      } else {
        eventFullTime = String(eventFullDateAndTime.split(' ').slice(3, 4))
        fullDate = eventFullDate[1] + ' ' + eventFullDate[2]
        fullDateAndDay =
          eventFullDate[0] + ', ' + eventFullDate.slice(1, 3).join(' ')
      }

      const eventItem = {
        fullDateAndDay,
        fullDate,
        eventsList: [{ eventName, eventLink, eventFullTime }],
        eventTraining,
        eventModule,
        eventTeacher,
        eventTeacherLink,
      }
      if (events.find((el) => el.fullDate == fullDate)) {
        const dateExist = events.find((el) => el.fullDate == fullDate)
        dateExist.eventsList.push({ eventName, eventLink, eventFullTime })
      } else {
        events.push(eventItem)
      }
    })
    // Писать код по работе с DOM ниже этой строки

    const scheduleColumn = document.querySelector('.schedule-column')
    console.log(events)
    if (events.length) {
      events.forEach((eventElement) => {
        const scheduleDate = document.createElement('div')
        scheduleDate.classList.add('schedule-date')
        const scheduleDateDay = document.createElement('div')
        scheduleDateDay.classList.add('schedule-date-day')

        scheduleColumn.appendChild(scheduleDate)
        scheduleDate.appendChild(scheduleDateDay)
        scheduleDateDay.innerText = eventElement.fullDateAndDay
        const eventsArray = Array.from(eventElement.eventsList)
        eventsArray.forEach((eventListElement) => {
          const scheduleItem = document.createElement('div')
          scheduleItem.classList.add('schedule-item')
          scheduleItem.innerHTML = `
              <div class="schedule-item-event">
              <span class="schedule-event-time">${eventListElement.eventFullTime}</span> -
              <span class="schedule-event-body"
                >${eventListElement.eventName}</span
              >
            </div>
              `
          scheduleDate.appendChild(scheduleItem)
        })
      })
    } else {
      const noEvents = document.createElement('div')
      noEvents.classList.add('no-events-text')
      noEvents.innerText = 'Нет ближайших событий'
      scheduleColumn.appendChild(noEvents)
    }
    // Писать код по работе с DOM выше этой строки
  }
  fetchSchedulePage()
})
