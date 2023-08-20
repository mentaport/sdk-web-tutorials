# Mentaport Core SDK Intro Tutorial

A Next.js application to demonstrate how the  Core SDK works with a click of a button. 

Inside @components/ui you will find all the forms and how to execute the SDK.

The code provides the Mentapors Provider inside @lib/mentaport to help init the SDK.
 - Make sure to change what environment you want to use there.
 - Set API key 
 
 ## API Key
Send us an email to developer@mentaport.com to get your FREE API key to run the tutorial.



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Add .env File
```
# MENTAPORT_SDK
# make sure to change it to production URL when deploy (www.my-app.xyz) 
NEXT_PUBLIC_API_URL=http://localhost:3005
NEXT_PUBLIC_MENTAPORT_CONTRACT_ID=your-contract-id

MENTAPORT_API_KEY=your-api-key
```
Open [http://localhost:3005](http://localhost:3000) with your browser to see the result.


[![Watch the video](https://docs.mentaport.xyz/assets/images/tutorial_init-e72b74e27e7db74fbfb0a7c1615fe63c.png)](https://youtu.be/FVXU2VUwo6s)


*This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).*
