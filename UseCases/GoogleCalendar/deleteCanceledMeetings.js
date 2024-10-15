function deleteDeclinedMeetings() {
  var calendar = CalendarApp.getDefaultCalendar();
  var now = new Date();
  var futureDate = new Date();
  futureDate.setDate(now.getDate() + 30); // Adjust the number of days as needed

  // Retrieve events in the next 30 days
  var events = calendar.getEvents(now, futureDate);
  console.log(events)

  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    var guests = event.getGuestList();
    var allDeclined = guests.length > 0;

    for (var j = 0; j < guests.length; j++) {
      var guest = guests[j];
      var status = guest.getGuestStatus();

      if (status !== CalendarApp.GuestStatus.NO) {
        allDeclined = false;
        break;
      }
    }

    // Delete the event if all guests have declined
    if (allDeclined) {
      Logger.log('Deleting event: ' + event.getTitle());
      event.deleteEvent();
    }
  }
}
