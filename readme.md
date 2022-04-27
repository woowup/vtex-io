## How to install development enviroment for VTEX.IO

First you have to install this packages:
- NodeJS >= ```16.14.2```
- NPM >= ```8.7.0```
- Yarn >= ```1.22.18```

When you have these packages installed, use the following command:

```sudo yarn global add vtex```

After install the VTEX CLI you have to login

```vtex login```

and in account input, type: ```woowup```
After this, you have to login in the browser with your woowup account
on Google Login.

When you are autenthicated, you can see your VTEX identity with

```vtex whoami```

If you see your user with ```woowup``` account, now you have to 
create a workspace

```vtex use {workspace_name}```

When this is ready, you clone this project. Change the directory to the project
folder and type

```vtex link```

When this is completed, you can enter to the development enviroment going to

```https://{workspace_name}--woowup.myvtex.com/admin/woowup-testing```

And that's it!