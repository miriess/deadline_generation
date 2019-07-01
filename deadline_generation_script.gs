function CreateTimeline (){
  // Opening the active sheet of the active spreadsheet. This is okay because you click the button on the sheet you need.
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();

  // Opening the default Calendar. This can be changed to handle multiple calendars or whatever we like.
  var cal = CalendarApp.getCalendarById('<your_calendar_URL_here>');

  // Getting the email address of the user starting the script.
  var creator = Session.getActiveUser().getEmail();

  // Security Check: Giving the User the chance to review his input before creating the Event and Deadlines.
  var sure = Browser.msgBox("Is this what you want?",
                            "You are about to create an event of type \"" +
                            sheet.getName() + "\" with the title \"" +
                            sheet.getRange("B1").getValue() + "\" on " +
                            Utilities.formatDate(new Date(sheet.getRange("B2").getValue()), "CET", "EEE, MMM d, yyyy") +
                            " and the corresponding deadlines. Is that correct?"
                            , Browser.Buttons.YES_NO);

  // Processing the security check: Only running the generation of events if answer was "yes".

  if (sure == "yes") {

  // Actual Work... Creating the event and the Deadlines with the data in the active sheet.

  // Create the event itself.
  var mainevent = cal.createAllDayEvent(sheet.getRange(row = 1, column = 2).getValue(),
                                        new Date(sheet.getRange(row = 2, column = 2).getValue()),
                                       {description: sheet.getRange(row = 3, column = 2).getValue(),
                                        guests: sheet.getRange(row = 4, column = 2).getValue()});
  mainevent.addEmailReminder(sheet.getRange(row = 5, column = 2).getValue() * 1440);

  // Length is for making timelines of multiple sizes possible. The program creates an event for each row after the first two in the active sheet.
  var length = sheet.getLastRow();

  // Big loop for creating the actual events from each row of the spreadsheet. Important: The sheet may not contain stuff below the table of deadlines.
  for (var R = 10; R <= length; R++) {
    var deadline = cal.createAllDayEvent(sheet.getRange(row = R, column = 1).getValue(),
                                         new Date(sheet.getRange(row = R, column = 3).getValue()),
                                         {description: sheet.getRange(row = R, column = 4).getValue() +
                                          " -- connected to the event of type \"" +
                                          sheet.getName() +
                                          "\" with the title \"" +
                                          sheet.getRange("B1").getValue() + "\" on " +
                                          Utilities.formatDate(new Date(sheet.getRange("B2").getValue()), "CET", "EEE, MMM d, yyyy"),
                                          guests: sheet.getRange(row = R, column = 5).getValue()});
    deadline.addEmailReminder(sheet.getRange(row = R, column = 6).getValue() * 1440);


  //Notification Email to the person(s) in charge
  GmailApp.sendEmail("<comma-seperated list of email addresses to notify>",
                     "Automated Reminder: Event of type \"" +
                     sheet.getName() +
                     "\" created",
                     "An Event of type \"" +
                     sheet.getName() +
                     "\" with the title \"" +
                     sheet.getRange("B1").getValue() + "\" on " +
                     Utilities.formatDate(new Date(sheet.getRange("B2").getValue()), "CET", "EEE, MMM d, yyyy") +
                     " has been created by the User with the email address " +
                     creator +
                     ".")

  } else {};
}
