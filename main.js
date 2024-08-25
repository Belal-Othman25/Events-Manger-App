
function setMinDate() {
  const eventDate = document.querySelector(".event-date");
  const today = new Date().toISOString().split("T")[0];
  eventDate.min = today;
  eventDate.addEventListener("input", function () {
    if (eventDate.value < today) {
      eventDate.value = today;
    }
  });
}

setMinDate();

function addEvent() {
  // Get Elements to Create Object
  let eventName = document.querySelector(".event-name").value;
  let eventDate = document.querySelector(".event-date").value;
  let eventOrg = document.querySelector(".organizer").value;
  let timeStamp = new Date(eventDate).getTime();
  console.log(timeStamp)

  if(eventName&&eventDate&&eventOrg&&timeStamp){
    // Create Object
  let event = {
    name: eventName,
    organizer: eventOrg,
    date: eventDate,
    timeStamp: timeStamp,
  };

  // Retrieve and update events array from localStorage
  let events = JSON.parse(localStorage.getItem("events")) || [];

  // Ensure events is an array before pushing
  if (!Array.isArray(events)) {
    events = [];
  }
  events.push(event);
  localStorage.setItem("events", JSON.stringify(events));
  console.log(events);
  document.querySelectorAll("input").forEach((input)=>input.value='')
  displayEvent()
  }else{
    alert("Please Enter The Info")
  }
}
function displayEvent() {
  let events = JSON.parse(localStorage.getItem("events")) || [];
  let eventsList = document.querySelector(".events");
  eventsList.innerHTML = "";
  events.forEach((event,index) => {
    const now = new Date().getTime();
    const timeLeft = event.timeStamp - now;

    // Ensure that the time left is not negative for the day calculation
    const days = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
    const hours = Math.max(0, Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = Math.max(0, Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = Math.max(0, Math.floor((timeLeft % (1000 * 60)) / 1000));

    let countDown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    eventsList.innerHTML += `
    <div class="event">
      <h3>${event.name}</h3>
      <p><span>Organized by:</span> ${event.organizer}</p>
      <p><span>Date: </span>${event.date}</p>
      <p><span>timeLeft </span>${countDown}</p>
      <button onclick="deleteEvent(${index})">Delete</button>
    </div>
    `;
  });
}
displayEvent();
function deleteEvent(index){
  let events = JSON.parse(localStorage.getItem("events"));
  events.splice(index,1)
  localStorage.setItem("events", JSON.stringify(events));
  displayEvent();
}

setInterval(displayEvent,1000)