# Hooks and sound

Measured from a professional 45 s kinetic promo: the hook took 10.4 s (23% of the video) and used seven techniques before the explanation began. Videos built without that structure felt like "only part of it" to viewers. Every video from this skill gets a real hook, and a music bed whenever the user has a track they may use.

## Hook budget

- Length: 15 to 25% of the video (6 to 10 s of a 30 to 45 s piece). The explanation starts only after the hook has paid off.
- Density: about one visual event every 0.7 s, with one deliberate slow, dark gap (0.6 to 1 s) right before the payoff.

## The seven hook techniques (pick at least four; invent your own execution)

1. **Identity + shock in under 0.7 s.** Two hard cuts: who or what this is about, then one charged word, huge, full screen. Sound hit on the second cut.
2. **Make the headline literal.** Whatever the claim says happens, physically, on screen (if "X replaces Y", show X doing Y's job to an object labelled Y).
3. **Defuse the skeptic.** Say the objection before the viewer thinks it ("you've heard this before", "sounds too good"), and show the cliché as noise (a pile of posts, a counter, a chorus of headlines).
4. **Pattern interrupt.** Drain the colour, drop to black, shrink the text, slow the voice. The contrast is what makes the next beat land.
5. **Two-step payoff.** Reveal, then confirm half a second later (light + stamp, number + check, door opens + light floods). Two hits beat one.
6. **Meta proof.** Point at the video itself ("what you're watching right now…") and reveal how it was made (pull back to the tool, the code, the document). The video becomes the evidence.
7. **Show, don't list.** When the script lists things, each item demonstrates itself as it is named (a caption types itself, a curve draws, a bar grows, a transition fires).

Write the hook as its own mini-script first: line, picture, technique number, sound. Check it against the Originality rules in SKILL.md: a reference's wording and signature images stay out.

## Sound design

The reference never goes silent: a continuous music bed sits under the voice (quietest moments around -28 dB, not true silence), tempo about 112 BPM, and a third of the energy is percussive hits and whooshes that land exactly on visual events.

- **Music bed:** one track from start to end, ducked under the voice (voice peaks about -3 dB, music around -20 to -24 dB under speech, up to -14 dB in gaps). Pick a tempo of 100 to 125 BPM and place hard cuts on beats where the voice allows.
- **Hits and whooshes:** one sound effect per major visual event: shock-word cut, stamp or slam, pull-back reveal, full-screen transition. Not on every word; four to eight per 30 s.
- **Never on top of a spoken word.** Effects, beeps and screen shakes go in the gaps between words or end just before a word starts, above all on the hook's key word. In one test video a hit and two monitor beeps landed on "הרג" (the shock word) and the listener could not understand it: the effects were only 5 dB under the voice. Moved into the gaps they sat 16.6 dB under, and the word read clearly. Check with words.json: no effect may overlap the start-end span of a hero word, and the mix should keep effects at least 12 dB under the voice while someone is speaking.
- **The punctuation hit goes after the sentence.** The listener's preferred fix: let the shock sentence play completely clean, then put the effect, the jump and the visual event (beep + shake + flatline) together in the silence right after it, like a full stop. Find that silence on the waveform, not in words.json (ASR stretched "וידאו" to 2.30 s while the audio was silent from 1.92 s).
- **Silence as a tool:** in the pattern-interrupt gap, pull the music down (or filter it) for 0.5 to 1 s, then bring it back on the payoff hit.
- **Sources:** use music and effects the user owns or has a licence for (their library, a royalty-free library, or a generator they have access to). Do not lift audio from a reference video. If no source is available, say so; never ship silence under the voice without telling the user.
- **In Remotion:** extra `<Audio>` layers with `volume` (number or a function of the frame for ducking) and `<Sequence from>` for each effect.
