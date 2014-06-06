2014-06-05 Update - cuesbey still works, is still useful, but it's not being used enough to justify the hosting/bandwidth expense. This project will continue to be open source, feel free to contact me on twitter @cuesbey if this was something you missed.

Hello everyone,

I'm a full-time software developer who's been working on a cube-related software development projet for awhile now. This has both been to keep my skills up, and because I think the cube community has a number of "user stories" that I don't think are currently being addressed by the tools we have available.

The first user story I'm taking on is:

"As a cube designer who's interested in finding new cards, I often want to compare my list to other lists I've seen out in the community, and I'm interested in where they are different. These differences may lead me to new cards I hadn't even thought of that I'd be able to check out."

I remember when I first built my list, I was going off of:

* Andy Cooperfauss's google doc
* Justin Parnell's OTHER google doc
* Matt Kranstuber's MTGS post
* Usman Jamil's _pictures of his cards laid out on his tablecloth_

And as I'm sure you can appreciate, this made it pretty difficult to get a sense of what people were doing differently (let alone get at the 'why' of those differences). In the absolute best case, you're flipping between two tabs with lists of card names, and maybe you can see some differences.

Well, maybe the difference is because that guy counts Porcelain Legionnaire as a white card, and that guy counts it as a colorless. Maybe someone groups all the spells in a color together, but that person splits creatures and non creatures apart in listing.

Even setting that aside, it's difficult to actually derive meaning from two lists of names side by side, so in software development, the concept of diff tools and particularly, graphical diff tools are useful for this purpose.

Here's a mockup showing what it might look like to compare the first MTGO cube to the Post-AVR update (black had the most changes and was discussed [here](http://www.starcitygames.com/magic/cube/24629-Cube-Holistic-Wisdom-Magic-Online-Cube-AVR-Update.html)). The information that was around at that time did make it easy to show "these were 10 black cards that left, and these were 10 that entered" but that does lose a bit of the nuance when you consider that not all those cards were costed the same or were the same general type:

![current diff mockup](https://github.com/rdennis463/cuesbey/raw/master/cuesbey_main/cuesbey_mockups/cube_diff/cube_diff_list.png)

I want to be able to compare someone else's cube to mine, and do so in the way that I like to lay things out. Now, the way that I lay mine out is different than all of yours, so essentially, we're talking about sorting a cube based on completely configurable parameters, which is kind of a tough task, and although not present in the mockup, I do have all the dials and switches that the system supports up on the deployed version.

So here, check this out:
http://cuesbey.com

This will load the latest deployed version of the cube diff app, and it comes loaded with the before and after card names from that mockup (e.g. the diff of the first two MTGO cubes) but they're just text areas. Enter your own cube! Someone else's cube! I don't care :)

That part's relatively easy, but the part I really need to get right are the controls I want to give designers to control how those two lists are conveyed to you (in they exact way you want):

The layout is controlled by that funky text box in the top right (I'm calling it a spec) and it's not really user friendly right now, but if you edit it, it is respected and shows that I'm sorting on the fly. Ideally, there'd be ways to edit this in a more friendly way, and probably saving off the way that you personally like to arrange things

The particulars of the sorting are also controlled by the (ugly and waaaay too wasteful of space) checkboxes that allow you to set a number of "heuristics" based on how you lay out a cube. Not all the names are that helpful right now, but check "off color flashback is gold" if you think of Lingering Souls as a W/B card, and "phyrexian always pays life except for abilities" if you think of porcelain legionnaire as a colorless 2-drop but Birthing Pod as a Green 3-drop. There's obviously a lot more there.

The whole thing is opened-source and although I've spent a lot of time on it, and it's good enough to answer the core user story (graphically compare cubes the way you want), it's rough and needs to be improved.

Please put requests and bug reports to the github issues page:
https://github.com/rdennis463/cuesbey/issues

This thread would be a great place to ask questions and for me to report back on when certain restrictions are fixed and deployed (I've been pushing hard this week for release by DGM preview season, but I'll need to dial it back to keep family stuff in perspective/priority).

Current caveats and known issues (e.g. things should improve here):

1. the text boxes both want a correctly-spelled card name per line. Duplicates should be on separate lines instead of something like (2x Day of Judgement)
1.     I haven't really done a lot with multicolor yet, so the spec treats color names (e.g. 'White') as "Mono" color
1.     everything looks ugly and the spacing/real-estate usage is so wasteful the site isn't really usable
1.     the spec needs a different editing widget that's actually easy to get the result you want
1.     the layout of >2 tables on a tab isn't going to be great and isn't going to scale well
1.     If you type in card names the backend hasn't seen before (e.g. all pauper cube cards :o) it takes about a second per card for that to come back to your browser, although as they start coming in, the page should be updating incrementally
1.     Invalid names are reflected back to the user in a very ugly/unhelpful way
1.     Limitation of the system: all the card info is being pulled from http://gatherer.wizards.com (using [this](https://github.com/davidchambers/tutor) sweet project) and there have been cases where gather is wrong, or not working, or updates and breaks APIs sooooo yeah be prepared. It's cached after we get it the first time though so we're not hammering their server or at risk unless we're fetching stuff for the first time.
