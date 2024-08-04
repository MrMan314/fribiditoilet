# The Memery
## About
<details>
	<summary>Spoiler Warning</summary>
	<img src="https://github.com/MrMan314/memery/raw/master/images/toilet.png">
</details>
We believe that EVERYONE can be funny with the right tools. 
Chef Memesicle cooks up some really cool and really funny memes! Just add him as an Adobe Express addon, and let your imagination run wild.
He uses prompts given by the user to generate unique memes, whether it’s to show to some friends or to bring a community together through light-hearted jokes.

## Setup

1. To install the dependencies, run `npm install`.
2. To build the application, run `npm run build`.
3. To start the application, run `npm run start`.
4. Setup and run the [backend](https://www.github.com/MrMan314/memery_backend)
5. Set a reverse http proxy to route `/generate` to the backend. Example using httpd:
```xml
<VirtualHost *:443>
	proxypreservehost on
	SSLProxyEngine on
	SSLProxyCheckPeerName off
	proxypass /generate http://127.0.0.1:5000/
	proxypassreverse /generate http://127.0.0.1:5000/
	proxypass / https://127.0.0.1:5241/
	proxypassreverse / https://127.0.0.1:5241/

	SSLProxyEngine On
	SSLCertificateFile "..."
	SSLCertificateKeyFile "..."
</VirtualHost>
```
