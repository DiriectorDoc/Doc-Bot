# Doc Bot
![Doc Bot](https://user-images.githubusercontent.com/66105586/90851498-f0788b80-e342-11ea-8eff-e9847e6e45b2.png)
Doc Bot is named after me, Diriector_Doc. Its purpose is to handle a few actions automatically so I don't have to. However, it does offer some fun commands.

## Commands
Here are the commands that Doc Bot offers:

Syntax | Usage
-------|------
[`!about`](#about) | Replies with a list of commands
[`!colour`](#colour) or<br/>`!color` | Changes the colour of the display name of the user who entered the command
[`!commands`](#commands) | Replies with a list of commands
[`!request`](#request) | Sends a request to the admin
[`!speedrun`](#speedruns) or<br/>`!speedruns` | Replies with the Brawlhalla Speedrun leaderboards
[`!wisdom`](#wisdom) | Replies with a quote
[`!yellatme`](#yellatme) | Yells at the user

## !about
Displays things like version number, creator, and linked repository.

### Usage
This command does not accept a parameter. Entering anything following the command, even a [help](#help) argument, does nothing.

## !colour
The user who enters this command will have their display name change color depending upon the string preceding it.

### Usage
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
The following command will change the user's display name color to red:

    !colour red

Additionally, you can list the available colours by entering

    !colour colours

Using this parameter for `!colour` is identical to entering one of the [help](#help) arguments.

## !request
Sends a request to the admin depending on the type of request.

### Usage
The syntax for this command is as follows:

    !request [type] [arguments]

#### [type]
The type of request you would like to make.

Possible types:

* `delete`: Request for deletion of a post
* `censor`: Request for censorship of a post
* `wisdom`: Request a quote be added to [`!wisdom`](#wisdom)

#### [arguments]
The argument after the `delete` or `censor` request should be the link to the discord message in question. To get the link of a discord message, right-click on the message then select the "Copy Message Link" option.

The argument after the `wisdom` request should quote you would like to add to the `!wisdom` command. The quote should be in quotations and the author and the year should follow. If the author or the year is unknown, specify that it is unknown.

### Examples
    !request delete https://discordapp.com/channels/123456789012345678/234567890123456789/345678901234567890
    !request wisdom "Hi there" - John, 2020

## !speedrun
Displays the Brawlhalla speedrun leaderboards. The information displayed was copied directly from [speedrun.com/brawlhalla](https://speedrun.com/brawlhalla).

### Usage
The syntax for this command is as follows:

    !speedrun [category] [ruleset...[ruleset2]]

#### [category]
Possible category parameters:

* `tournament`
* `horde`
* `tutorial%` or `tutorial`

#### [ruleset]
Tournament only:

* `sigs` (default)
* `nosigs`

Horde only<br/>*First ruleset*

* `2p` (default)
* `3p`
* `4p`

*Second ruleset*

* `wave11` (default)
* `wave21`
* `wave26`

### Example

    !speedrun tournament sigs
    !speedrun horde 2p wave21
    !speedrun tutorial%

    !speedrun tournament
    !speedrun horde

>**Note**: If a category only has 1 ruleset, or nad no ruleset at all, the proceeding parameter will be ignored

## !wisdom
Replies with a random quote, most of which were said by Diriector_Doc himself.

### Usage
This command does not accept a parameter. Entering anything following the command, even a [help](#help) argument, does nothing.

## !yellatme
Replies with the "admin-only command" message. This message is randomly generated each time.
>Note: This command works identically to how every admin-only command works. The only difference is that this command appears on the [`!commands`](#commands) list. Consequently, if an admin uses this command, nothing happens.

### Usage
This command does not accept a parameter. Entering anything following the command, even a [help](#help) argument, does nothing.

## Help
If you want to know the syntax, usage, or otherwise of a command, simply type the command followed by one of these strings:

* `help`
* `/?`
* `options`

### Example

    !colour /?

This trick will only work with commands that accept a parameter. Single-word commands will ignore all arguments that follow it and be carried through like always.