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

```
cd codelab
yarn install
sudo yarn global add polyserve

../utils/certcopy.sh
polyserve -H :: -p 8080 --key privkey.pem --cert cert.pem -P https/1.1
```
** Open Tutorial in Browser **
[https://*REPLACE_WITH_YOUR_HOST_FQDN*:8080/components/webrtc-codelab/webrtc-codelab.html](https://REPLACE_WITH_YOUR_HOST_FQDN:8080/components/webrtc-codelab/webrtc-codelab.html)
