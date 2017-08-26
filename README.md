## React.js, MobX, AWS Cognito

This is an authentication-focused single page app starter/seed. It is
originally forked from [this
repo](https://github.com/gothinkster/react-mobx-realworld-example-app). Please
look at that project for the core stack choices. This project adds AWS Cognito
support for authentication. This greatly simplifies and speeds up app
development as AWS handles all of the tedious back-end related authentication
tasks.

- Includes [AWS Cognito](https://aws.amazon.com/cognito/) integration to:
  - Create an account
  - Verify email address
  - Login
  - Logout
  - Verify existing session
  - Change username (coming soon)
  - Change password (coming soon)
  - Delete account (coming soon)
- Includes react-bootstrap.
- To use, create an AWS Cognito user pool and add configuration details in `.env`
- `npm start` to run locally.
