# Generating Automatic Deadlines in a Google Calendar

This script can be implemented in Google Sheets (on a button like in the example file). It connects the simple sheet structure with calendars and emails.

It is used to generate deadline structures for recurring tasks or events and helps to preserve knowledge about steps to be taken along the way.

## How to implement

- Generate a Google Sheets Document with the structure seen in the example file "automatic_deadline_generation.ods".
- Bind the "deadline_generation_script.gs" to the button - the calendar ID and the emails to notify need to be replaced by the real values that are suitable for your cause.
- Fill out the spreadsheet in the way described by the example file.
- Run the script by clicking the button (and answering to the security check) and the script will not only create the event with reminder, but also all small deadlines specified in the lower area of the spreadsheet with their own reminders. It will also notify the given emails of the generation that has taken place.

## Why?

This script was written during my tenure as measurements team lead for the IDCN Zurich. We experienced a lot of turnover which is not unusual for a non-profit that aims at getting people employed at companies. The idea is to preserve procedures despite high turnover rates by preserving procedural knowledge in the spreadsheet (one sheet for each recurring task/event/deadline list).
