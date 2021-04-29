
# CloudForecast _take-home assignment_: BoxFactory

Hello! Welcome to the **BoxFactory** app.

This application is a simple Ruby-on-Rails app (using React) allowing users to create, visualize and delete boxes. With the help of this app and the instructions listed below, our goals evaluate your technical skills as a FrontEnd/FullStack engineer.

You have 48 hours to return this project, but we believe this project should take you between **6 to 8 hours**. If you want to spend more than 8 hours, you are welcome to do so.

You can find below all the information you need to get started on the project.

If you have any questions at any point during the challenge, please do not hesitate to ask Francois via any communication channels (Email, Slack, Whatsapp ...)

**Good luck!**

## A few necessary commands
- `rails server`(_obviously_)
- `rails test`: Runs the Ruby test
- `yarn test`: Runs the JS test


## Overall Goal: **Improving the BoxFactory app**
The goal of this take-home assignment is to improve the overall `BoxFactory` application by building new features, improving the user experience, and fixing any bug we have left. As part of this test, we expect you to follow coding **best practices** (commenting, unit-tests, ...) as much as possible.

In the **6 to 8 hours** timeframe, we would like you to implement the following tasks (sorted by priority):
- implement the **High Priorities** TODOs (see below for more details)
- implement the `Bow Owner` feature (see below for more details)
- improve the overall user experience (see below for more details)
- implement the **Low Priorities** TODOs  (see below for more details and only if you have some time left)

We do not expect you to finish all the tasks (especially not the  **Low Priorities** TODOs) but get as much done as possible to help us better assess your technical skills.

### TODOs
Across the entire application, there are a few `TODOs` tasks that need to be done to make the app better for the end-users. Here is the list of **High Priorities** and **Low Priorities** TODOs

#### High Priorities TODOs:
- _BoxForm.jsx_: TODO: Implement form validation to match the DB schema to help users during the Box creation process (OK)
- _box.rb_: TODO: One Box's field is a label; It's currently being stored in plain text and we would like to encrypt it using the AWS KMS SDK (https://docs.aws.amazon.com/sdk-for-ruby/v3/developer-guide/kms-example-encrypt-data.html) (OK)
- _Box.test.jsx_: TODO: Implement or improve a `box index` to ensure the Boxes are being returned as expected using a mock (PENDING)

#### Low Priorities TODOs:
- _box_controller.rb_: # TODO: Add Box Update logic; Users should only be able to update the label (but not the size)
- _BoxForm.jsx_: TODO: Add MouseOver animation using the images for each size; When hovering over the image, the *Open should be visible to our client
- _BoxList.jsx_: TODO: Handle error and display a message to the user

### New `Box Owner` feature (OK)
At the moment, the `BoxFactory` project is only supporting the creation of `Boxes` and we would like the ability to create `BoxOwners`.  Here are the key requirements regarding the `BoxOwner` object:
- The `Box Owner` object would be store in the DB and will contain the following fields:
    - first_name : String : required
    - last_name : String : required
    - email: String: required
- As part of the creation process, the user should not be able to submit a `Box Owner` without a valid email address (regex: `^\S+@\S+$`)
- The email field also need to be encrypted like the `Box` label field using the AWS KMS SDK

Once implemented, the users should be able to:
- Create new `BoxOwner` (the user DOES NOT need. to be able to update/edit `BoxOwner`)
- List existing `BoxOwner`
- Delete existing `BoxOwner`
- Attach a `BoxOwner` to a `Box`, however the `BoxOwner` is not a requirement (a `Box` can be without a `BoxOwner`)

### Improve the overall user experience (OK)
As I'm sure you will notice, the overall design of the `BoxFactory` is not great. As the final task, please update the overall design and user experience. Here are some guidelines:

- We are looking for **something simple and clean**. No fancy animations just a clean SaaS design (see [here](https://www.responsiveinboundmarketing.com/blog/10-of-the-best-saas-website-designs-we-love)  or [here](https://www.nectafy.com/blog/saas-website-design-examples) for some inspirations)
- You are highly encouraged to use a **CSS framework** to facilitate your work (Bootstrap, Materialize, and Tailwind CSS)

To reiterate, we are not looking for you to recreate the Airbnb or Instagram design but just implementing a simple user-friendly application for the end-user. That said, if you want to go crazy ... do it ... we can't wait to see it!


## Once you are done ...
1. congrats. Tony and I are really excited to see you work
2. double-check one last time and make sure everything is working as expected
    - Is the server starting and running?
    - Can you create a `Box` object?
    - Can you create a `BoxOwner` object?
    - Is the design looking good?
    - Are the tests passing `rails test` and `yarn test`?
3. zip the final project and send it back to Francois and Tony at founders@cloudforecast.io
    - In the email, please include a description of the work that you accomplished:
        - Which tasks did you complete?
        - If any, which tasks were you not able to complete and what blocked you (_it's okay!_)
        - How much time did you spend working on this project?
        - Share anything you consider worth sharing (test choices, design choices, ...)

## Any Questions
Once again, if you have any questions at any point, **please reach out to Francois** and he will make sure to reply as soon as possible.