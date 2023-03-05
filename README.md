# Simple Chat App with ChatGPT

<p align="center">
  <img width="400" alt="demo" src="https://user-images.githubusercontent.com/6212292/222955653-e72cd889-ae39-463a-b721-b8ce05038423.png">
</p>

## About

This is a simple & lightweight chat app built with

- [ChatGPT API](https://platform.openai.com/docs/api-reference/chat/create)
- [Preact](https://preactjs.com/), [WMR](https://wmr.dev/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

The UI is rendered by Preact, and served by Cloudflare Pages.  
The chat message from the user is sent to an API endpoint built with the [Pages Functions](https://developers.cloudflare.com/pages/platform/functions/), parsed and validated, then sent to the OpenAI API.

## Run locally

1. clone the repo to your local machine
2. Create a new [OpenAI API key](https://platform.openai.com/account/api-keys), and create a `.dev.vars` file in the root directory with the following content:

   ```
   OPENAI_API_KEY=<YOUR API KEY>
   ```

3. Run `npm install` to install dependencies
4. Run `npm start` to start the dev server. After the server is started, press `b` to open the app in your browser.

## Deploy to Cloudflare Pages

1. Fork the repo
2. Create a new Cloudflare Pages project in the [Cloudflare dashboard](https://dash.cloudflare.com/), and connect it to your forked repo. Make sure to use the following configuration:
   - Production branch: main
   - Build command: npm run build
   - Build directory: dist
3. Set the `OPENAI_API_KEY` environment variable in the Cloudflare dashboard with your OpenAI API key

## References

- Chat GPT API: https://platform.openai.com/docs/api-reference/chat/create
- Cloudflare Pages with Preact: https://developers.cloudflare.com/pages/framework-guides/deploy-a-preact-site/
