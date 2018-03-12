# WebRTC CodeLab
WebRTC CodeLab

Inspired by:

* https://github.com/googlecodelabs/webrtc-web
* https://webrtc.github.io/samples/
* https://github.com/googlecodelabs/codelab-components

Images:

* Background: https://qrohlf.com/trianglify-generator/
* Favicon: https://paulferrett.com/fontawesome-favicon/

## CodeLabs
* Lab1: GetuserMedia (GuM)
* Lab2: GuM Constraints
* Lab3: GuM I/O Select
* Lab4: GuM Record
* Lab5: GuM + PC states
* Lab6: DataChannel
* Lab7: Nodejs Signaling Server (socket.io)
* Lab8: Install KnockPlop

## Tutorial / codelab

See: https://misi.github.io/webrtc-c0d3l4b/

If you want to contribute please let me know with opening an issue, and I will share the source (google) doc.
To update the codelab use the `generate_codelab.sh`

If you fork it:
 * See source doc source dir and upload it to a google doc
 * use tool https://github.com/googlecodelabs/tools to generate codelab from the doc
 * `claat export ...`
 * Add the package.json
 * `yarn`
 * replace import "../elements/codelab.html" to "bower_components/codelab-components/google-codelab-elements.html"
