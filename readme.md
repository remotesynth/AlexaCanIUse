## An Alexa Skill for Can I Use

This project aims to provide an Alexa skill that gathers browser support for the current browser versions from data in [Can I Use](http://caniuse.com).

Currently, if you have  it works when you have set up AWS and your Amazon Developer account and uploaded the [archive here](https://github.com/remotesynth/AlexaCanIUse/blob/master/src/Archive.zip) (follow the instructions [here](https://developer.amazon.com/public/community/post/Tx3DVGG0K0TPUGQ/New-Alexa-Skills-Kit-Template:-Step-by-Step-Guide-to-Build-a-Fact-Skill) if you haven't set up your accounts yet).

A more detailed walk through and article coming soon. This is still a work in progress, some utterances will work, others don't due to some of the known issues I list below.

_Please note that this Alexa skill is not yet published on Amazon_

Known issues:

* Currently, Alexa only responds to exact matches, so "video" won't work, but "video element" will. This makes this far less useful and should be fixed.
* Some of the utterances have special characters. It appears these don't work, I need to remove them.
* In test, Alexa responds to simple the "Can I use" command, but on the Echo (i.e. when actually speaking), it seems to often require "Alexa, ask can I use"