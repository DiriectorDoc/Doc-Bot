# Doc Bot
![Doc Bot](https://user-images.githubusercontent.com/66105586/90851498-f0788b80-e342-11ea-8eff-e9847e6e45b2.png)
Doc Bot is named after me, Diriector_Doc. Its purpose is to handle a few actions automatically so I don't have to. However, it does offer some fun commands.

## Commands
Here are the commands that Doc Bot offers:

Syntax | Usage
-------|------
[`!about`](#about) | Replies with a list of commands
[`!color [color]`](#color) or<br/>`!colour [colour]` | Changes the colour of the display name of the user who entered the command
[`!commands`](#commands) | Replies with a list of commands
[`!request [type] [link]`](#request) | Sends a request to the admin
[`!speedruns`](#speedruns) | Replies with the Brawlhalla Speedrun leaderboards
[`!yellatme`](#yellatme) | Yells at the user

## !about
Displays things like version number, creater, and linked repository.

### Parameters
This command does not accept a parameter. Entering anything following the command, even a [help](#help) argument, does nothing.

## !color
The user who enters this command will have their display name change color depending upon the string preceding it.

### Parameters
The first argument will be the name of the colour to which the name is being changed. The user can pick between any of the following colours:

* `Red`
* `Orange`
* `Yellow`
* `Green`
* `Blue`
* `Cyan`
* `Purple`
* `Violet` (same as purple)
* `Pink`
* `White`

This parameter is not case sensitive.

### Example
The following command will change the user's display name color to red.

    !colour red

Additionally, you can list the available colours by entering

    !colour colours

...or by entering one of the [help](#help) arguments such as

    !colour /?

### Further behaviour
Entering `!colour` without a parameter will do nothing. Entering `!colour` with a misspelled colour, however, will work the same as if the user had entered `!colour white`.

## !request
Sends a request to the admin depending on the type of request.

### Parameters
The syntax for this command is as follows:

    !request [type] [link]

Since this command takes parameters, a [help](#help) argument can be used in place of the `[type]` parameter to prompt the user with usage information.

#### [type]
The type of request you would like to make.

Possible types:

* `delete`: Request for a deleteion of a post
* `censor`: Request for a censorship of a post

#### [link]
The link to the discord message in question. To get the link of a discord message, right click on the message then select the "Copy Message Link" option.

### Example
    !request delete https://discordapp.com/channels/123456789012345678/234567890123456789/345678901234567890

## !speedruns
Displays the Brawlhalla speedrun leaderboards. Information displayed was coppied directly from [speedrun.com/brawlhalla](https://speedrun.com/brawlhalla).

### Parameters
This command does not accept a parameter. Entering anything following the command, even a [help](#help) argument, does nothing.

## !yellatme
Replies with the "admin-only command" message. This message is randomly generated each time.
>Note: This command works identical to how every admin-only command works. The only difference is that this command appears on the [`!commands`](#commands) list. Consequently, if an admin uses this command, nothing happens.

### Parameters
This command does not accept a parameter. Entering anything following the command, even a [help](#help) argument, does nothing.

## Help
If you want to know the syntax of any command, simply type the command followed by one of these strings:

* `help`
* `/?`
* `options`

### Example

    !colour /?