# Simple Messaging Web Application

This is a basic messaging web application designed for simplicity, enabling users to send messages without registration or authentication. The application resembles an email interface, providing an intuitive experience for sending and viewing messages.

Features:
* No registration or login required: users simply enter their name when accessing the app. No passwords or user accounts needed.
* Send a message form:
  * Recipient: autocomplete-enabled field for easy selection of recipients. As the user types, a dropdown appears with matching names, using a pre-built autocomplete component.
  * Title: single-line text field for the message title.
  * Message body: multi-line text field (textarea) for the main message content.
* View received messages:
  * messages sent to the current user display under the "Send a Message" form.
  * all messages are stored in the database permanently, so users with the same name will see all messages associated with that name.
* Auto-update:
  * the application can auto-refresh every 5 seconds to show new messages.
* Send to any user: messages can be sent to any name, including names that haven’t accessed the application before or even the current user.
