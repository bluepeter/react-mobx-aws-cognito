# React.js, MobX, AWS Cognito

This is an authentication-focused single page app starter/seed. This project
adds AWS Cognito support for authentication. This greatly simplifies and speeds
up app development as AWS handles all of the tedious back-end related
authentication tasks. We used this seed ourselves to build the front-end for
[Fluxguard](https://fluxguard.com).

- React.js and [AWS Cognito](https://aws.amazon.com/cognito/) integration to:
  - Create an account
  - Verify email address (via pin emailed to address)
  - Login
  - Logout
  - Verify existing session
  - Change password
  - Delete account
- Includes react-bootstrap.
- Check out `package.json` for more stack choices.

### How to use

- Clone this repo!
- Go to the AWS console and create a new Cognito user pool. When you do this,
  review the default settings and make the following changes:
  - Change the sign-in method to "email address or phone number"
  - Uncheck "email" from required attributes
  - Require email verification (this is checked by default, so don't adjust
    it). You may need to create a new SMS role to allow AWS to send emails on
    your behalf.
  - Add an "app client" (note that creating one at the same time appears to be
    broken in the AWS console at this time, so you can create it immediately
    after the user pool is created)
    - When you create the app client, UNCHECK "generate client secret" as this
      project does not currently support this new-ish feature.
- Copy the "Pool Id" and put it in `.env`
- Click on "app client settings" and copy the "App client id" and put it in
  `.env`. Make sure "Cognito User Pool" is CHECKED under "Enabled Identity
  Providers".
- Go to "app client settings" and check "Cognito user pool" under "enabled
  identity providers."
- `yarn` to install everything
- `yarn run start` to run locally.
- Create an account, login, etc!

### Screenshots

![Screenshot](https://user-images.githubusercontent.com/2158187/29740369-866d9832-8a87-11e7-9f1e-e4cd77a54df4.png)

![Screenshot](https://user-images.githubusercontent.com/2158187/29740368-865b95ba-8a87-11e7-8563-dfeaa4b10e75.png)

![Screenshot](https://user-images.githubusercontent.com/2158187/45244541-1e2aae00-b2ad-11e8-92e2-2f369d20944e.png)
